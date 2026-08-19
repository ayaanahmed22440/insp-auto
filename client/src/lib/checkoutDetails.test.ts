import { describe, expect, it } from "vitest";
import { createCheckoutAttemptKey, readSavedCheckoutDetails, writeSavedCheckoutDetails } from "./checkoutDetails";

function memoryStorage() {
  const data = new Map<string, string>();
  return {
    getItem: (key: string) => data.get(key) ?? null,
    setItem: (key: string, value: string) => void data.set(key, value),
  };
}

describe("checkout details", () => {
  it("creates a retry-safe idempotency key", () => {
    expect(createCheckoutAttemptKey()).toEqual(expect.any(String));
    expect(createCheckoutAttemptKey()).not.toBe(createCheckoutAttemptKey());
  });

  it("stores only opted-in contact details and never registration/payment data", () => {
    const storage = memoryStorage();
    writeSavedCheckoutDetails({ firstName: "A", lastName: "B", phone: "07000000000", email: "test@example.com" }, storage);
    expect(readSavedCheckoutDetails(storage)).toEqual({ firstName: "A", lastName: "B", phone: "07000000000", email: "test@example.com" });
    expect(storage.getItem("inspauto-checkout-details")).not.toContain("registration");
    expect(storage.getItem("inspauto-checkout-details")).not.toContain("card");
  });

  it("ignores malformed saved data", () => {
    const storage = { getItem: () => "not-json" };
    expect(readSavedCheckoutDetails(storage)).toBeNull();
  });
});
