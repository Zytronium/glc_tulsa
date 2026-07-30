"use client";

import { useTina } from "tinacms/dist/react";
import { tinaField } from "tinacms/dist/react";
import Image from "next/image";
import Link from "next/link";
import type { MusicPageQuery } from "@/../tina/__generated__/types";
import { IconArrowLeft } from "@/components/home/icons";
import { MusicContent } from "@/components/ministries/MusicContent";
import {BackLink} from "@/components/BackLink";

type TinaQuery<T> = { query: string; variables: object; data: T };

type Props = {
  query: TinaQuery<MusicPageQuery>;
};

export function ClientPage({ query }: Props) {
  const { data } = useTina(query);
  const page = data.musicPage;

  return (
    <main>
      <div className="relative isolate overflow-hidden border-b border-stone-200 bg-stone-100 px-5 pt-10 sm:px-8">
        {page.headerBackgroundImage && (
          <>
            <Image
              src={page.headerBackgroundImage}
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover"
              data-tina-field={tinaField(page, "headerBackgroundImage")}
            />
            <div aria-hidden="true" className="absolute inset-0 bg-stone-100/50" />
          </>
        )}

        <div className="relative mx-auto max-w-5xl">
          <BackLink fallbackHref={"/ministries"}>
            Back to Ministries
          </BackLink>
          <h1
            data-tina-field={tinaField(page, "pageTitle")}
            className="mb-8 mt-4 font-display text-[30px] font-medium text-ink sm:text-[36px]"
          >
            {page.pageTitle}
          </h1>
        </div>
      </div>
      <MusicContent musicMinistry={page.musicMinistry!} messiah={page.messiah!} />
    </main>
  );
}
