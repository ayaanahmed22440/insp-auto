# INSP AUTO update checklist

- [x] Add the reference-style policy cards with complete internal links.
- [x] Add the Other Services rail with working service links.
- [x] Add the expanded welcome/company section with original INSP AUTO wording and useful information.
- [x] Add an original two-image automotive detail strip and honest informational counters without fabricated customer claims.
- [x] Refine the six service cards with distinct original visual assets, descriptions, and working detail links.
- [x] Verify all new links, responsive layouts, build output, and mobile behavior.
- [ ] Save and deliver an updated checkpoint.

## Policy card reference update

- [x] Restyle the two policy cards to match the supplied reference layout.
- [x] Add complete INSP AUTO terms and refund bullet content with working links.
- [x] Verify desktop and mobile card spacing, contrast, and button behavior.
- [ ] Save and deliver the updated checkpoint.

## Services and Pricing reference update

- [ ] Restyle the six Services cards to match the supplied compact reference layout.
- [ ] Add a dark affordability banner between Services and Pricing.
- [ ] Add six compact pricing cards with the supplied UK pricing presentation and working checkout links.
- [ ] Verify desktop/mobile layout and all pricing-button destinations.
- [ ] Save and deliver the updated checkpoint.

## Distinct service imagery update

- [ ] Generate distinct visible images for Car, Motorbike, ATV, Truck, Boat, and RV service cards.
- [ ] Replace repeated image URLs in the service-card data.
- [ ] Verify image crops, contrast, and card visibility on desktop and mobile.
- [ ] Save and deliver the updated checkpoint.

## Supplied logo rebrand

- [ ] Add the supplied logo as the primary header and footer mark without a text wordmark.
- [ ] Replace amber-focused global colors with electric blue and deep navy brand colors.
- [ ] Update buttons, links, dividers, badges, icons, and policy accents to the new palette.
- [ ] Verify logo visibility and contrast on desktop and mobile.
- [ ] Save and deliver the updated checkpoint.

## Footer logo visibility fix

- [ ] Apply a visible footer-safe logo treatment on the dark background.
- [ ] Verify footer logo contrast, size, spacing, and mobile behavior.
- [ ] Save and deliver the updated checkpoint.

## Hero cleanup

- [ ] Remove the hero evidence stamp from the vehicle image.
- [ ] Remove the bottom hero metadata strip.
- [ ] Verify the simplified hero at desktop and mobile sizes.
- [ ] Save and deliver the updated checkpoint.

## New attached brief

- [x] Read and extract the requested website changes from pasted_content_3.txt.
- [x] Implement the requested changes without breaking existing routes or branding.
- [x] Verify the updated website and save the next checkpoint.

## Stale preview repair

- [ ] Refresh the managed preview service so it no longer uses old pnpm-linked modules.
- [ ] Verify preview loads without the missing-module overlay.
- [ ] Recheck npm build/start and required routes.
- [ ] Save and deliver the repaired checkpoint.

## Final npm-only deployment delivery

- [x] Keep the repository npm-only; do not reintroduce pnpm preview configuration.
- [x] Record exact Hostinger settings and the managed-preview limitation.
- [x] Reconfirm production commands and routes.
- [ ] Save and deliver the final deployment checkpoint.

## Analytics build compatibility

- [x] Inspect the analytics script references in client/index.html.
- [x] Remove or safely gate undefined analytics variables without changing the website UI.
- [x] Run npm install, npm run build, npm start, and production-load verification.
- [ ] Save and deliver the updated checkpoint.

## Local production assets

- [x] Find every `/manus-storage/` reference and identify the source asset.
- [x] Copy each required production asset into repository-owned public assets.
- [x] Update all production references to `/assets/...` paths.
- [x] Run npm install, npm run build, npm start, and verify the hero asset loads.
- [ ] Save and deliver the updated checkpoint.

## Checkpoint-safe asset optimization

- [x] Optimize oversized local production images below 1 MB each while preserving their filenames and visual role.
- [x] Re-run npm install, npm run build, npm start, and local asset-load checks.
- [ ] Retry and save the optimized asset checkpoint.

