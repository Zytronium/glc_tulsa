"use client";

import { useTina } from "tinacms/dist/react";
import type { Global_VariablesQuery, LayoutQuery } from "@/../tina/__generated__/types";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

type TinaQuery<T> = { query: string; variables: object; data: T };

type Props = {
  layoutQuery: TinaQuery<LayoutQuery>;
  globalVariablesQuery: TinaQuery<Global_VariablesQuery>;
  children: React.ReactNode;
};

export function LayoutShell({ layoutQuery, globalVariablesQuery, children }: Props) {
  const { data: layoutData } = useTina(layoutQuery);
  const { data: globalVariablesData } = useTina(globalVariablesQuery);

  const layout = layoutData.layout;
  const globalVars = globalVariablesData.global_variables!;

  return (
    <>
      <Navbar globalVars={globalVars} />
      {children}
      <Footer layout={layout!} globalVars={globalVars} />
    </>
  );
}
