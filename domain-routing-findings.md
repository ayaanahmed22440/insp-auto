# Domain routing findings

As of the latest authenticated browser check, `https://inspauto.com/` served the INSP AUTO application with title `Vehicle History Report Pricing | INSP AUTO`, the INSP AUTO navigation, pricing, services, and report CTAs. The browser did not serve the WordPress “Blog / Hello world!” page shown in the user screenshot on that exact HTTPS URL.

Next checks: compare HTTP versus HTTPS and the `www` hostname, inspect redirects and DNS targets, and determine whether the screenshot came from a different hostname, stale DNS resolver, or a separate Hostinger document root.

## Public HTTP/DNS check

A fresh public `curl` check on 19 Aug 2026 returned WordPress markers, `x-powered-by: PHP/8.3.30`, `link: <https://inspauto.com/wp-json/>`, and `x-litespeed-cache: hit` for `https://inspauto.com/`. The `www` hostname redirects through WordPress to the root hostname, while the non-redirected response behavior differs by hostname/protocol. Public DNS currently exposes multiple root A/AAAA targets and a Hostinger CDN CNAME for `www`, indicating the root domain is not consistently bound to the Node.js INSP AUTO deployment. This explains why independent browsers can show the default WordPress page even though the connected browser session displayed the INSP AUTO app.

## Hostinger panel inspection

The authenticated Hostinger account shows `inspauto.com` as a Node.js/Express Web App connected to GitHub, with the latest deployment `4100b977` completed on Node 20.x. The domain DNS panel shows Hostinger nameservers, an apex `ALIAS @ -> inspauto.com.cdn.hstgr.net`, and `CNAME www -> www.inspauto.com.cdn.hstgr.net`, which are the expected Hostinger CDN targets. The panel therefore does not show an obvious missing DNS record. The public root response still carries old WordPress/PHP/LiteSpeed cache markers, suggesting stale CDN/origin content or an unpurged Hostinger cache. The next safe operational step is to clear the Hostinger site/CDN cache and then re-check the root and www hostnames.

## Cache purge verification

After the user-confirmed Hostinger cache purge, both `https://inspauto.com/` and `https://www.inspauto.com/` returned HTTP 200 with the title `Vehicle History Report Pricing | INSP AUTO`. The responses include INSP AUTO markers, no longer include WordPress, `Hello world`, `wp-json`, PHP, or LiteSpeed cache markers, and expose the deployed app security headers. The domain is now serving the Node.js INSP AUTO application publicly on both canonical hostnames.
