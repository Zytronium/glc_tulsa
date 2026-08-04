"use client";

import { useTina } from "tinacms/dist/react";
import { tinaField } from "tinacms/dist/react";
import Image from "next/image";
import type { HistoryPageQuery } from "@/../tina/__generated__/types";
import { HistoryContent } from "@/components/history/HistoryContent";

type TinaQuery<T> = { query: string; variables: object; data: T };

type Props = {
  query: TinaQuery<HistoryPageQuery>;
};

export function ClientPage({ query }: Props) {
  const { data } = useTina(query);
  const page = data.historyPage;

  return (
    <main>
      <div className="relative isolate overflow-hidden border-b border-stone-200 bg-vestment-900 px-5 py-16 text-center sm:px-8 sm:py-24">
        {page.headerBackgroundImage && (
          <>
            <Image
              src={page.headerBackgroundImage}
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover opacity-40"
              data-tina-field={tinaField(page, "headerBackgroundImage")}
            />
            <div aria-hidden="true" className="absolute inset-0 bg-vestment-900/60" />
          </>
        )}
        <div className="relative mx-auto max-w-3xl">
          {page.eyebrow && (
            <p
              data-tina-field={tinaField(page, "eyebrow")}
              className="font-meta text-[12px] uppercase tracking-[0.22em] text-brass-400"
            >
              {page.eyebrow}
            </p>
          )}
          <h1
            data-tina-field={tinaField(page, "headline")}
            className="mt-4 font-display text-[clamp(1.75rem,4vw,2.75rem)] font-medium text-stone-50"
          >
            {page.headline}
          </h1>
        </div>
      </div>
      <HistoryContent sections={page.sections!} />
    </main>
  );
}
