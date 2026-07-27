"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { tinaField } from "tinacms/dist/react";
import { IconMapPin, IconClock, IconChevronRight } from "@/components/home/icons";
import type { EventConnectionQuery } from "@/../tina/__generated__/types";

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

export function EventsGrid({ events }: Props) {
  const [showPast, setShowPast] = useState(false);

  const today = startOfTodayUTC();

  const upcoming = events
    .filter((e) => new Date(e.date) >= today)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const past = events
    .filter((e) => new Date(e.date) < today)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

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

        {upcoming.length === 0 ? (
          <p className="text-[14px] text-stone-700">
            No upcoming events are scheduled at this time.
          </p>
        ) : (
          <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {upcoming.map((event, index) => (
              <EventCard key={event.date + event.title} event={event} highlighted={index === 0} />
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
