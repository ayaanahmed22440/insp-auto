#!/usr/bin/env bash
set -u
for host in inspauto.com www.inspauto.com; do
  echo "===== $host ====="
  echo "-- local resolver --"
  getent ahosts "$host" || true
  echo "-- Cloudflare DNS --"
  dig +short A "$host" @1.1.1.1 || true
  dig +short AAAA "$host" @1.1.1.1 || true
  dig +short CNAME "$host" @1.1.1.1 || true
  echo "-- Google DNS --"
  dig +short A "$host" @8.8.8.8 || true
  dig +short AAAA "$host" @8.8.8.8 || true
  dig +short CNAME "$host" @8.8.8.8 || true
  echo "-- TLS certificate presented with SNI --"
  echo | timeout 12 openssl s_client -connect "$host:443" -servername "$host" -showcerts 2>/dev/null | openssl x509 -noout -subject -issuer -serial -dates -ext subjectAltName 2>/dev/null || true
  echo "-- HTTPS headers --"
  curl -sSIk --connect-timeout 10 --max-time 20 "https://$host/" | sed -n '1,20p' || true
done

echo "===== DNS trace for www ====="
dig +trace www.inspauto.com | tail -n 80 || true
