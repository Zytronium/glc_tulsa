"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {tinaField} from "tinacms/dist/react";
import type {GlobalVariablesData} from "@/app/(main)/layout";

const NAV_LINKS = [
  {label: "Home", href: "/"},
  {label: "Worship", href: "/worship"},
  {label: "Events", href: "/events"},
  {label: "Ministries", href: "/ministries"},
  {label: "About", href: "/about"},
];

export function Navbar({globalVars}: { globalVars: GlobalVariablesData }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  // close on navigation
  useEffect(() => { setMenuOpen(false); }, [pathname]);

  // close on Escape
  useEffect(() => {
    if (!menuOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-30 border-b border-stone-900/15 bg-vestment-700">

      {/* main bar */}
      <nav
        aria-label="Primary"
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8"
      >
        <Link href="/" className="flex items-center" onClick={() => setMenuOpen(false)}>
          <Image
            src="/images/grace-logo-long.webp"
            alt="Grace Lutheran Church"
            width={202}
            height={40}
            className="h-10 w-auto opacity-95 hidden xs:block"
          />
          <Image
            src="/images/cross.webp"
            alt="GLC"
            width={27}
            height={40}
            className="h-10 w-auto opacity-95 block xs:hidden"
          />
        </Link>

        {/* Desktop links */}
        <ul className="hidden items-center gap-6 lg:gap-8 md:flex">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={[
                    "font-meta text-[12px] lg:text-[13px] uppercase tracking-[0.08em] transition-all duration-200 hover:text-brass-400 active:text-brass-300",
                    isActive ? "text-brass-300" : "text-stone-200/85",
                  ].join(" ")}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* right cluster */}
        <div className="flex items-center gap-4">

          {/* Facebook - desktop only */}
          {globalVars.facebookUrl && (
            <Link
              href={globalVars.facebookUrl}
              data-tina-field={tinaField(globalVars, "facebookUrl")}
              aria-label="Grace Lutheran on Facebook"
              className="hidden text-stone-300 transition hover:text-brass-400 md:block"
            >
              <svg viewBox="0 0 24 24" className="h-4.5 w-4.5" fill="none" aria-hidden="true">
                <path
                  d="M14.5 21V13.5H17L17.4 10.2H14.5V8.3C14.5 7.4 14.8 6.8 16.1 6.8H17.5V3.9C17.2 3.9 16.3 3.8 15.3 3.8C13.1 3.8 11.5 5.1 11.5 7.6V10.2H9V13.5H11.5V21"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          )}

          {/* Donate - desktop only */}
          {globalVars.donationUrl && (
            <Link
              href={globalVars.donationUrl}
              data-tina-field={tinaField(globalVars, "donationUrl")}
              className="hidden rounded-sm bg-brass-300 px-3.5 py-1.75 font-meta text-[12px] uppercase tracking-[0.08em] text-vestment-900 transition hover:bg-brass-400 md:block"
            >
              Donate
            </Link>
          )}

          {/* hamburger menu - mobile only */}
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="flex h-8 w-8 flex-col items-center justify-center gap-1.5 rounded-sm md:hidden"
          >
            <span className={[
      "block h-px w-5 bg-stone-200 transition-all duration-200",
      menuOpen ? "translate-y-[7px] rotate-45" : "",
            ].join(" ")} />
            <span className={[
                "block h-px w-5 bg-stone-200 transition-all duration-200",
                menuOpen ? "opacity-0" : "",
            ].join(" ")} />
            <span className={[
                "block h-px w-5 bg-stone-200 transition-all duration-200",
                menuOpen ? "-translate-y-[7px] -rotate-45" : "",
            ].join(" ")} />
          </button>

        </div>
      </nav>

      {/* mobile menu */}
      <div
        id="mobile-menu"
        aria-hidden={!menuOpen}
        className={[
          "overflow-hidden transition-all duration-300 ease-in-out md:hidden",
          menuOpen ? "max-h-80" : "max-h-0",
        ].join(" ")}
      >
        <nav aria-label="Mobile" className="border-t border-vestment-800/60 bg-vestment-800 px-5 pb-6 pt-2">
          <ul>
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={[
                      "flex items-center border-b border-vestment-700/60 py-3.5 font-meta text-[13px] uppercase tracking-[0.08em] transition-colors",
                      isActive ? "text-brass-300" : "text-stone-200/85 hover:text-brass-400",
                    ].join(" ")}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="mt-5 flex items-center gap-5">
            {globalVars.facebookUrl && (
              <Link
                href={globalVars.facebookUrl}
                aria-label="Grace Lutheran on Facebook"
                className="text-stone-300 transition hover:text-brass-400"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
                  <path
                    d="M14.5 21V13.5H17L17.4 10.2H14.5V8.3C14.5 7.4 14.8 6.8 16.1 6.8H17.5V3.9C17.2 3.9 16.3 3.8 15.3 3.8C13.1 3.8 11.5 5.1 11.5 7.6V10.2H9V13.5H11.5V21"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            )}
            {globalVars.donationUrl && (
              <Link
                href={globalVars.donationUrl}
                className="rounded-sm bg-brass-300 px-4 py-2 font-meta text-[12px] uppercase tracking-[0.08em] text-vestment-900 transition hover:bg-brass-400"
              >
                Donate
              </Link>
            )}
          </div>
        </nav>
      </div>

    </header>
  );
}
