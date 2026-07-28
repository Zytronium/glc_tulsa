import { tinaField } from "tinacms/dist/react";
import { backgroundStyleFor } from "./backgroundStyles";

type Props = {
  section: {
    quote?: string | null;
    citation?: string | null;
    background?: string | null;
  };
};

export function QuoteBlock({ section }: Props) {
  const bg = backgroundStyleFor(section.background);

  return (
    <section className={`border-b border-stone-200 ${bg.className}`} style={bg.style}>
      <div className="mx-auto max-w-2xl px-6 py-16 text-center sm:py-20">
        {section.quote && (
          <p
            data-tina-field={tinaField(section, "quote")}
            className={`font-display text-[clamp(1.25rem,2.6vw,1.625rem)] italic leading-snug ${
              bg.isDark ? "text-brass-200" : "text-ink"
            }`}
          >
            &ldquo;{section.quote}&rdquo;
          </p>
        )}
        {section.citation && (
          <cite
            data-tina-field={tinaField(section, "citation")}
            className={`mt-4 block font-meta text-[11px] uppercase tracking-[0.14em] not-italic ${
              bg.isDark ? "text-stone-300" : "text-stone-500"
            }`}
          >
            {section.citation}
          </cite>
        )}
      </div>
    </section>
  );
}
