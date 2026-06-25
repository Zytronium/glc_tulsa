import Image from "next/image";
import Link from "next/link";
import { tinaField } from "tinacms/dist/react";

import type { HomeData } from "@/app/(main)/page";
type Props = { hero: NonNullable<HomeData["hero"]> };

export function Hero({ hero }: Props) {
  return (
    <section className="relative isolate overflow-hidden bg-vestment-900">
      <Image
        src={hero.backgroundImage ?? "/images/chancel.webp"}
        alt="The candlelit chancel and stained-glass reredos at Grace Evangelical Lutheran Church"
        fill
        priority
        sizes="100vw"
        className="object-cover object-[center_30%] opacity-[0.42]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-linear-to-b from-vestment-900/70 via-vestment-900/55 to-vestment-900"
      />
      <div className="relative mx-auto flex max-w-3xl flex-col items-center px-6 pb-28 text-center sm:pb-36">
        <Image
          src="/images/grace-logo.webp"
          alt="Grace Lutheran"
          width={810}
          height={628}
          className="w-auto h-32 sm:h-40 md:h-48 mx-auto transition-all duration-200"
        />
        <p data-tina-field={tinaField(hero, "title")}
           className="font-heading text-[clamp(3rem,7vw,4.75rem)] text-white"
        >
          {hero.title}
        </p>
        <p className="text-[14px] uppercase tracking-[0.22em] text-brass-400">
          LCMS
        </p>
        <h1
          data-tina-field={tinaField(hero, "headline")}
          className="mt-5 font-display text-[clamp(2rem,4.8vw,3.4rem)] font-medium leading-[1.05] text-stone-50"
        >
          {hero.headline?.split("|").map((line, i) => (
            <span key={i} className="block">
              {line.trim()}
            </span>
          ))}
        </h1>
        <p
          data-tina-field={tinaField(hero, "subtext")}
          className="mt-6 max-w-xl text-[15px] leading-7 text-stone-200/90"
        >
          {hero.subtext}
        </p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          {hero.ctaPrimary?.href && (
            <Link
              href={hero.ctaPrimary.href}
              data-tina-field={tinaField(hero.ctaPrimary, "label")}
              className="rounded-sm bg-brass-300 px-6 py-3 text-sm font-semibold tracking-wide text-vestment-900 transition hover:bg-brass-400"
            >
              {hero.ctaPrimary.label}
            </Link>
          )}
          {hero.ctaSecondary?.href && (
            <Link
              href={hero.ctaSecondary.href}
              data-tina-field={tinaField(hero.ctaSecondary, "label")}
              className="rounded-sm border bg-vestment-700 border-vestment-900/30 px-6 py-3 text-sm font-semibold tracking-wide text-stone-50 transition hover:bg-vestment-800 hover:border-vestment-900/80"
            >
              {hero.ctaSecondary.label}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}