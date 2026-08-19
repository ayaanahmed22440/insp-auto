export const SERVICE_TIER_PRICES = {
  basic: "39.99",
  standard: "42.99",
  premium: "52.99",
} as const;

export const SERVICE_TIER_PRICE_VALUES = [
  Number(SERVICE_TIER_PRICES.basic),
  Number(SERVICE_TIER_PRICES.standard),
  Number(SERVICE_TIER_PRICES.premium),
] as const;
