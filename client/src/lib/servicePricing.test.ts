import { describe, expect, it } from "vitest";
import { SERVICE_TIER_PRICE_VALUES, SERVICE_TIER_PRICES } from "./servicePricing";

describe("service report pricing", () => {
  it("uses the confirmed prices for every vehicle service tier", () => {
    expect(SERVICE_TIER_PRICES).toEqual({
      basic: "49.00",
      standard: "59.00",
      premium: "79.00",
    });
    expect(SERVICE_TIER_PRICE_VALUES).toEqual([49, 59, 79]);
  });
});
