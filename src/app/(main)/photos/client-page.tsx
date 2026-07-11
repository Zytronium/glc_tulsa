"use client";

import { useTina } from "tinacms/dist/react";
import type { PhotosPageQuery } from "@/../tina/__generated__/types";
import PhotosHero from "@/components/photos/PhotosHero";
import PhotoCategories from "@/components/photos/PhotoCategories";

type TinaQuery<T> = { query: string; variables: object; data: T };

type Props = {
  photosQuery: TinaQuery<PhotosPageQuery>;
};

export function ClientPage({ photosQuery }: Props) {
  const { data } = useTina(photosQuery);
  const photos = data.photosPage;

  return (
    <main>
      <PhotosHero hero={photos.hero!} />
      <PhotoCategories />
    </main>
  );
}