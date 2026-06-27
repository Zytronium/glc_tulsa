import Link from "next/link";
import { tinaField } from "tinacms/dist/react";
import { IconArrowRight } from "@/components/home/icons";
import type { AboutData } from "@/app/(main)/about/page";

type Props = { doctrine: NonNullable<AboutData["doctrine"]> };

export function AboutDoctrine({ doctrine }: Props) {
  const paragraphs = (doctrine.body ?? "").split("\n\n").filter(Boolean);

  return (
    <section className="border-b border-vestment-800 bg-vestment-900">
      <div className="mx-auto max-w-3xl px-5 py-14 text-center sm:px-8 sm:py-20">
        <p className="font-meta text-[11px] uppercase tracking-[0.22em] text-brass-400">
          Our doctrine
        </p>
        <h2
          data-tina-field={tinaField(doctrine, "heading")}
          className="mt-3 font-display text-[28px] font-medium leading-tight text-stone-50 sm:text-[32px]"
        >
          {doctrine.heading}
        </h2>
        <div
          data-tina-field={tinaField(doctrine, "body")}
          className="mt-6 space-y-4 text-[15px] leading-7 text-stone-200/85"
        >
          {paragraphs.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-6">
          {doctrine.link1Href && (
            <Link
              href={doctrine.link1Href}
              data-tina-field={tinaField(doctrine, "link1Label")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[13px] font-medium text-brass-300 hover:text-brass-200"
            >
              {doctrine.link1Label}
              <IconArrowRight className="h-3.5 w-3.5" />
            </Link>
          )}
          {doctrine.link2Href && (
            <Link
              href={doctrine.link2Href}
              data-tina-field={tinaField(doctrine, "link2Label")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[13px] font-medium text-stone-300/80 hover:text-stone-200"
            >
              {doctrine.link2Label}
              <IconArrowRight className="h-3.5 w-3.5" />
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
