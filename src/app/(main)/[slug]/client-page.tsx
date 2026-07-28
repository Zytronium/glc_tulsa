"use client";

import { useTina } from "tinacms/dist/react";
import type { SitePageConnectionQuery } from "../../../../tina/__generated__/types";
import { SectionRenderer } from "@/components/pages/SectionRenderer";

type TinaQuery<T> = { query: string; variables: object; data: T };

type Props = {
  query: TinaQuery<SitePageConnectionQuery>;
  relativePath: string;
};

export function ClientPage({ query, relativePath }: Props) {
  const { data } = useTina(query);

  const doc = (data.sitePageConnection.edges ?? []).find(
    (edge) => edge?.node?._sys.relativePath === relativePath
  )?.node;

  if (!doc) return null;

  const sections = (doc.sections ?? []).filter((s): s is NonNullable<typeof s> => s !== null);

  return (
    <main>
      <SectionRenderer sections={sections} />
    </main>
  );
}
