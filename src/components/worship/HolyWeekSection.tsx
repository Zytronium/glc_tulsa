import Image from "next/image";
import { tinaField } from "tinacms/dist/react";
import type { WorshipData } from "@/app/(main)/worship/page";

type Props = { holyWeek: NonNullable<WorshipData["holyWeek"]> };

export function HolyWeekSection({ holyWeek }: Props) {
  const services = (holyWeek.services ?? []).filter((s) => s !== null);
  const marqueeText = holyWeek.marqueeText ?? "HOLY WEEK WORSHIP";

  // -------- repeat the phrase enough times to always fill the track width --------
  const repeated = Array.from({ length: 8 }, () => marqueeText);

  return (
    <section className="border-b border-stone-200 bg-stone-100"
             style={{
               backgroundImage: "url('/images/aged_paper.png')",
               backgroundRepeat: "no-repeat",
               backgroundSize: "cover",
               backgroundPosition: "center",
             }}
    >
      {/* -------- scrolling banner -------- */}
      <div className="mx-auto max-w-5xl px-5 sm:px-8 pt-12">
        <div className="relative isolate aspect-video overflow-hidden rounded-3xl bg-vestment-900">
          <Image
            src={holyWeek.image ?? "/images/holy-week.webp"}
            alt=""
            fill
            sizes="(min-width: 1024px) 1024px, 100vw"
            className="object-cover"
          />
          <div className="absolute inset-x-0 bottom-0 flex h-24 items-center overflow-hidden bg-vestment-900/60">
          <div
              data-tina-field={tinaField(holyWeek, "marqueeText")}
              className="marquee-track"
            >
              {[...repeated, ...repeated].map((text, i) => (
                <span
                  key={i}
                  className="mix-blend-overlay shrink-0 whitespace-nowrap px-8 font-display text-[clamp(2rem,6vw,4rem)] font-medium uppercase text-stone-50"
                >
                  {text}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-5 py-14 sm:px-8 sm:py-20">
        <h2
          data-tina-field={tinaField(holyWeek, "heading")}
          className="text-center font-display text-[26px] font-medium text-ink"
        >
          {holyWeek.heading}
        </h2>

        <div className="mt-10 flex flex-col gap-4">
          {services.map((service, i) => (
            <div
              key={i}
              className="grid gap-4 rounded-lg border border-stone-200 bg-white p-6 sm:grid-cols-[minmax(0,7rem)_1fr]"
            >
              <div className="border-b border-stone-200 pb-3 sm:border-b-0 sm:border-r sm:border-stone-200 sm:pb-0 sm:pr-4">
                <p
                  data-tina-field={tinaField(service, "date")}
                  className="font-meta text-[11px] uppercase tracking-[0.1em] text-garnet-700"
                >
                  {service?.date}
                </p>
                <p
                  data-tina-field={tinaField(service, "title")}
                  className="mt-1 font-display text-[17px] text-ink"
                >
                  {service?.title}
                </p>
                <p
                  data-tina-field={tinaField(service, "time")}
                  className="mt-1 font-meta text-[12px] text-stone-500"
                >
                  {service?.time}
                </p>
              </div>

              <div>
                <div
                  data-tina-field={tinaField(service, "body")}
                  className="space-y-3 text-[14px] leading-6 text-stone-700"
                >
                  {service?.body?.split("\n\n").map((para, pi) => (
                    <p key={pi}>{para}</p>
                  ))}
                </div>
                {service?.bulletinHref && (
                <a
                  href={service.bulletinHref}
                  data-tina-field={tinaField(service, "bulletinLabel")}
                  className="mt-3 inline-flex items-center gap-1 font-meta text-[11px] uppercase tracking-[0.1em] text-garnet-700"
                  >
                    {service.bulletinLabel}
                  </a>
                  )}
              </div>
            </div>
            ))}
        </div>
      </div>
    </section>
  );
}
