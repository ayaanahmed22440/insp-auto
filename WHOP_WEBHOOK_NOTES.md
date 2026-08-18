# Whop webhook verification notes

Sources consulted on 2026-08-19:

- https://docs.whop.com/developer/guides/webhooks
- https://docs.whop.com/developer/guides/accept-payments
- https://docs.whop.com/api-reference/payments/payment-succeeded

The official Whop Standard Webhooks envelope uses `webhook-id`, `webhook-timestamp`, and `webhook-signature` headers. The JSON envelope contains an `id`, `type`, `api_version`, `api_version_date`, `timestamp`, `company_id`, and `data` object. Payment events include `payment.succeeded` and `payment.failed`; the payment object is under `data`.

The official unsigned verification rule is to compute HMAC-SHA256 over `{webhook-id}.{webhook-timestamp}.{raw body}` and compare the base64 result with the `v1,<signature>` value using a constant-time comparison. Reject timestamps more than five minutes from the current time. Whop can deliver events more than once and delivery order is not guaranteed, so the implementation stores the webhook ID and ignores duplicates.

The official payment guide shows checkout metadata can carry a merchant order identifier such as `order_id`; the implementation accepts complete validated metadata only and does not create partial order rows.
