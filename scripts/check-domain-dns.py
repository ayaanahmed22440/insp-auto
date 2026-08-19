import json
import subprocess
import urllib.parse
import urllib.request

DOMAIN = "inspauto.com"
RESOLVERS = {
    "cloudflare": "https://cloudflare-dns.com/dns-query",
    "google": "https://dns.google/resolve",
    "quad9": "https://dns.quad9.net:5053/dns-query",
}

for name, base in RESOLVERS.items():
    print(f"--- {name}")
    for record_type in ("A", "AAAA"):
        url = base + "?" + urllib.parse.urlencode({"name": DOMAIN, "type": record_type})
        req = urllib.request.Request(url, headers={"accept": "application/dns-json"})
        try:
            with urllib.request.urlopen(req, timeout=10) as response:
                data = json.load(response)
            answers = [answer.get("data") for answer in data.get("Answer", [])]
            print(record_type, answers)
        except Exception as exc:
            print(record_type, "ERROR", exc)
