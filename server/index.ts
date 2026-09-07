import crypto from "crypto";
import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";
import nodemailer from "nodemailer";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cleanField = (value: unknown, maxLength = 200) => String(value ?? "").trim().slice(0, maxLength);
const hasLineBreak = (value: string) => /[\r\n]/.test(value);
const processedWebhookIds = new Set<string>();

async function startServer() {
  const app = express();
  const server = createServer(app);
  const staticPath = process.env.NODE_ENV === "production"
    ? path.resolve(__dirname, "public")
    : path.resolve(__dirname, "..", "dist", "public");

  // Clear any cached HTTP/3 alternative-service route so mobile browsers do not
  // keep reusing a stale edge association after the domain origin changes.
  app.use((_req, res, next) => {
    res.setHeader("Alt-Svc", "clear");
    next();
  });

  // Whop sends signed webhooks. This route must receive the raw request body
  // before express.json parses it so the signature can be verified correctly.
  app.post("/api/webhooks/whop", express.raw({ type: "application/json", limit: "64kb" }), async (req, res) => {
    const secret = process.env.WHOP_WEBHOOK_SECRET;
    const webhookId = req.header("webhook-id") || "";
    const webhookTimestamp = req.header("webhook-timestamp") || "";
    const webhookSignature = req.header("webhook-signature") || "";

    if (!secret || !webhookId || !webhookTimestamp || !webhookSignature) {
      res.status(401).send("Invalid webhook");
      return;
    }

    const timestampSeconds = Number(webhookTimestamp);
    if (!Number.isFinite(timestampSeconds) || Math.abs(Date.now() / 1000 - timestampSeconds) > 300) {
      res.status(401).send("Expired webhook");
      return;
    }

    const body = Buffer.isBuffer(req.body) ? req.body.toString("utf8") : "";
    const signedPayload = `${webhookId}.${webhookTimestamp}.${body}`;
    const secretValue = secret.startsWith("whsec_") ? secret.slice(6) : secret;

    let secretBytes: Buffer;
    try {
      secretBytes = Buffer.from(secretValue, "base64");
    } catch {
      res.status(401).send("Invalid webhook secret");
      return;
    }

    const expectedSignature = crypto.createHmac("sha256", secretBytes).update(signedPayload).digest("base64");
    const validSignature = webhookSignature.split(" ").some((part) => {
      const [version, signature] = part.split(",");
      if (version !== "v1" || !signature) return false;
      const actual = Buffer.from(signature, "base64");
      const expected = Buffer.from(expectedSignature, "base64");
      return actual.length === expected.length && crypto.timingSafeEqual(actual, expected);
    });

    if (!validSignature) {
      res.status(401).send("Invalid signature");
      return;
    }

    if (processedWebhookIds.has(webhookId)) {
      res.status(200).send("OK");
      return;
    }
    processedWebhookIds.add(webhookId);

    let event: any;
    try {
      event = JSON.parse(body);
    } catch {
      processedWebhookIds.delete(webhookId);
      res.status(400).send("Invalid JSON");
      return;
    }

    if (event?.type === "payment.succeeded") {
      const payment = event.data || {};
      const customer = payment.user || payment.member?.user || {};
      const customerName = cleanField(customer.name || payment.name || "Customer", 160);
      const customerEmail = cleanField(customer.email || payment.email || "", 200);
      const paymentId = cleanField(payment.id || event.id || "Not provided", 120);
      const planId = cleanField(payment.plan?.id || payment.plan_id || "Not provided", 120);
      const amount = payment.amount != null ? String(payment.amount) : "Not provided";

      const { SMTP_HOST, SMTP_PORT, SMTP_SECURE, SMTP_USER, SMTP_PASS } = process.env;
      if (SMTP_HOST && SMTP_USER && SMTP_PASS) {
        try {
          const transporter = nodemailer.createTransport({
            host: SMTP_HOST,
            port: Number(SMTP_PORT || 465),
            secure: SMTP_SECURE ? SMTP_SECURE === "true" : Number(SMTP_PORT || 465) === 465,
            auth: { user: SMTP_USER, pass: SMTP_PASS },
          });
          const recipient = process.env.CONTACT_TO || "support@inspauto.com";
          const fromAddress = process.env.SMTP_FROM || SMTP_USER;
          await transporter.sendMail({
            from: fromAddress,
            to: recipient,
            replyTo: customerEmail || undefined,
            subject: `[INSP AUTO] Payment completed — ${customerName}`,
            text: [
              "PAYMENT STATUS: COMPLETED",
              "The customer has successfully completed the payment through Whop.",
              "",
              `Customer: ${customerName}`,
              `Email: ${customerEmail || "Not provided by Whop"}`,
              `Payment ID: ${paymentId}`,
              `Plan ID: ${planId}`,
              `Amount: ${amount}`,
              `Completed at: ${event.timestamp || new Date().toISOString()}`,
              "",
              "This notification is based on Whop's verified payment.succeeded webhook.",
            ].join("\n"),
          });
        } catch (error) {
          console.error("Payment completion email failed:", error instanceof Error ? error.message : "Unknown SMTP error");
          processedWebhookIds.delete(webhookId);
          res.status(502).send("Email failed");
          return;
        }
      }
    }

    res.status(200).send("OK");
  });

  app.use(express.json({ limit: "32kb" }));
  app.use(express.urlencoded({ extended: false, limit: "32kb" }));

  app.post("/api/contact", async (req, res) => {
    const name = cleanField(req.body?.name, 120);
    const email = cleanField(req.body?.email, 200);
    const vehicle = cleanField(req.body?.vehicle, 120);
    const order = cleanField(req.body?.order, 120);
    const subject = cleanField(req.body?.subject, 160);
    const message = cleanField(req.body?.message, 4000);

    if (!name || !email || !subject || !message || hasLineBreak(email) || !/^\S+@\S+\.\S+$/.test(email)) {
      res.status(400).json({ ok: false, message: "Please complete the required fields with a valid email address." });
      return;
    }

    const { SMTP_HOST, SMTP_PORT, SMTP_SECURE, SMTP_USER, SMTP_PASS } = process.env;
    if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
      console.error("Contact form unavailable: SMTP environment variables are not configured.");
      res.status(503).json({ ok: false, message: "Support email is not configured yet. Please email support directly." });
      return;
    }

    try {
      const transporter = nodemailer.createTransport({
        host: SMTP_HOST,
        port: Number(SMTP_PORT || 465),
        secure: SMTP_SECURE ? SMTP_SECURE === "true" : Number(SMTP_PORT || 465) === 465,
        auth: { user: SMTP_USER, pass: SMTP_PASS },
      });
      const recipient = process.env.CONTACT_TO || "support@inspauto.com";
      const fromAddress = process.env.SMTP_FROM || SMTP_USER;
      await transporter.sendMail({
        from: fromAddress,
        to: recipient,
        replyTo: email,
        subject: `[INSP AUTO] ${subject}`,
        text: [`Name: ${name}`, `Email: ${email}`, `VIN / Registration: ${vehicle || "Not provided"}`, `Order Number: ${order || "Not provided"}`, "", message].join("\n"),
      });
      res.json({ ok: true, message: "Thanks — your message has been sent to support." });
    } catch (error) {
      console.error("Contact form email failed:", error instanceof Error ? error.message : "Unknown SMTP error");
      res.status(502).json({ ok: false, message: "We could not send your message right now. Please email support directly." });
    }
  });

  // Vite assets are content-hashed and safe to cache for a long time. This
  // reduces repeated asset requests during rapid navigation and avoids asking
  // the hosting layer to serve the same immutable files over and over.
  app.use("/assets", express.static(path.join(staticPath, "assets"), {
    maxAge: "1y",
    immutable: true,
    fallthrough: false,
  }));

  app.use(express.static(staticPath, {
    maxAge: "1h",
  }));

  // Never return index.html for a missing JavaScript/CSS asset. A missing
  // hashed asset should be a real 404 rather than an HTML response that the
  // browser then reports as a failed dynamic module import.
  app.use("/assets", (_req, res) => {
    res.status(404).end();
  });

  app.get("*", (_req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
  });

  // Keep idle connections available for short bursts of normal browsing so
  // rapid clicks do not unnecessarily create new TCP connections.
  server.keepAliveTimeout = 65000;
  server.headersTimeout = 66000;

  const port = process.env.PORT || 3000;
  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch((error) => {
  console.error("Server failed to start:", error);
  process.exitCode = 1;
});
