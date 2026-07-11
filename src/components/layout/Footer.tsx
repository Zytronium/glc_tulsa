"use client";

import Image from "next/image";
import Link from "next/link";
import { tinaField } from "tinacms/dist/react";
import { IconCoin, IconFacebook, IconMail, IconPhone } from "../home/icons";
import type { LayoutData, GlobalVariablesData } from "@/app/(main)/layout";

type Props = {
  layout: LayoutData;
  globalVars: GlobalVariablesData;
};

export function Footer({ layout, globalVars }: Props) {
  return (
    <footer className="bg-vestment-900">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-12 sm:grid-cols-3 sm:gap-8 sm:px-8">
        <div>
          <Image
            src="/images/grace-logo.webp"
            alt="Grace Evangelical Lutheran Church crest"
            width={104}
            height={80}
            className="h-20 w-auto opacity-90"
          />
          {layout.churchName && (
            <p data-tina-field={tinaField(layout, "churchName")}
               className="mt-4 font-display text-[14px] text-stone-50">
              {layout.churchName}
            </p>
          )}
          <p className="mt-2 text-[13px] leading-7 text-stone-300">
            <span data-tina-field={tinaField(globalVars, "addressLine1")}>
              {globalVars.addressLine1}
            </span>
            <br />
            <span data-tina-field={tinaField(globalVars, "addressLine2")}>
              {globalVars.addressLine2}
            </span>
          </p>
        </div>

        <div>
          <p className="font-display text-[14px] text-stone-50">Office hours</p>
          <p className="mt-2 text-[13px] leading-7 text-stone-300">
            <span data-tina-field={tinaField(globalVars, "officeHoursDays")}>
              {globalVars.officeHoursDays}
            </span>
            <br />
            <span data-tina-field={tinaField(globalVars, "officeHoursTimes")}>
              {globalVars.officeHoursTimes}
            </span>
          </p>
        </div>

        <div>
          <p className="font-display text-[14px] text-stone-50">Connect</p>
          <div className="mt-3 flex flex-col gap-2.5">
            {layout.email && (() => {
              const query: string[] = [];
              if (layout.emailSubject) {
                query.push(`subject=${encodeURIComponent(layout.emailSubject)}`);
              }
              if (layout.emailCc) {
                query.push(`cc=${encodeURIComponent(layout.emailCc)}`);
              }
              const href = `mailto:${layout.email}${query.length ? `?${query.join("&")}` : ""}`;
              return (
                <Link
                  href={href}
                  data-tina-field={tinaField(layout, "email")}
                  className="flex items-center gap-2 text-[13px] text-stone-300 hover:text-brass-400"
                >
                  <IconMail className="h-4 w-4" />
                  {layout.email}
                </Link>
              );
            })()}
            {layout.phone && (
              <p
                data-tina-field={tinaField(layout, "phone")}
                className="flex items-center gap-2 text-[13px] text-stone-300"
              >
                <IconPhone className="h-4 w-4" />
                {layout.phone}
              </p>
            )}
            {globalVars.facebookUrl && (
              <Link
                href={globalVars.facebookUrl}
                data-tina-field={tinaField(globalVars, "facebookUrl")}
                className="flex items-center gap-2 text-[13px] text-stone-300 hover:text-brass-400"
              >
                <IconFacebook className="h-4 w-4" />
                Facebook
              </Link>
            )}
            {globalVars.donationUrl && (
              <Link
                href={globalVars.donationUrl}
                data-tina-field={tinaField(globalVars, "donationUrl")}
                className="flex items-center gap-2 text-[13px] text-stone-300 hover:text-brass-400"
              >
                <IconCoin className="h-4 w-4" />
                Make a donation
              </Link>
            )}
          </div>
        </div>
      </div>

      <div className="border-t border-stone-50/10 px-5 py-5 text-center sm:px-8">
        <p className="font-meta text-[11px] tracking-wide text-stone-400">
          &copy; {new Date().getFullYear()}{" "}
          <span data-tina-field={tinaField(layout, "copyright")}>
            {layout.copyright}
          </span>
        </p>
      </div>
    </footer>
  );
}
