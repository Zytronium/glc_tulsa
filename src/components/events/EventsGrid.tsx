"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { tinaField } from "tinacms/dist/react";
import { IconMapPin, IconClock, IconChevronRight, IconSearch } from "@/components/home/icons";
import type { EventConnectionQuery } from "@/../tina/__generated__/types";
import { getNextWeeklyOccurrence, isWithinSeason } from "@/lib/recurring-events";

type EventNode = NonNullable<NonNullable<EventConnectionQuery["eventConnection"]["edges"]>[number]>["node"];

type Props = { events: NonNullable<EventNode>[] };

function getFileName(id: string) {
  const lastSlash = id.lastIndexOf("/");
  const lastDot = id.lastIndexOf(".json");
  return id.substring(lastSlash + 1, lastDot);
}

function startOfTodayUTC() {
  const d = new Date();
  d.setUTCHours(0, 0, 0, 0);
  return d;
}

// -------- fuzzy matching --------
const MONTH_NAMES = [
  "january", "february", "march", "april", "may", "june",
  "july", "august", "september", "october", "november", "december",
];

// subsequence-based fuzzy match: every char in `query` must appear
// in `text` in order, not necessarily contiguous
function fuzzyMatch(text: string, query: string): boolean {
  if (!query) return true;
  let ti = 0;
  let qi = 0;
  const t = text.toLowerCase();
  const q = query.toLowerCase();
  while (ti < t.length && qi < q.length) {
    if (t[ti] === q[qi]) qi++;
    ti++;
  }
  return qi === q.length;
}

function dateMatches(event: NonNullable<EventNode>, query: string): boolean {
  const q = query.toLowerCase().trim();
  if (!q) return false;

  const d = new Date(event.date);
  const monthName = d.toLocaleString("en-US", { month: "long", timeZone: "UTC" }).toLowerCase();
  const monthShort = d.toLocaleString("en-US", { month: "short", timeZone: "UTC" }).toLowerCase();
  const day = String(d.getUTCDate());
  const year = String(d.getUTCFullYear());
  const isoDate = event.date.slice(0, 10); // "YYYY-MM-DD"

  // full or partial month name match (e.g. "december" or "decem")
  if (MONTH_NAMES.some((m) => m.startsWith(q) && q.length >= 3)) {
    return monthName === MONTH_NAMES.find((m) => m.startsWith(q));
  }

  return (
    monthName.includes(q) ||
    monthShort.includes(q) ||
    day === q ||
    year === q ||
    isoDate.includes(q)
  );
}

function eventMatchesQuery(event: NonNullable<EventNode>, query: string): boolean {
  const q = query.trim();
  if (!q) return true;

  const haystack = [
    event.title,
    event.detail,
    event.eventType,
    event.locationLabel ?? "",
    ...(Array.isArray(event.tags) ? event.tags : []),
  ].join(" ");

  return fuzzyMatch(haystack, q) || dateMatches(event, q);
}

