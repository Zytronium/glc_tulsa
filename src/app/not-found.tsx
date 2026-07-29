import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "404 - Page Not Found",
};

export default async function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 py-20 bg-stone-100 text-ink">

      {/* -------- 404 label -------- */}
      <p className="font-meta text-xs tracking-[0.25em] uppercase text-stone-500 mb-2">
        Error
      </p>
      <h1 className="font-heading text-[8rem] leading-none text-garnet-600 select-none mb-6">
        404
      </h1>

      {/* -------- stained glass window image -------- */}
      <div className="relative w-75 h-117 mb-10">
        <Image
          src="/images/window.webp"
          alt="Stained glass window"
          fill
          className="object-contain border-stone-900 border-6"
          priority
        />
      </div>

      {/* -------- lancet arch divider -------- */}
      <svg
        className="arch-top text-brass-400 mb-6"
        viewBox="0 0 40 24"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M2 24 C2 10 20 2 20 2 C20 2 38 10 38 24"
          stroke="currentColor"
          strokeWidth="1.5"
          fill="none"
        />
      </svg>

      {/* -------- heading -------- */}
      <h2 className="font-display text-2xl text-vestment-700 text-center mb-3 max-w-sm">
        This page could not be found
      </h2>

      {/* -------- body copy -------- */}
      <p className="font-body text-base text-stone-700 text-center max-w-md leading-relaxed mb-2">
        The page you&apos;re looking for either doesn&apos;t exist or hasn&apos;t been created yet.
      </p>

      {/* -------- joke -------- */}
      <p className="font-meta text-xs text-stone-500 text-center max-w-xs italic mb-10 leading-relaxed">
        &#34;And on the eighth day, God said,<br/>&apos;Where did I put Planet Nine again?&apos;&#34;
        <span className="block not-italic text-stone-400 mt-1">- Genesis 2:3.5 (web developer&apos;s edition)</span>
      </p>

      {/* -------- brass rule -------- */}
      <div
        className="w-16 border-t border-brass-400 mb-10"
        aria-hidden="true"
      />

      {/* -------- home link -------- */}
      <Link
        href="/"
        className="font-meta text-xs tracking-[0.2em] uppercase text-vestment-600 border border-vestment-600 px-6 py-3 hover:bg-vestment-700 hover:text-stone-50 hover:border-vestment-700 transition-colors duration-200"
      >
        Return to Home
      </Link>

    </main>
  );
}
