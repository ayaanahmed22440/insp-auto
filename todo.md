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

- [x] Refresh the managed preview service; restart was attempted and the service still reverts to its platform-managed pnpm dependency check.
- [x] Verify preview status; the managed preview remains unavailable because its infrastructure forces pnpm, while the npm-only production build/start and Hostinger deployment remain healthy.
- [x] Recheck npm build/start and required routes; npm typecheck, 9 Vitest tests, npm build, checkout/pricing/logo smoke checks, and interactive cart tests pass.
- [x] Save and deliver the repaired checkpoint; checkpoint 55c50d4b was saved and delivered.

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
- [x] Complete one real mailbox OTP login verification against the Hostinger deployment; fresh OTP login opened the live admin dashboard.
- [x] Save and deliver the secure admin-panel checkpoint.

## Final admin hardening gaps

- [x] Implement a customer-facing order-status flow requiring both delivery email and payment reference, returning only limited status fields.
- [x] Add secret-free environment-variable deployment documentation without committing values.
- [x] Add production-safe CSP/security headers compatible with the existing app.
- [x] Extend accepted Whop webhook processing to create or update orders from complete validated metadata and ignore foreign company events without order mutation.
- [x] Add an audit-log view with loading, empty, and error states; preserve the established private admin shell where the provided generic layout is incompatible with its server-enforced auth flow.
- [x] Complete authenticated admin verification against the Hostinger deployment; npm-compatible formatting/lint-equivalent validation already passes.
- [x] Save a final hardening checkpoint after the remaining checks pass; checkpoint e906d83b records the verified OTP flow.

## Hostinger admin Forbidden diagnosis

- [x] Diagnose the production `Forbidden` response in the Hostinger admin panel without exposing secrets.
- [x] Verify the complete Hostinger environment-variable list, database bootstrap, and secure session-cookie requirements.
- [x] Apply and validate the Hostinger reverse-proxy origin fix; matching forwarded origins now reach authentication and mismatched origins remain blocked.
- [x] Provide exact Hostinger configuration steps and identify the required user-side environment and restart action.

## Hostinger Invalid credentials diagnosis

- [x] Confirm the production database currently has zero admin credential rows; the failure is bootstrap configuration, not an old password hash.
- [x] Add and end-to-end verify a safe non-secret bootstrap diagnostic: an empty admin table with missing server bootstrap variables returns HTTP 503 with a clear message instead of misleading Invalid credentials.
- [x] Validate the bootstrap diagnostic with TypeScript, five Vitest tests, production build, and a local production HTTP 503 smoke test; preserve OTP/session security and document the required Hostinger restart action.

## Hostinger Request failed diagnosis

- [x] Diagnose the new production `Request failed` response after adding `DATABASE_URL`.
- [x] Verify safe database connection error handling and Hostinger restart requirements.
- [x] Apply and validate the contact compatibility diagnostic without exposing credentials.

## Contact form JSON regression

- [x] Diagnose why the production `/api/contact` request returned an HTML document instead of JSON: database persistence errors were escaping the Express route.
- [x] Restore the existing contact submission response by containing persistence failures, without changing the form design, SMTP settings, or public wording.
- [x] Preserve the previously verified contact success path and validation-error JSON behavior; revalidate the new database-failure path as JSON without submitting test customer data to production.

## Live contact database failure

- [x] Verify the Hostinger `DATABASE_URL` points to the MySQL database containing the migrated contact table.
- [x] Verify the Hostinger database has the required schema and restart the Node.js app after correction.
- [x] Re-test the live contact endpoint safely with invalid input only; it returns HTTP 400 JSON and no customer data was inserted.

## Hostinger environment configuration after schema import

- [x] Confirm `DATABASE_URL` is configured in the Hostinger Node.js server environment and points to the imported database.
- [x] Confirm admin bootstrap and SMTP variables are configured in the same server environment, not phpMyAdmin.
- [x] Restart/rebuild Hostinger and validate the live admin login shell plus contact endpoint validation response.

## Confirmed Hostinger schema, unresolved runtime connection

- [x] Verify `DATABASE_URL` uses the exact Hostinger MySQL user/database and is stored in the Node.js server environment.
- [x] Verify the Node.js app was rebuilt/restarted after environment changes; Hostinger shows commit f1923aaa completed.
- [x] Validate the live contact page and `/api/contact` JSON validation response after the runtime connection was corrected; admin page shell also loads.

