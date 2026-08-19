# Domain and SSL findings

## Hostinger website inventory

The authenticated Hostinger Websites inventory lists exactly one `inspauto.com` entry, represented with the Node.js icon and separate `Tools` and `Dashboard` controls. It is the GitHub-connected `insp-auto` app. The visible WordPress entries are separate temporary domains such as `indigo-tapir-135125.hostingersite.com`; no WordPress entry named `inspauto.com` appears in the current inventory.

The active `inspauto.com` app dashboard reports GitHub connection, Express framework, Node 20.x, completed deployment `4100b977`, active SSL, and CDN. This means there is no obvious duplicate Hostinger site binding named `inspauto.com` to delete. The remaining stale WordPress/certificate behavior is likely an old CDN/DNS edge or a separate WordPress configuration not surfaced under the current website name.

## Current external checks

The public certificate for `inspauto.com` and `www.inspauto.com` is a valid Let’s Encrypt certificate with SANs for both hostnames. Hostinger’s SSL panel reports Lifetime SSL active. Qualys SSL Labs has completed IPv4 checks at A+; IPv6 checks are still processing. Independent HTTP requests and the connected browser currently serve the INSP AUTO application.

## Hostinger DNS and WordPress inventory confirmation

Hostinger’s separate WordPress inventory contains no `inspauto.com` entry. It contains unrelated temporary or other domains only. The `inspauto.com` DNS records are also clean for the active app: apex `ALIAS @ -> inspauto.com.cdn.hstgr.net`, `CNAME www -> www.inspauto.com.cdn.hstgr.net`, Hostinger mail MX records, DKIM, SPF, and DMARC. No extra A/AAAA record or redirect to a WordPress origin is listed. There is no safe obsolete `inspauto.com` WordPress site to delete without risking unrelated sites; the remaining mobile warning is not caused by a duplicate Hostinger binding.

## Cloudflare inspection

The connected Cloudflare account is authenticated, but its Domains overview currently shows “No domains or subdomains found.” The recent `inspauto.com / DNS` shortcut in the Cloudflare dashboard resolves to a Cloudflare 404 rather than an active zone. This confirms Cloudflare is not currently the authoritative DNS or active proxy for `inspauto.com`; Hostinger nameservers remain authoritative. There is no active Cloudflare `inspauto.com` zone available to delete or detach.

## Railway inspection

The authenticated Railway account is `ayaanahmed22440's Projects` and contains one project named `aware-art`, which currently shows “No services.” No `insp-auto` project, deployment, service, or custom domain is visible. Railway therefore is not an active origin for the current `inspauto.com` routing, and there is no Railway resource identified for safe deletion.

## Final provider-routing verification

After inspecting Cloudflare and Railway, fresh independent checks show both `https://inspauto.com/` and `https://www.inspauto.com/` return HTTP 200 from `server: hcdn` / `platform: hostinger`, with title `Vehicle History Report Pricing | INSP AUTO` and no WordPress, Railway, or Cloudflare content markers. The served certificate is issued by Let’s Encrypt for `inspauto.com` and includes both `inspauto.com` and `www.inspauto.com` in its SAN list. No provider-level correction or deletion was necessary because the active route is already Hostinger-only.

## Mobile-focused edge audit

A resolver matrix across Cloudflare and Google DNS returned multiple Hostinger CDN IPv4 and IPv6 addresses. Every tested IPv4 address returned the INSP AUTO page and a certificate with common name `inspauto.com`. Qualys SSL Labs completed all four public endpoints—two IPv4 and two IPv6—with grade A+ and no warnings. This rules out an inconsistent Hostinger, Cloudflare, Railway, or IPv6 certificate edge in the public service. Because desktop works and the public IPv4/IPv6 endpoints are valid, the remaining failure is local to the phone’s network, DNS cache, captive-portal path, or saved HSTS/certificate state; removing HSTS or changing the working DNS would be unsafe.

## Hostinger mobile protocol controls

Hostinger’s CDN is active for `inspauto.com`. The CDN controls expose image optimisation, security level, traffic blocking, and TLS settings, but no HTTP/3/QUIC toggle. The “Use only the latest TLS version (TLS 1.3)” control is currently disabled, so TLS 1.2 remains available. The public response advertises HTTP/3 through `alt-svc`, but Hostinger does not expose a setting to disable only that protocol. Disabling the entire CDN would be the only available edge-isolation experiment and would be a live-site change requiring confirmation.

