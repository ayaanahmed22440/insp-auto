import type { Express, Request, Response, NextFunction } from "express";
import express from "express";
import nodemailer from "nodemailer";
import {
  createAdminCredential,
  createAdminSession,
  createAuditLog,
  createContact,
  createOtpChallenge,
  deleteContact,
  getActiveAdminSession,
  getAdminCredential,
  getDashboardCounts,
  getLatestOtpChallenge,
  getOrderStatusByOwner,
  hasWebhookEvent,
  incrementOtpAttempts,
  invalidateOtpChallenges,
  listContacts,
  listAuditLogs,
  listOrders,
  recordWebhookEvent,
  syncOrderFromWebhook,
  revokeAdminSession,
  updateContact,
  updateOrderFulfillment,
} from "./db";
import {
  ADMIN_SESSION_COOKIE,
  MAX_OTP_ATTEMPTS,
  OTP_TTL_MS,
  SESSION_TTL_MS,
  clearAdminCookie,
  createOtp,
  createSessionToken,
  hashOtp,
  hashPassword,
  hashSessionToken,
  isValidEmail,
  normalizeAdminEmail,
  readCookie,
  requestId,
  safeEqualHex,
  setAdminCookie,
  verifyPassword,
  verifyWhopSignature,
} from "./adminSecurity";

const attempts = new Map<string, { count: number; resetAt: number }>();
const MAX_ATTEMPTS = 8;
const WINDOW_MS = 15 * 60 * 1000;

function rateLimited(key: string) {
  const now = Date.now();
  const current = attempts.get(key);
  if (!current || current.resetAt <= now) {
    attempts.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  current.count += 1;
  return current.count > MAX_ATTEMPTS;
}

function safeString(value: unknown, max: number) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function getClientKey(req: Request) {
  return `${req.ip}:${safeString(req.body?.email, 320).toLowerCase()}`;
}

async function sendMail(input: {
  to: string;
  subject: string;
  text: string;
  replyTo?: string;
}) {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 465);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const from = process.env.SMTP_FROM || user;
  if (!host || !user || !pass || !from) return false;
  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: String(process.env.SMTP_SECURE ?? "true") === "true",
    auth: { user, pass },
  });
  await transporter.sendMail({
    from,
    to: input.to,
    subject: input.subject,
    text: input.text,
    replyTo: input.replyTo,
  });
  return true;
}

function genericUnauthorized(res: Response) {
  return res.status(401).json({ ok: false, message: "Unauthorized" });
}

async function requireAdmin(req: Request, res: Response, next: NextFunction) {
  const token = readCookie(req.headers.cookie, ADMIN_SESSION_COOKIE);
  if (!token) return genericUnauthorized(res);
  const session = await getActiveAdminSession(hashSessionToken(token));
  if (!session) return genericUnauthorized(res);
  (req as Request & { adminEmail?: string }).adminEmail = session.email;
  next();
}

function requireSameOrigin(req: Request, res: Response, next: NextFunction) {
  const origin = req.get("origin");
  if (!origin) return next();
  const forwardedProto =
    safeString(req.get("x-forwarded-proto"), 16).split(",")[0] || req.protocol;
  const forwardedHost =
    safeString(req.get("x-forwarded-host"), 320).split(",")[0] ||
    req.get("host") ||
    "";
  const expected = `${forwardedProto}://${forwardedHost}`;
  if (origin !== expected)
    return res.status(403).json({ ok: false, message: "Forbidden" });
  next();
}

function isValidContact(body: unknown) {
  if (!body || typeof body !== "object") return false;
  const value = body as Record<string, unknown>;
  const name = safeString(value.name, 120);
  const email = safeString(value.email, 320);
  const subject = safeString(value.subject, 160);
  const message = safeString(value.message, 5000);
  return (
    name.length >= 2 &&
    isValidEmail(email) &&
    subject.length >= 2 &&
    message.length >= 10
  );
}

