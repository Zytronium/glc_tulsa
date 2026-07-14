"use client";

import { useTina } from "tinacms/dist/react";
import { tinaField } from "tinacms/dist/react";
import Link from "next/link";
import type { CommunityInvolvementPageQuery } from "@/../tina/__generated__/types";
import { IconArrowLeft } from "@/components/home/icons";
import { CommunityInvolvementSections } from "@/components/ministries/CommunityInvolvementSections";

type TinaQuery<T> = { query: string; variables: object; data: T };

type Props = {
  query: TinaQuery<CommunityInvolvementPageQuery>;
};

export function ClientPage({ query }: Props) {
  const { data } = useTina(query);
  const page = data.communityInvolvementPage;

  return (
    <main>
      <div className="border-b border-stone-200 bg-stone-100 px-5 pt-10 sm:px-8"
           style={{
             backgroundImage: `${page.titleBackground ? `url(${page.titleBackground})` : "none"}`,
             backgroundRepeat: "no-repeat",
             backgroundSize: "cover",
             backgroundPosition: "center",
           }}>
        <div className="mx-auto max-w-5xl">
          <Link
            href="/ministries"
            className="inline-flex items-center gap-2 text-sm text-stone-700 transition hover:text-garnet-700"
          >
            <IconArrowLeft className="h-4 w-4" />
            Back to Ministries
          </Link>
          <h1
            data-tina-field={tinaField(page, "pageTitle")}
            className="mb-20 mt-8 font-display text-[30px] font-medium text-ink sm:text-[36px]"
          >
            {page.pageTitle}
          </h1>
        </div>
      </div>
      <CommunityInvolvementSections sections={page.sections!} />
    </main>
  );
}
