# INSP AUTO Read-Only Live Audit Findings

## Homepage and navigation

The live homepage at https://inspauto.com/ returned HTTP content and rendered the INSP AUTO header, hero, policy cards, service cards, pricing cards, company content, report-information sections, process steps, and final CTA. The header exposed Home, About Us, Services, Contact Us, Pricing, Company Policies, support email, and Get a Report. Opening Services showed six service links: Car, Motorbike, ATV, Truck, Boat, and RV. Opening Company Policies showed Terms & Conditions, Refund Policy, and Privacy Policy.

## Visible customer-facing observations

The homepage states that Basic reports cost £49.00 and that Standard/Premium are available from the full pricing page. It describes third-party checkout, report limitations, and support contact information. No fabricated customer counts or testimonials were visible in the extracted live content.

## Audit constraints

This is a read-only audit. No production data, payment, credentials, configuration, or source code was modified during these live checks. Further findings must be appended after safe route, form, API, header, mobile, and authorization checks.

## Pricing and Contact pages

The live `/pricing` page displayed exactly three plans: Basic £49.00, Standard £59.00, and Premium £79.00. It described Whop as the payment provider and exposed FAQ/contact CTA content. The live `/contact` page loaded a support form with Name, Email, VIN/Registration, Order Number, Subject, and Message fields, plus the support email. No form was submitted during this observation.

## Contact form interaction

The live contact form exposes a visible `Send Message` button. The browser’s empty-form path was located without entering or submitting customer data; no destructive or persistent action was performed. The form is suitable for a safe required-field validation test, while valid-message submission remains excluded from the read-only audit unless needed with clearly synthetic data and user approval.

## Admin access boundary

Opening `https://inspauto.com/admin` in the unauthenticated browser redirected to `https://inspauto.com/admin/login`. No dashboard data or customer records were exposed in the unauthenticated page extraction. Direct unauthenticated API probes separately returned HTTP 401 JSON for `/api/admin/me` and `/api/admin/overview` with `Cache-Control: no-store`.

## Production HTTP and API observations

Apex and `www` both returned HTTP 200 over HTTPS with HSTS, `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, and `Referrer-Policy: strict-origin-when-cross-origin`. Both currently expose `Content-Security-Policy: upgrade-insecure-requests` and an `Alt-Svc` HTTP/3 advertisement at the Hostinger edge; this differs from the latest source-side CSP/Alt-Svc intent and is a code-vs-live deployment finding, not yet a confirmed exploit.

Unauthenticated `/api/admin/me` and `/api/admin/overview` returned HTTP 401 JSON with `Cache-Control: no-store`. Empty `/api/contact` returned HTTP 400 JSON. A fabricated order lookup returned HTTP 404 with a generic no-match message. An invalid combined-checkout cart returned HTTP 400 JSON. No CORS allow-origin header was returned for an evil origin probe.

Encoded requests for `/.env` and `/.git/HEAD` returned HTTP 403. `/backup` and `/config` returned the normal SPA HTML shell rather than a backup/config file, so those paths are not confirmed exposures.

The live homepage currently contains the Whop Pixel script, and the live entry asset hashes differ from the latest local checkpoint, so production is not yet running the most recent checkout-retry source changes.

## Public route status audit

The six service routes (`car-history-report`, `motorbike-history-report`, `atv-history-report`, `truck-history-report`, `boat-history-report`, and `rv-history-report`) returned HTTP 200. `/terms`, `/refund-policy`, `/privacy-policy`, `/pricing`, `/contact`, `/checkout`, and the `/admin` route shell also returned HTTP 200 over HTTPS. `/admin` then redirected at the application level to `/admin/login` when opened in the browser.

## Automated audit test result

The read-only Vitest run completed with 18 of 19 tests passing. The server-only Whop credential test failed because the configured Whop company endpoint returned HTTP 403. The other authentication, cookie, webhook-signature, cart, checkout-normalization, retry-detail, and pricing tests passed. This is a confirmed live integration/authorization failure, not a frontend validation issue; no payment was created.

## Source-vs-requested page inventory

The page-component inventory contains `Home`, `Pricing`, `Checkout`, `VehicleServicePage`, `Admin`, `NotFound`, and a component showcase. There is no separate public FAQ page, blog/content page, or customer-facing order-lookup page component. FAQ copy appears inside Pricing, and order lookup exists as an API route rather than a dedicated public page. This is a product-scope observation, not a security vulnerability.

The only source `dangerouslySetInnerHTML` use is the shadcn chart component’s generated static CSS variables from chart configuration; no user-controlled HTML sink was found in the inspected source.

## Safe malformed-input probes

With valid JSON encoding, contact input containing a harmless script string, SQLi-like text, invalid email, quote characters, and Unicode returned HTTP 400 with a generic required-fields message. Order-status input with an invalid email and SQLi-like payment reference returned HTTP 400 with a generic validation message. Combined checkout input with script/SQLi-like strings, invalid email, empty phone, and quantity 999 returned HTTP 400 with a generic required-details message. No payment, order, contact, or customer record was created by these probes.

## Live asset delivery

The current live hashed CSS and JavaScript assets returned HTTP 200 with `Content-Encoding: br`, `Vary: Accept-Encoding`, and `Cache-Control: public, max-age=31536000, immutable`. This meets the expected compressed immutable asset-delivery policy. The live entry bundle is still an older hash than the latest local checkout-retry checkpoint, so this audit distinguishes delivery quality from deployment freshness.

## Mobile source audit

The frontend declares a viewport meta tag. Source CSS includes responsive admin breakpoints at 900px and 560px, checkout layout changes at 760px, and reduced-motion handling for admin skeleton shimmer. The application includes a mobile navigation toggle and service submenu. The homepage has an `IntersectionObserver` fallback that marks reveal elements visible when the API is unavailable. A real mobile-carrier/device run was not possible in the connected desktop browser, so mobile behavior is assessed from source plus desktop live delivery rather than marked as fully device-verified.
