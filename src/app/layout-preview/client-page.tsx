"use client";

import { useTina } from "tinacms/dist/react";
import type { LayoutQuery } from "../../../tina/__generated__/types";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

type Props = {
  query: string;
  variables: object;
  data: LayoutQuery;
};

export function LayoutPreviewClient(props: Props) {
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });

  /* Navbar and Footer render in layout.tsx, no need to add here too, or they'll duplicate. */
  return (
    <>
      <Navbar navbar={data.layout.navbar!} editMode={true} />
      <p className="flex w-full items-center justify-center text-stone-400 italic"
         style={{minHeight: "calc(100dvh - 64px - 335px)"}}
      >
        [Page content goes here]
      </p>
      <Footer footer={data.layout.footer!} editMode={true} />
    </>
  );
}
