import { createHmac } from "node:crypto";
import { describe, expect, it } from "vitest";
import { verifyWhopSignature } from "./adminSecurity";

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
