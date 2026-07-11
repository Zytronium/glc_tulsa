import Image from "next/image";
import { tinaField } from "tinacms/dist/react";
import {ArchTop, IconCalendar, IconClock} from "@/components/home/icons";
import type { WorshipData } from "@/app/(main)/worship/page";

type Props = {
  worshipTimes: NonNullable<WorshipData["worshipTimes"]>;
  specialServices: NonNullable<WorshipData["specialServices"]>;
};

export function WorshipTimesAndServices({ worshipTimes, specialServices }: Props) {
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
      <div className="mx-auto max-w-5xl px-5 py-14 sm:px-8 sm:py-20">
        <div className="grid gap-4 sm:grid-cols-2">
          {/* -------- regular worship times -------- */}
          <div className="flex flex-col rounded-sm border border-stone-200 bg-white px-6 py-9">
            <ArchTop className="h-6 w-10 text-garnet-200" />
            <IconClock className="h-7 w-7 ml-1.5 text-garnet-600" />
            <p
              data-tina-field={tinaField(worshipTimes, "heading")}
              className="mt-3 font-display text-[18px] text-ink"
            >
              {worshipTimes.heading}
            </p>

            <dl className="mt-4 space-y-2 text-[14px] text-stone-700">
              <div className="flex items-baseline justify-between gap-4">
                <dt className="text-stone-500">Sundays</dt>
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

            <p
              data-tina-field={tinaField(worshipTimes, "wednesdayNote")}
              className="mt-4 text-[13px] leading-6 text-stone-700"
            >
              {worshipTimes.wednesdayNote}
            </p>

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
              className="mt-4 flex items-center gap-1 font-meta text-[11px] uppercase tracking-[0.1em] text-garnet-700"
              >
            {specialServices.linkLabel}
              </a>
              )}
          </div>
        </div>

        {(worshipTimes.image || specialServices.image) && (
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {worshipTimes.image
              ? (
              <div className="relative h-96 overflow-hidden rounded-sm">
                <Image fill src={worshipTimes.image} alt="" className="object-cover" />
              </div>
            )
            : (
              <div className="relative h-96 overflow-hidden rounded-sm"></div>
              )}
            {specialServices.image ? (
              <div className="relative h-96 overflow-hidden rounded-sm">
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
