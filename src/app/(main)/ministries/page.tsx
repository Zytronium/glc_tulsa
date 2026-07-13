import { client } from "@/../tina/__generated__/client";
import type { MinistriesPageQuery } from "@/../tina/__generated__/types";
import { ClientPage } from "./client-page";

export type MinistriesData = NonNullable<MinistriesPageQuery["ministriesPage"]>;

export default async function Ministries() {
  const ministriesData = await client.queries.ministriesPage({ relativePath: "ministries.json" });

  return <ClientPage ministriesQuery={ministriesData} />;
}
