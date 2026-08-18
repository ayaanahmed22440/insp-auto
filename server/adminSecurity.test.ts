import { createHmac } from "node:crypto";
import { describe, expect, it } from "vitest";
import { verifyWhopSignature } from "./adminSecurity";

describe("Whop webhook signature verification", () => {
  it("accepts a current correctly signed payload", () => {
    const secret = Buffer.from("unit-test-whop-secret").toString("base64");
    const timestamp = String(Math.floor(Date.now() / 1000));
    const body = JSON.stringify({ type: "unit.test" });
    const signature = createHmac("sha256", Buffer.from(secret, "base64"))
      .update(`${timestamp}.${body}`)
      .digest("base64");

    expect(
      verifyWhopSignature(body, timestamp, `v1,${signature}`, secret)
    ).toBe(true);
  });

  it("rejects tampered and stale signatures", () => {
    const secret = Buffer.from("unit-test-whop-secret").toString("base64");
    const staleTimestamp = String(Math.floor(Date.now() / 1000) - 301);
    const body = JSON.stringify({ type: "unit.test" });
    const signature = createHmac("sha256", Buffer.from(secret, "base64"))
      .update(`${staleTimestamp}.${body}`)
      .digest("base64");

    expect(
      verifyWhopSignature(`${body}x`, staleTimestamp, `v1,${signature}`, secret)
    ).toBe(false);
    expect(
      verifyWhopSignature(body, staleTimestamp, `v1,${signature}`, secret)
    ).toBe(false);
  });
});
