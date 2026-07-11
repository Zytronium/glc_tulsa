"use client";

import {useState, useEffect} from "react";
import Image from "next/image";
import Link from "next/link";
import type {Photo} from "@/lib/photos-server";
import {getPhotoMetadata} from "@/lib/photos";
import {IconDownload, IconClose, IconArrowLeft} from "@/components/home/icons";
import {TinaMarkdown, type TinaMarkdownContent} from "tinacms/dist/rich-text";

type Props = {
  displayName: string;
  displayNameFieldTarget?: string;
  note?: TinaMarkdownContent;
  noteFieldTarget?: string;
  photos: Photo[];
};

export default function PhotoGrid({
                                    displayName,
                                    displayNameFieldTarget,
                                    note,
                                    noteFieldTarget,
                                    photos,
                                  }: Props) {
  const [selected, setSelected] = useState<Photo | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const metadata = selected ? getPhotoMetadata(selected, displayName) : null;

  useEffect(() => {
    const handleScroll = () => {
      const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      setShowScrollTop(scrollPercentage > 15);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({top: 0, behavior: "smooth"});
  };

  return (
    <section
      className="px-5 py-14 sm:px-8 sm:py-20"
      style={{
        backgroundImage: "url('/images/paper.png')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="mx-auto max-w-7xl">
        <Link
          href="/photos"
          className="mb-4 inline-flex items-center gap-2 text-sm text-stone-700 hover:text-garnet-700 transition"
        >
          <IconArrowLeft className="h-4 w-4"/>
          Back to Photos
        </Link>
        <h1 data-tina-field={displayNameFieldTarget} className="font-display text-2xl text-ink">
          {displayName}
        </h1>

        {note && (
          <div
            data-tina-field={noteFieldTarget}
            className="mt-4 text-sm text-stone-700 [&_a]:text-garnet-700 [&_a]:underline [&_a]:decoration-garnet-600/40 [&_a]:underline-offset-2 [&_a]:transition hover:[&_a]:text-garnet-600 hover:[&_a]:decoration-garnet-600"
          >
            <TinaMarkdown content={note} />
          </div>
        )}

        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:gap-4">
          {photos.map((photo) => (
            <button
              key={photo.filename}
              onClick={() => setSelected(photo)}
              className="group relative aspect-4/3 overflow-hidden rounded-lg bg-stone-200 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:shadow-xl"
            >
              <Image
                fill
                src={photo.src}
                alt={photo.filename}
                sizes="(min-width: 768px) 25vw, (min-width: 640px) 33vw, 50vw"
                className="object-cover transition duration-500 group-hover:scale-[1.06]"
              />
            </button>
          ))}
        </div>

        {selected && metadata && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-ink/90 p-4 sm:p-10"
            onClick={() => setSelected(null)}
          >
            <div className="relative h-full w-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
              <Image fill src={selected.src} alt={metadata.filename} className="object-contain"/>
            </div>

            <button
              onClick={() => setSelected(null)}
              aria-label="Close"
              className="fixed right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-ink/70 text-stone-50 transition hover:bg-garnet-700 sm:right-6 sm:top-6"
            >
              <IconClose className="h-5 w-5"/>
            </button>

            <a
              href={metadata.downloadHref}
              download
              onClick={(e) => e.stopPropagation()}
              aria-label="Download photo"
              className="fixed right-16 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-ink/70 text-stone-50 transition hover:bg-garnet-700 sm:right-20 sm:top-6"
            >
              <IconDownload className="h-5 w-5"/>
            </a>
          </div>
        )}

        {showScrollTop && (
          <button
            onClick={scrollToTop}
            aria-label="Scroll to top"
            className="fixed bottom-8 right-8 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-garnet-700 text-white shadow-lg transition hover:bg-garnet-800 hover:shadow-xl"
          >
            <IconArrowLeft className="h-5 w-5 rotate-90"/>
          </button>
        )}
      </div>
    </section>
  );
}
