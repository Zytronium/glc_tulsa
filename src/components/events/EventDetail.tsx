import Image from "next/image";
import Link from "next/link";
import { tinaField } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { IconArrowLeft, IconCalendar, IconMapPin, IconClock } from "@/components/home/icons";
import type { EventQuery } from "@/../tina/__generated__/types";

type Props = { event: EventQuery["event"] };

export function EventDetail({ event }: Props) {
  const d = new Date(event.date);
  const month = d.toLocaleString("en-US", { month: "long", timeZone: "UTC" });
  const day = String(d.getUTCDate());
  const year = d.getUTCFullYear();
  const weekday = d.toLocaleString("en-US", { weekday: "long", timeZone: "UTC" });

  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-vestment-900">
        {event.image ? (
          <Image
            src={event.image}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-center opacity-40"
            data-tina-field={tinaField(event, "image")}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center opacity-20">
            <span className="arch-top h-24 w-40 border border-brass-300" />
          </div>
        )}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-linear-to-b from-vestment-900/60 via-vestment-900/50 to-vestment-900/90"
        />
        <div className="relative mx-auto flex max-w-3xl flex-col items-center px-6 py-24 text-center sm:py-32">
          <p className="font-meta text-[11px] uppercase tracking-[0.22em] text-brass-400">
            {weekday}, {month} {day}, {year}
          </p>
          <h1
            data-tina-field={tinaField(event, "title")}
            className="mt-4 font-display text-[clamp(1.75rem,4vw,3rem)] font-medium leading-tight text-stone-50"
          >
            {event.title}
          </h1>
          <p
            data-tina-field={tinaField(event, "detail")}
            className="mt-5 max-w-xl text-[15px] leading-7 text-stone-200/85"
          >
            {event.detail}
          </p>
        </div>
      </section>

      {/* details & content */}
      <section
        className="border-b border-stone-200 bg-white"
        style={{
          backgroundImage: "url('/images/paper.png')",
          backgroundRepeat: "repeat-y",
          backgroundSize: "100% auto",
          backgroundPosition: "center",
        }}
      >
        <div className="mx-auto grid max-w-4xl gap-10 px-5 py-14 sm:px-8 sm:py-20 md:grid-cols-[0.9fr_1.6fr] md:gap-14">
          {/* info card */}
          <div className="h-fit rounded-card border border-stone-200 bg-stone-50 p-6">
            <p className="font-meta text-[11px] uppercase tracking-[0.18em] text-garnet-600">
              Details
            </p>

            <div className="mt-4 flex flex-col gap-4">
              <div className="flex items-start gap-3">
                <IconCalendar className="mt-0.5 h-4.5 w-4.5 shrink-0 text-brass-500" />
                <p className="text-[14px] leading-6 text-stone-700">
                  {weekday}, {month} {day}, {year}
                </p>
              </div>

              {event.time && (
                <div className="flex items-start gap-3">
                  <IconClock className="mt-0.5 h-4.5 w-4.5 shrink-0 text-brass-500" />
                  <p
                    data-tina-field={tinaField(event, "time")}
                    className="text-[14px] leading-6 text-stone-700"
                  >
                    {event.time}
                  </p>
                </div>
              )}

              {(event.locationLabel || event.location) && (
                <div className="flex items-start gap-3">
                  <IconMapPin className="mt-0.5 h-4.5 w-4.5 shrink-0 text-brass-500" />
                  <div className="text-[14px] leading-6 text-stone-700">
                    {event.locationLabel && (
                      <p data-tina-field={tinaField(event, "locationLabel")}>
                        {event.locationLabel}
                      </p>
                    )}
                    {event.location && (
                      <p
                        data-tina-field={tinaField(event, "location")}
                        className="text-stone-500"
                      >
                        {event.location}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/events"
              className="mt-6 flex items-center gap-1 text-[12.5px] text-stone-700 hover:text-garnet-700"
            >
              <IconArrowLeft className="h-3 w-3" />
              Back to events
            </Link>
          </div>

          {/* rich text content */}
          {event.content && (
            <div
              data-tina-field={tinaField(event, "content")}
              className="prose prose-stone max-w-none p-4 rounded-card text-base leading-7 text-stone-700 prose-headings:font-display prose-headings:text-ink prose-strong:text-ink border border-stone-100 bg-white">
              <p className="font-meta text-[11px] uppercase tracking-[0.18em] text-garnet-600">
                Description
              </p>
              <div className="tina-markdown">
                <TinaMarkdown content={event.content} />
              </div>
            </div>
          )}

          {/* live stream link */}
          {event.liveStreamLink && (
            <div className="h-fit rounded-card border border-stone-200 bg-stone-50 p-6 md:col-span-2">
              <p className="font-meta text-[11px] uppercase tracking-[0.18em] text-garnet-600 mb-4">
                Live Stream
              </p>
              <a
                href={event.liveStreamLink}
                target="_blank"
                rel="noopener noreferrer"
                data-tina-field={tinaField(event, "liveStreamLink")}
                className="text-[14px] leading-6 text-vestment-600 hover:text-garnet-700 underline break-all"
              >
                {event.liveStreamLink}
              </a>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