## Persistent Hostinger database-unavailable error

- [x] Determine whether Hostinger requires a database hostname other than `localhost` for this application; verified `127.0.0.1` is the working production host.
- [x] Confirm the MySQL password belongs to `u589090822_ayaanahmed` and that `DATABASE_URL` is in the active Node.js environment.
- [x] Confirm a real rebuild/restart occurred after the variable was changed, then re-test admin and contact flows.

## Hostinger runtime-log findings

- [x] Add safe database error-code/message logging so Hostinger identifies the actual MySQL connection failure without exposing credentials.
- [x] Add the missing `OAUTH_SERVER_URL` server variable if required by the deployed bootstrap; the deployed server initializes OAuth with its configured base URL, and the warning is non-blocking for custom admin auth.
- [x] Redeploy commit f1923aaa and verify fresh Hostinger runtime logs no longer report the database lookup failure.

## Required end-to-end Hostinger database proof

- [x] Capture a successful live DB-backed admin bootstrap/login request or contact persistence request, or a Hostinger runtime log proving successful MySQL access.
- [x] Only then mark the live runtime-connection validation complete and save the next checkpoint.

## Nested MySQL diagnostic

- [x] Include safe nested driver cause fields in the runtime error summary so Hostinger can distinguish access denied, unknown host, and connection failures without logging passwords or SQL.
- [x] Redeploy and capture the nested diagnostic; Hostinger reports MySQL `ER_ACCESS_DENIED_ERROR` 1045 / SQL state 28000, so the exact correction is to reset and use the accepted MySQL database-user credentials.

## Final MySQL credential correction proof

- [x] Correct the Hostinger MySQL database-user credentials or host based on the ER_ACCESS_DENIED_ERROR diagnosis.
- [x] Update `DATABASE_URL`, redeploy/restart Hostinger, and capture a successful live database-backed request or runtime log.
- [x] Re-test admin and contact flows end to end after MySQL authentication succeeds; admin database access now returns the expected 401 for non-real credentials, and contact validation returns JSON 400 without creating data.

## Confirmed Hostinger credential failure and exposure

- [ ] PENDING — deferred by user: rotate database, admin, mailbox, JWT, OTP, Whop, and other exposed secrets in a separate future task.
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

## OAuth production-variable verification gap

- [x] Verify whether Hostinger production has `OAUTH_SERVER_URL` set to the canonical non-secret OAuth server URL and add/update it if missing; Hostinger now lists it and the runtime uses `https://api.manus.im`.
- [x] Recheck Hostinger runtime logs after the `OAUTH_SERVER_URL` verification; the 05:03 deployment reports zero errors and no OAuth warning.

## Authorized production credential rotation and preview cleanup

- [ ] PENDING — deferred by user: inventory secret rotation requirements in a separate future task.
- [ ] PENDING — deferred by user: rotate replaceable application secrets in a separate future task.
- [ ] PENDING — deferred by user: coordinate Whop webhook and Hostinger mailbox credential changes in a separate future task.
- [ ] PENDING — deferred by user: redeploy and verify after future credential rotation.
- [x] Recheck the managed preview and document the platform-only pnpm limitation; this does not affect Hostinger Node 20/npm production.

## Narrowed non-secret verification scope

- [x] Leave all API, Whop, mailbox, database, JWT, OTP, and other credential settings unchanged.
- [x] Verify the managed preview status and preserve npm-only production compatibility; the preview limitation is platform-only and production npm checks pass.
- [x] Re-run non-secret public routes, checkout behavior, and existing payment-link handoff checks; npm production smoke checks returned HTTP 200 for `/`, `/pricing`, `/checkout`, `/order-status`, both policy pages, and the logo asset.

## Direct payment and side-icon regression

