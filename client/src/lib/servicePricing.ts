export const SERVICE_TIER_PRICES = {
  basic: "26.99",
  standard: "37.99",
  premium: "68.99",
} as const;

export const SERVICE_TIER_PRICE_VALUES = [
  Number(SERVICE_TIER_PRICES.basic),
  Number(SERVICE_TIER_PRICES.standard),
  Number(SERVICE_TIER_PRICES.premium),
] as const;
