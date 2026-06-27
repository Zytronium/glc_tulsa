import Link from "next/link";
import { tinaField } from "tinacms/dist/react";
import { IconSun, IconCalendar, IconMapPin } from "./icons";
import type { HomeData } from "@/app/(main)/page";
import type { FooterData } from "@/app/(main)/layout";

type Props = {
  serviceBar: NonNullable<HomeData["serviceBar"]>;
  footer: FooterData;
};

export function ServiceBar({ serviceBar, footer }: Props) {
  return (
    <div className="border-b border-garnet-900/15 bg-garnet-700">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-7 gap-y-2 px-5 py-3 sm:gap-x-9">
        <div className="flex items-center gap-2 text-stone-50/95">
          <IconSun className="h-3.75 w-3.75 text-brass-400" />
          <span className="text-[12.5px]">
            <span className="font-medium">Sundays</span> &middot;{" "}
            <span data-tina-field={tinaField(serviceBar, "sundayTimes")}>
              {serviceBar.sundayTimes}
            </span>
          </span>
        </div>
        <span className="hidden h-3.5 w-px bg-stone-50/25 sm:block" aria-hidden="true" />
        <div className="flex items-center gap-2 text-stone-50/95">
          <IconCalendar className="h-3.75 w-3.75 text-brass-400" />
          <span className="text-[12.5px]">
            <span className="font-medium">Wednesdays</span> &middot;{" "}
            <span data-tina-field={tinaField(serviceBar, "wednesdayTimes")}>
              {serviceBar.wednesdayTimes}
            </span>
          </span>
        </div>
        <span className="hidden h-3.5 w-px bg-stone-50/25 sm:block" aria-hidden="true" />
        {serviceBar.addressUrl && footer.addressLine1 && (
          <Link
            href={serviceBar.addressUrl}
            data-tina-field={tinaField(footer, "addressLine1")}
            className="flex items-center gap-1.5 text-stone-50/95 underline-offset-2 hover:underline"
          >
            <IconMapPin className="h-3.75 w-3.75 text-brass-400" />
            <span className="text-[12.5px]">{footer.addressLine1}</span>
          </Link>
        )}
      </div>
    </div>
  );
}
