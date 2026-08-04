"use client";

import { useEffect, useState } from "react";
import { SectionRenderer } from "@/components/pages/SectionRenderer";
import { EmbedRenderer } from "@/components/EmbedRenderer";

type EmbedContent = { type: "embed"; title: string; embedCode: string };
type SectionsContent = { type: "sections"; title: string; sections: (Record<string, unknown> | null)[] };
type Content = EmbedContent | SectionsContent;

type Props = {
  slug: string;
};

export function PasswordGate({ slug }: Props) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState<Content | null>(null);
  const [checkedSession, setCheckedSession] = useState(false);

  // -------- on mount, silently check for an existing valid session (e.g. after refresh) --------
  useEffect(() => {
    let cancelled = false;

    async function checkSession() {
      try {
        const res = await fetch(`/api/protected-page?slug=${encodeURIComponent(slug)}`);
        if (res.ok) {
          const data = await res.json();
          if (!cancelled) setContent(data.content);
        }
      } finally {
        if (!cancelled) setCheckedSession(true);
      }
    }

    checkSession();
    return () => {
      cancelled = true;
    };
  }, [slug]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/protected-page", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Incorrect password");
        return;
      }

      setContent(data.content);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  // -------- avoid a flash of the password form while checking an existing session --------
  if (!checkedSession) {
    return null;
  }

  if (content) {
    if (content.type === "embed") {
      return (
        <section className="mx-auto max-w-2xl px-5 py-16 sm:px-8">
          <h1 className="mb-6 text-center font-display text-[24px] text-ink">{content.title}</h1>
          <EmbedRenderer code={content.embedCode} />
        </section>
      );
    }
    return <SectionRenderer sections={content.sections} />;
  }

  return (
    <section className="flex min-h-[60vh] items-center justify-center bg-white px-5">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-card border border-stone-200 bg-stone-50 p-8"
      >
        <h1 className="font-display text-[20px] text-ink">This page is password protected</h1>
        <p className="mt-2 text-[13px] text-stone-600">
          Enter the password to view this page.
        </p>

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoFocus
          className="mt-5 w-full rounded-sm border border-stone-300 px-3 py-2 text-[14px] focus:border-garnet-600 focus:outline-none"
          placeholder="Password"
        />

        {error && <p className="mt-2 text-[13px] text-garnet-700">{error}</p>}

        <button
          type="submit"
          disabled={loading || !password}
          className="mt-4 w-full rounded-sm bg-garnet-700 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-garnet-800 disabled:opacity-50"
        >
          {loading ? "Checking..." : "Enter"}
        </button>
      </form>
    </section>
  );
}
