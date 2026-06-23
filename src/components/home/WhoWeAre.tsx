import Image from "next/image";
import Link from "next/link";
import { IconArrowRight } from "./icons";

const MARKS = [
  {
    label: "Evangelical",
    text: "The Gospel of Jesus Christ is central: forgiveness, life, and salvation through His death and resurrection.",
  },
  {
    label: "Catholic",
    text: "Members of the universal church, faithful heirs of nearly 2,000 years of Christian tradition and liturgy.",
  },
  {
    label: "Biblical",
    text: "The Holy Scriptures are the Word of God, sufficient for all faith and practice. Our liturgy and preaching are biblical.",
  },
  {
    label: "Incarnational",
    text: "God reveals Himself through Word and Sacrament: water, bread, wine, and the preaching of the Holy Gospel.",
  },
];

export function WhoWeAre() {
  return (
    <section className="border-b border-stone-200 bg-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:px-8 sm:py-20 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
        <div className="relative aspect-[4/5] overflow-hidden rounded-sm lg:aspect-auto">
          <Image
            src="/images/altar-easter-bw.webp"
            alt="The altar dressed for Easter, lined with candles and lilies"
            fill
            sizes="(min-width: 1024px) 40vw, 100vw"
            className="object-cover grayscale"
          />
        </div>

        <div>
          <p className="font-meta text-[11px] uppercase tracking-[0.18em] text-garnet-600">
            Who we are
          </p>
          <h2 className="mt-3 max-w-md font-display text-[28px] font-medium leading-tight text-ink sm:text-[32px]">
            Evangelical, catholic, biblical, and incarnational
          </h2>

          <dl className="mt-8 grid gap-5 sm:grid-cols-2">
            {MARKS.map((mark) => (
              <div
                key={mark.label}
                className="border-l-2 border-brass-500 bg-stone-50 py-3 pl-4 pr-3"
              >
                <dt className="font-display text-[15px] text-ink">
                  {mark.label}
                </dt>
                <dd className="mt-1 text-[13px] leading-6 text-stone-700">
                  {mark.text}
                </dd>
              </div>
            ))}
          </dl>

          <Link
            href="/about"
            className="mt-7 inline-flex items-center gap-1.5 text-[13px] font-medium text-garnet-700 hover:text-garnet-600"
          >
            About our faith
            <IconArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
