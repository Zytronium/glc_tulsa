import Image from "next/image";
import { tinaField } from "tinacms/dist/react";
import type { MinistriesData } from "@/app/(main)/ministries/page";

type Props = { hero: NonNullable<MinistriesData["hero"]> };

export function MinistriesHero({ hero }: Props) {
  return (
    <section className="relative isolate overflow-hidden bg-vestment-900">
      <Image
        src={hero.backgroundImage ?? "/images/chancel.webp"}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-center opacity-[0.38]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-linear-to-b from-vestment-900/70 via-vestment-900/55 to-vestment-900"
      />
      <div className="relative mx-auto max-w-3xl px-6 py-24 text-center sm:py-32">
        <p
          data-tina-field={tinaField(hero, "eyebrow")}
          className="font-meta text-[12px] uppercase tracking-[0.22em] text-brass-400"
        >
          {hero.eyebrow}
        </p>
        <h1
          data-tina-field={tinaField(hero, "headline")}
          className="mt-4 font-display text-[clamp(2rem,4.8vw,3.4rem)] font-medium leading-[1.05] text-stone-50"
        >
          {hero.headline}
        </h1>
        <p
          data-tina-field={tinaField(hero, "intro")}
          className="mx-auto mt-6 max-w-xl text-[15px] leading-7 text-stone-200/90"
        >
          {hero.intro}
        </p>
      </div>
    </section>
  );
}
