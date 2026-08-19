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
