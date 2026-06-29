"use client";

import { useTina } from "tinacms/dist/react";
import type { LayoutQuery, Global_VariablesQuery } from "../../../tina/__generated__/types";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

type TinaQuery<T> = { query: string; variables: object; data: T };

type Props = {
  layoutQuery: TinaQuery<LayoutQuery>;
  globalVariablesQuery: TinaQuery<Global_VariablesQuery>;
};

export function LayoutPreviewClient({ layoutQuery, globalVariablesQuery }: Props) {
  const { data: layoutData } = useTina(layoutQuery);
  const { data: globalVariablesData } = useTina(globalVariablesQuery);

  const globalVars = globalVariablesData.global_variables!;

  return (
    <>
      <Navbar globalVars={globalVars} />
      <p
        className="flex w-full items-center justify-center text-stone-400 italic"
        style={{ minHeight: "calc(100vh - 64px - 335px)" }}
      >
        [Page content goes here]
      </p>
      <Footer layout={layoutData.layout!} globalVars={globalVars} />
    </>
  );
}
