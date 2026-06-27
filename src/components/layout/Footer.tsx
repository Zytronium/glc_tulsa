"use client";

import Image from "next/image";
import Link from "next/link";
import { tinaField } from "tinacms/dist/react";
import { IconCoin, IconFacebook, IconMail, IconPhone } from "../home/icons";
import type { FooterData } from "@/app/(main)/layout";

export function Footer({ footer }: { footer: FooterData }) {
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
          <p className="mt-4 font-display text-[14px] text-stone-50">
            Grace Evangelical Lutheran Church (LCMS)
          </p>
          <p className="mt-2 text-[13px] leading-7 text-stone-300">
            <span data-tina-field={tinaField(footer, "addressLine1")}>
            {footer.addressLine1}
            </span>
            <br />
            <span data-tina-field={tinaField(footer, "addressLine2")}>
            {footer.addressLine2}
            </span>
          </p>
        </div>

        <div>
          <p className="font-display text-[14px] text-stone-50">Office hours</p>
          <p className="mt-2 text-[13px] leading-7 text-stone-300">
            <span data-tina-field={tinaField(footer, "officeHoursDays")}>
            {footer.officeHoursDays}
            </span>
            <br />
            <span data-tina-field={tinaField(footer, "officeHoursTimes")}>
            {footer.officeHoursTimes}
            </span>
          </p>
        </div>

        <div>
          <p className="font-display text-[14px] text-stone-50">Connect</p>
          <div className="mt-3 flex flex-col gap-2.5">
            {footer.email && (() => {
              const query: string[] = [];

              if (footer.emailSubject) {
                query.push(`subject=${encodeURIComponent(footer.emailSubject)}`);
              }

              if (footer.emailBcc) {
                query.push(`bcc=${encodeURIComponent(footer.emailBcc)}`);
              }

              const href = `mailto:${footer.email}${query.length ? `?${query.join("&")}` : ""}`;

              return (
                <Link
                  href={href}
                  data-tina-field={tinaField(footer, "email")}
                  className="flex items-center gap-2 text-[13px] text-stone-300 hover:text-brass-400"
                >
                  <IconMail className="h-4 w-4" />
                  {footer.email}
                </Link>
              );
            })()}
            {footer.phone && (
              <p
                data-tina-field={tinaField(footer, "phone")}
                className="flex items-center gap-2 text-[13px] text-stone-300"
              >
                <IconPhone className="h-4 w-4" />
                {footer.phone}
              </p>
            )}
            {footer.facebookUrl && (
              <Link
                href={footer.facebookUrl}
                data-tina-field={tinaField(footer, "facebookUrl")}
                className="flex items-center gap-2 text-[13px] text-stone-300 hover:text-brass-400"
              >
                <IconFacebook className="h-4 w-4" />
                Facebook
              </Link>
            )}
            {footer.donationUrl && (
              <Link
                href={footer.donationUrl}
                data-tina-field={tinaField(footer, "donationUrl")}
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
          Grace Evangelical Lutheran Church &middot; LCMS &middot; Since 1922
        </p>
      </div>
    </footer>
  );
}
