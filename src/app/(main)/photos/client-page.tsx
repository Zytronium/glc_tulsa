"use client";

import { useTina } from "tinacms/dist/react";
import type { PhotosPageQuery } from "@/../tina/__generated__/types";
import type { PhotoCategory } from "@/lib/photos-server";
import PhotosHero from "@/components/photos/PhotosHero";
import PhotoCategories from "@/components/photos/PhotoCategories";

type TinaQuery<T> = { query: string; variables: object; data: T };

export type RawCategory = NonNullable<NonNullable<PhotosPageQuery["photosPage"]["categories"]>[number]>;

export type CategoryWithRaw = PhotoCategory & { raw: RawCategory | null };

type Props = {
  photosQuery: TinaQuery<PhotosPageQuery>;
  photoCategories: PhotoCategory[];
};

export function ClientPage({ photosQuery, photoCategories }: Props) {
  const { data } = useTina(photosQuery);
  const photos = data.photosPage;
  const rawCategories = (photos.categories ?? []).filter((c): c is RawCategory => c !== null);

  const categories: CategoryWithRaw[] = photoCategories.map((cat) => {
    const raw = rawCategories.find((r) => r.folder === cat.folder) ?? null;
    return {
      ...cat,
      displayName: raw?.displayName || cat.displayName,
      coverImage: raw?.coverImage ?? cat.coverImage,
      raw,
    };
  });

  return (
    <main>
      <PhotosHero hero={photos.hero!} />
      <PhotoCategories categories={categories} />
    </main>
  );
}