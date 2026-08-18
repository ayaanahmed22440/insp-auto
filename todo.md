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
