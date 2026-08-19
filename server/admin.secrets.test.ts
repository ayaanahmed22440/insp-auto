import { describe, expect, it } from "vitest";
import { hashOtp } from "./adminSecurity";

describe("admin server secret configuration", () => {
  it("uses the configured OTP pepper without exposing it", () => {
    const email = process.env.ADMIN_EMAIL;
    const pepper = process.env.ADMIN_OTP_PEPPER;
    expect(email).toBeTruthy();
    expect(pepper).toBeTruthy();
    const digest = hashOtp(email || "admin@example.com", "123456");
    expect(digest).toMatch(/^[a-f0-9]{64}$/);
    expect(digest).not.toContain(pepper || "__missing__");
  });

  it("has server-only delivery configuration present", () => {
    for (const key of ["SMTP_HOST", "SMTP_PORT", "SMTP_SECURE", "SMTP_USER", "SMTP_PASS", "SMTP_FROM", "CONTACT_TO", "WHOP_API_KEY", "WHOP_WEBHOOK_SECRET", "WHOP_COMPANY_ID"]) {
      expect(process.env[key], key).toBeTruthy();
    }
  });
});
