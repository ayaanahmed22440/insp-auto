import json
import socket
import ssl
import subprocess
import urllib.request

HOSTS = ["inspauto.com", "www.inspauto.com"]
RESOLVERS = {
    "cloudflare": "https://cloudflare-dns.com/dns-query?name={host}&type={rtype}",
    "google": "https://dns.google/resolve?name={host}&type={rtype}",
}

for host in HOSTS:
    print(f"=== {host} ===")
    for resolver, template in RESOLVERS.items():
        for rtype in ("A", "AAAA", "CNAME"):
            req = urllib.request.Request(template.format(host=host, rtype=rtype), headers={"accept": "application/dns-json"})
            try:
                with urllib.request.urlopen(req, timeout=15) as response:
                    data = json.load(response)
                answers = [answer.get("data") for answer in data.get("Answer", [])]
                print(f"{resolver} {rtype}: {answers}")
            except Exception as exc:
                print(f"{resolver} {rtype}: ERROR {exc}")
    for family, label in ((socket.AF_INET, "IPv4"), (socket.AF_INET6, "IPv6")):
        try:
            infos = socket.getaddrinfo(host, 443, family, socket.SOCK_STREAM)
            addresses = sorted({info[4][0] for info in infos})
            print(f"local {label}: {addresses}")
        except Exception as exc:
            print(f"local {label}: ERROR {exc}")
    for flag, label in (("-4", "IPv4"), ("-6", "IPv6")):
        command = ["curl", flag, "-k", "-sS", "--connect-timeout", "10", "--max-time", "20", "-o", "/dev/null", "-w", "%{http_code} %{remote_ip} %{time_connect} %{time_appconnect}\\n", f"https://{host}/"]
        try:
            result = subprocess.run(command, capture_output=True, text=True, timeout=30)
            print(f"curl {label}: {result.stdout.strip() or result.stderr.strip()}")
        except Exception as exc:
            print(f"curl {label}: ERROR {exc}")
    try:
        context = ssl.create_default_context()
        with socket.create_connection((host, 443), timeout=15) as raw:
            with context.wrap_socket(raw, server_hostname=host) as tls:
                cert = tls.getpeercert()
                print(f"TLS: version={tls.version()} cipher={tls.cipher()} subject={cert.get('subject')} sans={cert.get('subjectAltName')}")
    except Exception as exc:
        print(f"TLS: ERROR {exc}")
