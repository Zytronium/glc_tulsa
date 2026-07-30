"use client";

import { useTina } from "tinacms/dist/react";
import { tinaField } from "tinacms/dist/react";
import Link from "next/link";
import type { CommunityInvolvementPageQuery } from "@/../tina/__generated__/types";
import { IconArrowLeft } from "@/components/home/icons";
import { CommunityInvolvementSections } from "@/components/ministries/CommunityInvolvementSections";
import {BackLink} from "@/components/BackLink";

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
          <BackLink fallbackHref={"/ministries"}>
            Back to Ministries
          </BackLink>
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
