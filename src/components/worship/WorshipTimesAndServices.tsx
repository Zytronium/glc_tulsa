import Image from "next/image";
import { tinaField } from "tinacms/dist/react";
import {ArchTop, IconCalendar, IconClock, IconSun} from "@/components/home/icons";
import type { WorshipData } from "@/app/(main)/worship/page";

type Props = {
  worshipTimes: NonNullable<WorshipData["worshipTimes"]>;
  graceNight: NonNullable<WorshipData["graceNight"]>;
  specialServices: NonNullable<WorshipData["specialServices"]>;
};

export function WorshipTimesAndServices({ worshipTimes, graceNight, specialServices }: Props) {
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
      <div className="mx-auto max-w-7xl px-5 py-14 md:px-8 md:py-20">
        <div className="grid gap-4 md:grid-cols-3">
          {/* -------- sunday worship times / grace night -------- */}
          <div className="flex flex-col rounded-sm border border-stone-200 bg-white px-6 py-9">
            <ArchTop className="h-6 w-10 text-garnet-200" />
            <IconSun className="h-7 w-7 ml-1.5 text-garnet-600" />
            <p
              data-tina-field={tinaField(worshipTimes, "heading")}
              className="mt-3 font-display text-[18px] text-ink"
            >
              {worshipTimes.heading}
            </p>

            <dl className="mt-4 space-y-2 text-[14px] text-stone-700">
              <div className="flex items-baseline justify-between gap-4">
                <dt className="text-stone-500">Worship</dt>
                <dd data-tina-field={tinaField(worshipTimes, "sundayTimes")} className="font-display text-ink">
                  {worshipTimes.sundayTimes}
                </dd>
              </div>
              <div className="flex items-baseline justify-between gap-4">
                <dt className="text-stone-500">Sunday School &amp; Bible Study</dt>
                <dd data-tina-field={tinaField(worshipTimes, "sundaySchoolTime")} className="font-display text-ink">
                  {worshipTimes.sundaySchoolTime}
                </dd>
              </div>
            </dl>

            {worshipTimes.livestreamNote && (
              <p
                data-tina-field={tinaField(worshipTimes, "livestreamNote")}
                className="mt-4 border-t border-stone-200 pt-4 text-[13px] leading-6 text-stone-700"
              >
                {worshipTimes.livestreamNote}
                {worshipTimes.facebookUrl && (
                  <>
                    {" "}
                    <a
                      href={worshipTimes.facebookUrl}
                      className="text-garnet-700 underline decoration-garnet-600/40 underline-offset-2 hover:text-garnet-600"
                    >
                      @{worshipTimes.facebookUrl.split(".com/")[1]}
                    </a>
                    .
                  </>
                  )}
              </p>
            )}
          </div>

          {/* -------- wednesday worship times (duplicated from sunday worship times, no changes so far except icon) -------- */}
          <div className="flex flex-col rounded-sm border border-stone-200 bg-white px-6 py-9">
            <ArchTop className="h-6 w-10 text-garnet-200" />
            <IconClock className="h-7 w-7 ml-1.5 text-garnet-600" />
            <p
              data-tina-field={tinaField(graceNight, "heading")}
              className="mt-3 font-display text-[18px] text-ink"
            >
              {graceNight.heading}
            </p>

            <dl className="mt-4 space-y-2 text-[14px] text-stone-700">
              {graceNight.serviceTime && (
                <div className="flex items-baseline justify-between gap-4">
                  <dt className="text-stone-500">Service Time</dt>
                  <dd data-tina-field={tinaField(graceNight, "serviceTime")} className="font-display text-ink">
                    {graceNight.serviceTime}
                  </dd>
                </div>
              )}
              {graceNight.when && (
                <div className="flex items-baseline justify-between gap-4">
                  <dt className="text-stone-500">When</dt>
                  <dd data-tina-field={tinaField(graceNight, "when")} className="font-display text-ink">
                    {graceNight.when}
                  </dd>
                </div>
              )}
            </dl>

            {graceNight.body && (
              <p
                data-tina-field={tinaField(graceNight, "body")}
                className="mt-4 flex-1 text-[13px] leading-6 text-stone-700"
              >
                {graceNight.body}
              </p>
            )}
          </div>

          {/* -------- special services -------- */}
          <div className="flex flex-col rounded-sm border border-stone-200 bg-white px-6 py-9">
            <ArchTop className="h-6 w-10 text-garnet-200" />
            <IconCalendar className="h-7 w-7 ml-1.5 text-garnet-600" />
            <p
              data-tina-field={tinaField(specialServices, "heading")}
              className="mt-3 font-display text-[18px] text-ink"
            >
              {specialServices.heading}
            </p>
            <p
              data-tina-field={tinaField(specialServices, "body")}
              className="mt-4 flex-1 text-[13px] leading-6 text-stone-700"
            >
              {specialServices.body}
            </p>
            {specialServices.linkHref && (
            <a
              href={specialServices.linkHref}
              data-tina-field={tinaField(specialServices, "linkLabel")}
              className="mt-4 flex items-center gap-1 font-meta text-[11px] uppercase tracking-widest text-garnet-700"
              >
            {specialServices.linkLabel}
              </a>
              )}
            {specialServices.link2Href && (
            <a
              href={specialServices.link2Href}
              data-tina-field={tinaField(specialServices, "link2Label")}
              className="mt-4 flex items-center gap-1 font-meta text-[11px] uppercase tracking-widest text-garnet-700"
              >
            {specialServices.link2Label}
              </a>
              )}
          </div>
        </div>

        {(worshipTimes.image || graceNight.image || specialServices.image) && (
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            {worshipTimes.image
              ? (
              <div className="relative h-96 overflow-hidden rounded-sm"
                   data-tina-field={tinaField(worshipTimes, "image")}
              >
                <Image fill src={worshipTimes.image} alt="" className="object-cover" />
              </div>
            )
            : (
              <div className="relative h-96 overflow-hidden rounded-sm"></div>
              )}
            {graceNight.image ? (
              <div className="relative h-96 overflow-hidden rounded-sm"
                   data-tina-field={tinaField(graceNight, "image")}
              >
                <Image fill src={graceNight.image} alt="" className="object-cover" />
              </div>
            )
              : (
                <div className="relative h-96 overflow-hidden rounded-sm"></div>
              )}
            {specialServices.image ? (
              <div className="relative h-96 overflow-hidden rounded-sm"
                   data-tina-field={tinaField(specialServices, "image")}
              >
                <Image fill src={specialServices.image} alt="" className="object-cover" />
              </div>
            )
              : (
                <div className="relative h-96 overflow-hidden rounded-sm"></div>
              )}
          </div>
        )}
      </div>
    </section>
  );
}
