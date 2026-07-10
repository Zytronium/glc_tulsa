"use client";

import { useTina } from "tinacms/dist/react";
import type { NewsItemConnectionQuery } from "@/../tina/__generated__/types";
import { NewsGrid } from "@/components/news/NewsGrid";

type TinaQuery<T> = { query: string; variables: object; data: T };

type Props = {
  newsQuery: TinaQuery<NewsItemConnectionQuery>;
};

export function ClientPage({ newsQuery }: Props) {
  const { data } = useTina(newsQuery);

  const items = (data.newsItemConnection.edges ?? [])
    .map((edge) => edge?.node)
    .filter((node) => node !== null && node !== undefined);

  return (
    <main>
      <NewsGrid items={items} />
    </main>
  );
}
