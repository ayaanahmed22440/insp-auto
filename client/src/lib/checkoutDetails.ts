export type SavedCheckoutDetails = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
};

const STORAGE_KEY = "inspauto-checkout-details";

export function createCheckoutAttemptKey() {
  return typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export function readSavedCheckoutDetails(storage?: Pick<Storage, "getItem">): SavedCheckoutDetails | null {
  try {
    const source = storage || (typeof localStorage !== "undefined" ? localStorage : undefined);
    const stored = source?.getItem(STORAGE_KEY);
    if (!stored) return null;
    const details = JSON.parse(stored) as Partial<SavedCheckoutDetails>;
    if (![details.firstName, details.lastName, details.phone, details.email].every(value => typeof value === "string")) return null;
    return {
      firstName: details.firstName || "",
      lastName: details.lastName || "",
      phone: details.phone || "",
      email: details.email || "",
    };
  } catch {
    return null;
  }
}

export function writeSavedCheckoutDetails(details: SavedCheckoutDetails, storage?: Pick<Storage, "setItem">) {
  try {
    const target = storage || (typeof localStorage !== "undefined" ? localStorage : undefined);
    target?.setItem(STORAGE_KEY, JSON.stringify(details));
  } catch {
    // Private browsing and storage limits must not block checkout.
  }
}

export function clearSavedCheckoutDetails(storage?: Pick<Storage, "removeItem">) {
  try {
    const target = storage || (typeof localStorage !== "undefined" ? localStorage : undefined);
    target?.removeItem(STORAGE_KEY);
  } catch {
    // Ignore unavailable device-only storage.
  }
}
