import json
import socket
import urllib.parse
import urllib.request

DOMAIN = "inspauto.com"
NAMES = [DOMAIN, f"www.{DOMAIN}"]
RESOLVERS = {
    "cloudflare": "https://cloudflare-dns.com/dns-query",
    "google": "https://dns.google/resolve",
}
TYPES = ["NS", "A", "AAAA", "CNAME", "MX", "TXT"]

print("SYSTEM_RESOLUTION")
for name in NAMES:
    try:
        print(name, socket.getaddrinfo(name, 443, type=socket.SOCK_STREAM))
    except Exception as exc:
        print(name, "ERROR", exc)

for resolver_name, endpoint in RESOLVERS.items():
    print(f"\nRESOLVER {resolver_name}")
    for name in NAMES:
        for record_type in TYPES:
            query = urllib.parse.urlencode({"name": name, "type": record_type})
            req = urllib.request.Request(endpoint + "?" + query, headers={"accept": "application/dns-json"})
            try:
                with urllib.request.urlopen(req, timeout=12) as response:
                    payload = json.load(response)
                answers = [entry.get("data") for entry in payload.get("Answer", [])]
                if answers:
                    print(name, record_type, answers)
            except Exception as exc:
                print(name, record_type, "ERROR", exc)
