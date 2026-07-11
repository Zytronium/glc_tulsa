import type { Photo } from "./photos-server";

export type { Photo, PhotoCategory } from "./photos-server";

export type PhotoMetadata = {
  title: string;
  filename: string;
  downloadHref: string;
};

// derives a display title from a filename until real captions/EXIF are wired up
export function getPhotoMetadata(photo: Photo, categoryDisplayName: string): PhotoMetadata {
  const nameWithoutExt = photo.filename.replace(/\.[^./]+$/, "");
  const title = nameWithoutExt
    .replace(/[_-]+/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

  return {
    title: title || categoryDisplayName,
    filename: photo.filename,
    downloadHref: getPhotoDownloadHref(photo),
  };
}

// appends a download-disposition query param; see the /api/photo-download note below
export function getPhotoDownloadHref(photo: Photo): string {
  return `/api/photo-download?src=${encodeURIComponent(photo.src)}`;
}
