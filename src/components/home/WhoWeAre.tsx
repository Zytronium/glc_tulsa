import Image from "next/image";
import Link from "next/link";
import { tinaField } from "tinacms/dist/react";
import { IconArrowRight } from "./icons";

import type { HomeData } from "@/app/(main)/page";
type Props = { whoWeAre: NonNullable<HomeData["whoWeAre"]> };

export function WhoWeAre({ whoWeAre }: Props) {
  const marks = (whoWeAre.marks ?? []).filter((mark) => mark !== null);

  return (
    <section
      className="border-b border-stone-200 bg-white"
      style={{
        backgroundImage: "url('/images/paper.png')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:px-8 sm:py-20 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
        <div className="relative aspect-4/5 overflow-hidden rounded-sm lg:aspect-auto">
          <Image
            src={whoWeAre.image ?? "/images/altar-easter-bw.webp"}
            alt={whoWeAre.imageAlt ?? ""}
            fill
            sizes="(min-width: 1024px) 40vw, 100vw"
            className="object-cover grayscale"
            data-tina-field={tinaField(whoWeAre, "image")}
          />
        </div>

        <div>
          <p className="font-meta text-[11px] uppercase tracking-[0.18em] text-garnet-600">
            Who we are
          </p>
          <h2
            data-tina-field={tinaField(whoWeAre, "heading")}
            className="mt-3 max-w-md font-display text-[28px] font-medium leading-tight text-ink sm:text-[32px]"
          >
            {whoWeAre.heading}
          </h2>

          <dl className="mt-8 grid gap-5 sm:grid-cols-2">
            {marks.map((mark) => (
              <div
                key={mark.label}
                className="border-l-2 border-brass-500 bg-stone-50 py-3 pl-4 pr-3"
              >
                <dt
                  data-tina-field={tinaField(mark, "label")}
                  className="font-display text-[15px] text-ink"
                >
                  {mark.label}
                </dt>
                <dd
                  data-tina-field={tinaField(mark, "text")}
                  className="mt-1 text-[13px] leading-6 text-stone-700"
                >
                  {mark.text}
                </dd>
              </div>
            ))}
          </dl>

          {whoWeAre.linkHref && (
            <Link
              href={whoWeAre.linkHref}
              data-tina-field={tinaField(whoWeAre, "linkLabel")}
              className="mt-7 inline-flex items-center gap-1.5 text-[13px] font-medium text-garnet-700 hover:text-garnet-600"
            >
              {whoWeAre.linkLabel}
              <IconArrowRight className="h-3.5 w-3.5" />
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
