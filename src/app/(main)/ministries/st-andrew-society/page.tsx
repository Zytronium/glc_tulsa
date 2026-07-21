import { client } from "@/../tina/__generated__/client";
import type { StAndrewSocietyPageQuery } from "@/../tina/__generated__/types";
import { ClientPage } from "./client-page";

export type StAndrewSocietyData = NonNullable<StAndrewSocietyPageQuery["stAndrewSocietyPage"]>;

export default async function StAndrewSocietyPage() {
  const data = await client.queries.stAndrewSocietyPage({ relativePath: "st-andrew-society.json" });

  return <ClientPage query={data} />;
}
