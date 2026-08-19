import json
import socket
import ssl
import subprocess
import urllib.parse
import urllib.request

HOSTS = ["inspauto.com", "www.inspauto.com"]
RESOLVERS = {
    "cloudflare": "https://cloudflare-dns.com/dns-query",
    "google": "https://dns.google/resolve",
}

for resolver, endpoint in RESOLVERS.items():
    print(f"=== {resolver}")
    for host in HOSTS:
        query = urllib.parse.urlencode({"name": host, "type": "A"})
        req = urllib.request.Request(endpoint + "?" + query, headers={"accept": "application/dns-json"})
        with urllib.request.urlopen(req, timeout=12) as response:
            payload = json.load(response)
        ips = [entry.get("data") for entry in payload.get("Answer", []) if entry.get("type") == 1]
        for ip in ips:
            print(f"--- {host} {ip}")
            try:
                context = ssl.create_default_context()
                with socket.create_connection((ip, 443), timeout=10) as raw:
                    with context.wrap_socket(raw, server_hostname=host) as tls:
                        cert = tls.getpeercert()
                        print("CERT_SUBJECT", cert.get("subject"))
                        print("CERT_SAN", [item[0][1] for item in cert.get("subjectAltName", [])])
            except Exception as exc:
                print("CERT_ERROR", repr(exc))
            cmd = ["curl", "-ksS", "--max-time", "15", "--resolve", f"{host}:443:{ip}", f"https://{host}/"]
            try:
                body = subprocess.check_output(cmd, text=True, stderr=subprocess.STDOUT)
                title = ""
                marker = ""
                lower = body.lower()
                if "<title>" in lower:
                    start = lower.find("<title>") + 7
                    end = lower.find("</title>", start)
                    title = body[start:end].strip()
                if "insp auto" in lower or "vehicle history report pricing" in lower:
                    marker = "INSP_AUTO"
                elif "wordpress" in lower or "hello world" in lower:
                    marker = "WORDPRESS"
                print("PAGE", marker, title[:120])
            except Exception as exc:
                print("PAGE_ERROR", repr(exc))
