"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { IconChevronLeft, IconChevronRight } from "@/components/home/icons";
import type { YouthPageQuery } from "@/../tina/__generated__/types";

const AUTO_SCROLL_INTERVAL_MS = 10000;
const SCROLL_SETTLE_MS = 500; // roughly matches the smooth-scroll animation duration

type Photo = NonNullable<NonNullable<YouthPageQuery["youthPage"]>["gallery"]>[number];

type Props = {
  photos: Photo[];
};

export function PhotoCarousel({ photos }: Props) {
  const validPhotos = photos.filter(
    (p): p is NonNullable<Photo> & { image: string } => !!p?.image
  );

  const scrollRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const settleTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const count = validPhotos.length;
  // -------- triplicated list so both edges have real neighbors to scroll into --------
  const tripled = count > 0 ? [...validPhotos, ...validPhotos, ...validPhotos] : [];

  function getItemWidth(): number {
    const container = scrollRef.current;
    if (!container) return 0;
    const child = container.firstElementChild as HTMLElement | null;
    return child ? child.offsetWidth + 16 : container.clientWidth; // +16 for gap-4
  }

  // -------- start scrolled into the middle copy on mount --------
  useEffect(() => {
    const container = scrollRef.current;
    if (!container || count === 0) return;
    const itemWidth = getItemWidth();
    container.scrollLeft = itemWidth * count;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count]);

  // -------- after a scroll settles, snap back into the middle copy if we've drifted -------
  function scheduleBoundsCheck() {
    if (settleTimeoutRef.current) clearTimeout(settleTimeoutRef.current);
    settleTimeoutRef.current = setTimeout(() => {
      const container = scrollRef.current;
      if (!container || count === 0) return;

      const itemWidth = getItemWidth();
      const singleSetWidth = itemWidth * count;

      if (container.scrollLeft < singleSetWidth * 0.5) {
        // drifted into the first (leading) copy, jump forward one set, no animation
        container.scrollLeft += singleSetWidth;
      } else if (container.scrollLeft >= singleSetWidth * 1.5) {
        // drifted into the third (trailing) copy, jump back one set, no animation
        container.scrollLeft -= singleSetWidth;
      }
    }, SCROLL_SETTLE_MS);
  }

  function scrollByOne(direction: 1 | -1) {
    const container = scrollRef.current;
    if (!container) return;
    const itemWidth = getItemWidth();
    container.scrollBy({ left: itemWidth * direction, behavior: "smooth" });
    scheduleBoundsCheck();
  }

  useEffect(() => {
    if (isHovering || count <= 1) return;

    const interval = setInterval(() => {
      scrollByOne(1);
    }, AUTO_SCROLL_INTERVAL_MS);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isHovering, count]);

  useEffect(() => {
    return () => {
      if (settleTimeoutRef.current) clearTimeout(settleTimeoutRef.current);
    };
  }, []);

  if (count === 0) return null;

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scroll-smooth pb-2"
        style={{ scrollbarWidth: "none" }}
      >
        {tripled.map((photo, index) => (
          <div
            key={index}
            className="relative h-56 w-72 shrink-0 overflow-hidden rounded-lg bg-stone-100"
          >
            <Image
              fill
              src={photo!.image}
              alt={photo?.caption ?? ""}
              className="object-cover"
            />
          </div>
        ))}
      </div>

      {count > 1 && (
        <>
          <button
            type="button"
            onClick={() => scrollByOne(-1)}
            aria-label="Previous photo"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 flex h-9 w-9 items-center justify-center rounded-full border border-stone-200 bg-white/95 text-stone-700 shadow-sm transition hover:border-garnet-600/40 hover:text-garnet-700"
          >
            <IconChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => scrollByOne(1)}
            aria-label="Next photo"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 flex h-9 w-9 items-center justify-center rounded-full border border-stone-200 bg-white/95 text-stone-700 shadow-sm transition hover:border-garnet-600/40 hover:text-garnet-700"
          >
            <IconChevronRight className="h-4 w-4" />
          </button>
        </>
      )}
    </div>
  );
}
