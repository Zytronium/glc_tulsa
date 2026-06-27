import Image from "next/image";
import { tinaField } from "tinacms/dist/react";
import type { AboutData } from "@/app/(main)/about/page";

type Props = { intro: NonNullable<AboutData["intro"]> };

export function AboutIntro({ intro }: Props) {
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
            src={intro.image ?? "/images/chancel.webp"}
            alt={intro.imageAlt ?? ""}
            fill
            sizes="(min-width: 1024px) 40vw, 100vw"
            className="object-cover"
            data-tina-field={tinaField(intro, "image")}
          />
        </div>

        <div>
          <p className="font-meta text-[11px] uppercase tracking-[0.18em] text-garnet-600">
            Who we are
          </p>
          <h2
            data-tina-field={tinaField(intro, "heading")}
            className="mt-3 max-w-md font-display text-[28px] font-medium leading-tight text-ink sm:text-[32px]"
          >
            {intro.heading}
          </h2>
          {intro.body && (
            <p
              data-tina-field={tinaField(intro, "body")}
              className="mt-5 text-[15px] leading-7 text-stone-700"
            >
              {intro.body}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
