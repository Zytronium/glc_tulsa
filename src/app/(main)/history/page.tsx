import { client } from "@/../tina/__generated__/client";
import type { HistoryPageQuery } from "@/../tina/__generated__/types";
import { ClientPage } from "./client-page";

export type HistoryData = NonNullable<HistoryPageQuery["historyPage"]>;

export default async function HistoryPage() {
  const data = await client.queries.historyPage({ relativePath: "history.json" });

  return <ClientPage query={data} />;
}
