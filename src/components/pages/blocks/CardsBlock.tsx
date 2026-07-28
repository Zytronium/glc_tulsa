import Image from "next/image";
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
import { backgroundStyleFor } from "./backgroundStyles";

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

type Card = {
  label?: string | null;
  body?: string | null;
  image?: string | null;
  icon?: string | null;
};

type Props = {
  section: {
    heading?: string | null;
    background?: string | null;
    cards?: (Card | null)[] | null;
  };
};

export function CardsBlock({ section }: Props) {
  const bg = backgroundStyleFor(section.background);
  const cards = (section.cards ?? []).filter((c): c is Card => c !== null);

  return (
    <section className={`border-b border-stone-200 ${bg.className}`} style={bg.style}>
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
        {section.heading && (
          <h2
            data-tina-field={tinaField(section, "heading")}
            className={`mb-8 font-display text-[24px] font-medium leading-tight ${
              bg.isDark ? "text-stone-50" : "text-ink"
            }`}
          >
            {section.heading}
          </h2>
        )}

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((card, i) => {
            const Icon = card.icon ? CARD_ICONS[card.icon] : undefined;

            return (
              <div
                key={i}
                className="flex flex-col overflow-hidden rounded-sm border border-stone-200 bg-white"
              >
                {card.image && (
                  <div className="relative h-40 w-full">
                    <Image
                      fill
                      src={card.image}
                      alt=""
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover"
                      data-tina-field={tinaField(card, "image")}
                    />
                  </div>
                )}
                <div className="flex flex-1 flex-col px-6 py-7">
                  <ArchTop className="h-6 w-10 text-garnet-600" />
                  {Icon && <Icon className="ml-2 mt-1 h-6 w-6 text-garnet-600" />}
                  {card.label && (
                    <p
                      data-tina-field={tinaField(card, "label")}
                      className="mt-2 font-display text-[18px] text-ink"
                    >
                      {card.label}
                    </p>
                  )}
                  {card.body && (
                    <p
                      data-tina-field={tinaField(card, "body")}
                      className="mt-2 text-[13px] leading-6 text-stone-700"
                    >
                      {card.body}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
