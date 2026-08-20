export type CartItem = {
  id: string;
  name: string;
  price: number;
  href: string;
  quantity: number;
};

export function addCartItem(items: CartItem[], item: Omit<CartItem, "quantity">) {
  const existing = items.find(current => current.id === item.id);
  if (existing) {
    return items.map(current =>
      current.id === item.id
        ? { ...current, quantity: current.quantity + 1 }
        : current
    );
  }
  return [...items, { ...item, quantity: 1 }];
}

export function removeCartItem(items: CartItem[], id: string) {
  return items.filter(item => item.id !== id);
}

export function setCartItemQuantity(items: CartItem[], id: string, quantity: number) {
  if (quantity < 1) return removeCartItem(items, id);
  return items.map(item => (item.id === id ? { ...item, quantity } : item));
}

export function cartSubtotal(items: CartItem[]) {
  return items.reduce((total, item) => total + item.price * item.quantity, 0);
}

export function formatPounds(value: number) {
  return `£${value.toFixed(2)}`;
}

export function loadCart() {
  if (typeof window === "undefined") return [] as CartItem[];
  try {
    const parsed = JSON.parse(window.localStorage.getItem("insp-auto-cart") || "[]");
    return Array.isArray(parsed) ? (parsed as CartItem[]) : [];
  } catch {
    return [] as CartItem[];
  }
}

export function checkoutReady(input: { firstName: string; lastName: string; phone: string; email: string; registrations: string[]; acknowledgements: boolean[] }) {
  return Boolean(
    input.firstName.trim() &&
      input.lastName.trim() &&
      input.phone.trim() &&
      input.email.trim() &&
      input.registrations.length > 0 &&
      input.registrations.every(registration => registration.trim()) &&
      input.acknowledgements.length === 3 &&
      input.acknowledgements.every(Boolean)
  );
}

export function saveCart(items: CartItem[]) {
  if (typeof window !== "undefined") {
    window.localStorage.setItem("insp-auto-cart", JSON.stringify(items));
  }
}
