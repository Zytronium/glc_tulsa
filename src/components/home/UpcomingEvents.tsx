import Link from "next/link";
import Image from "next/image";
import { IconArrowRight, IconChevronRight } from "./icons";

import type { EventNode } from "@/app/(main)/page";
import {tinaField} from "tinacms/react";
type Props = { events: EventNode[] };

function getFileName(id: string) {
  const lastSlash = id.lastIndexOf("/");
  const lastDot = id.lastIndexOf(".json");
  return id.substring(lastSlash + 1, lastDot);
}

export function UpcomingEvents({ events }: Props) {
  const startOfTodayUTC = new Date();
  startOfTodayUTC.setUTCHours(0, 0, 0, 0);

  // filter out past events but keep today's events
  events = events.filter((e) => new Date(e.date) >= startOfTodayUTC);
  // only show featured events
  events = events.filter((e) => e.featured)
  return (
    <section
      className="border-b border-stone-100 bg-white"
      style={{
        backgroundImage: "url('/images/paper.png')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="mx-auto max-w-5xl px-5 py-14 sm:px-8 sm:py-20">
        <p className="font-meta text-[11px] uppercase tracking-[0.18em] text-garnet-600 mb-4">
          Events & Services
        </p>
        <div className="mb-7 flex items-baseline justify-between">
          <h2 className="font-display text-[22px] font-medium text-ink">
            Featured Upcoming Services &amp; Events
          </h2>
          <Link
            href="/events"
            className="flex items-center gap-1 text-sm text-stone-700 hover:text-garnet-700"
          >
            View all
            <IconArrowRight className="h-3 w-3" />
          </Link>
        </div>

        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {events.map((event, index) => {
            // limit to 6 events
            if (index > 5)
              return null;

            const d = new Date(event.date);
            const month = d.toLocaleString("en-US", { month: "short" });
            const day = String(d.getUTCDate());

            return (
              <li key={event.id}>
                <Link
                  href={`/events/${getFileName(event.id)}`}
                  className="group flex h-full flex-col overflow-hidden rounded-card border border-stone-200 bg-stone-50 transition hover:border-garnet-600/40 hover:shadow-sm"
                >
                  {/* image */}
                  <div className="relative h-32 w-full shrink-0 overflow-hidden bg-stone-200 sm:h-40">
                    {event.image ? (
                      <Image
                        fill
                        src={event.image}
                        alt={event.title}
                        className="object-cover transition duration-300 group-hover:scale-[1.03]"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-stone-50"
                           style={{
                             backgroundImage: "url('/images/aged_paper.png')",
                             backgroundRepeat: "no-repeat",
                             backgroundSize: "cover",
                             backgroundPosition: "center",
                           }}
                      />
                    )}

                    {/* date badge */}
                  <div
                      className={`absolute left-3 top-3 min-w-[2.75rem] rounded-sm px-2 py-1 text-center font-meta shadow-sm ${
                      index === 0
                        ? "bg-garnet-700 text-white"
                          : "bg-white/95 text-stone-800"
                    }`}
                  >
                      <p className="text-[8px] uppercase tracking-[0.06em] opacity-90">
                      {month}
                    </p>
                      <p className="text-[14px] leading-none">{day}</p>
                    </div>
                  </div>

                  {/* content */}
                  <div className="flex flex-1 items-start justify-between gap-2 px-4 py-3.5">
                    <div className="min-w-0">
                      <p className="font-display text-[15px] leading-snug text-ink">
                      {event.title}
                    </p>
                      <p className="mt-0.5 truncate text-sm text-stone-700">
                      {event.detail}
                    </p>
                      <p className="text-sm text-shadow-garnet-700/85">
                        {event.eventType === "Service" ? "Worship Service" : "Event"}
                      </p>
                  </div>
                    <IconChevronRight className="mt-1 h-4 w-4 shrink-0 text-stone-300 transition group-hover:text-garnet-600" />
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
