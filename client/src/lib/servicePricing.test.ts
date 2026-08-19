import { describe, expect, it } from "vitest";
import { SERVICE_TIER_PRICE_VALUES, SERVICE_TIER_PRICES } from "./servicePricing";

describe("service report pricing", () => {
  it("uses the confirmed prices for every vehicle service tier", () => {
    expect(SERVICE_TIER_PRICES).toEqual({
      basic: "39.99",
      standard: "42.99",
      premium: "52.99",
    });
    expect(SERVICE_TIER_PRICE_VALUES).toEqual([39.99, 42.99, 52.99]);
  });
});
