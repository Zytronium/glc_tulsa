"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { tinaField } from "tinacms/dist/react";
import { IconArrowRight } from "@/components/home/icons";
import { backgroundStyleFor } from "./backgroundStyles";

// -------- maps roundedness option to a Tailwind class --------
const ROUNDING_STYLES: Record<string, string> = {
  none: "rounded-none",
  sm: "rounded-sm",
  lg: "rounded-lg",
  "2xl": "rounded-2xl",
  "4xl": "rounded-4xl",
  full: "rounded-full",
};

const BUTTON_STYLES: Record<string, string> = {
  garnetSolid: "bg-garnet-700 text-stone-50 hover:bg-garnet-600",
  brassSolid: "bg-brass-300 text-vestment-900 hover:bg-brass-400",
  outlineOnDark: "border bg-vestment-700 border-vestment-900/30 text-stone-50 hover:bg-vestment-800 hover:border-vestment-900/80",
};

type Cta = {
  label?: string | null;
  href?: string | null;
  style?: string | null;
};

type Props = {
  section: {
    heading?: string | null;
    body?: string | null;
    image?: string | null;
    layout?: string | null;
    background?: string | null;
    imageRounding?: string | null;
    cta?: Cta | null;
  };
};

export function TextImageBlock({ section }: Props) {
  const bg = backgroundStyleFor(section.background);
  const paragraphs = (section.body ?? "").split("\n\n").filter(Boolean);
  const layout = section.layout ?? "imageRight";
  const textOnly = layout === "textOnly" || !section.image;
  const imageOnLeft = layout === "imageLeft";
  const roundingClass = ROUNDING_STYLES[section.imageRounding ?? "sm"] ?? ROUNDING_STYLES.sm;
  const isCircle = section.imageRounding === "full";

  // -------- track the image's natural aspect ratio once it loads --------
  const [aspectRatio, setAspectRatio] = useState<number>(4 / 3);

  return (
    <section className={`border-b border-stone-200 ${bg.className}`} style={bg.style}>
      <div
        className={`mx-auto max-w-5xl gap-10 px-5 py-14 sm:px-8 sm:py-20 ${
          textOnly ? "max-w-3xl" : "grid lg:grid-cols-2 lg:items-center"
        }`}
      >
        <div className={imageOnLeft && !textOnly ? "lg:order-2" : ""}>
          {section.heading && (
            <h2
              data-tina-field={tinaField(section, "heading")}
              className={`font-display text-[24px] font-medium leading-tight ${
                bg.isDark ? "text-stone-50" : "text-ink"
              }`}
            >
              {section.heading}
            </h2>
          )}
          {paragraphs.length > 0 && (
            <div
              data-tina-field={tinaField(section, "body")}
              className={`mt-4 space-y-4 text-[15px] leading-7 ${
                bg.isDark ? "text-stone-200/90" : "text-stone-700"
              }`}
            >
              {paragraphs.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          )}
          {section.cta?.href && (
            <Link
              href={section.cta.href}
              data-tina-field={tinaField(section.cta, "label")}
              className={`mt-6 inline-flex items-center gap-1.5 rounded-sm px-6 py-3 text-sm font-semibold tracking-wide transition ${
                BUTTON_STYLES[section.cta.style ?? "garnetSolid"] ?? BUTTON_STYLES.garnetSolid
              }`}
            >
              {section.cta.label}
              <IconArrowRight className="h-3.5 w-3.5" />
            </Link>
          )}
        </div>

        {!textOnly && section.image && (
          <div className={imageOnLeft ? "lg:order-1" : ""}>
            <div
              className={`relative overflow-hidden ${roundingClass} ${isCircle ? "mx-auto aspect-square w-full max-w-sm" : ""}`}
              style={isCircle ? undefined : { aspectRatio }}
            >
              <Image
                fill
                src={section.image}
                alt=""
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
                data-tina-field={tinaField(section, "image")}
                onLoad={(e) => {
                  const img = e.currentTarget;
                  if (img.naturalWidth && img.naturalHeight) {
                    setAspectRatio(img.naturalWidth / img.naturalHeight);
                  }
                }}
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
