import Link from "next/link";
import { tinaField } from "tinacms/dist/react";
import {
  ArchTop,
  IconBook,
  IconBookOpen,
  IconCalendar,
  IconClock,
  IconCoin,
  IconHeart,
  IconMapPin,
  IconSun,
  IconUsers,
  IconWorld,
} from "@/components/home/icons";

// maps each card's icon field to its component
const CARD_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  book: IconBook,
  bookOpen: IconBookOpen,
  calendar: IconCalendar,
  clock: IconClock,
  coin: IconCoin,
  heart: IconHeart,
  mapPin: IconMapPin,
  sun: IconSun,
  users: IconUsers,
  world: IconWorld,
};

import type { HomeData } from "@/app/(main)/page";
type Props = { quickLinks: NonNullable<HomeData["quickLinks"]> };

export function QuickLinks({ quickLinks }: Props) {
  return (
    <section
      className="border-b border-stone-200 bg-stone-100"
      style={{
        backgroundImage: "url('/images/aged_paper.png')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="mx-auto flex max-w-8xl flex-wrap justify-center gap-3 px-5 py-10 sm:gap-4 sm:px-8 sm:py-14">
        {(quickLinks ?? []).filter((link) => link !== null).map((link, i) => {
          const Icon = link.icon ? CARD_ICONS[link.icon] : undefined;

          return (
            <Link
              key={link.href ?? i}
              href={link.href ?? "#"}
              className="group min-w-0 flex-none basis-[calc(50%-0.375rem)] sm:basis-[calc(50%-0.5rem)] md:basis-[calc(33.333%-0.667rem)] lg:basis-[calc(20%-0.8rem)] rounded-sm border border-stone-200 bg-white pl-4 pr-5 py-6 transition hover:border-garnet-600/40 shadow-[-3px_0_0_0_var(--color-stone-500)] hover:shadow-[-3px_1px_0_0_var(--color-garnet-600)]"
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
