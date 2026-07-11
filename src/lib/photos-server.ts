import fs from "fs";
import path from "path";
import type { TinaMarkdownContent } from "tinacms/dist/rich-text";

export type Photo = {
  src: string;
  filename: string;
};

export type PhotoCategory = {
  folder: string;
  displayName: string;
  coverImage: string | null;
  note: TinaMarkdownContent | null;
  photos: Photo[];
};

type CategoryConfig = {
  folder?: string | null;
  displayName?: string | null;
  coverImage?: string | null;
  note?: TinaMarkdownContent | null;
  photoOrder?: (string | null)[] | null;
};

const IMAGE_EXTENSIONS = /\.(jpe?g|png|webp|gif)$/i;

function readFolder(folder: string): string[] {
  const folderPath = path.join(process.cwd(), "public", "images", "photos", folder);
  try {
    return fs.readdirSync(folderPath).filter((f) => IMAGE_EXTENSIONS.test(f));
  } catch {
    // folder missing on disk, nothing to show
    return [];
  }
}

function getOrderedPhotos(category: CategoryConfig): Photo[] {
  const folder = category.folder ?? "";
  const filesOnDisk = readFolder(folder);
  const publicPrefix = `/images/photos/${folder}/`;

  const orderedPaths = (category.photoOrder ?? []).filter((p): p is string => !!p);

  // photos explicitly ordered in Tina, skipping any deleted from disk
  const ordered = orderedPaths.filter((p) => filesOnDisk.includes(p.replace(publicPrefix, "")));

  // anything on disk not yet in the CMS order, appended at the end
  const orderedFilenames = new Set(ordered.map((p) => p.replace(publicPrefix, "")));
  const newFiles = filesOnDisk.filter((f) => !orderedFilenames.has(f)).sort();

  return [...ordered, ...newFiles.map((f) => publicPrefix + f)].map((src) => ({
    src,
    filename: src.replace(publicPrefix, ""),
  }));
}

export function getPhotoCategories(categoriesConfig: (CategoryConfig | null)[]): PhotoCategory[] {
  return categoriesConfig
    .filter((c): c is CategoryConfig => c !== null && !!c.folder)
    .map((category) => ({
      folder: category.folder!,
      displayName: category.displayName || category.folder!,
      coverImage: category.coverImage ?? null,
      note: category.note ?? null,
      photos: getOrderedPhotos(category),
    }));
}
