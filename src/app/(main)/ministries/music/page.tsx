import { client } from "@/../tina/__generated__/client";
import type { MusicPageQuery } from "@/../tina/__generated__/types";
import { ClientPage } from "./client-page";

export type MusicData = NonNullable<MusicPageQuery["musicPage"]>;

export default async function MusicPage() {
  const data = await client.queries.musicPage({ relativePath: "music.json" });

  return <ClientPage query={data} />;
}
