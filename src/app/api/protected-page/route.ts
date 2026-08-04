import { NextRequest, NextResponse } from "next/server";
import argon2 from "argon2";
import { client } from "@/../tina/__generated__/client";
import { createSessionToken, verifySessionToken, cookieNameForSlug, SESSION_TTL_SECONDS } from "@/lib/protected-session";

async function getContentForSlug(slug: string) {
  // -------- glcdeposits: content comes from an env var, never from the CMS/GitHub --------
  if (slug === "glcdeposits") {
    const embedCode = process.env.COGNITO_DEPOSITS_FORM_CODE;
    if (!embedCode) {
      throw new Error("COGNITO_DEPOSITS_FORM_CODE is not configured");
    }
    return {
      type: "embed" as const,
      title: "Deposits",
      embedCode,
    };
  }

  // -------- everything else: a CMS page marked passwordProtected --------
  const result = await client.queries.sitePageConnection({
    filter: { slug: { eq: slug } },
  });

  const doc = result.data.sitePageConnection.edges?.[0]?.node;

  if (!doc || doc.status !== "published" || !doc.passwordProtected) {
    throw new Error("Page not found or not password protected");
  }

  return {
    type: "sections" as const,
    title: doc.title,
    sections: doc.sections,
  };
}

export async function POST(req: NextRequest) {
  const { slug, password } = await req.json();

  if (typeof slug !== "string" || typeof password !== "string") {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const hash = process.env.PROTECTED_PAGE_PASSWORD_HASH;
  if (!hash) {
    return NextResponse.json({ error: "Server not configured" }, { status: 500 });
  }

  let valid = false;
  try {
    valid = await argon2.verify(hash, password);
  } catch {
    valid = false;
  }

  if (!valid) {
    return NextResponse.json({ error: "Incorrect password" }, { status: 401 });
  }

  let content;
  try {
    content = await getContentForSlug(slug);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to load page content";
    return NextResponse.json({ error: message }, { status: 404 });
  }

  const token = createSessionToken(slug);
  const res = NextResponse.json({ ok: true, content });
  res.cookies.set(cookieNameForSlug(slug), token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_TTL_SECONDS,
  });
  return res;
}

export async function GET(req: NextRequest) {
  const slug = req.nextUrl.searchParams.get("slug");
  if (!slug) {
    return NextResponse.json({ error: "Missing slug" }, { status: 400 });
  }

  const token = req.cookies.get(cookieNameForSlug(slug))?.value;
  if (!token || !verifySessionToken(token, slug)) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  try {
    const content = await getContentForSlug(slug);
    return NextResponse.json({ ok: true, content });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to load page content";
    return NextResponse.json({ error: message }, { status: 404 });
  }
}
