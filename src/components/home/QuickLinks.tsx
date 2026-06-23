import Link from "next/link";
import { ArchTop, IconBook, IconCalendar, IconHeart, IconMapPin } from "./icons";

const LINKS = [
  {
    label: "Worship",
    description: "Services, liturgy, and sacraments",
    href: "/worship",
    Icon: IconBook,
  },
  {
    label: "Events",
    description: "Calendar, Grace Night, VBS",
    href: "/events",
    Icon: IconCalendar,
  },
  {
    label: "Ministries",
    description: "Youth, music, missions, community",
    href: "/ministries",
    Icon: IconHeart,
  },
  {
    label: "Find us",
    description: "Directions, hours, contact",
    href: "/contact",
    Icon: IconMapPin,
  },
];

export function QuickLinks() {
  return (
    <section className="border-b border-stone-200 bg-stone-50">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-3 px-5 py-10 sm:grid-cols-4 sm:gap-4 sm:px-8 sm:py-14">
        {LINKS.map(({ label, description, href, Icon }) => (
          <Link
            key={label}
            href={href}
            className="group rounded-sm border border-stone-200 bg-white pl-4 pr-5 py-6 transition hover:border-garnet-600/40 shadow-[-3px_0_0_0_var(--color-stone-500)] hover:shadow-[-3px_1px_0_0_var(--color-garnet-600)]"
          >
            <ArchTop className="h-6 w-10 text-garnet-200 transition group-hover:text-garnet-600" />
            <Icon className="ml-2 mt-1 h-6 w-6 text-garnet-600" />
            <p className="mt-3 font-display text-[16px] text-ink">{label}</p>
            <p className="mt-1 text-[13px] leading-5 text-stone-700">
              {description}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
