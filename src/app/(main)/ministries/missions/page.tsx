import { client } from "@/../tina/__generated__/client";
import type { MissionsPageQuery } from "@/../tina/__generated__/types";
import { ClientPage } from "./client-page";

export type MissionsData = NonNullable<MissionsPageQuery["missionsPage"]>;

export default async function MissionsPage() {
  const data = await client.queries.missionsPage({ relativePath: "missions.json" });

  return <ClientPage query={data} />;
}
