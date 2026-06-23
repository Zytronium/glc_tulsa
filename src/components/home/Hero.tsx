import Image from "next/image";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-vestment-900">
      <Image
        src="/images/chancel.webp"
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
              width={810}   // Intrinsic natural width
              height={628}  // Intrinsic natural height
              className="w-auto h-32 sm:h-40 md:h-48 mx-auto transition-all duration-200"
          />
          <p className="font-heading text-[clamp(3rem,7vw,4.75rem)] text-white">
              Grace Lutheran Church
          </p>
        <p className="text-[14px] uppercase tracking-[0.22em] text-brass-400">
          LCMS
        </p>
        <h1 className="mt-5 font-display text-[clamp(2rem,4.8vw,3.4rem)] font-medium leading-[1.05] text-stone-50">
          Ancient faith
          <br />
          for today&rsquo;s Tulsa
        </h1>
        <p className="mt-6 max-w-xl text-[15px] leading-7 text-stone-200/90">
          A warm, welcoming Lutheran congregation rooted in nearly 2,000 years
          of historic Christian tradition, gathered around Word and
          Sacrament since 1922.
        </p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/visit"
            className="rounded-sm bg-brass-300 px-6 py-3 text-sm font-semibold tracking-wide text-vestment-900 transition hover:bg-brass-400"
          >
            Plan your visit
          </Link>
          <Link
            href="/about"
            className="rounded-sm border bg-vestment-700 border-vestment-900/30 px-6 py-3 text-sm font-semibold tracking-wide text-stone-50 transition hover:bg-vestment-800 hover:border-vestment-900/80"
          >
            Learn more
          </Link>
        </div>
      </div>
    </section>
  );
}