- [x] Find every report CTA that still navigates directly to Whop; Home pricing cards were the remaining direct anchors.
- [x] Route every report CTA through the existing billing/cart review page first; Home report cards now add the selected report to `/checkout`.
- [x] Make the supplied INSP AUTO logo visibly replace the side icon in public and admin navigation; the asset was cropped to remove white margins and is visibly rendered in the local production header/footer.
- [x] Preserve all existing report prices, payment URLs, and checkout behavior after the routing correction; only the pre-payment route changed and the final Whop handoff remains in Checkout.
- [x] Add or update tests and verify the complete CTA-to-billing flow without submitting payment; npm typecheck, 9 tests, production build, HTTP 200 asset checks, and local checkout smoke tests pass.

## Browser tab favicon correction

- [x] Inspect the current favicon and document-head asset references.
- [x] Add a favicon-safe INSP AUTO mark from the supplied logo and update the head reference.
- [x] Verify the favicon asset is included in the npm production build without changing page or payment behavior.

## Live domain routing correction

- [x] Diagnose why `inspauto.com` serves the default WordPress blog instead of the deployed INSP AUTO application.
- [x] Inspect the live domain response, DNS/hosting target, and connected deployment configuration without changing application credentials.
- [x] Route the domain to the INSP AUTO deployment if the authorized configuration is available, or identify the exact Hostinger DNS/domain action still required.
- [x] Verify `inspauto.com` and its canonical variants after the routing correction.

## Persistent domain origin and Whop credential update

- [x] Recheck `inspauto.com` and `www.inspauto.com` from an independent public request; neither currently serves WordPress.
- [x] Inspect Hostinger’s app/domain/cache state without changing unrelated credentials or application settings.
- [ ] PENDING — deferred by user: obtain replacement Whop API and webhook-secret values in a separate future task.
- [ ] PENDING — deferred by user: apply the two Whop credential updates in a separate future task.

## Domain-only follow-up

- [x] Recheck the persistent WordPress response from independent public requests and distinguish cache, hostname, and origin behavior.
- [x] Apply only the smallest authorized domain/cache correction; leave all Whop API/webhook and other credentials unchanged.
- [x] Verify `inspauto.com` and `www.inspauto.com` after the correction.

## SSL certificate mismatch correction

- [x] Inspect the certificate currently served for `inspauto.com`; it is valid and covers both hostnames, so no hostname mismatch was found from public endpoints.
- [x] Inspect Hostinger SSL, domain, DNS, and app-binding state without changing Whop or unrelated credentials.
- [x] No SSL/domain correction was needed: Hostinger Lifetime SSL is active and the served certificate covers both hostnames.
- [x] Verify HTTPS certificate hostname coverage and normal application delivery from independent requests.

## Remove obsolete Hostinger site binding

- [x] Inspect the current Hostinger website inventory; no old WordPress/site entry associated with `inspauto.com` exists.
- [x] Determine which site/origin can serve the stale WordPress response without touching the active GitHub-connected `insp-auto` app; no duplicate Hostinger origin was found.
- [x] No obsolete binding was found, so no site was removed or detached and mailbox, DNS, SSL, and credentials were preserved.
- [x] Verify `inspauto.com`, `www.inspauto.com`, SSL, and the active GitHub deployment.

## Railway and Cloudflare legacy routing check

- [x] Compare public DNS and TLS results; no Railway or Cloudflare origin is associated with the live Hostinger route.
- [x] Inspect the connected Cloudflare account and Railway project/domain configuration without deleting resources or changing secrets.
- [x] No obsolete provider binding was identified, so no destructive removal was performed.
- [x] Verify the final domain route serves only the active Hostinger GitHub-connected `insp-auto` deployment.

## Complete domain path audit

- [x] Audit authoritative nameservers, DNS record history, redirects, CNAME/ALIAS targets, and IPv4/IPv6 answers for `inspauto.com` and `www.inspauto.com`.
- [x] Audit Hostinger, Cloudflare, Railway, GitHub, and alternate domain bindings for the live domain.
- [x] Identify the intermittent HSTS/certificate warning as a stale Railway/resolver/edge path rather than an invalid Hostinger certificate.
- [x] Apply the confirmed safe correction by deleting the confirmed empty Railway account and disabling Hostinger CDN for direct delivery, preserving mail records and the active GitHub `insp-auto` deployment.
- [x] Verify every public hostname and protocol after correction.

## Mobile-only HTTPS failure

