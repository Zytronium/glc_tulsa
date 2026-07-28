import Image from "next/image";
import Link from "next/link";
import { tinaField } from "tinacms/dist/react";
import { IconArrowRight } from "@/components/home/icons";

type Cta = {
  label?: string | null;
  href?: string | null;
  style?: string | null;
};

type Props = {
  section: {
    backgroundImage?: string | null;
    title?: string | null;
    headline?: string | null;
    subtext?: string | null;
    ctas?: (Cta | null)[] | null;
  };
};

const BUTTON_STYLES: Record<string, string> = {
  garnetSolid: "bg-garnet-700 text-stone-50 hover:bg-garnet-600",
  brassSolid: "bg-brass-300 text-vestment-900 hover:bg-brass-400",
  outlineOnDark: "border bg-vestment-700 border-vestment-900/30 text-stone-50 hover:bg-vestment-800 hover:border-vestment-900/80",
};

export function HeroBlock({ section }: Props) {
  const ctas = (section.ctas ?? []).filter((c): c is Cta => c !== null);

  return (
    <section className="relative isolate overflow-hidden bg-vestment-900">
      <Image
        src={section.backgroundImage ?? "/images/chancel.webp"}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-[center_30%] opacity-[0.42]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-linear-to-b from-vestment-900/70 via-vestment-900/55 to-vestment-900"
      />
      <div className="relative mx-auto flex max-w-3xl flex-col items-center px-6 pb-28 text-center sm:pb-36">
        {section.title && (
          <p
            data-tina-field={tinaField(section, "title")}
            className="font-heading text-[clamp(3rem,7vw,4.75rem)] text-white"
          >
            {section.title}
          </p>
        )}
        {section.headline && (
          <h1
            data-tina-field={tinaField(section, "headline")}
            className="mt-5 font-display text-[clamp(2rem,4.8vw,3.4rem)] font-medium leading-[1.05] text-stone-50"
          >
            {section.headline.split("|").map((line, i) => (
              <span key={i} className="block">
                {line.trim()}
              </span>
            ))}
          </h1>
        )}
        {section.subtext && (
          <p
            data-tina-field={tinaField(section, "subtext")}
            className="mt-6 max-w-xl text-[15px] leading-7 text-stone-200/90"
          >
            {section.subtext}
          </p>
        )}
        {ctas.length > 0 && (
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            {ctas.map((cta, i) =>
              cta.href ? (
                <Link
                  key={i}
                  href={cta.href}
                  data-tina-field={tinaField(cta, "label")}
                  className={`rounded-sm px-6 py-3 text-sm font-semibold tracking-wide transition inline-flex items-center gap-1.5 ${
                    BUTTON_STYLES[cta.style ?? "garnetSolid"] ?? BUTTON_STYLES.garnetSolid
                  }`}
                >
                  {cta.label}
                  <IconArrowRight className="h-3.5 w-3.5" />
                </Link>
              ) : null
            )}
          </div>
        )}
      </div>
    </section>
  );
}
