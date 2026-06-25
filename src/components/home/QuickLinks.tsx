import Link from "next/link";
import { tinaField } from "tinacms/dist/react";
import { ArchTop, IconBook, IconCalendar, IconHeart, IconMapPin } from "./icons";
import type { ComponentType, SVGProps } from "react";

// Icons are positional - matches the order in content/home.json
const ICONS: ComponentType<SVGProps<SVGSVGElement>>[] = [
  IconBook,
  IconCalendar,
  IconHeart,
  IconMapPin,
];

import type { HomeData } from "@/app/page";
type Props = { quickLinks: NonNullable<HomeData["quickLinks"]> };

export function QuickLinks({ quickLinks }: Props) {
  return (
    <section
      className="border-b border-stone-200 bg-stone-50"
      style={{
        backgroundImage: "url('/images/aged_paper.png')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-3 px-5 py-10 sm:grid-cols-4 sm:gap-4 sm:px-8 sm:py-14">
        {(quickLinks ?? []).filter((link) => link !== null).map((link, i) => {
          const Icon = ICONS[i];
          return (
            <Link
              key={link.label}
              href={link.href ?? "#"}
              className="group rounded-sm border border-stone-200 bg-white pl-4 pr-5 py-6 transition hover:border-garnet-600/40 shadow-[-3px_0_0_0_var(--color-stone-500)] hover:shadow-[-3px_1px_0_0_var(--color-garnet-600)]"
            >
              <ArchTop className="h-6 w-10 text-garnet-200 transition group-hover:text-garnet-600" />
              {Icon && <Icon className="ml-2 mt-1 h-6 w-6 text-garnet-600" />}
              <p
                data-tina-field={tinaField(link, "label")}
                className="mt-3 font-display text-[16px] text-ink"
              >
                {link.label}
              </p>
              <p
                data-tina-field={tinaField(link, "description")}
                className="mt-1 text-[13px] leading-5 text-stone-700"
              >
                {link.description}
              </p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
