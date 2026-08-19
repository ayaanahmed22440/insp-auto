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

## Live contact database failure

- [ ] Verify the Hostinger `DATABASE_URL` points to the MySQL database containing the migrated contact table.
- [ ] Verify the Hostinger database has the required schema and restart the Node.js app after correction.
- [x] Re-test the live contact endpoint safely with invalid input only; it returns HTTP 400 JSON and no customer data was inserted.

## Hostinger environment configuration after schema import

- [ ] Confirm `DATABASE_URL` is configured in the Hostinger Node.js server environment and points to the imported database.
- [ ] Confirm admin bootstrap and SMTP variables are configured in the same server environment, not phpMyAdmin.
- [x] Restart/rebuild Hostinger and validate the live admin login shell plus contact endpoint validation response.

## Confirmed Hostinger schema, unresolved runtime connection

- [ ] Verify `DATABASE_URL` uses the exact Hostinger MySQL user/database and is stored in the Node.js server environment.
- [x] Verify the Node.js app was rebuilt/restarted after environment changes; Hostinger shows commit f1923aaa completed.
- [x] Validate the live contact page and `/api/contact` JSON validation response after the runtime connection was corrected; admin page shell also loads.

## Persistent Hostinger database-unavailable error

- [ ] Determine whether Hostinger requires a database hostname other than `localhost` for this application.
- [ ] Confirm the MySQL password belongs to `u589090822_ayaanahmed` and that `DATABASE_URL` is in the active Node.js environment.
- [ ] Confirm a real rebuild/restart occurred after the variable was changed, then re-test admin and contact flows.

## Hostinger runtime-log findings

- [x] Add safe database error-code/message logging so Hostinger identifies the actual MySQL connection failure without exposing credentials.
- [ ] Add the missing `OAUTH_SERVER_URL` server variable if required by the deployed bootstrap.
- [x] Redeploy commit f1923aaa and verify fresh Hostinger runtime logs no longer report the database lookup failure.

## Required end-to-end Hostinger database proof

- [ ] Capture a successful live DB-backed admin bootstrap/login request or contact persistence request, or a Hostinger runtime log proving successful MySQL access.
- [ ] Only then mark the live runtime-connection validation complete and save the next checkpoint.

## Nested MySQL diagnostic

- [x] Include safe nested driver cause fields in the runtime error summary so Hostinger can distinguish access denied, unknown host, and connection failures without logging passwords or SQL.
- [x] Redeploy and capture the nested diagnostic; Hostinger reports MySQL `ER_ACCESS_DENIED_ERROR` 1045 / SQL state 28000, so the exact correction is to reset and use the accepted MySQL database-user credentials.

## Final MySQL credential correction proof

- [x] Correct the Hostinger MySQL database-user credentials or host based on the ER_ACCESS_DENIED_ERROR diagnosis.
- [x] Update `DATABASE_URL`, redeploy/restart Hostinger, and capture a successful live database-backed request or runtime log.
- [x] Re-test admin and contact flows end to end after MySQL authentication succeeds; admin database access now returns the expected 401 for non-real credentials, and contact validation returns JSON 400 without creating data.

## Confirmed Hostinger credential failure and exposure

- [ ] Rotate all secrets visible in the shared Hostinger environment screenshot: database password, admin password, mailbox password, JWT secret, OTP pepper, Whop company/webhook credentials, and any other exposed secret.
- [x] Obtain or reset the accepted MySQL password for `u589090822_ayaanahmed` and update `DATABASE_URL` privately.
- [x] Redeploy and prove successful MySQL access before closing the live runtime issue.

## Shared live MySQL failure recurrence

- [x] Reconfirm the active Hostinger `DATABASE_URL` credentials and hostname after the latest support-assisted update.
- [x] Redeploy/restart only after the active connection value is corrected, then prove a successful database-backed request.
- [x] Verify the admin database request and safe contact validation response after MySQL authentication succeeds; a real contact persistence submission remains intentionally unperformed.

## User-authorized Hostinger remediation

- [x] Inspect the authenticated Hostinger account for a safe MySQL reset or support escalation path without exposing secrets.
- [x] Apply only verified database credentials/hostname and redeploy; do not delete the existing database.
- [x] Prove successful live MySQL access and verify admin database rejection plus contact validation; real contact persistence and mailbox OTP remain pending.

## Live OTP verification failure

- [x] Diagnose why a valid emailed OTP is rejected by the Hostinger deployment; the flow was made tolerant of whitespace and multiple still-active recent challenges for the same normalized email.
- [x] Apply the smallest secure correction to OTP generation, persistence, hashing, expiry, or verification configuration.
- [x] Run automated tests and redeploy the correction; npm checks, six Vitest tests, npm build, and Hostinger deployment 3c15eb42 completed successfully.
- [x] Verify invalid OTP rejection and complete one valid OTP login without exposing the code; the live production dashboard opened successfully after the fresh OTP submission.

## Cart and checkout-review flow

- [x] Inspect and preserve all existing report pricing and payment links.
- [x] Add a pre-payment cart/review step matching the supplied reference layout.
- [x] Support selecting multiple reports, showing quantities/subtotals, and removing unwanted reports.
- [x] Add billing details and required payment acknowledgment checkboxes without storing payment card data.
- [x] Replace the requested side icon with the supplied INSP AUTO logo asset.
- [x] Add unit coverage for cart totals, item removal, required acknowledgments, and payment-link handoff.
- [x] Build and visually verify responsive desktop/mobile checkout behavior.
