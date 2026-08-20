import { afterEach, describe, expect, it, vi } from "vitest";
import {
  combinedCartQuantity,
  combinedCartTotalPence,
  createWhopCombinedCheckout,
  normalizeCombinedCart,
  normalizeRegistrations,
} from "./combinedCheckout";

afterEach(() => vi.restoreAllMocks());

describe("combined cart pricing", () => {
  it("calculates a single trusted total for mixed tiers and quantities", () => {
    const lines = normalizeCombinedCart([
      { id: "car-history-report-basic", quantity: 1 },
      { id: "standard-atv", quantity: 1 },
      { id: "premium", quantity: 1 },
    ]);
    expect(lines).not.toBeNull();
    expect(combinedCartTotalPence(lines!)).toBe(49_00 + 59_00 + 79_00);
    expect(combinedCartQuantity(lines!)).toBe(3);
  });

  it("ignores browser prices and rejects unknown catalog IDs", () => {
    expect(normalizeCombinedCart([{ id: "basic", quantity: 1, price: 1 }])).not.toBeNull();
    expect(normalizeCombinedCart([{ id: "premium", quantity: 0 }])).toBeNull();
    expect(normalizeCombinedCart([{ id: "admin-price-1", quantity: 1 }])).toBeNull();
  });

  it("requires exactly one non-empty registration per report unit", () => {
    const lines = normalizeCombinedCart([{ id: "basic", quantity: 2 }, { id: "standard", quantity: 1 }]);
    expect(normalizeRegistrations(["AB12CDE", "XY34ZAB", "LM56QRS"], combinedCartQuantity(lines!))).toEqual(["AB12CDE", "XY34ZAB", "LM56QRS"]);
    expect(normalizeRegistrations(["AB12CDE", "XY34ZAB"], combinedCartQuantity(lines!))).toBeNull();
    expect(normalizeRegistrations(["AB12CDE", "", "LM56QRS"], combinedCartQuantity(lines!))).toBeNull();
  });
});

describe("Whop combined checkout request", () => {
  it("sends one GBP checkout request with the server total and order metadata", async () => {
    process.env.WHOP_API_KEY = "test-key";
    process.env.WHOP_COMPANY_ID = "biz_test";
    const fetchMock = vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(JSON.stringify({ purchase_url: "https://whop.com/checkout/ch_test" }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      })
    );

    const result = await createWhopCombinedCheckout({
      totalPence: 17700,
      orderId: 42,
      customerName: "Test Customer",
      deliveryEmail: "test@example.com",
      vin: "AB12 CDE",
      registrations: ["AB12 CDE", "XY34 ZAB", "LM56 QRS"],
      cartSummary: "basic x1, standard x1, premium x1",
    });

    expect(result).toMatchObject({ checkoutUrl: "https://whop.com/checkout/ch_test", totalPence: 17700 });
    expect(fetchMock).toHaveBeenCalledTimes(1);
    const request = fetchMock.mock.calls[0]?.[1];
    const body = JSON.parse(String(request?.body));
    expect(body.plan.initial_price).toBe(177);
    expect(body.plan.currency).toBe("gbp");
    expect(body.plan.plan_type).toBe("one_time");
    expect(body.metadata.orderId).toBe("42");
    expect(body.metadata.registrations).toBe("AB12 CDE, XY34 ZAB, LM56 QRS");
  });
});
