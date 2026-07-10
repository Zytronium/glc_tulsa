"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { tinaField } from "tinacms/dist/react";
import { IconCalendar, IconChevronRight } from "@/components/home/icons";
import type { NewsItemConnectionQuery } from "@/../tina/__generated__/types";

type NewsNode = NonNullable<NonNullable<NewsItemConnectionQuery["newsItemConnection"]["edges"]>[number]>["node"];

type Props = { items: NonNullable<NewsNode>[] };

function getFileName(id: string) {
  const lastSlash = id.lastIndexOf("/");
  const lastDot = id.lastIndexOf(".json");
  return id.substring(lastSlash + 1, lastDot);
}

function getHref(item: NonNullable<NewsNode>) {
  const base = item.type === "announcement" ? "/announcements" : "/news";
  return `${base}/${getFileName(item.id)}`;
}

function oneYearAgo() {
  const d = new Date();
  d.setUTCFullYear(d.getUTCFullYear() - 1);
  return d;
}

export function NewsGrid({ items }: Props) {
  const [showOlder, setShowOlder] = useState(false);

  const sorted = [...items].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const cutoff = oneYearAgo();
  const recent = sorted.filter((item) => new Date(item.date) >= cutoff);
  const older = sorted.filter((item) => new Date(item.date) < cutoff);

  const visible = showOlder ? sorted : recent;

  return (
    <section
      className="bg-white"
      style={{
        backgroundImage: "url('/images/paper.png')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20">
        <div className="mb-10">
          <p className="font-meta text-[11px] uppercase tracking-[0.18em] text-garnet-600">
            Stay informed
          </p>
          <h1 className="mt-3 font-display text-[28px] font-medium leading-tight text-ink sm:text-[32px]">
            News &amp; Announcements
          </h1>
        </div>

        {visible.length === 0 ? (
          <p className="text-[14px] text-stone-700">
            No recent news or announcements.
          </p>
        ) : (
          <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {visible.map((item) => (
              <NewsCard key={item.id} item={item} />
            ))}
          </ul>
        )}

        {!showOlder && older.length > 0 && (
          <div className="mt-10 flex justify-center">
            <button
              onClick={() => setShowOlder(true)}
              className="rounded-sm border border-stone-300 px-5 py-2.5 text-[13px] text-stone-700 transition hover:border-garnet-600/40 hover:text-garnet-700"
            >
              Load older items
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

function NewsCard({ item }: { item: NonNullable<NewsNode> }) {
  const d = new Date(item.date);
  const month = d.toLocaleString("en-US", { month: "short", timeZone: "UTC" });
  const day = String(d.getUTCDate());
  const year = d.getUTCFullYear();

  return (
    <li>
      <Link
        href={getHref(item)}
        className="group flex h-full flex-col overflow-hidden rounded-card border border-stone-200 bg-stone-50 transition hover:border-garnet-600/40 hover:shadow-sm"
      >
        <div className="relative h-40 w-full shrink-0 overflow-hidden bg-stone-200">
          {item.image ? (
            <Image
              fill
              src={item.image}
              alt={item.title}
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover transition duration-300 group-hover:scale-[1.03]"
              data-tina-field={tinaField(item, "image")}
            />
          ) : (
            <Image
              fill
              src="/images/aged_paper.png"
              alt="no image"
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover transition duration-300 group-hover:scale-[1.03]"
              data-tina-field={tinaField(item, "image")}
            />
          )}

          <span
            className={`absolute left-3 top-3 rounded-sm px-2 py-1 text-[10px] font-meta uppercase tracking-[0.06em] shadow-sm ${
              item.type === "announcement"
                ? "bg-garnet-700 text-white"
                : "bg-vestment-700 text-white"
            }`}
          >
            {item.type === "announcement" ? "Announcement" : "News"}
          </span>
        </div>

        <div className="flex flex-1 flex-col gap-2 px-5 py-4">
          <p
            data-tina-field={tinaField(item, "date")}
            className="flex items-center gap-1.5 text-[11px] text-stone-500"
          >
            <IconCalendar className="h-3.25 w-3.25 text-brass-500" />
            {month} {day}, {year}
          </p>
          <p
            data-tina-field={tinaField(item, "title")}
            className="font-display text-[16px] leading-snug text-ink"
          >
            {item.title}
          </p>
          <p
            data-tina-field={tinaField(item, "summary")}
            className="text-[13px] leading-6 text-stone-700"
          >
            {item.summary}
          </p>

          <div className="mt-auto flex items-center justify-end pt-2 text-stone-300 transition group-hover:text-garnet-600">
            <IconChevronRight className="h-4 w-4" />
          </div>
        </div>
      </Link>
    </li>
  );
}
