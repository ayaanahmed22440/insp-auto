# INSP AUTO update checklist

- [x] Add the reference-style policy cards with complete internal links.
- [x] Add the Other Services rail with working service links.
- [x] Add the expanded welcome/company section with original INSP AUTO wording and useful information.
- [x] Add an original two-image automotive detail strip and honest informational counters without fabricated customer claims.
- [x] Refine the six service cards with distinct original visual assets, descriptions, and working detail links.
- [x] Verify all new links, responsive layouts, build output, and mobile behavior.
- [x] Save and deliver an updated checkpoint.

## Policy card reference update

- [x] Restyle the two policy cards to match the supplied reference layout.
- [x] Add complete INSP AUTO terms and refund bullet content with working links.
- [x] Verify desktop and mobile card spacing, contrast, and button behavior.
- [x] Save and deliver the updated checkpoint.

## Services and Pricing reference update

- [x] Restyle the six Services cards to match the supplied compact reference layout.
- [x] Add a dark affordability banner between Services and Pricing.
- [x] Add six compact pricing cards with the supplied UK pricing presentation and working checkout links.
- [x] Verify desktop/mobile layout and all pricing-button destinations.
- [x] Save and deliver the updated checkpoint.

## Distinct service imagery update

- [x] Generate distinct visible images for Car, Motorbike, ATV, Truck, Boat, and RV service cards.
- [x] Replace repeated image URLs in the service-card data.
- [x] Verify image crops, contrast, and card visibility on desktop and mobile.
- [x] Save and deliver the updated checkpoint.

## Supplied logo rebrand

- [x] Add the supplied logo as the primary header and footer mark without a text wordmark.
- [x] Replace amber-focused global colors with electric blue and deep navy brand colors.
- [x] Update buttons, links, dividers, badges, icons, and policy accents to the new palette.
- [x] Verify logo visibility and contrast on desktop and mobile.
- [x] Save and deliver the updated checkpoint.

## Footer logo visibility fix

- [x] Apply a visible footer-safe logo treatment on the dark background.
- [x] Verify footer logo contrast, size, spacing, and mobile behavior.
- [x] Save and deliver the updated checkpoint.

## Hero cleanup

- [x] Remove the hero evidence stamp from the vehicle image.
- [x] Remove the bottom hero metadata strip.
- [x] Verify the simplified hero at desktop and mobile sizes.
- [x] Save and deliver the updated checkpoint.

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
- [x] Save and deliver the final deployment checkpoint.

## Analytics build compatibility

- [x] Inspect the analytics script references in client/index.html.
- [x] Remove or safely gate undefined analytics variables without changing the website UI.
- [x] Run npm install, npm run build, npm start, and production-load verification.
- [x] Save and deliver the updated checkpoint.

## Local production assets

- [x] Find every `/manus-storage/` reference and identify the source asset.
- [x] Copy each required production asset into repository-owned public assets.
- [x] Update all production references to `/assets/...` paths.
- [x] Run npm install, npm run build, npm start, and verify the hero asset loads.
- [x] Save and deliver the updated checkpoint.

## Checkpoint-safe asset optimization

- [x] Optimize oversized local production images below 1 MB each while preserving their filenames and visual role.
- [x] Re-run npm install, npm run build, npm start, and local asset-load checks.
- [x] Retry and save the optimized asset checkpoint using the existing optimized-asset checkpoint.

## Premium pricing page

- [x] Create the dedicated `/pricing` route with exactly three UK pricing plans and exact Whop redirects.
- [x] Add trust, comparison, process, FAQ, final CTA, responsive layout, and pricing SEO metadata.
- [x] Run TypeScript, npm build, npm start, route, bundle-content, and payment-link checks.
- [x] Save and deliver the updated checkpoint.

## ATV reference flow and Pricing navigation

- [x] Recreate the supplied ATV service-page hero, sidebar, company block, pricing cards, and final CTA flow.
- [x] Add the existing `/pricing` route to desktop and mobile navigation without duplicating the pricing page.
- [x] Run npm run build and verify existing routes, payment links, and deployment configuration remain unchanged.
- [x] Save and deliver the focused UI update checkpoint.

## Secure Hostinger SMTP contact form