export function EventsGrid({ events }: Props) {
  const [showPast, setShowPast] = useState(false);
  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<string | null>(null);
  const [tagFilters, setTagFilters] = useState<string[]>([]);

  const today = startOfTodayUTC();

// -------- resolve recurring events to their next occurrence --------
  const resolvedEvents = events
    .map((e) => {
      if (!e.recurring) return e;

      const nextDate = getNextWeeklyOccurrence(new Date(e.date), today);

      if (e.seasonal && e.seasonStart && e.seasonEnd) {
        const inSeason = isWithinSeason(nextDate, new Date(e.seasonStart), new Date(e.seasonEnd));
        if (!inSeason) return null; // hide entirely, out of season
      }

      return { ...e, date: nextDate.toISOString() };
    })
    .filter((e): e is NonNullable<typeof e> => e !== null);

  // -------- derive available filter options --------
  const allTypes = useMemo(() => {
    const set = new Set<string>();
    resolvedEvents.forEach((e) => e.eventType && set.add(e.eventType));
    return Array.from(set).sort();
  }, [resolvedEvents]);

  const allTags = useMemo(() => {
    const set = new Set<string>();
    resolvedEvents.forEach((e) => {
      if (Array.isArray(e.tags)) {
        e.tags.forEach((t) => t && set.add(t));
      }
    });
    return Array.from(set).sort();
  }, [resolvedEvents]);

  function toggleTag(tag: string) {
    setTagFilters((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  }

  function clearFilters() {
    setTypeFilter(null);
    setTagFilters([]);
    setQuery("");
  }

  const hasActiveFilters = query.trim() !== "" || typeFilter !== null || tagFilters.length > 0;

  // -------- filter pipeline --------
  const filtered = resolvedEvents.filter((e) => {
    if (query.trim() && !eventMatchesQuery(e, query)) return false;
    if (typeFilter && e.eventType !== typeFilter) return false;
    if (tagFilters.length > 0) {
      const eventTags = Array.isArray(e.tags) ? e.tags : [];
      if (!tagFilters.every((t) => eventTags.includes(t))) return false;
    }
    return true;
  });

  const upcoming = filtered
    .filter((e) => new Date(e.date) >= today)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const past = filtered
    .filter((e) => new Date(e.date) < today)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <section
      className="bg-white"
      style={{
        backgroundImage: "url('/images/paper.png')",
        backgroundRepeat: "repeat-y",
        backgroundSize: "100% auto",
        backgroundPosition: "center",
      }}
    >
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="mt-3 font-display text-[28px] font-medium leading-tight text-ink sm:text-[32px]">
              Services &amp; Events
            </h1>
            <Link
              href="/calendar"
              className="mt-2 inline-flex items-center gap-1.5 text-sm text-stone-700 transition hover:text-garnet-700"
            >
              View full calendar
              <IconChevronRight className="h-3.5 w-3.5"/>
            </Link>
          </div>

          <label className="flex cursor-pointer items-center gap-2.5 text-[13px] text-stone-700">
            <span>Show past events</span>
            <span
              role="switch"
              aria-checked={showPast}
              onClick={() => setShowPast((v) => !v)}
              className={`relative inline-flex h-5 w-9 shrink-0 items-center rounded-full transition ${
                showPast ? "bg-garnet-700" : "bg-stone-300"
              }`}
            >
              <span
                className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition ${
                  showPast ? "translate-x-4.5" : "translate-x-1"
                }`}
              />
            </span>
          </label>
        </div>

        {/* -------- search & filters -------- */}
        <div className="mb-8 flex flex-col gap-4">
          <div className="relative max-w-md">
            <IconSearch className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name, type, tag, or date..."
              className="w-full rounded-sm border border-stone-300 bg-white py-2 pl-9 pr-3 text-[13px] text-ink placeholder:text-stone-400 focus:border-garnet-600 focus:outline-none"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {allTypes.map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setTypeFilter((prev) => (prev === type ? null : type))}
                className={`rounded-full border px-3 py-1 text-[12px] transition ${
                  typeFilter === type
                    ? "border-garnet-700 bg-garnet-700 text-white"
                    : "border-stone-300 bg-white text-stone-700 hover:border-garnet-600/50"
                }`}
              >
                {type === "Service" ? "Worship Service" : type}
              </button>
            ))}

            {allTags.length > 0 && (
              <span className="mx-1 h-4 w-px bg-stone-300" aria-hidden />
            )}

            {allTags.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => toggleTag(tag)}
                className={`rounded-full border px-3 py-1 text-[12px] transition ${
                  tagFilters.includes(tag)
                    ? "border-garnet-700 bg-garnet-700 text-white"
                    : "border-stone-300 bg-white text-stone-700 hover:border-garnet-600/50"
                }`}
              >
                {tag}
              </button>
            ))}

            {hasActiveFilters && (
              <button
                type="button"
                onClick={clearFilters}
                className="ml-1 text-[12px] text-stone-500 underline decoration-stone-400 underline-offset-2 hover:text-garnet-700"
              >
                Clear all
              </button>
            )}
          </div>
        </div>

        {upcoming.length === 0 ? (
          <p className="text-[14px] text-stone-700">
            {hasActiveFilters
              ? "No events match your search or filters."
              : "No upcoming events are scheduled at this time."}
          </p>
        ) : (
          <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {upcoming.map((event, index) => (
              <EventCard key={event.date + event.title} event={event} highlighted={index === 0 && !hasActiveFilters} />
            ))}
          </ul>
        )}

        {showPast && past.length > 0 && (
          <div className="mt-16">
            <h2 className="mb-6 font-display text-[20px] font-medium text-stone-700">
              Past events
            </h2>
            <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {past.map((event) => (
                <EventCard key={event.date + event.title} event={event} isPast />
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}

function EventCard({ event, highlighted = false, isPast = false, }: {
  event: NonNullable<EventNode>;
  highlighted?: boolean;
  isPast?: boolean;
}) {
  const d = new Date(event.date);
  const month = d.toLocaleString("en-US", { month: "short", timeZone: "UTC" });
  const day = String(d.getUTCDate());

  return (
    <li>
      <Link
        href={`/events/${getFileName(event.id)}`}
        className={`group flex h-full flex-col overflow-hidden rounded-card border border-stone-200 bg-stone-50 transition hover:border-garnet-600/40 hover:shadow-sm ${
          isPast ? "opacity-70" : ""
        }`}
      >
        {/* -------- image -------- */}
        <div className="relative h-48 w-full shrink-0 overflow-hidden bg-stone-200 sm:h-56">
          {event.image ? (
            <Image
              fill
              src={event.image}
              alt={event.title}
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover transition duration-300 group-hover:scale-[1.03]"
              data-tina-field={tinaField(event, "image")}
            />
          ) : (
            <Image
              fill
              src="/images/aged_paper.png"
              alt="no image"
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover transition duration-300 group-hover:scale-[1.03]"
              data-tina-field={tinaField(event, "image")}
            />
          )}

          {/* -------- date badge -------- */}
          <div
            className={`absolute left-3 top-3 min-w-[3rem] rounded-sm px-2.5 py-1.5 text-center font-meta shadow-sm ${
              highlighted
                ? "bg-garnet-700 text-white"
                : "bg-white/95 text-stone-800"
            }`}
          >
            <p className="text-[9px] uppercase tracking-[0.06em] opacity-90">
              {month}
            </p>
            <p className="text-[16px] leading-none">{day}</p>
          </div>
        </div>

        {/* -------- content -------- */}
        <div className="flex flex-1 flex-col gap-2.5 px-5 py-4">
          <div>
            <p
              data-tina-field={tinaField(event, "title")}
              className="font-display text-[17px] leading-snug text-ink"
            >
              {event.title}
            </p>
            <p
              data-tina-field={tinaField(event, "detail")}
              className="mt-0.5 text-[13px] text-stone-700"
            >
              {event.detail}
            </p>
          </div>

          <div className="mt-auto">
            <p
              data-tina-field={tinaField(event, "eventType")}
              className="text-[13px] text-shadow-garnet-700/85"
            >
              {event.eventType === "Service" ? "Worship Service" : "Event"}
            </p>
          </div>

          <div className="flex flex-col gap-1.5 border-t border-stone-200 pt-2.5">
            {event.time && (
              <p
                data-tina-field={tinaField(event, "time")}
                className="flex items-center gap-1.5 text-[12px] text-stone-700"
              >
                <IconClock className="h-3.5 w-3.5 shrink-0 text-brass-500" />
                {event.time}
              </p>
            )}
            {event.locationLabel && (
              <p
                data-tina-field={tinaField(event, "locationLabel")}
                className="flex items-center gap-1.5 text-[12px] text-stone-700"
              >
                <IconMapPin className="h-3.5 w-3.5 shrink-0 text-brass-500" />
                {event.locationLabel}
              </p>
            )}
          </div>

          <div className="flex items-center justify-end text-stone-300 transition group-hover:text-garnet-600">
            <IconChevronRight className="h-4 w-4" />
          </div>
        </div>
      </Link>
    </li>
  );
}