## Premium pricing page

- [x] Create the dedicated `/pricing` route with exactly three UK pricing plans and exact Whop redirects.
- [x] Add trust, comparison, process, FAQ, final CTA, responsive layout, and pricing SEO metadata.
- [x] Run TypeScript, npm build, npm start, route, bundle-content, and payment-link checks.
- [ ] Save and deliver the updated checkpoint.

## ATV reference flow and Pricing navigation

- [x] Recreate the supplied ATV service-page hero, sidebar, company block, pricing cards, and final CTA flow.
- [x] Add the existing `/pricing` route to desktop and mobile navigation without duplicating the pricing page.
- [x] Run npm run build and verify existing routes, payment links, and deployment configuration remain unchanged.
- [ ] Save and deliver the focused UI update checkpoint.

## Secure Hostinger SMTP contact form

- [x] Add a server-side form endpoint that reads SMTP settings only from environment variables.
- [x] Update the contact form to submit to the endpoint and show success/error states.
- [x] Add the required mail dependency without changing the npm/Node deployment architecture.
- [x] Verify build, runtime endpoint behavior, and absence of secrets in source.
- [ ] Save and deliver the secure email integration checkpoint.

## Contact form reset error

- [x] Capture the form element before the async request and reset it safely after success.
- [x] Run typecheck, build, runtime endpoint, and form behavior checks.
- [ ] Save and deliver the bug-fix checkpoint.

## Mobile policy navigation fix

- [x] Show Terms & Conditions, Refund Policy, and Privacy Policy as separate mobile navigation items.
- [x] Verify each item routes to the existing policy page and remains visible on mobile.
- [ ] Save and deliver the navigation fix checkpoint.

## New attached brief

- [ ] Read and extract the requirements from pasted_content_5.txt.
- [ ] Implement the requested changes without altering unrelated functionality.
- [ ] Run the required checks and save the updated checkpoint.

## Secure admin panel foundation

- [ ] Add persistent admin credentials, OTP challenges, hashed sessions, contacts, orders, webhook events, and audit logs to the database schema.
- [ ] Apply and verify the database migration without inserting demo or customer data.
- [ ] Add server-side admin email/password plus OTP authentication with rate limits, expiry, single-use challenges, secure cookies, and logout/revocation.
- [ ] Add public contact persistence and notification handling with non-fatal email failure behavior.
- [ ] Add server-enforced admin procedures for dashboard metrics, contacts, orders, audit logs, and secure webhook processing.
- [ ] Build the private responsive admin dashboard using the existing DashboardLayout with real database data, loading states, empty states, and accessible errors.
- [ ] Add automated security and behavior tests for authentication, authorization, contact persistence, webhook idempotency, ownership, XSS-safe rendering, and rate limiting.
- [ ] Run typecheck, lint, tests, build, and authenticated/unauthenticated smoke tests.
- [ ] Save and deliver the secure admin-panel checkpoint.

## Inherited secure admin panel completion

- [x] Add persistent admin credentials, OTP challenges, hashed sessions, contacts, orders, webhook events, and audit logs to the database schema.
- [x] Add the server-side admin email/password plus six-digit email OTP flow with expiry, single-use challenges, secure cookies, logout, and revocation.
- [x] Add public contact persistence, strict input validation, notification handling, and non-fatal SMTP failure behavior.
- [x] Add server-enforced admin routes for overview metrics, contacts, orders, audit logs, and Whop webhook processing with signature verification and idempotency.
- [x] Build the private responsive admin dashboard with login, OTP verification, overview, contacts, orders, and audit-log views.
- [x] Add automated secret-safety and session behavior tests.
- [x] Run TypeScript validation, npm production build, Vitest, production route smoke tests, invalid-contact validation, and unauthenticated-admin authorization checks.
- [x] Apply and verify the database migration on the connected production database.
- [ ] Complete one real mailbox OTP login verification against the Hostinger deployment.
- [ ] Save and deliver the secure admin-panel checkpoint.
