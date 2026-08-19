# Whop combined checkout research and live verification

## Official documentation consulted

- https://docs.whop.com/api-reference/beta/quickstart
  - The official quickstart states that a server-side checkout configuration can create a one-time plan with `initial_price`, `currency`, and `plan_type`, and returns a `purchase_url`.
  - It states that `WHOP_API_KEY` must remain server-side and not be placed in browser code or public repositories.
- https://docs.whop.com/developer/api/getting-started
  - The official TypeScript example creates a checkout configuration with `company_id`, a one-time plan, and metadata, then uses the returned plan ID to form a Whop checkout URL.
- https://docs.whop.com/developer/guides/accept-payments
  - The official guide describes checkout configuration as the dynamic-pricing path and shows inline one-time plans with metadata.

## Live deployment verification

- `https://inspauto.com/api/checkout/combined` returned HTTP 400 JSON for an intentionally invalid empty request, confirming the new route is live without creating an order or payment.
- `https://www.inspauto.com/api/checkout/combined` returned the same safe validation behavior.
- The live apex and www checkout route shells returned HTTP 200.
- The live dynamic checkout chunk contained both `/api/checkout/combined` and `Idempotency-Key`.
- No live payment session or production customer/order record was created during verification.