- [x] Compare mobile-relevant IPv4/IPv6 DNS answers and TLS certificates against the desktop-working path.
- [x] Identify that public IPv4/IPv6 edges serve the same valid certificate; the remaining mobile difference is an external stale resolver/edge path.
- [x] Apply only a safe correction that preserves the working desktop route, email DNS, payments, and credentials.
- [x] Verify the domain remains correct on desktop and is safe for mobile-compatible paths.

## Multi-network mobile failure

- [x] Record that the HTTPS warning reproduces on multiple phones and different mobile-data locations while desktop browsers work.
- [x] Audit mobile-facing DNS, certificate, HSTS, HTTP/2, and HTTP/3 behavior for the domain.
- [x] Identify the network-class inconsistency and apply only a confirmed safe correction.
- [x] Verify desktop and mobile-compatible delivery after the correction and document the remaining external stale-cache blocker.

## Railway fallback route evidence

- [x] Record the Railway “Not Found / The train has not arrived” fallback page shown for `inspauto.com` on mobile.
- [x] Trace the stale DNS/IPv6/HTTP3/custom-domain path that can still reach Railway while desktop reaches Hostinger.
- [x] Inspect Railway custom-domain bindings and remove the confirmed stale account path after confirmation; no active binding remained in the account.
- [x] Verify that all public paths serve only the Hostinger GitHub-connected `insp-auto` deployment.

## Confirmed Railway account deletion

- [x] Permanently delete the Railway account for `ayaanahmed22440@gmail.com` and its empty `aware-art` project after explicit confirmation.
- [x] Verify `inspauto.com`, `www.inspauto.com`, DNS, SSL, and the Hostinger GitHub deployment after deletion.

## Deployment-side routing investigation

- [x] Inspect GitHub source, Hostinger deployment settings, runtime logs, redirects, and response headers for a deployment-side defect; no unrelated app redirect was found.
- [x] Compare the deployed Hostinger response with the expected GitHub `insp-auto` application; the live response matches the expected app and Hostinger runtime is error-free.
- [x] Patch the confirmed deployment-side HTTP/3 stale-route mitigation in the actual production entrypoint without changing credentials, payments, or unrelated DNS.
- [x] Run npm typecheck and production build successfully; the bundled production server contains the Alt-Svc mitigation for the existing GitHub-to-Hostinger workflow.

## Completed production redeploy verification

- [x] Redeploy commit `9349cfb6` through Hostinger using the unchanged Express, npm, Node 20, and `dist/index.js` settings.
- [x] Verify `inspauto.com` and `www.inspauto.com` return HTTP 200, Hostinger/LiteSpeed headers, and the INSP AUTO page after redeploy.
- [x] Confirm the live response contains no WordPress, Railway, Cloudflare, or old-origin markers.

## Persistent mobile failure after redeploy

- [x] Re-audit mobile-facing DNS, IPv4/IPv6 TLS, HSTS, HTTP/2/HTTP/3, and Hostinger security/CDN behavior after the completed production redeploy.
- [x] Identify and apply the smallest safe correction for the phone-only failure by removing only the apex IPv6 AAAA record, without changing credentials, payments, or application functionality.
- [ ] PENDING — verify the corrected live path from an actual phone and provide a clear phone-specific validation step.

## Delayed mobile route switch

- [x] Record that the INSP AUTO page works on a phone for several minutes, then switches to the certificate/Railway error.
- [x] Inspect the current Hostinger IPv6 and HTTP/3 edge configuration after the first successful mobile visit.
- [ ] PENDING — verify repeated mobile-compatible delivery from an actual phone after AAAA removal.

## Confirmed IPv6 route removal

- [x] Delete only the apex `AAAA` record for `inspauto.com` in Hostinger DNS.
- [x] Verify the domain resolves through the working IPv4 Hostinger route and both hostnames retain valid HTTPS and INSP AUTO content.

## Phone-only DNS/SSL scope

- [ ] Monitor IPv4-only DNS propagation and phone-path certificate behavior without changing API links, credentials, payments, application code, or integrations.
- [ ] Apply only a necessary DNS/SSL delivery adjustment if the phone issue persists.
- [ ] Verify repeated phone-compatible delivery from the user’s actual phone before closing this issue.

## Confirmed Railway certificate mismatch

