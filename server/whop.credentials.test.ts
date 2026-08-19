import { describe, expect, it } from "vitest";

describe("Whop server credential", () => {
  it("authenticates against the configured company endpoint without exposing the key", async () => {
    const apiKey = process.env.WHOP_API_KEY;
    const companyId = process.env.WHOP_COMPANY_ID;
    expect(apiKey, "WHOP_API_KEY must be configured").toBeTruthy();
    expect(companyId, "WHOP_COMPANY_ID must be configured").toBeTruthy();

    const response = await fetch(
      `https://api.whop.com/api/v1/companies/${encodeURIComponent(companyId!)}`,
      { headers: { Authorization: `Bearer ${apiKey}` } }
    );

    expect(response.status, "Whop API credential was rejected").not.toBe(401);
    expect(response.status, "Whop company endpoint should be reachable").not.toBe(403);
  }, 20_000);
});
