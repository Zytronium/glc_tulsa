"use client";

import { useTina } from "tinacms/dist/react";
import { tinaField } from "tinacms/dist/react";
import type { PhotosPageQuery } from "@/../tina/__generated__/types";
import type { Photo } from "@/lib/photos-server";
import PhotoGrid from "@/components/photos/PhotoGrid";

type TinaQuery<T> = { query: string; variables: object; data: T };

type Props = {
  photosQuery: TinaQuery<PhotosPageQuery>;
  categorySlug: string;
  displayName: string;
  note?: import("tinacms/dist/rich-text").TinaMarkdownContent;
  photos: Photo[];
};

export function ClientPage({ photosQuery, categorySlug, displayName, note, photos }: Props) {
  const { data } = useTina(photosQuery);
  const raw = (data.photosPage.categories ?? []).find((c) => c?.folder === categorySlug) ?? null;

  return (
    <PhotoGrid
      displayName={raw?.displayName || displayName}
      displayNameFieldTarget={raw ? tinaField(raw, "displayName") : undefined}
      note={raw?.note ?? note}
      noteFieldTarget={raw ? tinaField(raw, "note") : undefined}
      photos={photos}
    />
  );
}
