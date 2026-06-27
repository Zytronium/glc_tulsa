import Image from "next/image";
import { tinaField } from "tinacms/dist/react";
import type { AboutData } from "@/app/(main)/about/page";

type Props = { hero: NonNullable<AboutData["hero"]> };

export function AboutHero({ hero }: Props) {
  return (
    <section className="relative isolate overflow-hidden bg-vestment-900">
      <Image
        src={hero.backgroundImage ?? "/images/exterior-bw.webp"}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-center opacity-30"
        data-tina-field={tinaField(hero, "backgroundImage")}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-linear-to-b from-vestment-900/60 via-vestment-900/50 to-vestment-900/90"
      />
      <div className="relative mx-auto flex max-w-3xl flex-col items-center px-6 py-24 text-center sm:py-32">
        <p className="font-meta text-[11px] uppercase tracking-[0.22em] text-brass-400">
          Grace Evangelical Lutheran Church
        </p>
        <h1
          data-tina-field={tinaField(hero, "headline")}
          className="mt-4 font-display text-[clamp(1.75rem,4vw,3rem)] font-medium leading-tight text-stone-50"
        >
          {hero.headline}
        </h1>
        {hero.subtext && (
          <p
            data-tina-field={tinaField(hero, "subtext")}
            className="mt-5 max-w-xl text-[15px] leading-7 text-stone-200/85"
          >
            {hero.subtext}
          </p>
        )}
      </div>
    </section>
  );
}
