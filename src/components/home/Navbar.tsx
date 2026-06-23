import Image from "next/image";
import Link from "next/link";

const NAV_LINKS = [
  { label: "Worship", href: "/worship" },
  { label: "Events", href: "/events" },
  { label: "Ministries", href: "/ministries" },
  { label: "About", href: "/about" },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-30 border-b border-stone-900/15 bg-vestment-700">
      <nav
        aria-label="Primary"
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8"
      >
        <Link href="/" className="flex items-center">
          <Image
            src="/images/grace-logo-long.webp"
            alt="Grace Lutheran Curch"
            width={202}
            height={40}
            className="h-10 w-auto opacity-95 xs:block hidden sm:hidden md:block"
          />
          <Image
            src="/images/cross.webp"
            alt="GLC"
            width={27}
            height={40}
            className="h-10 w-auto opacity-95 xs:hidden sm:block block md:hidden"
          />
        </Link>

        <ul className="hidden items-center gap-8 sm:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="font-meta text-[12px] lg:text-[13px] uppercase tracking-[0.08em] text-stone-200/85 transition-all duration-200 hover:text-brass-400 active:text-brass-300"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-4">
          <Link
            href="https://www.facebook.com/gracelutherantulsa"
            aria-label="Grace Lutheran on Facebook"
            className="hidden text-stone-300 transition hover:text-brass-400 sm:block"
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
          <Link
            href="https://secure.myvanco.com/L-Z8SV"
            className="rounded-sm bg-brass-300 px-3.5 py-1.75 font-meta text-[12px] uppercase tracking-[0.08em] text-vestment-900 transition hover:bg-brass-400"
          >
            Donate
          </Link>
        </div>
      </nav>
    </header>
  );
}
