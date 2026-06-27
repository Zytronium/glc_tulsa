import { tinaField } from "tinacms/dist/react";
import type { AboutData } from "@/app/(main)/about/page";

type Props = { mission: NonNullable<AboutData["mission"]> };

export function AboutMission({ mission }: Props) {
  const pillars = (mission.pillars ?? []).filter((p) => p !== null);

  return (
    <section className="border-b border-stone-200 bg-stone-100">
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
        <div className="max-w-2xl">
          <p className="font-meta text-[11px] uppercase tracking-[0.18em] text-garnet-600">
            Our mission
          </p>
          <h2
            data-tina-field={tinaField(mission, "heading")}
            className="mt-3 font-display text-[28px] font-medium leading-tight text-ink sm:text-[32px]"
          >
            {mission.heading}
          </h2>
          {mission.body && (
            <p
              data-tina-field={tinaField(mission, "body")}
              className="mt-5 text-[15px] leading-7 text-stone-700"
            >
              {mission.body}
            </p>
          )}
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {pillars.map((pillar) => {
            const details = (pillar.details ?? []).filter((d) => d !== null);
            return (
              <div
                key={pillar.label}
                className="rounded-sm border border-stone-200 bg-white p-6"
                style={{
                  backgroundImage: "url('/images/paper.png')",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <p
                  data-tina-field={tinaField(pillar, "label")}
                  className="font-meta text-[11px] uppercase font-bold tracking-[0.18em] text-garnet-600"
                >
                  {pillar.label}
                </p>
                <p
                  data-tina-field={tinaField(pillar, "summary")}
                  className="mt-2 font-display text-[18px] font-medium leading-snug text-ink"
                >
                  {pillar.summary}
                </p>
                {details.length > 0 && (
                  <ul
                    data-tina-field={tinaField(pillar, "details")}
                    className="mt-4 space-y-2"
                  >
                    {details.map((detail, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2.5 text-[13px] leading-6 text-stone-700"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-[0.6rem] h-1 w-1 shrink-0 rounded-full bg-brass-500"
                        />
                        {detail}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}
        </div>

        {mission.videoURL && (
          <div className="flex items-center justify-center">
            <iframe
              src={mission.videoURL}
              className="mt-8 h-auto w-full md:w-[80vw] lg:w-[60vw] aspect-video rounded-lg"
              allowFullScreen
              scrolling="no"
              allow="accelerometer *; clipboard-write *; encrypted-media *; gyroscope *; picture-in-picture *; web-share *;"
              referrerPolicy="strict-origin"
            />
          </div>
        )}
      </div>
    </section>
  );
}
