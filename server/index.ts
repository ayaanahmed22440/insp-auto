import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";
import nodemailer from "nodemailer";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cleanField = (value: unknown, maxLength = 200) => String(value ?? "").trim().slice(0, maxLength);
const hasLineBreak = (value: string) => /[\r\n]/.test(value);

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