- [ ] Trace every remaining DNS, redirect, certificate, and cached-edge reference that can present `up.railway.app` for `inspauto.com`.
- [ ] Remove only the confirmed stale Railway route while preserving Hostinger, email, API links, credentials, payments, and application code.
- [ ] Verify the certificate identity and repeated phone-compatible delivery from the actual phone after propagation.

## Continued phone-only fix authorization

- [ ] Monitor public DNS and certificate propagation after the apex AAAA removal without changing API links, credentials, payments, mailbox settings, or application code.
- [ ] Apply only a necessary DNS/SSL delivery adjustment if the stale Railway certificate path remains publicly reachable.
- [ ] Obtain actual-phone confirmation that the warning is gone and verify repeated delivery before closing the issue.

## Repeated phone certificate warning

- [ ] Inspect Hostinger SSL, redirects, DNS history, CDN, and domain binding for any stale Railway reference still presented to mobile clients.
- [ ] Apply only a confirmed Hostinger DNS/SSL/proxy correction; leave API links, credentials, payments, mailbox settings, and application code unchanged.
- [ ] Verify the live certificate identity and repeated delivery after the correction from an actual phone.

## Renewed mobile-only TLS mismatch investigation

- [x] Reinvestigate mobile-only `www.inspauto.com` certificate mismatch using the supplied Chrome screenshots as evidence.
- [x] Trace `www.inspauto.com` DNS, CNAME/AAAA state, certificate hostname coverage, and Hostinger domain attachment without changing application code, credentials, payment settings, or API links.
- [x] Apply only a narrowly scoped domain/routing correction if a live stale binding is found; changed only `www` CNAME to `www.inspauto.com.cdn.hstgr.net`.
- [x] Verify HTTPS behavior across independent resolvers/networks and document the exact cause and result; public resolver/CNAME/SNI checks pass, while actual-phone confirmation remains pending.

## Delayed www route-switch follow-up

- [ ] Record that `www.inspauto.com` loads briefly on the affected phone and may later return to the certificate mismatch.
- [ ] Compare the canonical `www` IPv4 and IPv6 answers and certificate behavior after the CNAME correction.
- [ ] Apply only a confirmed IPv4-only DNS correction if the canonical `www` edge introduces the failing path.
- [ ] Verify repeated delivery after the correction and obtain actual-phone confirmation.

## www-only SSL protocol failure

- [x] Record the affected-phone evidence: `inspauto.com` works while `www.inspauto.com` fails with `ERR_SSL_PROTOCOL_ERROR`.
- [x] Replace only the failing `www` canonical CNAME route with the confirmed IPv4-only Hostinger target; `www` is now `A → 194.164.64.154` with TTL 300.
- [x] Verify both apex and www HTTPS delivery after DNS propagation without changing application or credential settings; both return only the Hostinger IPv4 route, valid SAN coverage, and HTTP 200.

## Intermittent access investigation

- [x] Investigate reports that the site intermittently fails for some users/devices while working for others.
- [x] Compare independent DNS, IPv4/IPv6, TLS, and HTTP delivery paths for both apex and www hostnames.
- [x] Audit Hostinger domain attachment, routing, resource/traffic restrictions, SSL state, and recent runtime logs.
- [x] Apply only a narrowly scoped infrastructure correction if a live fault is confirmed; no additional live correction was required after the IPv4-only www fix.
- [x] Verify repeated access and document whether IP restrictions, server limits, DNS, TLS, or hosting policies are involved.

## Confirmed Hostinger inode cleanup

- [x] Run Hostinger's confirmed Reduce inodes cleanup for the shared Business hosting account.
- [x] Recheck inode usage, inspauto.com running status, runtime logs, DNS/TLS, and repeated HTTPS delivery after cleanup.
- [x] Document whether inode pressure affected intermittent availability and whether any IP, traffic, view, or hosting restriction remains; inode pressure remains a risk but was not proven as the cause.

## Account-wide inode ranking

- [ ] Determine which website across the full Hostinger Business plan uses the most inodes.
- [ ] Map the highest inode path to the correct domain using Hostinger’s website inventory and File Manager.
- [ ] Assess deletion risk and report the verified website before any deletion or file removal.

## Authorized inode reduction target

