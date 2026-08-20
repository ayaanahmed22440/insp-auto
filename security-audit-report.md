# INSP AUTO Read-Only End-to-End Audit Report

**Author:** Manus AI  
**Audit mode:** Read-only; no code, production configuration, database data, credentials, payments, or deployment settings were changed.  
**Scope:** Public website, customer flows, admin boundary, API validation, checkout integration, headers, asset delivery, secrets, mobile source behavior, and source-versus-live consistency.

## Executive summary

The public INSP AUTO site is reachable over HTTPS from both apex and `www`, and all tested public routes return HTTP 200. The visible pricing is consistent at £49 Basic, £59 Standard, and £79 Premium. Unauthenticated admin API access is denied with HTTP 401 JSON, sensitive API responses are marked `no-store`, malformed inputs are rejected with generic HTTP 400 responses, encoded environment/Git paths are blocked, and no private server environment variables were found in the frontend source or generated assets. Hashed assets are served with Brotli compression and immutable caching.

The primary customer-impacting issue is the live Whop integration: the configured server credential currently receives HTTP 403 from Whop, so a valid new combined checkout could not be completed during the audit. The live site also serves an older bundle hash than the latest local checkout-retry checkpoint, so the newest retry-state behavior is not yet proven live. These are deployment/integration findings, not evidence of a frontend secret leak or an authorization bypass. No payment or production record was created during testing.

## Overall score

**8.2 / 10 — strong baseline controls, with checkout availability and deployment freshness still unresolved.**

The score is reduced for the confirmed Whop HTTP 403, the source/live bundle mismatch, the weaker live CSP observed at the Hostinger edge, and the inability to perform a real mobile-device session in the connected browser. It is not reduced for the absence of separate FAQ, blog, or public order-lookup pages because those are scope/product observations rather than security failures.

## Severity summary

| Severity | Finding | Evidence and impact | Fix status |
|---|---|---|---|
| **CRITICAL** | None confirmed | No confirmed remote code execution, secret disclosure, database exposure, admin bypass, payment bypass, or cross-user data exposure was found. | No action proposed during read-only audit. |
| **HIGH** | Whop checkout authorization failure | The server-only Whop credential test and live checkout endpoint receive HTTP 403. The combined checkout cannot reliably create a checkout session for a valid cart. | Requires Whop company/key authorization review; no code change approved. |
| **HIGH** | Live bundle is older than the latest local checkout-retry checkpoint | Live HTML serves `index-IliRa_7z.js`; the latest local checkout-retry work is represented by a later checkpoint and has not been independently verified live. Users may still see the pre-fix one-attempt behavior. | Requires normal deployment/restart; no deployment performed in audit mode. |
| **MEDIUM** | Live CSP is weaker than the source-side policy intent | Apex and `www` expose `Content-Security-Policy: upgrade-insecure-requests`, while the source entrypoint defines a more restrictive policy. This is a defense-in-depth discrepancy; no exploit was demonstrated. | Requires deployment/edge configuration review; no change performed. |
| **MEDIUM** | Live HTTP/3 Alt-Svc remains advertised | Apex and `www` return `Alt-Svc: h3=...` even though the source includes an Alt-Svc mitigation. This may preserve stale protocol associations on some clients, but no current failure was proven from this response alone. | Requires Hostinger/edge verification; no change performed. |
| **LOW** | Mobile device verification incomplete | Responsive CSS, mobile navigation, viewport metadata, IntersectionObserver fallback, and reduced-motion behavior exist, but a real mobile-carrier/device run was not possible in the connected desktop browser. | Validation limitation; no code change proposed. |
| **LOW** | Separate FAQ/blog/order-lookup pages are absent | FAQ copy exists inside Pricing; there is no separate blog or customer-facing order-lookup page component. The order lookup exists as an API route. | Product-scope observation, not a security defect. |

## 1. User journey audit

| Journey | Result | Evidence |
|---|---|---|
| Homepage load | **PASSED** | Live homepage rendered with hero, policy cards, six service cards, pricing, report-information sections, and checkout CTAs. |
| Header navigation | **PASSED** | Home, About Us, Services, Contact Us, Pricing, Company Policies, support email, and Get a Report were visible. Services exposed six vehicle types; Company Policies exposed Terms, Refund, and Privacy. |
| Pricing | **PASSED** | Live page displayed Basic £49.00, Standard £59.00, and Premium £79.00. |
| Service routes | **PASSED** | All six tested service routes returned HTTP 200. |
| Contact form | **PASSED for validation path** | Contact fields and Send Message action rendered. Empty and malformed valid-JSON probes returned generic HTTP 400 validation responses; no valid contact was submitted. |
| Checkout | **BLOCKED** | Invalid carts correctly returned HTTP 400. Valid checkout creation was not completed because Whop returned HTTP 403. No payment was attempted. |
| Admin | **PASSED for unauthenticated boundary** | `/admin` redirected to `/admin/login`; direct `/api/admin/me` and `/api/admin/overview` returned HTTP 401 with no-store. |
| Policy routes | **PASSED** | Terms, Refund Policy, and Privacy Policy returned HTTP 200. |

## 2. Admin security audit

