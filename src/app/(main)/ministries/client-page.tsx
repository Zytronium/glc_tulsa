"use client";

import { useTina } from "tinacms/dist/react";
import type { MinistriesPageQuery } from "@/../tina/__generated__/types";
import { MinistriesHero } from "@/components/ministries/MinistriesHero";
import { MinistriesGrid } from "@/components/ministries/MinistriesGrid";

type TinaQuery<T> = { query: string; variables: object; data: T };

type Props = {
  ministriesQuery: TinaQuery<MinistriesPageQuery>;
};

export function ClientPage({ ministriesQuery }: Props) {
  const { data } = useTina(ministriesQuery);
  const ministries = data.ministriesPage;

  return (
    <main>
      <MinistriesHero hero={ministries.hero!} />
      <MinistriesGrid ministries={ministries.ministries!} />
    </main>
  );
}
