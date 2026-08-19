import { createHmac } from "node:crypto";
import { describe, expect, it } from "vitest";
import {
  normalizeOtpCode,
  sameOriginMatches,
  setAdminCookie,
  verifyWhopSignature,
} from "./adminSecurity";

describe("OTP input normalization", () => {
  it("removes pasted whitespace and preserves leading zeroes", () => {
    expect(normalizeOtpCode(" 0 1 2 0 0 3 ")).toBe("012003");
    expect(normalizeOtpCode("1234567")).toBe("123456");
    expect(normalizeOtpCode(undefined)).toBe("");
  });
});

describe("Admin request security helpers", () => {
  it("requires an exact same-origin match", () => {
    expect(sameOriginMatches("https://inspauto.com", "https://inspauto.com")).toBe(true);
    expect(sameOriginMatches("https://evil.example", "https://inspauto.com")).toBe(false);
    expect(sameOriginMatches("", "https://inspauto.com")).toBe(false);
  });

  it("sets an HttpOnly Secure SameSite=Lax session cookie", () => {
    let captured: { name: string; value: string; options: Record<string, unknown> } | undefined;
    setAdminCookie({
      cookie(name, value, options) {
        captured = { name, value, options };
      },
    }, "test-token");
    expect(captured).toMatchObject({
      name: "__Host-insp_admin",
      value: "test-token",
      options: { httpOnly: true, secure: true, sameSite: "lax", path: "/" },
    });
  });
});

describe("Whop Standard Webhooks signature verification", () => {
  it("accepts a current correctly signed payload", () => {
    const secret = "unit-test-whop-secret";
    const webhookId = "msg_unit_test";
    const timestamp = String(Math.floor(Date.now() / 1000));
    const body = JSON.stringify({
      type: "payment.succeeded",
      data: { id: "pay_test" },
    });
    const signature = createHmac("sha256", Buffer.from(secret, "utf8"))
      .update(`${webhookId}.${timestamp}.${body}`)
      .digest("base64");

    expect(
      verifyWhopSignature(body, webhookId, timestamp, `v1,${signature}`, secret)
    ).toBe(true);
  });

  it("rejects tampered, wrong-id, and stale signatures", () => {
    const secret = "unit-test-whop-secret";
    const webhookId = "msg_unit_test";
    const timestamp = String(Math.floor(Date.now() / 1000) - 301);
    const body = JSON.stringify({ type: "payment.succeeded" });
    const signature = createHmac("sha256", Buffer.from(secret, "utf8"))
      .update(`${webhookId}.${timestamp}.${body}`)
      .digest("base64");

    expect(
      verifyWhopSignature(
        `${body}x`,
        webhookId,
        timestamp,
        `v1,${signature}`,
        secret
      )
    ).toBe(false);
    expect(
      verifyWhopSignature(
        body,
        "msg_other",
        timestamp,
        `v1,${signature}`,
        secret
      )
    ).toBe(false);
    expect(
      verifyWhopSignature(body, webhookId, timestamp, `v1,${signature}`, secret)
    ).toBe(false);
  });
});
