import { client } from "@/../tina/__generated__/client";
import type { WorshipPageQuery } from "@/../tina/__generated__/types";
import { ClientPage } from "./client-page";

export type WorshipData = NonNullable<WorshipPageQuery["worshipPage"]>;

export default async function Worship() {
  const worshipData = await client.queries.worshipPage({ relativePath: "worship.json" });

  return <ClientPage worshipQuery={worshipData} />;
}
