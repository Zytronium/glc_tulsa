import Link from "next/link";
import { tinaField } from "tinacms/dist/react";
import { IconArrowRight } from "@/components/home/icons";
import { backgroundStyleFor } from "./backgroundStyles";

type Props = {
  section: {
    heading?: string | null;
    linkLabel?: string | null;
    linkHref?: string | null;
    style?: string | null;
    background?: string | null;
  };
};

const BUTTON_STYLES: Record<string, string> = {
  garnetSolid: "bg-garnet-700 text-stone-50 hover:bg-garnet-600",
  brassSolid: "bg-brass-300 text-vestment-900 hover:bg-brass-400",
  outlineOnDark: "border border-stone-50/40 text-stone-50 hover:border-stone-50/80",
};

export function CtaBlock({ section }: Props) {
  const bg = backgroundStyleFor(section.background);
  const buttonClass = BUTTON_STYLES[section.style ?? "garnetSolid"] ?? BUTTON_STYLES.garnetSolid;

  return (
    <section className={`border-b border-stone-200 ${bg.className}`} style={bg.style}>
      <div className="mx-auto flex max-w-3xl flex-col items-center px-6 py-16 text-center sm:py-20">
        {section.heading && (
          <h2
            data-tina-field={tinaField(section, "heading")}
            className={`font-display text-[26px] font-medium leading-tight ${
              bg.isDark ? "text-stone-50" : "text-ink"
            }`}
          >
            {section.heading}
          </h2>
        )}
        {section.linkHref && (
          <Link
            href={section.linkHref}
            data-tina-field={tinaField(section, "linkLabel")}
            className={`mt-6 inline-flex items-center gap-1.5 rounded-sm px-6 py-3 text-sm font-semibold tracking-wide transition ${buttonClass}`}
          >
            {section.linkLabel}
            <IconArrowRight className="h-3.5 w-3.5" />
          </Link>
        )}
      </div>
    </section>
  );
}
