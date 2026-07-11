import Image from "next/image";
import { tinaField } from "tinacms/dist/react";
import type { WorshipData } from "@/app/(main)/worship/page";

type Props = { hero: NonNullable<WorshipData["hero"]> };

export function WorshipHero({ hero }: Props) {
  return (
    <section className="relative isolate overflow-hidden bg-vestment-900">
      <Image
        src={hero.backgroundImage ?? "/images/worship-hero.webp"}
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
          data-tina-field={tinaField(hero, "subtitle")}
          className="mx-auto mt-4 max-w-xl space-y-4 text-sm text-stone-200/90"
        >
          {hero.subtitle}
        </p>
        {(() => {
          const paragraphs = hero.intro?.split("\n\n") || [];
          const quoteBlock = hero.quote && (
            <blockquote className="mx-auto mt-8 max-w-xl">
            <p
                data-tina-field={tinaField(hero, "quote")}
                className="font-display text-[17px] italic leading-relaxed text-brass-200"
              >
                &ldquo;{hero.quote}&rdquo;
              </p>
              {hero.quoteCitation && (
                <cite
                  data-tina-field={tinaField(hero, "quoteCitation")}
                  className="mt-3 block font-meta text-[11px] uppercase tracking-[0.14em] text-stone-300 not-italic"
                >
                  {hero.quoteCitation}
                </cite>
              )}
            </blockquote>
          );

          if (paragraphs.length >= 2) {
            return (
              <>
                <div
                  data-tina-field={tinaField(hero, "intro")}
                  className="mx-auto mt-6 max-w-3xl space-y-4 text-[15px] leading-7 text-stone-200/90"
                >
                  <p>{paragraphs[0]}</p>
                </div>
                {quoteBlock}
                <div data-tina-field={tinaField(hero, "intro")}
                     className="mx-auto mt-6 max-w-3xl space-y-4 text-[15px] leading-7 text-stone-200/90">
                {paragraphs.slice(1).map((para, i) => (
                    <p key={i + 1}>{para}</p>
                  ))}
                </div>
              </>
            );
          } else {
            return (
              <>
                <div
                  data-tina-field={tinaField(hero, "intro")}
                  className="mx-auto mt-6 max-w-3xl space-y-4 text-[15px] leading-7 text-stone-200/90"
                >
                  {paragraphs.map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
                {quoteBlock}
              </>
            );
          }
        })()}
      </div>
    </section>
  );
}
