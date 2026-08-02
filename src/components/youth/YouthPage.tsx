"use client";

import Image from "next/image";
import { useTina } from "tinacms/dist/react";
import { tinaField } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { EventsGrid } from "@/components/events/EventsGrid";
import type { YouthPageQuery, EventConnectionQuery } from "@/../tina/__generated__/types";

type TinaQuery<T> = { query: string; variables: object; data: T };

type Props = {
  youthQuery: TinaQuery<YouthPageQuery>;
  eventsQuery: TinaQuery<EventConnectionQuery>;
};

const SECTION_BACKGROUNDS = ["/images/paper.png", "/images/aged_paper.png"];

export function YouthPage({ youthQuery, eventsQuery }: Props) {
  const { data: youthData } = useTina(youthQuery);
  const { data: eventsData } = useTina(eventsQuery);

  const youth = youthData.youthPage;
  const events = (eventsData.eventConnection.edges ?? [])
    .map((e) => e?.node)
    .filter((e): e is NonNullable<typeof e> => e !== null && e !== undefined);

  const taggedEvents = youth.eventsTag
    ? events.filter((e) => Array.isArray(e.tags) && e.tags.includes(youth.eventsTag!))
    : events;

  // -------- build the list of sections that will actually render --------
  const sections: React.ReactNode[] = [];

  if (taggedEvents.length > 0) {
    sections.push(
      <div className={"p-6"}>
        <h2 className="font-display text-[24px] font-medium text-ink mb-2">Upcoming Youth Events</h2>
        <div className={"p-2"}>
          <EventsGrid key="events" events={taggedEvents} minimal/>
        </div>
      </div>
    );
  }

  if (youth.summerGathering?.show) {
    sections.push(
      <div key="summer-gathering" className="mx-auto grid max-w-5xl gap-10 px-5 py-16 sm:px-8 md:grid-cols-2 md:items-center">
        {youth.summerGathering.image && (
          <div className="relative h-64 w-full overflow-hidden rounded-card sm:h-80">
            <Image
              fill
              src={youth.summerGathering.image}
              alt=""
              className="object-cover"
              data-tina-field={tinaField(youth.summerGathering, "image")}
            />
          </div>
        )}
        <div>
          <p className="font-meta text-[11px] uppercase tracking-[0.18em] text-garnet-600">
            Summer Gathering
          </p>
          <h2
            data-tina-field={tinaField(youth.summerGathering, "heading")}
            className="mt-2 font-display text-[24px] font-medium text-ink"
          >
            {youth.summerGathering.heading}
          </h2>
          {youth.summerGathering.subheading && (
            <p
              data-tina-field={tinaField(youth.summerGathering, "subheading")}
              className="mt-1 text-[13px] text-stone-500"
            >
              {youth.summerGathering.subheading}
            </p>
          )}
          {youth.summerGathering.body && (
            <div
              data-tina-field={tinaField(youth.summerGathering, "body")}
              className="prose prose-stone mt-4 max-w-none text-[14px] leading-7 text-stone-700"
            >
              <div className="tina-markdown">
                <TinaMarkdown content={youth.summerGathering.body} />
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (youth.gallery && youth.gallery.length > 0) {
    sections.push(
      <div key="gallery" className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
        <p className="mb-6 font-meta text-[11px] uppercase tracking-[0.18em] text-garnet-600">
          Photos
        </p>
        <div
          data-tina-field={tinaField(youth, "gallery")}
          className="flex gap-4 overflow-x-auto pb-2"
        >
          {youth.gallery.map((photo, index) =>
            photo?.image ? (
              <div
                key={index}
                className="relative h-56 w-72 shrink-0 overflow-hidden rounded-card bg-stone-100"
              >
                <Image
                  fill
                  src={photo.image}
                  alt={photo.caption ?? ""}
                  className="object-cover"
                />
              </div>
            ) : null
          )}
        </div>
      </div>
    );
  }

  if (youth.programs && youth.programs.length > 0) {
    sections.push(
      <div key="programs" className="mx-auto max-w-4xl px-5 py-16 sm:px-8">
        <p className="mb-8 font-meta text-[11px] uppercase tracking-[0.18em] text-garnet-600">
          Youth Program
        </p>
        <div className="grid gap-8 sm:grid-cols-2">
          {youth.programs.map((section, index) =>
            section ? (
              <div key={index} className="rounded-card border border-stone-200 bg-stone-50 p-6">
                <h3
                  data-tina-field={tinaField(section, "title")}
                  className="font-display text-[17px] text-ink"
                >
                  {section.title}
                </h3>
                {section.body && (
                  <div
                    data-tina-field={tinaField(section, "body")}
                    className="prose prose-stone prose-sm mt-2 max-w-none text-stone-700"
                  >
                    <div className="tina-markdown">
                      <TinaMarkdown content={section.body} />
                    </div>
                  </div>
                )}
              </div>
            ) : null
          )}
        </div>
      </div>
    );
  }

  return (
    <>
      {/* -------- hero -------- */}
      <section className="border-b border-stone-200 bg-vestment-900">
        <div className="mx-auto max-w-3xl px-5 py-20 text-center sm:px-8">
          <h1
            data-tina-field={tinaField(youth, "heading")}
            className="font-display text-[clamp(1.75rem,4vw,3rem)] font-medium text-stone-50"
          >
            {youth.heading}
          </h1>
          {youth.intro && (
            <div
              data-tina-field={tinaField(youth, "intro")}
              className="prose prose-invert prose-stone mx-auto mt-5 max-w-xl text-[15px] leading-7 text-stone-200/85"
            >
              <div className="tina-markdown">
                <TinaMarkdown content={youth.intro} />
              </div>
            </div>
          )}
        </div>
      </section>

      {/* -------- remaining sections, alternating backgrounds by rendered position -------- */}
      {sections.map((section, index) => (
        <section
          key={index}
          className="border-b border-stone-200 bg-white last:border-b-0"
          style={{
            backgroundImage: `url('${SECTION_BACKGROUNDS[index % SECTION_BACKGROUNDS.length]}')`,
            backgroundRepeat: "repeat-y",
            backgroundSize: "100% auto",
            backgroundPosition: "center",
          }}
        >
          {section}
        </section>
      ))}
    </>
  );
}
