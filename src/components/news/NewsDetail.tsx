import Image from "next/image";
import { tinaField } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { IconCalendar } from "@/components/home/icons";
import type { NewsItemQuery } from "@/../tina/__generated__/types";
import {BackLink} from "@/components/BackLink";

export function NewsDetail({ item }: { item: NewsItemQuery["newsItem"] }) {
  const d = new Date(item.date);
  const month = d.toLocaleString("en-US", { month: "long", timeZone: "UTC" });
  const day = String(d.getUTCDate());
  const year = d.getUTCFullYear();

  const backHrefFallback = "/news";
  const backLabel = "Back to news";

  return (
    <section
      className="border-b border-stone-200 bg-white"
      style={{
        backgroundImage: "url('/images/paper.png')",
        backgroundRepeat: "repeat-y",
        backgroundSize: "100% auto",
        backgroundPosition: "center",
      }}
    >
      <div className="mx-auto max-w-3xl px-5 py-14 sm:px-8 sm:py-20 md:px-10 lg:px-0">
        <p className="font-meta text-[11px] uppercase tracking-[0.18em] text-garnet-600">
          {item.type === "announcement" ? "Announcement" : "News"}
        </p>

        <h1
          data-tina-field={tinaField(item, "title")}
          className="mt-3 font-display text-[28px] font-medium leading-tight text-ink sm:text-[32px]"
        >
          {item.title}
        </h1>

        <p
          data-tina-field={tinaField(item, "date")}
          className="mt-3 flex items-center gap-1.5 text-sm text-stone-500"
        >
          <IconCalendar className="h-3.5 w-3.5 text-brass-500" />
          {month} {day}, {year}
        </p>

        {item.image && (
          <div className="relative mt-8 w-full overflow-hidden rounded-card">
            <Image
              src={item.image}
              alt={item.title}
              width={1600}
              height={900}
              sizes="100vw"
              className="h-auto max-h-120 w-full object-cover"
              data-tina-field={tinaField(item, "image")}
            />
          </div>
        )}

        {item.content && (
          <div
            data-tina-field={tinaField(item, "content")}
            className="prose prose-stone mt-8 max-w-none text-[15px] leading-7 text-stone-700 prose-headings:font-display prose-headings:text-ink prose-strong:text-ink"
          >
            <div className="tina-markdown">
              <TinaMarkdown content={item.content} />
            </div>
          </div>
        )}

        <BackLink fallbackHref={backHrefFallback}>
          {backLabel}
        </BackLink>
      </div>
    </section>
  );
}
