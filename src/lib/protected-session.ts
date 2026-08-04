import { createHmac, timingSafeEqual } from "crypto";

const SESSION_TTL_SECONDS = 60 * 60 * 4; // 4 hours

function getSecret(): string {
  const secret = process.env.SESSION_SECRET;
  if (!secret) throw new Error("SESSION_SECRET is not set");
  return secret;
}

function sign(payload: string): string {
  return createHmac("sha256", getSecret()).update(payload).digest("base64url");
}

// -------- session token: slug + expiry, HMAC-signed --------
export function createSessionToken(slug: string): string {
  const expires = Date.now() + SESSION_TTL_SECONDS * 1000;
  const payload = `${slug}:${expires}`;
  const signature = sign(payload);
  return Buffer.from(`${payload}:${signature}`).toString("base64url");
}

export function verifySessionToken(token: string, slug: string): boolean {
  try {
    const decoded = Buffer.from(token, "base64url").toString("utf8");
    const [tokenSlug, expiresStr, signature] = decoded.split(":");
    if (!tokenSlug || !expiresStr || !signature) return false;
    if (tokenSlug !== slug) return false;

    const expires = Number(expiresStr);
    if (!Number.isFinite(expires) || Date.now() > expires) return false;

    const expectedSignature = sign(`${tokenSlug}:${expiresStr}`);
    const sigBuffer = Buffer.from(signature);
    const expectedBuffer = Buffer.from(expectedSignature);
    if (sigBuffer.length !== expectedBuffer.length) return false;

    return timingSafeEqual(sigBuffer, expectedBuffer);
  } catch {
    return false;
  }
}

export function cookieNameForSlug(slug: string): string {
  return `pp_session_${slug.replace(/[^a-zA-Z0-9_-]/g, "_")}`;
}

export { SESSION_TTL_SECONDS };
