import Link from "next/link";
import { IconSun, IconCalendar, IconMapPin } from "./icons";

export function ServiceBar() {
  return (
    <div className="border-b border-garnet-900/15 bg-garnet-700">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-7 gap-y-2 px-5 py-3 sm:gap-x-9">
        <div className="flex items-center gap-2 text-stone-50/95">
          <IconSun className="h-[15px] w-[15px] text-brass-400" />
          <span className="text-[12.5px]">
            <span className="font-medium">Sundays</span> &middot; 8:00 &amp;
            10:30 AM
          </span>
        </div>
        <span className="hidden h-3.5 w-px bg-stone-50/25 sm:block" aria-hidden="true" />
        <div className="flex items-center gap-2 text-stone-50/95">
          <IconCalendar className="h-[15px] w-[15px] text-brass-400" />
          <span className="text-[12.5px]">
            <span className="font-medium">Wednesdays</span> &middot; 6:15 PM
            (Sept&ndash;May)
          </span>
        </div>
        <span className="hidden h-3.5 w-px bg-stone-50/25 sm:block" aria-hidden="true" />
        <Link
          href="https://maps.google.com/?q=2331+E+5th+Pl,+Tulsa,+OK+74104"
          className="flex items-center gap-1.5 text-stone-50/95 underline-offset-2 hover:underline"
        >
          <IconMapPin className="h-[15px] w-[15px] text-brass-400" />
          <span className="text-[12.5px]">2331 E 5th Pl, Tulsa</span>
        </Link>
      </div>
    </div>
  );
}