## Railway fallback investigation

The authenticated Railway account’s only project is `aware-art`, with no services. Its project settings expose no custom-domain section or active service to which `inspauto.com` could be attached. A public search for `inspauto.com` and Railway terms found no Railway hostname or indexed Railway deployment; the indexed site is the INSP AUTO homepage. The Railway fallback page therefore appears to be a stale DNS/edge route or an old Railway custom-domain association outside the currently authenticated account, not a live service in the current Railway workspace.

## Railway workspace check

The Railway workspace selector shows only `ayaanahmed22440's Projects`; there is no second workspace available in the authenticated account. That workspace contains only the empty `aware-art` project. The Railway-branded fallback seen on mobile therefore comes from a stale route or an older Railway account/domain association that is not available in the connected session.

## Railway account identity confirmation

The user confirmed the Railway login email is `ayaanahmed22440@gmail.com`, matching the authenticated Railway session. That session has only the `ayaanahmed22440's Projects` workspace and the empty `aware-art` project. No separate workspace or active Railway service is available under that login to detach.

## Deployment-side audit

The GitHub source and built output contain no Railway, Cloudflare, WordPress, or hard-coded domain redirect logic. `npm run check` and `npm run build` complete successfully. Hostinger reports the GitHub-connected `insp-auto` repository, Express framework, Node 20.x, completed deployment `c128f0ce`, and current status Running. Hostinger Runtime Logs show zero issues and zero errors; the server starts normally on `http://localhost:3000/`. The public direct-origin response is HTTP 200 from LiteSpeed with the INSP AUTO title. No confirmed application or Hostinger Node.js defect was found.

## Hostinger mitigation redeploy

Hostinger’s first auto-deployment for commit `9349cfb6` was marked Build failed even though `npm run check` and `npm run build` pass locally. Hostinger’s generated analysis said the project build is correct and the deployment process should not require a code change. Using the unchanged Express / npm / Node 20 / `dist/index.js` settings, a manual Save and redeploy was started at 2026-08-19 07:42 and is currently Building. Live `Alt-Svc` headers should be rechecked only after this deployment reaches Completed.

## Apex IPv6 removal verification

After deleting the Hostinger apex `AAAA` record, the Hostinger DNS table no longer contains that record. Local resolution for both `inspauto.com` and `www.inspauto.com` returns only `194.164.64.154`, and both hosts return HTTP 200 from Hostinger LiteSpeed with the INSP AUTO title. A real phone test after the 1800-second DNS TTL remains necessary to confirm that the delayed mobile failure has disappeared.


## Renewed mobile-only TLS investigation — 2026-08-19

The supplied Android Chrome screenshots show `NET::ERR_CERT_COMMON_NAME_INVALID` for `www.inspauto.com`, with HSTS preventing bypass. This confirms a certificate/SNI problem before the application is reached; application code, API routes, credentials, checkout, and payment links are not involved in the failure.

A passive probe from the sandbox currently shows both `inspauto.com` and `www.inspauto.com` resolving to `194.164.64.154`. SNI certificate inspection for both hostnames presents a Let's Encrypt certificate with `CN=inspauto.com` and SANs `DNS:inspauto.com, DNS:www.inspauto.com`, valid from 2026-08-05 through 2026-11-03. HTTPS requests return HTTP 200 from Hostinger LiteSpeed and the INSP AUTO application.

The live response still includes `Alt-Svc: h3=":443"`, even though the Express entrypoint sets `Alt-Svc: clear`. This indicates Hostinger's edge may be adding or overriding the HTTP/3 advertisement after the Node origin response. A stale mobile HTTP/3/QUIC edge association remains a plausible provider-side cause, but it is not yet proven.

Hostinger hPanel inspection found Lifetime SSL marked Active. DNS history shows repeated zone updates, CDN enable/disable events, and hosting addon removals, but no visible Railway binding. The Redirects panel contained no Railway target in the loaded content. The next domain-only action is to inspect the Hostinger website dashboard for duplicate www attachment or a provider-level HTTP/3/CDN control; do not alter application functionality or secrets.