- [ ] Identify disposable directories capable of freeing at least 100,000 inodes without touching inspauto.com or active website files.
- [ ] Inspect the exact deletion scope and obtain confirmation before any destructive file operation.
- [ ] Delete only the confirmed disposable files, recalculate usage, and verify the target reduction and INSP AUTO availability.

## Mobile DNS normalization follow-up

- [x] Compare current apex and www DNS, TLS, and HTTP behavior again after the inode issue was resolved.
- [x] Audit Hostinger SSL, domain attachment, redirects, and address-family routing for mobile-specific failures.
- [x] Apply only an evidence-based DNS correction after confirmation and verify repeated mobile-style delivery; disabled CDN and removed the residual apex AAAA record.

## Mobile blank-page follow-up

- [x] Investigate the affected phone showing a connected but completely blank `inspauto.com` page after the DNS fix.
- [x] Check production HTML, JavaScript assets, browser/runtime logs, and cache/service-worker behavior for mobile-only failures.
- [x] Apply only the smallest confirmed production-safe correction and verify the page renders on mobile-style clients; added an `IntersectionObserver` fallback in `client/src/pages/Home.tsx`, with npm build and 9 Vitest tests passing.

## Deployment activation verification

- [x] Verify whether Hostinger live `inspauto.com` serves the new IntersectionObserver fallback bundle from commit `2751b5df`; the live bundle contains the fallback.
- [x] Confirm whether the connected deployment panel is separate from Hostinger’s live runtime and identify the required redeploy action; the public Hostinger bundle is already updated even though the deployment panel is separate.
- [x] Report the exact activation state and next deployment step without changing DNS, payments, credentials, or application scope.

## Service-card real pricing update

- [x] Compare the service-page card prices with the existing report pricing and unchanged payment-link definitions.
- [x] Update only the displayed service-card prices to the confirmed real values without changing payment links or checkout behavior.
- [x] Run npm build and tests and verify the price display across the service pages.

## Confirmed all-vehicle service pricing

- [x] Apply £39.99 Basic, £42.99 Standard, and £52.99 Premium to car, motorbike, ATV, truck, boat, and RV service pages.
- [x] Preserve all existing Whop payment URLs and ensure checkout receives the same confirmed prices.
- [x] Run npm build, tests, and a consistency check across all six service routes; npm build passes and 10 Vitest tests pass.

## All-visible pricing correction

- [x] Locate every remaining old price display across the homepage, main Pricing page, and service pages.
- [x] Replace all visible old prices with £39.99 Basic, £42.99 Standard, and £52.99 Premium while preserving Whop links and checkout values.
- [x] Run npm build, tests, and a full pricing consistency verification across all visible sections; no stale price literals remain in client source, and all 10 tests pass.

## Confirmed Whop package pricing correction

- [x] Remove the £1 Whop package and preserve the three paid package links.
- [ ] Map the remaining tiers to Standard £49, Middle £59, and Premium £79 and update the actual Whop plan prices after confirmation.
- [x] Synchronize every visible website price and checkout amount to £49, £59, and £79.
- [x] Run npm build, tests, and verify all three paid plan links remain intact.

## Website-only £49/£59/£79 pricing

- [x] Change website pricing constants and visible cards to Standard £49, Middle £59, and Premium £79.
- [x] Remove any £1 option from website UI if present, without changing Whop or payment links; no £1 website option exists.
- [x] Ensure website checkout receives £49, £59, and £79 while existing payment URLs remain unchanged.
- [x] Run npm build, tests, and verify the website-only pricing update; npm build succeeds and 10 tests pass.

## Renewed end-to-end production accessibility incident

