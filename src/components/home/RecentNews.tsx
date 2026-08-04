import Link from "next/link";
import Image from "next/image";
import { tinaField } from "tinacms/dist/react";
import { IconArrowRight, IconChevronRight } from "./icons";
import type { NewsItemConnectionQuery } from "@/../tina/__generated__/types";

type NewsNode = NonNullable<NonNullable<NewsItemConnectionQuery["newsItemConnection"]["edges"]>[number]>["node"];

type Props = {
  items: NonNullable<NewsNode>[];
  // true when the section before this one in the DOM was skipped, so this section
  // should take on the background that section would have had, to keep alternation intact
  useAltBackground?: boolean;
};

function getFileName(id: string) {
  const lastSlash = id.lastIndexOf("/");
  const lastDot = id.lastIndexOf(".json");
  return id.substring(lastSlash + 1, lastDot);
}

function getHref(item: NonNullable<NewsNode>) {
  const base = item.type === "announcement" ? "/announcements" : "/news";
  return `${base}/${getFileName(item.id)}`;
}

function oneYearAgo() {
  const d = new Date();
  d.setUTCFullYear(d.getUTCFullYear() - 1);
  return d;
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return {
    month: d.toLocaleString("en-US", { month: "short", timeZone: "UTC" }),
    day: String(d.getUTCDate()),
    year: String(d.getUTCFullYear()),
  };
}

export function RecentNews({ items, useAltBackground }: Props) {
  const cutoff = oneYearAgo();

  const recent = [...items]
    .filter((item) => new Date(item.date) >= cutoff)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 4);

  if (recent.length === 0)
    return null;

  const [featured, ...secondary] = recent;
  const featuredDate = formatDate(featured.date);

  const bgImage = useAltBackground ? "/images/paper.png" : "/images/aged_paper.png";
  const borderClass = useAltBackground ? "border-stone-100" : "border-stone-200";
  const bgClass = useAltBackground ? "bg-white" : "bg-stone-100";

  return (
    <section
      className={`border-b ${borderClass} ${bgClass}`}
      style={{
        backgroundImage: `url('${bgImage}')`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="mx-auto max-w-5xl px-5 py-14 sm:px-8 sm:py-20">
        <div className="mb-9 flex flex-col items-start gap-2 border-b border-stone-300/70 pb-4 sm:flex-row sm:items-end sm:justify-between sm:gap-4">
          <div>
            <p className="font-meta text-[11px] uppercase tracking-[0.18em] text-garnet-600">
              Parish Life
            </p>
            <h2 className="mt-1 font-display text-2xl sm:text-3xl font-medium text-ink">
              News &amp; Announcements
            </h2>
          </div>
          <Link
            href="/news"
            className="flex items-center gap-1 text-sm text-stone-700 transition hover:text-garnet-700"
          >
            View all
            <IconArrowRight className="h-3 w-3" />
          </Link>
        </div>

        <div className="grid min-w-0 gap-6 md:grid-cols-5">
          {/* -------- featured item -------- */}
          <Link
            href={getHref(featured)}
            className="group flex min-w-0 flex-col overflow-hidden rounded-sm border border-stone-200 bg-white transition hover:border-garnet-600/40 md:col-span-3"
          >
            {featured.image && (
              <div className="relative h-56 w-full overflow-hidden sm:h-64">
                <Image
                  fill
                  src={featured.image}
                  alt={featured.title}
                  className="object-cover transition duration-300 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-black/60 to-transparent"/>
              </div>
            )}

            <div className="relative flex min-w-0 flex-1 flex-col justify-between p-6">
              {!featured.image && (
                <span className="absolute inset-x-0 top-0 h-1 bg-garnet-600" />
              )}
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-meta text-[10px] uppercase tracking-[0.1em] text-garnet-700">
                    {featured.type === "announcement" ? "Announcement" : "News"}
                  </span>
                  <span className="text-stone-300">&middot;</span>
                  <span className="font-meta text-[11px] uppercase tracking-[0.1em] text-stone-500">
                    {featuredDate.month} {featuredDate.day}, {featuredDate.year}
                  </span>
                </div>
                <p
                  data-tina-field={tinaField(featured, "title")}
                  className="mt-2 font-display text-xl text-ink"
                >
                  {featured.title}
                </p>
                <p
                  data-tina-field={tinaField(featured, "summary")}
                  className="mt-2 text-[15px] leading-relaxed text-stone-700"
                >
                  {featured.summary}
                </p>
              </div>
              <span className="mt-5 flex items-center gap-1 font-meta text-[11px] uppercase tracking-[0.1em] text-garnet-700">
                Read more
                <IconChevronRight className="h-3 w-3 transition group-hover:translate-x-0.5" />
              </span>
            </div>
          </Link>

          {/* -------- secondary items -------- */}
          <div className="flex min-w-0 flex-col gap-4 md:col-span-2">
            {secondary.map((item) => {
              const d = formatDate(item.date);
              return (
                <Link
                  key={item.id}
                  href={getHref(item)}
                  className="group flex min-w-0 flex-1 items-stretch overflow-hidden rounded-sm border border-stone-200 bg-white transition hover:border-garnet-600/40"
                >
                  <span className="w-1 shrink-0 bg-brass-400" />

                  <div className="flex min-w-0 flex-1 items-center gap-4 p-4">
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-meta text-[10px] uppercase tracking-[0.1em] text-garnet-700">
                          {item.type === "announcement" ? "Announcement" : "News"}
                        </span>
                        <span className="text-stone-300">&middot;</span>
                        <span className="font-meta text-[10px] uppercase tracking-[0.1em] text-stone-500">
                          {d.month} {d.day}
                        </span>
                      </div>
                      <p
                        data-tina-field={tinaField(item, "title")}
                        className="mt-1 truncate font-display text-base text-ink"
                      >
                        {item.title}
                      </p>
                      <p
                        data-tina-field={tinaField(item, "summary")}
                        className="mt-1 line-clamp-2 text-sm leading-snug text-stone-700"
                      >
                        {item.summary}
                      </p>
                    </div>

                    {item.image && (
                      <div className="relative hidden h-14 w-14 shrink-0 overflow-hidden rounded-sm xs:block">
                        <Image
                          fill
                          src={item.image}
                          alt={item.title}
                          className="object-cover"
                        />
                      </div>
                    )}

                    <IconChevronRight className="h-4 w-4 shrink-0 text-stone-300 transition group-hover:text-garnet-600" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
