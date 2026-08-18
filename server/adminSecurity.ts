import { createHash, createHmac, randomBytes, randomInt, scrypt as scryptCallback, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";

const scrypt = promisify(scryptCallback);

export const ADMIN_SESSION_COOKIE = "__Host-insp_admin";
export const OTP_TTL_MS = 15 * 60 * 1000;
export const SESSION_TTL_MS = 8 * 60 * 60 * 1000;
export const MAX_OTP_ATTEMPTS = 5;

const normalizeEmail = (email: string) => email.trim().toLowerCase();

export async function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const derived = (await scrypt(password, salt, 64)) as Buffer;
  return `scrypt$${salt}$${derived.toString("hex")}`;
}

export async function verifyPassword(password: string, encoded: string) {
  const [algorithm, salt, storedHex] = encoded.split("$");
  if (algorithm !== "scrypt" || !salt || !storedHex) return false;
  try {
    const derived = (await scrypt(password, salt, 64)) as Buffer;
    const stored = Buffer.from(storedHex, "hex");
    return stored.length === derived.length && timingSafeEqual(stored, derived);
  } catch {
    return false;
  }
}

export function hashOtp(email: string, code: string) {
  const pepper = process.env.ADMIN_OTP_PEPPER;
  if (!pepper) throw new Error("ADMIN_OTP_PEPPER is not configured");
  return createHmac("sha256", pepper).update(`${normalizeEmail(email)}:${code}`).digest("hex");
}

export function createOtp() {
  return String(randomInt(0, 1_000_000)).padStart(6, "0");
}

export function safeEqualHex(left: string, right: string) {
  const a = Buffer.from(left, "hex");
  const b = Buffer.from(right, "hex");
  return a.length > 0 && a.length === b.length && timingSafeEqual(a, b);
}

export function createSessionToken() {
  return randomBytes(32).toString("base64url");
}

export function hashSessionToken(token: string) {
  return createHash("sha256").update(token).digest("hex");
}

export function normalizeAdminEmail(email: unknown) {
  return normalizeEmail(String(email ?? "")).slice(0, 320);
}

export function isValidEmail(email: string) {
  return email.length <= 320 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && !/[\r\n]/.test(email);
}

export function setAdminCookie(res: { cookie: (name: string, value: string, options: Record<string, unknown>) => void }, token: string) {
  res.cookie(ADMIN_SESSION_COOKIE, token, { httpOnly: true, secure: true, sameSite: "lax", path: "/", maxAge: SESSION_TTL_MS });
}

export function clearAdminCookie(res: { clearCookie: (name: string, options: Record<string, unknown>) => void }) {
  res.clearCookie(ADMIN_SESSION_COOKIE, { httpOnly: true, secure: true, sameSite: "lax", path: "/", maxAge: 0 });
}

export function readCookie(header: string | undefined, name: string) {
  if (!header) return undefined;
  const value = header.split(";").map(part => part.trim()).find(part => part.startsWith(`${name}=`));
  return value ? decodeURIComponent(value.slice(name.length + 1)) : undefined;
}

export function verifyWhopSignature(rawBody: string, timestamp: string, signatureHeader: string, secret: string) {
  const timestampNumber = Number(timestamp);
  if (!secret || !timestamp || !Number.isFinite(timestampNumber) || Math.abs(Date.now() / 1000 - timestampNumber) > 300) return false;
  const expected = createHmac("sha256", Buffer.from(secret, "base64")).update(`${timestamp}.${rawBody}`).digest("base64");
  return signatureHeader.split(" ").map(value => value.split(",")[1]).filter(Boolean).some(value => {
    try {
      const actual = Buffer.from(value);
      const expectedBuffer = Buffer.from(expected);
      return actual.length === expectedBuffer.length && timingSafeEqual(actual, expectedBuffer);
    } catch {
      return false;
    }
  });
}

export function requestId() {
  return randomBytes(12).toString("hex");
}
