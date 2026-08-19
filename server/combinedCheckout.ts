export const SERVER_TIER_PRICES = {
  basic: 49,
  standard: 59,
  premium: 79,
} as const;

export type CheckoutTier = keyof typeof SERVER_TIER_PRICES;

export type CombinedCartLine = {
  id: string;
  quantity: number;
};

export type TrustedCartLine = CombinedCartLine & {
  tier: CheckoutTier;
  amountPence: number;
};

const LEGITIMATE_CART_ID = /^(?:(basic|standard|premium)(?:-(?:car|motorbike|atv|truck|boat|rv))?|(?:car|motorbike|atv|truck|boat|rv)-history-report-(basic|standard|premium))$/;

export function getTierFromCartId(id: string): CheckoutTier | null {
  const match = LEGITIMATE_CART_ID.exec(id);
  if (!match) return null;
  return (match[1] || match[2]) as CheckoutTier;
}

export function normalizeCombinedCart(input: unknown): TrustedCartLine[] | null {
  if (!Array.isArray(input) || input.length === 0 || input.length > 50) return null;
  const lines: TrustedCartLine[] = [];
  for (const rawLine of input) {
    if (!rawLine || typeof rawLine !== "object") return null;
    const line = rawLine as Record<string, unknown>;
    const id = typeof line.id === "string" ? line.id.trim().toLowerCase() : "";
    const quantity = Number(line.quantity);
    const tier = getTierFromCartId(id);
    if (!tier || !Number.isInteger(quantity) || quantity < 1 || quantity > 10) return null;
    lines.push({ id, quantity, tier, amountPence: SERVER_TIER_PRICES[tier] * 100 * quantity });
  }
  return lines;
}

export function combinedCartTotalPence(lines: TrustedCartLine[]) {
  return lines.reduce((total, line) => total + line.amountPence, 0);
}

export function combinedCartSummary(lines: TrustedCartLine[]) {
  return lines.map(line => `${line.id} x${line.quantity}`).join(", ").slice(0, 900);
}

export async function createWhopCombinedCheckout(input: {
  totalPence: number;
  orderId: number;
  customerName: string;
  deliveryEmail: string;
  vin: string;
  cartSummary: string;
}) {
  const apiKey = process.env.WHOP_API_KEY;
  const companyId = process.env.WHOP_COMPANY_ID;
  if (!apiKey || !companyId) throw new Error("Whop checkout configuration is missing");
  if (!Number.isInteger(input.totalPence) || input.totalPence <= 0) throw new Error("Invalid combined checkout amount");

  const response = await fetch("https://api.whop.com/api/v1/checkout_configurations", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "Api-Version-Date": "2026-08-13",
    },
    body: JSON.stringify({
      currency: "gbp",
      plan: {
        title: `INSP AUTO order ${input.orderId}`,
        initial_price: input.totalPence / 100,
        plan_type: "one_time",
        company_id: companyId,
        currency: "gbp",
      },
      metadata: {
        orderId: String(input.orderId),
        customerName: input.customerName.slice(0, 120),
        deliveryEmail: input.deliveryEmail.slice(0, 320),
        vin: input.vin.slice(0, 64),
        amountPence: String(input.totalPence),
        cartSummary: input.cartSummary,
      },
    }),
  });

  if (!response.ok) {
    throw new Error(`Whop checkout request failed with status ${response.status}`);
  }
  const payload = (await response.json()) as Record<string, unknown>;
  const purchaseUrl = typeof payload.purchase_url === "string" ? payload.purchase_url : "";
  const plan = typeof payload.plan === "object" && payload.plan !== null ? (payload.plan as Record<string, unknown>) : null;
  const planId = plan && typeof plan.id === "string" ? plan.id : "";
  const checkoutUrl = purchaseUrl || (planId ? `https://whop.com/checkout/${encodeURIComponent(planId)}` : "");
  if (!checkoutUrl || !/^https:\/\/whop\.com\/checkout\//.test(checkoutUrl)) {
    throw new Error("Whop checkout response did not contain a valid purchase URL");
  }
  return { checkoutUrl, planId, totalPence: input.totalPence };
}
