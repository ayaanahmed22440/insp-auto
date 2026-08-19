export const SERVICE_TIER_PRICES = {
  basic: "49.00",
  standard: "59.00",
  premium: "79.00",
} as const;

export const SERVICE_TIER_PRICE_VALUES = [
  Number(SERVICE_TIER_PRICES.basic),
  Number(SERVICE_TIER_PRICES.standard),
  Number(SERVICE_TIER_PRICES.premium),
] as const;
