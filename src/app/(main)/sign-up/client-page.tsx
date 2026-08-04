"use client";

import { useTina } from "tinacms/dist/react";
import { tinaField } from "tinacms/dist/react";
import type { SignUpPageQuery } from "@/../tina/__generated__/types";
import { SignUpGrid } from "@/components/signup/SignUpGrid";

type TinaQuery<T> = { query: string; variables: object; data: T };

type Props = {
  query: TinaQuery<SignUpPageQuery>;
};

export function ClientPage({ query }: Props) {
  const { data } = useTina(query);
  const page = data.signUpPage;

  return (
    <main>
      <div
        className="border-b border-stone-200 bg-stone-100 px-5 py-14 text-center sm:px-8 sm:py-20"
        style={{
          backgroundImage: "url('/images/aged_paper.png')",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="mx-auto max-w-2xl">
          <h1
            data-tina-field={tinaField(page, "pageTitle")}
            className="font-display text-[30px] font-medium text-ink sm:text-[36px]"
          >
            {page.pageTitle}
          </h1>
          {page.intro && (
            <p
              data-tina-field={tinaField(page, "intro")}
              className="mt-4 text-[15px] leading-7 text-stone-700"
            >
              {page.intro}
            </p>
          )}
        </div>

        <SignUpGrid signUps={page.signUps!} emptyMessage={page.emptyMessage} />
      </div>

    </main>
  );
}
