import { client } from "@/../tina/__generated__/client";
import type { WorshipPageQuery } from "@/../tina/__generated__/types";
import { ClientPage } from "./client-page";

export type WorshipData = NonNullable<WorshipPageQuery["worshipPage"]>;

export default async function Worship() {
  const worshipData = await client.queries.worshipPage({ relativePath: "worship.json" });
  const globalVariablesData = await client.queries.global_variables({ relativePath: "global_variables.json" });

  return <ClientPage worshipQuery={worshipData} globalVariablesQuery={globalVariablesData} />;
}
