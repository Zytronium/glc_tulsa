"use client";

import { useTina } from "tinacms/dist/react";
import type { LayoutQuery } from "@/tina/__generated__/types";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

type Props = {
  query: string;
  variables: object;
  data: LayoutQuery;
  children: React.ReactNode;
};

export function LayoutShell({ query, variables, data, children }: Props) {
  const { data: layoutData } = useTina({ query, variables, data });
  const layout = layoutData.layout;

  return (
    <>
      <Navbar navbar={layout.navbar!} />
      {children}
      <Footer footer={layout.footer!} />
    </>
  );
}
