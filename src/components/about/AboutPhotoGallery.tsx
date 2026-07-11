import Image from "next/image";
import Link from "next/link";
import { tinaField } from "tinacms/dist/react";
import { IconArrowRight } from "@/components/home/icons";
import type { AboutData } from "@/app/(main)/about/page";

type Props = { photoGalleryPreview: NonNullable<AboutData["photoGalleryPreview"]> };

export function AboutPhotoGallery({ photoGalleryPreview }: Props) {
  const images = (photoGalleryPreview.images ?? []).filter((img): img is string => !!img);

  return (
    <section
      className="border-b border-stone-200 bg-stone-100"
      style={{
        backgroundImage: "url('/images/aged_paper.png')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="font-meta text-[11px] uppercase tracking-[0.18em] text-garnet-600">
              A glimpse inside
            </p>
            <h2
              data-tina-field={tinaField(photoGalleryPreview, "heading")}
              className="mt-3 max-w-md font-display text-[28px] font-medium leading-tight text-ink sm:text-[32px]"
            >
              {photoGalleryPreview.heading}
            </h2>
            {photoGalleryPreview.body && (
              <p
                data-tina-field={tinaField(photoGalleryPreview, "body")}
                className="mt-3 max-w-md text-[15px] leading-7 text-stone-700"
              >
                {photoGalleryPreview.body}
              </p>
            )}
          </div>

          <Link
            href="/photos"
            data-tina-field={tinaField(photoGalleryPreview, "linkLabel")}
            className="inline-flex shrink-0 items-center gap-1.5 rounded-sm bg-garnet-700 px-5 py-2.5 text-sm font-semibold text-stone-50 transition hover:bg-garnet-600"
          >
            {photoGalleryPreview.linkLabel}
            <IconArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {images.length > 0 && (
          <div
            data-tina-field={tinaField(photoGalleryPreview, "images")}
            className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:gap-4"
          >
            {images.map((src, i) => (
              <Link
                key={i}
                href="/photos"
                className="group relative aspect-4/3 overflow-hidden rounded-sm bg-stone-200 transition hover:shadow-lg"
              >
                <Image
                  fill
                  src={src}
                  alt=""
                  sizes="(min-width: 640px) 33vw, 50vw"
                  className="object-cover transition duration-500 group-hover:scale-[1.06]"
                />
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
