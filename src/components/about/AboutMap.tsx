import Link from "next/link";
import { IconArrowRight } from "@/components/home/icons";

export function AboutMap() {
  return (
    <section className="bg-stone-100">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:px-8 sm:py-20 lg:grid-cols-[1fr_1.8fr] lg:items-start">
        <div>
          <p className="font-meta text-[11px] uppercase tracking-[0.18em] text-garnet-600">
            Find us
          </p>
          <address className="mt-3 not-italic">
            <p className="font-display text-[22px] font-medium leading-snug text-ink">
              2331 East 5th Place
              <br />
              Tulsa, OK 74104
            </p>
          </address>
          <div className="mt-5 space-y-0.5 text-[14px] text-stone-700">
            <p className="font-display text-[15px] font-medium text-ink">Office Hours</p>
            <p>Monday - Thursday</p>
            <p>8:00 AM - 2:00 PM</p>
          </div>
          <Link
            href="https://maps.google.com/?q=2331+E+5th+Pl,+Tulsa,+OK+74104"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-1.5 text-[13px] font-medium text-garnet-700 hover:text-garnet-600"
          >
            Get directions
            <IconArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="aspect-video overflow-hidden rounded-sm border border-stone-200 lg:aspect-auto lg:h-80">
          <iframe
            src="https://maps.google.com/maps?q=2331+E+5th+Pl,+Tulsa,+OK+74104&output=embed"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Grace Lutheran Church location map"
          />
        </div>
      </div>
    </section>
  );
}
