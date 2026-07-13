import { client } from "@/../tina/__generated__/client";
import type { CommunityInvolvementPageQuery } from "@/../tina/__generated__/types";
import { ClientPage } from "./client-page";

export type CommunityInvolvementData = NonNullable<CommunityInvolvementPageQuery["communityInvolvementPage"]>;

export default async function CommunityInvolvementPage() {
  const data = await client.queries.communityInvolvementPage({ relativePath: "community-involvement.json" });

  return <ClientPage query={data} />;
}
