import { tinaField } from "tinacms/dist/react";
import { ArchTop, IconBookOpen, IconUsers, IconWorld } from "./icons";
import type { ComponentType, SVGProps } from "react";

// Icons are positional - matches the order in content/home.json
const ICONS: ComponentType<SVGProps<SVGSVGElement>>[] = [
  IconUsers,
  IconBookOpen,
  IconWorld,
];

import type { HomeData } from "@/app/(main)/page";
type Props = { mission: NonNullable<HomeData["mission"]> };

export function Mission({ mission }: Props) {
  const items = (mission.items ?? []).filter((item) => item !== null);

  return (
    <section
      className="border-b border-stone-200 bg-white"
      style={{
        backgroundImage: "url('/images/paper.png')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="mx-auto max-w-5xl px-5 py-14 text-center sm:px-8 sm:py-20">
        <p className="font-meta text-[11px] uppercase tracking-[0.18em] text-garnet-600">
          Our mission
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {items.map(({ label, description }, i) => {
            const Icon = ICONS[i];
            return (
              <div
                key={label}
                className="flex flex-col items-center rounded-sm bg-stone-50 border-stone-200 border px-6 py-9"
              >
                <ArchTop className="h-6 w-10 text-garnet-200" />
                {Icon && <Icon className="h-7 w-7 text-garnet-600" />}
                <p
                  data-tina-field={tinaField(items[i], "label")}
                  className="mt-3 font-display text-[18px] text-ink"
                >
                  {label}
                </p>
                <p
                  data-tina-field={tinaField(items[i], "description")}
                  className="mt-1.5 max-w-[14rem] text-[13px] leading-6 text-stone-700"
                >
                  {description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