- [x] Add a server-side form endpoint that reads SMTP settings only from environment variables.
- [x] Update the contact form to submit to the endpoint and show success/error states.
- [x] Add the required mail dependency without changing the npm/Node deployment architecture.
- [x] Verify build, runtime endpoint behavior, and absence of secrets in source.
- [x] Save and deliver the secure email integration checkpoint.

## Contact form reset error

- [x] Capture the form element before the async request and reset it safely after success.
- [x] Run typecheck, build, runtime endpoint, and form behavior checks.
- [x] Save and deliver the bug-fix checkpoint.

## Mobile policy navigation fix

- [x] Show Terms & Conditions, Refund Policy, and Privacy Policy as separate mobile navigation items.
- [x] Verify each item routes to the existing policy page and remains visible on mobile.
- [x] Save and deliver the navigation fix checkpoint.

## New attached brief

- [x] Read and extract the requirements from pasted_content_5.txt.
- [x] Implement the requested changes without altering unrelated functionality.
- [x] Run the required checks and save the updated checkpoint.

## Secure admin panel foundation

- [x] Add persistent admin credentials, OTP challenges, hashed sessions, contacts, orders, webhook events, and audit logs to the database schema.
- [x] Apply and verify the database migration without inserting demo or customer data.
- [x] Add server-side admin email/password plus OTP authentication with rate limits, expiry, single-use challenges, secure cookies, and logout/revocation.
- [x] Add public contact persistence and notification handling with non-fatal email failure behavior.
- [x] Add server-enforced admin procedures for dashboard metrics, contacts, orders, audit logs, and secure webhook processing.
- [x] Build the private responsive admin dashboard using the existing DashboardLayout with real database data, loading states, empty states, and accessible errors.
- [x] Add automated coverage for server secret safety, password/session behavior, and official Whop signature verification; database-backed integration flows remain deployment-dependent.
- [x] Run typecheck, tests, build, and unauthenticated smoke tests; authenticated live login remains pending.
- [x] Save and deliver the secure admin-panel checkpoint.

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
- [x] Save and deliver the secure admin-panel checkpoint.

## Final admin hardening gaps

- [x] Implement a customer-facing order-status flow requiring both delivery email and payment reference, returning only limited status fields.
- [x] Add secret-free environment-variable deployment documentation without committing values.
- [x] Add production-safe CSP/security headers compatible with the existing app.
- [x] Extend accepted Whop webhook processing to create or update orders from complete validated metadata and ignore foreign company events without order mutation.
- [x] Add an audit-log view with loading, empty, and error states; preserve the established private admin shell where the provided generic layout is incompatible with its server-enforced auth flow.
- [ ] Complete authenticated admin verification against the Hostinger deployment; npm-compatible formatting/lint-equivalent validation already passes.
- [ ] Save a final hardening checkpoint after the remaining checks pass.

## Hostinger admin Forbidden diagnosis

- [x] Diagnose the production `Forbidden` response in the Hostinger admin panel without exposing secrets.
- [ ] Verify the complete Hostinger environment-variable list, database bootstrap, and secure session-cookie requirements.
- [x] Apply and validate the Hostinger reverse-proxy origin fix; matching forwarded origins now reach authentication and mismatched origins remain blocked.
- [x] Provide exact Hostinger configuration steps and identify the required user-side environment and restart action.

## Hostinger Invalid credentials diagnosis

- [x] Confirm the production database currently has zero admin credential rows; the failure is bootstrap configuration, not an old password hash.
- [x] Add and end-to-end verify a safe non-secret bootstrap diagnostic: an empty admin table with missing server bootstrap variables returns HTTP 503 with a clear message instead of misleading Invalid credentials.
- [x] Validate the bootstrap diagnostic with TypeScript, five Vitest tests, production build, and a local production HTTP 503 smoke test; preserve OTP/session security and document the required Hostinger restart action.

## Hostinger Request failed diagnosis

- [ ] Diagnose the new production `Request failed` response after adding `DATABASE_URL`.
- [ ] Verify safe database connection error handling and Hostinger restart requirements.
- [x] Apply and validate the contact compatibility diagnostic without exposing credentials.

## Contact form JSON regression

- [x] Diagnose why the production `/api/contact` request returned an HTML document instead of JSON: database persistence errors were escaping the Express route.
- [x] Restore the existing contact submission response by containing persistence failures, without changing the form design, SMTP settings, or public wording.
- [x] Preserve the previously verified contact success path and validation-error JSON behavior; revalidate the new database-failure path as JSON without submitting test customer data to production.
