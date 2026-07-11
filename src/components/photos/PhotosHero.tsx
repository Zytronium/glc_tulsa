import { tinaField } from "tinacms/dist/react";
import type { PhotosData } from "@/app/(main)/photos/page";

type Props = { hero: NonNullable<PhotosData["hero"]> };

export default function PhotosHero({ hero }: Props) {
  return (
    <section
      className="relative border-b border-stone-200 bg-stone-100"
      style={{
        backgroundImage: `url('${hero.backgroundImage ?? "/images/aged_paper.png"}')`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="mx-auto max-w-3xl px-6 py-12 text-center sm:py-18">
        <p className="font-meta text-[11px] uppercase tracking-[0.18em] text-garnet-600">
          Photo Gallery
        </p>

        <blockquote className="mt-6">
          <p
            data-tina-field={tinaField(hero, "quote")}
            className="font-display text-[clamp(1.375rem,3vw,1.75rem)] italic leading-snug text-ink"
          >
            &ldquo;{hero.quote}&rdquo;
          </p>
          {hero.quoteCitation && (
            <cite
              data-tina-field={tinaField(hero, "quoteCitation")}
              className="mt-3 block font-meta text-[11px] uppercase tracking-[0.14em] text-stone-500 not-italic"
            >
              {hero.quoteCitation}
            </cite>
          )}
        </blockquote>

        <p
          data-tina-field={tinaField(hero, "body")}
          className="mx-auto mt-6 max-w-xl text-[15px] leading-7 text-stone-700"
        >
          {hero.body}
        </p>
      </div>
    </section>
  );
}