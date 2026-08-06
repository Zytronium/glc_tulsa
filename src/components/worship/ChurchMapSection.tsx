"use client";

import { useState } from "react";
import Image from "next/image";
import { tinaField } from "tinacms/dist/react";
import type { WorshipData } from "@/app/(main)/worship/page";

type Props = { churchMap: NonNullable<WorshipData["churchMap"]> };

export function ChurchMapSection({ churchMap }: Props) {
  const [isZoomed, setIsZoomed] = useState(false);
  const legend = (churchMap.legend ?? []).filter((l) => l !== null);

  if (!churchMap.image) return null;

  return (
    <section
      className="border-b border-stone-200 bg-white"
      style={{
        backgroundImage: "url('/images/aged_paper.png')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="mx-auto max-w-5xl px-5 py-14 sm:px-8 sm:py-20">
        <div className="text-center">
          {churchMap.heading && (
            <h2
              data-tina-field={tinaField(churchMap, "heading")}
              className="font-display text-[24px] font-medium leading-tight text-ink"
            >
              {churchMap.heading}
            </h2>
          )}
          {churchMap.body && (
            <p
              data-tina-field={tinaField(churchMap, "body")}
              className="mx-auto mt-3 max-w-xl text-[15px] leading-7 text-stone-700"
            >
              {churchMap.body}
            </p>
          )}
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-start">
          <div className="flex w-full items-center justify-center overflow-hidden">
            <button
              onClick={() => setIsZoomed(true)}
              className="relative cursor-zoom-in transition-opacity hover:opacity-90"
              type="button"
              aria-label="View larger map"
            >
              <Image
                src={churchMap.image}
                alt="Bird's-eye view map of the church property, parking, and entrances"
                width={0}
                height={0}
                sizes="(min-width: 1024px) 65vw, 100vw"
                className="max-h-128 w-auto rounded-2xl border border-stone-200"
                data-tina-field={tinaField(churchMap, "image")}
              />
            </button>
          </div>

          {legend.length > 0 && (
            <dl
              data-tina-field={tinaField(churchMap, "legend")}
              className="flex flex-col gap-3 lg:w-56"
            >
              {legend.map((item, i) => (
                <div key={i} className="flex items-baseline gap-3">
                  <dt className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-garnet-600 font-meta text-[11px] font-semibold text-garnet-700">
                    {item?.marker}
                  </dt>
                  <dd className="text-[14px] leading-6 text-stone-700">{item?.label}</dd>
                </div>
              ))}
            </dl>
          )}
        </div>
      </div>

      {isZoomed && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/90 p-4 sm:p-10"
          onClick={() => setIsZoomed(false)}
        >
          <div className="relative h-full w-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
            <Image
              fill
              src={churchMap.image}
              alt="Bird's-eye view map of the church property, parking, and entrances"
              sizes="100vw"
              className="object-contain"
            />
          </div>

          <button
            onClick={() => setIsZoomed(false)}
            aria-label="Close"
            className="fixed right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-ink/70 text-stone-50 transition hover:bg-garnet-700 sm:right-6 sm:top-6"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
              <path d="M6 6L18 18M18 6L6 18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      )}
    </section>
  );
}