- [x] Treat the attached text as reference only and do not import its prices, content, configuration, or business information.
- [x] Audit complete DNS, A/AAAA/CNAME/TXT/nameservers, resolver divergence, domain attachments, old providers, redirects, TLS, CDN, cache, service workers, and duplicate deployments.
- [x] Compare working and failing production delivery paths, including live HTML/build hashes, JS/CSS/chunk/API requests, frontend runtime errors, CORS/CSP/auth/cookies, backend logs, environment configuration, and non-destructive database connectivity.
- [x] Apply only verified safe fixes, create/verify a backup before destructive infrastructure/database changes, rebuild/redeploy if necessary, purge appropriate caches, and test repeated delivery across network perspectives.
- [x] Add npm-only HTTP compression for production static assets after confirming the live JS bundle is delivered uncompressed and takes 16–45 seconds.
- [x] Rebuild and test the compression fix locally; local production responses now return Brotli with `Vary: Accept-Encoding` and `Alt-Svc: clear`. Hostinger redeployment and live verification are complete.
- [x] Reduce the initial frontend payload with route-level lazy loading, including the homepage, while preserving routes and UI.
- [x] Add immutable cache headers for Vite-hashed `/assets` while keeping HTML uncached.
- [x] Validate the final local production server: Brotli asset response, `Vary: Accept-Encoding`, `Cache-Control: public, max-age=31536000, immutable`, `Alt-Svc: clear`, npm build, and 10 passing tests.
- [x] Redeploy the final follow-up changes and verify compressed delivery plus mobile-style loading on the public domain.
- [x] Add accessible skeleton loading animations while API-backed data is being fetched, preserving the existing INSP AUTO design and behavior.
- [x] Test the loading state, production build, and existing Vitest coverage; save a checkpoint.
- [x] Perform the requested evidence-based security audit across secrets, admin auth, authorization, database queries, input validation, XSS, CSRF, webhooks, rate limiting, headers, cookies, errors, paths, CORS, and reliability.
- [x] Fix only confirmed security issues and add regression coverage without changing design, pricing, payment flow, or customer behavior.
- [x] Run build, tests, runtime smoke checks, unauthorized-access checks, and save a security checkpoint with a findings report.
- [x] Verify frontend source and generated production assets do not expose private environment variables, API secrets, credentials, database URLs, SMTP values, OTP peppers, JWT secrets, or Whop secrets.
- [x] Build and scan the frontend without printing sensitive values, then report the result.
- [x] Inspect the existing cart, checkout, order creation, Whop integration, and webhook flow for the minimum safe unified-cart change.
- [x] Implement one server-side combined-cart checkout with server-trusted pricing and preserved order/webhook behavior.
- [x] Test single-item and multi-item totals, browser-price tampering, duplicate-session protection, and regression coverage; save a checkpoint.
- [x] Reproduce the live combined-checkout button failure and capture the exact browser/network error without creating a real payment.
- [x] Resolve the confirmed checkout failure’s external Whop HTTP 403 authorization blocker; user confirmed the Whop permission issue is resolved. The separate checkout-retry enhancement is checkpointed and awaits the normal Hostinger deployment/live verification.
- [x] Fix the checkout button so failed or completed attempts never leave it stuck on “Preparing checkout…” and users can retry without refreshing.
- [x] Add an explicit opt-in, privacy-safe faster-checkout details option without storing card or payment data.
- [x] Evaluate the optional Whop Pixel snippet separately from checkout, then test repeated attempts and save a checkpoint.
- [x] Perform the requested read-only end-to-end audit of live user journeys, APIs, admin boundaries, Whop flow, secrets, headers, mobile behavior, reliability, and source-vs-production differences.
- [x] Produce the requested CRITICAL/HIGH/MEDIUM/LOW/PASSED report with user-journey, admin, payment, mobile, API, secrets, and overall-score sections.
- [x] Do not modify code, production configuration, database data, credentials, payments, or deploy changes until the user reviews and approves the audit findings.
- [ ] Reconfirm the approved live Whop authorization and deployment-freshness blockers.
- [ ] Apply only the minimum approved remediation and verify the latest checkout-retry build reaches production.
- [ ] Re-test checkout retries, safe invalid behavior, bundle freshness, and live headers without entering card details.

## Google Search Console submission

- [x] Add the existing public-page XML sitemap and sitemap declaration only because live /sitemap.xml currently returns the site 404 page, blocking the requested Search Console submission.
- [x] Verify the sitemap in Search Console and request indexing for the homepage and existing public pages.
- [x] Confirm the Search Console verification, sitemap, and indexing-request statuses.

## Google Search Console site identity logo

- [x] Identify the favicon/site-identity asset currently exposed to Google and compare it with the supplied INSP AUTO logo.
- [x] Apply only the minimal favicon and identity metadata correction using the supplied INSP AUTO logo.
- [x] Build, deploy, and verify the corrected identity asset; Google Search Console reprocessing remains asynchronous.
