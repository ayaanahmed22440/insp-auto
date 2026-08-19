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
