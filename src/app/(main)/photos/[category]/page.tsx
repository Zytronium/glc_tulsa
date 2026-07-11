import { notFound } from "next/navigation";
import { client } from "@/../tina/__generated__/client";
import { getPhotoCategories } from "@/lib/photos-server";
import { ClientPage } from "./client-page";

type Props = {
  params: Promise<{ category: string }>;
};

export default async function CategoryPage({ params }: Props) {
  const { category: categorySlug } = await params;

  const photosData = await client.queries.photosPage({ relativePath: "photos.json" });
  const photoCategories = getPhotoCategories(photosData.data.photosPage.categories ?? []);
  const category = photoCategories.find((c) => c.folder === categorySlug);

  if (!category) {
    notFound();
  }

  return (
    <ClientPage
      photosQuery={photosData}
      categorySlug={categorySlug}
      displayName={category.displayName}
      note={category.note ?? undefined}
      photos={category.photos}
    />
  );
}
