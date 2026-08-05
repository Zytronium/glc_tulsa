import Image from "next/image";
import Link from "next/link";
import { tinaField } from "tinacms/dist/react";
import { backgroundStyleFor } from "./backgroundStyles";

type Props = {
  section: {
    image?: string | null;
    alt?: string | null;
    linkHref?: string | null;
    maxWidth?: string | null;
    rounding?: string | null;
    background?: string | null;
  };
};

const MAX_WIDTH_CLASSES: Record<string, string> = {
  sm: "max-w-md",
  md: "max-w-2xl",
  lg: "max-w-4xl",
  full: "max-w-none",
};

const ROUNDING_CLASSES: Record<string, string> = {
  none: "rounded-none",
  sm: "rounded-sm",
  lg: "rounded-lg",
  "2xl": "rounded-2xl",
  "4xl": "rounded-4xl",
  full: "rounded-full",
};

export function ImageBlock({ section }: Props) {
  if (!section.image) return null;

  const bg = backgroundStyleFor(section.background);
  const maxWidthClass = MAX_WIDTH_CLASSES[section.maxWidth ?? "lg"] ?? MAX_WIDTH_CLASSES.lg;
  const roundingClass = ROUNDING_CLASSES[section.rounding ?? "none"] ?? ROUNDING_CLASSES.none;

  const image = (
        <div
          data-tina-field={tinaField(section, "image")}
      className={`relative w-full overflow-hidden ${roundingClass} ${
        section.linkHref ? "transition duration-300 group-hover:opacity-90" : ""
      }`}
        >
          <Image
            src={section.image}
            alt={section.alt ?? ""}
            width={1600}
            height={900}
            sizes="(min-width: 1024px) 60vw, 100vw"
            className="h-auto w-full object-cover"
          />
        </div>
  );

  return (
    <section className={`border-b border-stone-200 ${bg.className}`} style={bg.style}>
      <div className={`mx-auto px-5 py-14 sm:px-8 sm:py-20 ${maxWidthClass}`}>
        {section.linkHref ? (
          <Link
            href={section.linkHref}
            data-tina-field={tinaField(section, "linkHref")}
            className="group block"
          >
            {image}
          </Link>
        ) : (
          image
        )}
      </div>
    </section>
  );
}
