import { client } from "@/../tina/__generated__/client";
import type { FastingPageQuery } from "@/../tina/__generated__/types";
import { ClientPage } from "./client-page";

export type FastingData = NonNullable<FastingPageQuery["fastingPage"]>;

export default async function FastingPage() {
  const data = await client.queries.fastingPage({ relativePath: "fasting.json" });

  return <ClientPage query={data} />;
}
