import type { Metadata } from "next";
import { client } from "../../../tina/__generated__/client";
import { LayoutPreviewClient } from "./client-page";

export const metadata: Metadata = {
  title: "Layout Preview",
  robots: { index: false, follow: false },
};

export default async function LayoutPreviewPage() {
  const [layoutData, globalVariablesData] = await Promise.all([
    client.queries.layout({ relativePath: "layout.json" }),
    client.queries.global_variables({ relativePath: "global_variables.json" }),
  ]);

  return (
    <LayoutPreviewClient
      layoutQuery={layoutData}
      globalVariablesQuery={globalVariablesData}
    />
  );
}