import type {Metadata} from "next";
import { client } from "@/../tina/__generated__/client";
import type { PhotosPageQuery } from "@/../tina/__generated__/types";
import { getPhotoCategories } from "@/lib/photos-server";
import { ClientPage } from "./client-page";

export type PhotosData = NonNullable<PhotosPageQuery["photosPage"]>;

export const metadata: Metadata = {
  title: "Photo Gallery | Grace Evangelical Lutheran Church",
  description: "Browse photos of Grace Evangelical Lutheran Church.",
};

export default async function Photos() {
  const photosData = await client.queries.photosPage({ relativePath: "photos.json" });
  const photoCategories = getPhotoCategories(photosData.data.photosPage.categories ?? []);

  return <ClientPage photosQuery={photosData} photoCategories={photoCategories} />;
}
