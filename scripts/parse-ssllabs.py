import json
import urllib.request

url = "https://api.ssllabs.com/api/v3/analyze?host=inspauto.com&fromCache=on&all=done"
with urllib.request.urlopen(url, timeout=30) as response:
    data = json.load(response)
print("STATUS", data.get("status"))
for endpoint in data.get("endpoints", []):
    print("ENDPOINT", endpoint.get("ipAddress"), endpoint.get("statusMessage"), endpoint.get("grade"), endpoint.get("gradeTrustIgnored"))
    details = endpoint.get("details") or {}
    certs = details.get("certs") or []
    for cert in certs[:2]:
        print("CERT", cert.get("subject"), cert.get("issuerSubject"), cert.get("notBefore"), cert.get("notAfter"), cert.get("commonNames"), cert.get("altNames"))
    sims = details.get("sims", {}) or {}
    if isinstance(sims, dict):
        sim_values = sims.values()
    else:
        sim_values = sims
    for client in sim_values:
        if not isinstance(client, dict):
            continue
        platform = (client.get("client") or {}).get("platform")
        if client.get("errorCode") and platform in ("Android", "Android Phone", "Win Phone 10", "iOS"):
            print("MOBILE_ERROR", client.get("client"), client.get("errorCode"), client.get("errorMessage"))
