import Link from "next/link";
import { IconMail } from "@/components/home/icons";

const NEWSLETTER_SIGNUP_URL = "https://mailchi.mp/b6c27c32e1ce/sign-up-for-eblasts";

export function NewsletterSignup() {
  return (
    <section
      className="border-b border-stone-100 bg-white"
      style={{
        backgroundImage: "url('/images/paper.png')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="mx-auto max-w-3xl px-5 py-14 text-center sm:px-8 sm:py-20">
        <p className="font-meta text-[11px] uppercase tracking-[0.18em] text-garnet-600">
          Stay Connected
        </p>
        <h2 className="mt-2 font-display text-2xl font-medium text-ink sm:text-3xl">
          Get News &amp; Updates by Email
        </h2>
        <p className="mx-auto mt-3 leading-6 text-stone-700">
          Sign up for our email eblasts to stay up to date on parish news, events, and announcements.
        </p>
        <Link
          href={NEWSLETTER_SIGNUP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-2 rounded-sm bg-garnet-700 px-6 py-3 text-sm font-medium text-white transition hover:bg-garnet-800"
        >
          <IconMail className="h-4 w-4" />
          Sign Up for Eblasts
        </Link>
      </div>
    </section>
  );
}
