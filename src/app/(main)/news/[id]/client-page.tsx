"use client";

import { useTina } from "tinacms/dist/react";
import type { NewsItemQuery } from "@/../tina/__generated__/types";
import { NewsDetail } from "@/components/news/NewsDetail";

type TinaQuery<T> = { query: string; variables: object; data: T };

type Props = { newsQuery: TinaQuery<NewsItemQuery> };

export function ClientPage({ newsQuery }: Props) {
  const { data } = useTina(newsQuery);
  return (
    <main>
      <NewsDetail item={data.newsItem} />
    </main>
  );
}