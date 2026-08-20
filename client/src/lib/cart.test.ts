import { describe, expect, it } from "vitest";
import { addCartItem, cartSubtotal, checkoutReady, removeCartItem, setCartItemQuantity, type CartItem } from "./cart";

const basic: Omit<CartItem, "quantity"> = {
  id: "basic",
  name: "Basic Vehicle Report",
  price: 49,
  href: "https://whop.com/checkout/plan_lW7djcuM5Y5En",
};

describe("checkout cart helpers", () => {
  it("adds duplicate selections as quantity and computes subtotal", () => {
    const once = addCartItem([], basic);
    const twice = addCartItem(once, basic);
    expect(twice[0].quantity).toBe(2);
    expect(cartSubtotal(twice)).toBe(98);
  });

  it("removes an item and removes it when quantity reaches zero", () => {
    const items = addCartItem([], basic);
    expect(removeCartItem(items, "basic")).toEqual([]);
    expect(setCartItemQuantity(items, "basic", 0)).toEqual([]);
  });

  it("requires every billing field and acknowledgment before payment", () => {
    const base = { firstName: "Ayaan", lastName: "Ahmed", phone: "+440000000000", email: "buyer@example.com", registrations: ["AB12CDE"], acknowledgements: [true, true, true] };
    expect(checkoutReady(base)).toBe(true);
    expect(checkoutReady({ ...base, registrations: ["AB12CDE", "XY34ZAB"] })).toBe(true);
    expect(checkoutReady({ ...base, registrations: ["AB12CDE", "", "LM56QRS"] })).toBe(false);
    expect(checkoutReady({ ...base, acknowledgements: [true, true, false] })).toBe(false);
    expect(checkoutReady({ ...base, email: "" })).toBe(false);
  });
});
