"use client";

import { useEffect, useMemo, useState } from "react";
import { IconChevronRight } from "@/components/home/icons";

type CalendarEvent = {
  title: string;
  date: string;
  detail?: string | null;
  featured?: boolean | null;
};

type Props = {
  events: CalendarEvent[];
};

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// -------- build a 6-week grid for the given month, padded with adjacent days --------
function buildMonthGrid(year: number, month: number) {
  const firstOfMonth = new Date(year, month, 1);
  const startOffset = firstOfMonth.getDay();
  const gridStart = new Date(year, month, 1 - startOffset);

  return Array.from({ length: 42 }, (_, i) => {
    const date = new Date(gridStart);
    date.setDate(gridStart.getDate() + i);
    return date;
  });
}

function dateKey(date: Date) {
  return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
}

function isSameDay(a: Date, b: Date) {
  return dateKey(a) === dateKey(b);
}

function startOfDay(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

// accepts "2025-06-28" or a full ISO string, parsed as a local date so timezone can't shift the day
function parseLocalDate(value: string) {
  const match = value.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (!match) return null;
  const [, y, m, d] = match;
  return new Date(Number(y), Number(m) - 1, Number(d));
}

// events are pre-sorted ascending by date, so pick the nearest upcoming one to
// open on. falling back to "today" left the calendar on an empty month
// whenever nothing was happening today.
function getDefaultFocusDate(events: CalendarEvent[], today: Date) {
  if (events.length === 0) return today;

  const todayStart = startOfDay(today);
  const upcoming = events.find((event) => {
    const eventDate = parseLocalDate(event.date) ?? new Date(event.date);
    return eventDate.getTime() >= todayStart.getTime();
  });
  if (upcoming) return parseLocalDate(upcoming.date) ?? new Date(upcoming.date);

  const lastEvent = events[events.length - 1];
  return parseLocalDate(lastEvent.date) ?? new Date(lastEvent.date);
}

export function Calendar({ events }: Props) {
  const today = useMemo(() => new Date(), []);
  const defaultFocus = useMemo(() => getDefaultFocusDate(events, today), [events, today]);
  const [cursor, setCursor] = useState(() => new Date(defaultFocus.getFullYear(), defaultFocus.getMonth(), 1));
  const [selected, setSelected] = useState<Date | null>(defaultFocus);

  // -------- jump to and highlight the day passed in ?highlight= --------
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const highlight = params.get("highlight");
    if (!highlight) return;

    const parsed = parseLocalDate(highlight);
    if (!parsed) return;

    setCursor(new Date(parsed.getFullYear(), parsed.getMonth(), 1));
    setSelected(parsed);
  }, []);

  // -------- group events by day for quick lookup, parsed locally so a date-only string never shifts a day --------
  const eventsByDay = useMemo(() => {
    const map = new Map<string, CalendarEvent[]>();
    for (const event of events) {
      const eventDate = parseLocalDate(event.date) ?? new Date(event.date);
      const key = dateKey(eventDate);
      const list = map.get(key) ?? [];
      list.push(event);
      map.set(key, list);
    }
    return map;
  }, [events]);

  const grid = useMemo(
    () => buildMonthGrid(cursor.getFullYear(), cursor.getMonth()),
    [cursor]
  );

  const selectedEvents = selected ? eventsByDay.get(dateKey(selected)) ?? [] : [];

  function goToMonth(offset: number) {
    setCursor((prev) => new Date(prev.getFullYear(), prev.getMonth() + offset, 1));
  }

  return (
    <div className="mt-10">
      {/* -------- month nav -------- */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => goToMonth(-1)}
          aria-label="Previous month"
          className="rounded-sm border border-stone-200 p-2 text-stone-700 transition hover:border-garnet-600/40 hover:text-garnet-600"
        >
          <IconChevronRight className="h-4 w-4 rotate-180" />
        </button>
        <h2 className="font-display text-[22px] text-ink sm:text-[26px]">
          {cursor.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
        </h2>
        <button
          type="button"
          onClick={() => goToMonth(1)}
          aria-label="Next month"
          className="rounded-sm border border-stone-200 p-2 text-stone-700 transition hover:border-garnet-600/40 hover:text-garnet-600"
        >
          <IconChevronRight className="h-4 w-4" />
        </button>
      </div>

      {/* -------- weekday row -------- */}
      <div className="mt-6 grid w-full grid-cols-7 border-x border-t border-stone-200">
        {WEEKDAYS.map((day) => (
          <div
            key={day}
            className="border-r border-stone-200 py-2 text-center font-meta text-[10px] uppercase tracking-[0.14em] text-stone-500 last:border-r-0"
          >
            {day}
          </div>
        ))}
      </div>

      {/* -------- day grid, borders shared between cells so there's no gap -------- */}
      <div className="grid w-full grid-cols-7 border-x border-b border-stone-200">
        {grid.map((date, i) => {
          const inMonth = date.getMonth() === cursor.getMonth();
          const dayEvents = eventsByDay.get(dateKey(date)) ?? [];
          const hasFeatured = dayEvents.some((e) => e.featured);
          const isToday = isSameDay(date, today);
          const isSelected = selected && isSameDay(date, selected);
          const visibleEvents = dayEvents.slice(0, 3);
          const hiddenCount = dayEvents.length - visibleEvents.length;
          const isClickable = dayEvents.length > 0;

          return (
            <button
              key={i}
              type="button"
              onClick={() => {
                if (isClickable) setSelected(date);
              }}
              aria-disabled={!isClickable}
              className={[
                "relative flex w-full min-h-24 flex-col items-start gap-1 border-b border-r p-1.5 text-left align-top transition sm:min-h-32 sm:p-2",
                "[&:nth-child(7n)]:border-r-0",
                isSelected ? "border-garnet-600 ring-1 ring-inset ring-garnet-600" : "border-stone-200",
                !inMonth ? "bg-stone-50 text-stone-300" : hasFeatured ? "bg-brass-200/25" : dayEvents.length > 0 ? "bg-garnet-50" : "bg-white text-ink",
                isClickable ? "cursor-pointer hover:bg-garnet-50/70" : "cursor-default",
              ].join(" ")}
            >
              <span
                className={[
                  "flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[12px] sm:text-[13px]",
                  isToday ? "bg-vestment-700 font-semibold text-stone-50" : "",
                ].join(" ")}
              >
                {date.getDate()}
              </span>

              <div className="flex w-full flex-1 flex-col gap-0.5 overflow-hidden">
                {visibleEvents.map((event, j) => (
                  <p
                    key={j}
                    className={[
                      "truncate border-l-2 pl-1 text-[10px] leading-4 sm:text-[11px]",
                      event.featured
                        ? "border-brass-500 text-brass-500"
                        : "border-garnet-600 text-garnet-700",
                    ].join(" ")}
                  >
                    {event.title}
                  </p>
                ))}
                {hiddenCount > 0 && (
                  <p className="pl-1 text-[10px] text-stone-500 sm:text-[11px]">
                    +{hiddenCount} more
                  </p>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* -------- agenda for selected day -------- */}
      <div className="mt-10">
        <p className="font-meta text-[11px] uppercase tracking-[0.18em] text-garnet-600">
          {selected
            ? selected.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })
            : "Select a day"}
        </p>

        {selectedEvents.length === 0 ? (
          <p className="mt-3 text-[14px] text-stone-500">
            No events scheduled for this day.
          </p>
        ) : (
          <div className="mt-3 space-y-3">
            {selectedEvents.map((event) => (
              <div
                key={event.title}
                className="border-l-2 border-brass-500 bg-stone-50 py-3 pl-4 pr-3"
              >
                <p className="font-display text-[16px] text-ink">{event.title}</p>
                {event.detail && (
                  <p className="mt-1 text-[13px] leading-6 text-stone-700">{event.detail}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
