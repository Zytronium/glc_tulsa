import type {Metadata} from "next";
import { ClientPage } from "./client-page";
import { client } from "@/../tina/__generated__/client";
import type { PhotosPageQuery } from "@/../tina/__generated__/types";

export type PhotosData = NonNullable<PhotosPageQuery["photosPage"]>;

export const metadata: Metadata = {
  title: "Photo Gallery | Grace Evangelical Lutheran Church",
  description: "Browse photos of Grace Evangelical Lutheran Church.",
};

export default async function Photos() {
  const photosData = await client.queries.photosPage({ relativePath: "photos.json" });

  return <ClientPage photosQuery={photosData} />;
}