Hostinger's current support documentation says SSL is attached per hosted domain/subdomain and can be uninstalled/reinstalled from Websites → Dashboard → Security → SSL; it also recommends clearing Hostinger/CDN cache and testing from independent networks when stale routing persists. References: https://www.hostinger.com/support/5613445-how-to-fix-a-failed-lifetime-ssl-installation-in-hostinger/ ; https://www.hostinger.com/support/1583501-how-to-clear-cache-at-hostinger/ ; https://www.hostinger.com/support/1583258-how-to-install-lifetime-ssl-at-hostinger/


## www-only protocol failure correction — 2026-08-19

The affected phone screenshot showed `https://inspauto.com/` working while `https://www.inspauto.com/` failed with `ERR_SSL_PROTOCOL_ERROR`. Before correction, `www` used a canonical Hostinger CNAME whose target returned separate IPv4 and IPv6 edges. The apex was IPv4-only. This explains why the apex remained stable while the phone’s `www` path could switch to a failing alternate edge.

With the user’s confirmation, the old `www` CNAME was deleted and replaced by `A www → 194.164.64.154` with TTL 300. Public Google DNS now returns only `194.164.64.154` for `www` and no AAAA answer. The apex also returns only `194.164.64.154`. SNI checks for both names present the same valid Let's Encrypt certificate with SANs for `inspauto.com` and `www.inspauto.com`, and HTTPS requests for both return HTTP 200 from Hostinger LiteSpeed. No application code, credentials, mail records, API links, Whop settings, pricing, or payment links were changed.

Actual-phone repeat testing remains the final validation because this environment cannot reproduce the phone’s prior cached route.


## Intermittent-access investigation — 2026-08-19

Repeated public probes across three rounds showed stable delivery for both `inspauto.com` and `www.inspauto.com`: Google Public DNS returned only `194.164.64.154` for A records and no AAAA answers; HTTPS returned HTTP 200 from Hostinger LiteSpeed; and SNI presented the same Let's Encrypt certificate for `inspauto.com` and `www.inspauto.com`. This rules out a currently active split IPv4/IPv6 route, an active Railway DNS target, or a certificate mismatch at the authoritative edge.

Hostinger's authenticated account panel shows the `inspauto.com` Node/Express site is Running, SSL is active, Auto-deployment is active, Malware protection is active, and the latest deployment completed successfully. Site-specific runtime logs show zero issues and zero errors for the last hour. Site resource readings were CPU 6% and memory 506 MB. However, the shared Business hosting account contains 23 websites and reports 530,211 of 600,000 inodes used (88%), with an account-level warning that resources are close to limits. Hostinger states that exhausting inodes can lead to application crashes, server restarts, data loss risk, or scheduled tasks not running. Disk usage is only 16.38 GB of 200 GB, so the concern is file/inode count rather than disk capacity.

Hostinger's page-speed history shows a recent mobile score of 82 and repeated desktop scores of 98–100, indicating performance is measurable but not evidence of an access restriction. No IP block, traffic quota, HTTP error, runtime crash, or current DNS/TLS fault has been observed. The strongest remaining infrastructure risk is shared-account inode pressure. Hostinger offers a `Reduce inodes` action described as automatically cleaning temporary files without damaging websites; this action has not yet been run because it changes account files and requires authorization.


## Post-cleanup verification — 2026-08-19

The confirmed Hostinger `Reduce inodes` action completed successfully, followed by Hostinger's `Recalculate usage` action. The displayed account count remained approximately 530,211 of 600,000 inodes (88%), indicating that the automated temporary-file cleanup did not materially lower the shared account's inode count. CPU remained low and memory remained well below its limit.

Post-cleanup public checks still show A-only IPv4 delivery to 194.164.64.154, no AAAA answer, HTTP/2 200 from Hostinger LiteSpeed, and the valid Let's Encrypt certificate with SANs for both hostnames. The cleanup did not create an outage, but because the inode warning persists, shared-account inode pressure remains a risk rather than a proven cause of the intermittent user reports.


## Latest inode check — 2026-08-19

Hostinger currently shows the shared Business account with 15 websites, 530,211 / 600,000 inodes used (88%), 16.38 GB / 200 GB disk used, CPU average 1%, memory average 381 MB / 3,072 MB, throughput 117 KB/s / 20,480 KB/s, PHP workers 6 / 60, IOPS 14 / 512, and max processes 39 / 120. The inode figure has not decreased after the authorized temporary-file cleanup, so the inode warning is not resolved. Current live checks still return HTTP 200 from Hostinger LiteSpeed for both apex and www.