The unauthenticated admin route did not expose dashboard content. Protected API calls returned generic JSON `Unauthorized` responses and `Cache-Control: no-store`. The inspected source includes admin authentication, one-time verification-code handling, secure cookie tests, same-origin checks for cookie-authenticated mutations, rate limiting, audit logs, webhook signature verification, and order/ownership boundaries.

No admin mutation was attempted. The audit therefore confirms the unauthenticated boundary and source controls but does not claim a full authenticated role-separation test. The source-level test suite passed the admin security, cookie, logout, and webhook-signature tests.

## 3. Payment and checkout audit

The browser-side checkout sends cart identifiers and quantities to the server; server-side catalog normalization derives trusted prices and creates one combined checkout configuration. Invalid catalog IDs, missing required details, invalid email, and excessive quantities were rejected with HTTP 400. Idempotency-key handling exists in source and is covered by checkout tests.

The external Whop step is the blocker. The server-only credential test returned HTTP 403 from Whop, and the live checkout failure was observed as “We could not start checkout.” This indicates a Whop company/key authorization or account restriction, not an exposed API key or client-side pricing-tampering issue. The audit intentionally did not submit a valid payment checkout, create a real customer order, or enter card data.

Billing-address/card persistence remains with Whop’s checkout provider. INSP AUTO’s optional saved-details feature is device-only contact-detail memory and does not store card, payment, VIN, or billing-address data in the site database.

## 4. Mobile and reliability audit

The source contains a viewport meta tag, responsive admin and checkout breakpoints, a mobile navigation toggle, reduced-motion handling for skeleton shimmer, and an IntersectionObserver fallback. The public domain serves compressed immutable hashed assets, and apex/www HTML and asset hashes matched during this audit.

A real mobile-device or carrier test could not be performed in the connected desktop browser. Therefore, mobile rendering is **source-supported but not fully device-verified** in this audit. The live source/live deployment mismatch also means the newest checkout retry behavior must be verified after deployment.

## 5. API and input-validation audit

| Test | Result |
|---|---|
| Unauthenticated admin `/api/admin/me` | HTTP 401 JSON, no-store |
| Unauthenticated admin overview | HTTP 401 JSON, no-store |
| Empty contact payload | HTTP 400 generic validation |
| Invalid order lookup | HTTP 404 generic no-match response |
| Invalid combined cart | HTTP 400 generic validation |
| XSS-like and SQLi-like strings in malformed contact/order/checkout inputs | HTTP 400 generic validation; no record created |
| Evil-origin admin probe | No CORS allow-origin response observed |
| Encoded `/.env` and `/.git/HEAD` paths | HTTP 403 |

The initial malformed-input 500 responses were caused by intentionally invalid JSON escape syntax in the probe itself; corrected valid-JSON probes returned the expected HTTP 400 validation responses.

## 6. Secrets and frontend exposure

The frontend source and generated production assets contained only intentional public client configuration references: `VITE_APP_ID`, `VITE_OAUTH_PORTAL_URL`, `VITE_FRONTEND_FORGE_API_KEY`, and `VITE_FRONTEND_FORGE_API_URL`. No database URL, SMTP password, JWT secret, OTP pepper, server Forge key, Whop API key, Whop webhook secret, or admin bootstrap value was found in the frontend source or generated assets.

The optional Whop Pixel is present in the live HTML and uses the user-provided public business scope identifier. It is analytics code, not a payment credential, and does not grant server access.

## 7. Headers, TLS, caching, and delivery

Apex and `www` both returned valid HTTPS HTTP 200 responses with HSTS, `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, and a strict-origin referrer policy. HTML responses were revalidated with `Cache-Control: public, max-age=0`. Hashed CSS and JavaScript returned Brotli compression, `Vary: Accept-Encoding`, and `Cache-Control: public, max-age=31536000, immutable`.

The live Hostinger edge still presents `Alt-Svc` HTTP/3 and a minimal `upgrade-insecure-requests` CSP. These are recorded as deployment/edge discrepancies against the source-side intent, not treated as proven vulnerabilities.

## 8. Passed controls

The following controls passed the read-only audit: no private frontend secret exposure; no confirmed admin bypass; protected admin responses not cached; generic production API errors; same-origin and secure-cookie source controls; parameterized database helpers as inspected; Whop webhook signature and idempotency tests; invalid-cart and price-normalization tests; encoded secret-path blocking; consistent apex/www asset delivery; Brotli compression; immutable hashed caching; HTTPS/HSTS; route availability; and no service-worker registration found in the inspected source.

## 9. Approval-gated next steps

No fixes were applied because the attached instructions require approval after the audit. The highest-priority review item is the Whop HTTP 403: confirm that the server key belongs to the same company ID, has the required checkout-configuration and plan permissions, and that the Whop business account is not restricted. The next operational item is to deploy the latest checkout-retry checkpoint and verify its new bundle hash on both apex and `www`. After that, the mobile flow should be repeated on at least one real iOS/Android device over Wi-Fi and mobile data.

## Audit evidence

The detailed observations are recorded in [audit-live-findings.md](audit-live-findings.md). The source and generated-asset secret scan was previously completed without exposing candidate values. No production data or payment record was created during this audit.
