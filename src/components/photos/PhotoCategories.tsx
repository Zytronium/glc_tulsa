import Link from "next/link";
import Image from "next/image";
import { tinaField } from "tinacms/dist/react";
import type { CategoryWithRaw } from "@/app/(main)/photos/client-page";
import {IconArrowRight} from "@/components/home/icons";

type Props = {
  categories: CategoryWithRaw[];
};

export default function PhotoCategories({ categories }: Props) {
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
      <div className="mx-auto max-w-8xl">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {categories.map((category) => {
            const cover = category.coverImage ?? category.photos[0]?.src ?? null;

            return (
              <Link
                key={category.folder}
                href={`/photos/${category.folder}`}
                className="group relative aspect-4/3 overflow-hidden rounded-2xl bg-stone-200 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:shadow-xl"
              >
                {cover && (
                  <Image
                    fill
                    src={cover}
                    alt={category.displayName}
                    data-tina-field={category.raw ? tinaField(category.raw, "coverImage") : undefined}
                    sizes="(min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition duration-500 group-hover:scale-[1.06]"
                  />
                )}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-linear-to-t from-ink/80 via-ink/15 to-transparent transition duration-300 group-hover:from-vestment-800/90"
                />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5">
                  <p
                    data-tina-field={category.raw ? tinaField(category.raw, "displayName") : undefined}
                    className="font-display text-xl text-stone-50"
                  >
                    {category.displayName}
                  </p>
                  <span
                    className="flex flex-row items-center gap-1 translate-x-1 font-meta text-[11px] uppercase tracking-widest text-brass-300 opacity-0 transition group-hover:translate-x-0 group-hover:opacity-100">
                    View <IconArrowRight className="h-3 w-3"/>
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}