## Domain mapping for inode-heavy directory — 2026-08-19

Hostinger's website inventory confirms `fdcc.co` is a separate website on the same Business hosting account as `inspauto.com`. The inode report was opened under the account-level `fdcc.co` container, whose `public_html` is a legacy WordPress installation. Within that container, `public_html/wp-content` has 25,080 inodes and `wp-content/plugins` accounts for 21,433 of them. Therefore, the largest identified domain/site contributor is **fdcc.co**, specifically its WordPress `public_html/wp-content/plugins` tree—not the INSP AUTO Node/Express site.


## Account-wide domain ranking clarification — 2026-08-19

Hostinger's account-level resource page reports the shared plan total, but it does not display a sortable per-domain inode table. The available `Discover the path` report opens the account's primary File Manager container labeled `fdcc.co`; Hostinger's website inventory confirms `fdcc.co` is one of the 16 sites on the plan and is a separate legacy WordPress site. Its `public_html` contains 25,080 inodes, with 21,433 in `wp-content/plugins`, making `fdcc.co` the largest domain-level contributor directly verified from the available report. No deletion has been performed. A definitive ranking of every isolated website would require opening each site's File Manager or a Hostinger support/account export because the current UI does not expose all domains in one inode table.


## CDN disable and residual IPv6 finding — 2026-08-19

Hostinger CDN was explicitly disabled for `inspauto.com`; the Hostinger CDN status changed from Active to Inactive and displayed a success confirmation. After that change, public probing showed both hostnames on direct Hostinger IPv4 delivery with HTTP 200 and the valid Let’s Encrypt certificate, but the local resolver still returned IPv6 addresses. Hostinger DNS records show `@ A → 194.164.64.154`, `www CNAME → inspauto.com`, and a residual `@ AAAA → 2a02:4780:2b:1610:0:231c:d006:10`. The residual AAAA is the remaining mobile-route risk and should be removed while preserving A, CNAME, MX, SPF, DKIM, and DMARC records.


## Final IPv4-only DNS verification — 2026-08-19

The user deleted the residual `AAAA @ → 2a02:4780:2b:1610:0:231c:d006:10` record. The subsequent probe now returns only `194.164.64.154` for both `inspauto.com` and `www.inspauto.com`; no IPv6 answer is returned. Both hostnames present the same valid Let’s Encrypt certificate covering `inspauto.com` and `www.inspauto.com`, return HTTP 200 from Hostinger LiteSpeed, and no longer use the Hostinger CDN (`server: LiteSpeed`, not `server: hcdn`). This is the intended direct IPv4 configuration for mobile stability.


## Whop pricing-edit investigation — 2026-08-19

Source: https://whop.com/dashboard/biz_67QnAzoeWI4EUU/

The authenticated Whop dashboard for the `prime inspectors` business displays a red suspension banner: "This business has been suspended. If you believe this is an error, please contact our support team." The dashboard does not expose checkout-link editing controls while suspended. The requested £1 package removal and package price changes therefore cannot be applied from the current Whop account state until Whop restores the business or support provides access.


## Production accessibility audit — current evidence

On 2026-08-19, Cloudflare DoH and Google DoH both returned the same IPv4 address `194.164.64.154` for `inspauto.com`; `www.inspauto.com` resolves through `CNAME inspauto.com` to the same A record. Neither hostname has a published AAAA answer. Direct IPv4 TLS succeeds with TLS 1.3 and a Let’s Encrypt certificate whose SAN covers both hostnames; direct IPv6 has no address and is not attempted. HTTP and HTTPS both redirect intentionally to HTTPS and return HTTP 200 with identical HTML body hashes for apex and www.

The live HTML references `/assets/index-NWzmc5CC.js` and `/assets/index-D1HT34VV.css`. The live JavaScript request returned HTTP 200 but took 16–45 seconds from the audit environment; a 20-second request timed out after only 360,408 of 443,395 bytes. The current local clean build produces a different JS hash (`index-BPxvo_LD.js`) and is 715 KB. The live asset is therefore not byte-identical to the current repository build, and slow delivery of the initial JavaScript is a credible cause of mobile black/blank screens. Live response headers still advertise `Alt-Svc: h3` despite the application setting `Alt-Svc: clear`, indicating Hostinger/LiteSpeed is overriding the app header.
