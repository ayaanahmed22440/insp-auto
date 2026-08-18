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

  app.use(express.static(staticPath));
  app.get("*", (_req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
  });

  const port = process.env.PORT || 3000;
  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