export function registerAdminRoutes(app: Express) {
  app.post("/api/order-status", requireSameOrigin, async (req, res) => {
    const email = safeString(req.body?.email, 320).toLowerCase();
    const paymentReference = safeString(req.body?.paymentReference, 180);
    if (!isValidEmail(email) || !paymentReference)
      return res.status(400).json({
        ok: false,
        message: "Enter the email used at checkout and your payment reference.",
      });
    const order = await getOrderStatusByOwner(email, paymentReference);
    if (!order)
      return res
        .status(404)
        .json({ ok: false, message: "No matching order was found." });
    return res.json({ ok: true, data: order });
  });

  app.post("/api/contact", requireSameOrigin, async (req, res) => {
    if (!isValidContact(req.body))
      return res
        .status(400)
        .json({ ok: false, message: "Please complete the required fields." });
    const body = req.body as Record<string, unknown>;
    const input = {
      name: safeString(body.name, 120),
      email: safeString(body.email, 320).toLowerCase(),
      phone: safeString(body.phone, 40) || undefined,
      vin: safeString(body.vin ?? body.vehicle, 64) || undefined,
      orderNumber: safeString(body.orderNumber ?? body.order, 120) || undefined,
      subject: safeString(body.subject, 160),
      message: safeString(body.message, 5000),
    };
    const contact = await createContact(input);
    if (!contact)
      return res.status(503).json({
        ok: false,
        message: "Support is temporarily unavailable. Please try again later.",
      });
    const to = process.env.CONTACT_TO || process.env.SMTP_USER;
    let notified = false;
    if (to) {
      try {
        notified = await sendMail({
          to,
          subject: `Contact form: ${input.subject}`,
          replyTo: input.email,
          text: `Name: ${input.name}\nEmail: ${input.email}\nPhone: ${input.phone ?? ""}\nVIN: ${input.vin ?? ""}\nOrder: ${input.orderNumber ?? ""}\n\n${input.message}`,
        });
      } catch (error) {
        console.error(
          "[Contact] notification failed",
          error instanceof Error ? error.message : "unknown"
        );
      }
    }
    await createAuditLog({
      action: "contact.created",
      entityType: "contact",
      entityId: String(contact.id),
      metadata: { notified },
    });
    return res.status(201).json({
      ok: true,
      id: contact.id,
      message: "Your message has been received.",
    });
  });

  app.post("/api/admin/login", requireSameOrigin, async (req, res) => {
    const email = normalizeAdminEmail(req.body?.email);
    const password = safeString(req.body?.password, 256);
    if (
      !isValidEmail(email) ||
      password.length < 8 ||
      rateLimited(getClientKey(req))
    )
      return res
        .status(401)
        .json({ ok: false, message: "Invalid credentials" });
    let credential = await getAdminCredential(email);
    if (
      !credential &&
      process.env.ADMIN_EMAIL &&
      process.env.ADMIN_INITIAL_PASSWORD &&
      email === normalizeAdminEmail(process.env.ADMIN_EMAIL)
    ) {
      const passwordHash = await hashPassword(
        process.env.ADMIN_INITIAL_PASSWORD
      );
      await createAdminCredential(email, passwordHash);
      credential = await getAdminCredential(email);
    }
    const valid = Boolean(
      credential?.enabled &&
      credential &&
      (await verifyPassword(password, credential.passwordHash))
    );
    if (!valid) {
      await createAuditLog({
        actorEmail: email,
        action: "admin.login.failure",
        metadata: { requestId: requestId() },
      });
      return res
        .status(401)
        .json({ ok: false, message: "Invalid credentials" });
    }
    await invalidateOtpChallenges(email);
    const code = createOtp();
    await createOtpChallenge(
      email,
      hashOtp(email, code),
      new Date(Date.now() + OTP_TTL_MS)
    );
    try {
      const sent = await sendMail({
        to: email,
        subject: "INSP AUTO admin verification code",
        text: `Your verification code is ${code}. It expires in 15 minutes and can be used once.`,
      });
      if (!sent)
        return res.status(503).json({
          ok: false,
          message: "Authentication email is not configured.",
        });
    } catch {
      return res.status(503).json({
        ok: false,
        message: "Authentication email is temporarily unavailable.",
      });
    }
    await createAuditLog({ actorEmail: email, action: "admin.otp.requested" });
    return res.json({ ok: true, requiresOtp: true });
  });

  app.post("/api/admin/verify-otp", requireSameOrigin, async (req, res) => {
    const email = normalizeAdminEmail(req.body?.email);
    const code = safeString(req.body?.code, 6);
    if (
      !isValidEmail(email) ||
      !/^\d{6}$/.test(code) ||
      rateLimited(getClientKey(req))
    )
      return res
        .status(401)
        .json({ ok: false, message: "Invalid verification code" });
    const challenge = await getLatestOtpChallenge(email);
    if (!challenge || challenge.attempts >= MAX_OTP_ATTEMPTS)
      return res
        .status(401)
        .json({ ok: false, message: "Invalid verification code" });
    await incrementOtpAttempts(challenge.id);
    const valid = safeEqualHex(hashOtp(email, code), challenge.codeHash);
    if (!valid) {
      await createAuditLog({ actorEmail: email, action: "admin.otp.failure" });
      return res
        .status(401)
        .json({ ok: false, message: "Invalid verification code" });
    }
    await invalidateOtpChallenges(email);
    const token = createSessionToken();
    await createAdminSession(
      email,
      hashSessionToken(token),
      new Date(Date.now() + SESSION_TTL_MS)
    );
    setAdminCookie(res, token);
    await createAuditLog({ actorEmail: email, action: "admin.login.success" });
    return res.json({ ok: true });
  });

  app.post("/api/admin/logout", requireSameOrigin, async (req, res) => {
    const token = readCookie(req.headers.cookie, ADMIN_SESSION_COOKIE);
    if (token) await revokeAdminSession(hashSessionToken(token));
    clearAdminCookie(res);
    return res.json({ ok: true });
  });

  app.get("/api/admin/me", requireAdmin, (req, res) =>
    res.json({
      ok: true,
      email: (req as Request & { adminEmail?: string }).adminEmail,
    })
  );
  app.get("/api/admin/overview", requireAdmin, async (_req, res) =>
    res.json({ ok: true, data: await getDashboardCounts() })
  );
  app.get("/api/admin/contacts", requireAdmin, async (_req, res) =>
    res.json({ ok: true, data: await listContacts() })
  );
  app.patch("/api/admin/contacts/:id", requireAdmin, async (req, res) => {
    const id = Number(req.params.id);
    const status = [
      "new",
      "read",
      "in_progress",
      "replied",
      "resolved",
    ].includes(req.body?.status)
      ? req.body.status
      : undefined;
    const internalNotes =
      typeof req.body?.internalNotes === "string"
        ? req.body.internalNotes.slice(0, 5000)
        : undefined;
    if (
      !Number.isInteger(id) ||
      id <= 0 ||
      (!status && internalNotes === undefined)
    )
      return res.status(400).json({ ok: false, message: "Invalid update" });
    const contact = await updateContact(id, { status, internalNotes });
    await createAuditLog({
      actorEmail: (req as Request & { adminEmail?: string }).adminEmail,
      action: "contact.updated",
      entityType: "contact",
      entityId: String(id),
      metadata: { status },
    });
    return res.json({ ok: true, data: contact });
  });
  app.delete("/api/admin/contacts/:id", requireAdmin, async (req, res) => {
    const id = Number(req.params.id);
    if (!Number.isInteger(id) || id <= 0)
      return res.status(400).json({ ok: false, message: "Invalid contact" });
    await deleteContact(id);
    await createAuditLog({
      actorEmail: (req as Request & { adminEmail?: string }).adminEmail,
      action: "contact.deleted",
      entityType: "contact",
      entityId: String(id),
    });
    return res.json({ ok: true });
  });
  app.get("/api/admin/audit-logs", requireAdmin, async (_req, res) => {
    return res.json({ ok: true, data: await listAuditLogs() });
  });
  app.get("/api/admin/orders", requireAdmin, async (_req, res) =>
    res.json({ ok: true, data: await listOrders() })
  );
  app.patch("/api/admin/orders/:id", requireAdmin, async (req, res) => {
    const id = Number(req.params.id);
    const status = req.body?.fulfillmentStatus;
    if (
      !Number.isInteger(id) ||
      !["pending", "processing", "completed", "failed"].includes(status)
    )
      return res
        .status(400)
        .json({ ok: false, message: "Invalid fulfillment update" });
    const order = await updateOrderFulfillment(
      id,
      status,
      typeof req.body?.paymentReference === "string"
        ? req.body.paymentReference.slice(0, 180)
        : undefined
    );
    await createAuditLog({
      actorEmail: (req as Request & { adminEmail?: string }).adminEmail,
      action: "order.fulfillment.updated",
      entityType: "order",
      entityId: String(id),
      metadata: { status },
    });
    return res.json({ ok: true, data: order });
  });

  app.post(
    "/api/webhooks/whop",
    express.raw({ type: "application/json", limit: "256kb" }),
    async (req, res) => {
      const secret = process.env.WHOP_WEBHOOK_SECRET;
      const rawBody = Buffer.isBuffer(req.body)
        ? req.body
        : Buffer.isBuffer((req as Request & { rawBody?: Buffer }).rawBody)
          ? (req as Request & { rawBody?: Buffer }).rawBody!
          : Buffer.from("", "utf8");
      const timestamp = req.get("webhook-timestamp") || "";
      const eventId = req.get("webhook-id") || "";
      const signature = req.get("webhook-signature") || "";
      if (
        !secret ||
        !eventId ||
        !verifyWhopSignature(
          rawBody.toString("utf8"),
          eventId,
          timestamp,
          signature,
          secret
        )
      )
        return res.status(400).json({ ok: false });
      if (await hasWebhookEvent(eventId))
        return res.status(200).json({ ok: true });
      let payload: Record<string, unknown>;
      try {
        payload = JSON.parse(rawBody.toString("utf8"));
      } catch {
        return res.status(400).json({ ok: false });
      }
      const eventType = safeString(payload.type, 120) || "unknown";
      const companyId =
        safeString(payload.business_id ?? payload.company_id, 180) || undefined;
      const expectedCompany = process.env.WHOP_COMPANY_ID;
      const acceptedCompany = !expectedCompany || expectedCompany === companyId;
      let syncedOrderId: number | undefined;
      if (
        acceptedCompany &&
        (eventType === "payment.succeeded" || eventType === "payment.failed")
      ) {
        const data =
          typeof payload.data === "object" && payload.data !== null
            ? (payload.data as Record<string, unknown>)
            : payload;
        const metadata =
          typeof data.metadata === "object" && data.metadata !== null
            ? (data.metadata as Record<string, unknown>)
            : {};
        const order = await syncOrderFromWebhook({
          orderId: Number(metadata.orderId ?? data.order_id),
          customerName: safeString(
            metadata.customerName ?? data.customer_name,
            120
          ),
          deliveryEmail: safeString(
            metadata.deliveryEmail ?? data.delivery_email,
            320
          ).toLowerCase(),
          selectedPlan: safeString(
            metadata.selectedPlan ?? data.selected_plan,
            120
          ),
          amountPence: Number(metadata.amountPence ?? data.amount_pence),
          vin: safeString(metadata.vin ?? data.vin, 64),
          paymentReference: safeString(data.id ?? data.payment_id, 180),
          paymentStatus: eventType === "payment.succeeded" ? "paid" : "failed",
        });
        syncedOrderId = order?.id;
      }
      await recordWebhookEvent({
        eventId,
        eventType,
        companyId,
        signatureValid: 1,
        processedAt: new Date(),
      });
      await createAuditLog({
        action: "webhook.processed",
        entityType: "webhook",
        entityId: eventId,
        metadata: {
          eventType,
          companyId,
          accepted: acceptedCompany,
          syncedOrderId,
        },
      });
      return res.status(200).json({ ok: true });
    }
  );
}
