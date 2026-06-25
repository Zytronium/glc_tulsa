import Link from "next/link";
import { IconArrowRight, IconChevronRight } from "./icons";

import type { EventNode } from "@/app/page";
type Props = { events: EventNode[] };

export function UpcomingEvents({ events }: Props) {
  return (
    <section
      className="border-b border-stone-200 bg-stone-100"
      style={{
        backgroundImage: "url('/images/aged_paper.png')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="mx-auto max-w-3xl px-5 py-14 sm:px-8 sm:py-20">
        <div className="mb-7 flex items-baseline justify-between">
          <h2 className="font-display text-[22px] font-medium text-ink">
            Upcoming services &amp; events
          </h2>
          <Link
            href="/events"
            className="flex items-center gap-1 text-[12.5px] text-stone-700 hover:text-garnet-700"
          >
            Full calendar
            <IconArrowRight className="h-3 w-3" />
          </Link>
        </div>

        <ul className="flex flex-col gap-2.5">
          {events.map((event) => {
            const d = new Date(event.date);
            const month = d.toLocaleString("en-US", { month: "short" });
            const day = String(d.getUTCDate());

            return (
              <li key={event.date}>
                <Link
                  href="/events"
                  className="flex items-center gap-4 rounded-sm border border-stone-200 bg-white px-4 py-3.5 transition hover:border-garnet-600/40"
                >
                  <div
                    className={`min-w-[3.25rem] rounded-sm px-2 py-1.5 text-center font-meta ${
                      event.featured
                        ? "bg-garnet-700 text-stone-50"
                        : "border border-stone-200 text-stone-700"
                    }`}
                  >
                    <p className="text-[9px] uppercase tracking-[0.06em] opacity-90">
                      {month}
                    </p>
                    <p className="text-[17px] leading-none">{day}</p>
                  </div>
                  <div className="flex-1">
                    <p className="font-display text-[15px] text-ink">
                      {event.title}
                    </p>
                    <p className="mt-0.5 text-[12.5px] text-stone-700">
                      {event.detail}
                    </p>
                  </div>
                  <IconChevronRight className="h-4 w-4 shrink-0 text-stone-300" />
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
