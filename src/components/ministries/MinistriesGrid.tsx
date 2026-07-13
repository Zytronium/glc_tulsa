import Image from "next/image";
import Link from "next/link";
import { tinaField } from "tinacms/dist/react";
import { ArchTop, IconArrowRight } from "@/components/home/icons";
import type { MinistriesData } from "@/app/(main)/ministries/page";

type Props = { ministries: NonNullable<MinistriesData["ministries"]> };

export function MinistriesGrid({ ministries }: Props) {
  const items = (ministries ?? []).filter((m) => m !== null);

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
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((ministry) => {
            const external = !!ministry?.isExternal;
            const href = ministry?.linkHref ?? "#";

            return (
              <div
                key={ministry?.label}
                className="flex flex-col overflow-hidden rounded-sm border border-stone-200 bg-white"
              >
                {ministry?.image && (
                  <div className="relative h-40 w-full">
                    <Image
                      fill
                      src={ministry.image}
                      alt=""
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover"
                      data-tina-field={tinaField(ministry, "image")}
                    />
                  </div>
                )}

                <div className="flex flex-1 flex-col px-6 py-7">
                  <ArchTop className="h-5 w-9 text-garnet-200" />
                  <p
                    data-tina-field={tinaField(ministry, "label")}
                    className="mt-2 font-display text-[18px] text-ink"
                  >
                    {ministry?.label}
                  </p>
                  <p
                    data-tina-field={tinaField(ministry, "summary")}
                    className="mt-2 flex-1 text-[13px] leading-6 text-stone-700"
                  >
                    {ministry?.summary}
                  </p>

                  {ministry?.linkHref && (
                    <Link
                      href={href}
                      data-tina-field={tinaField(ministry, "linkLabel")}
                      target={external ? "_blank" : undefined}
                      rel={external ? "noopener noreferrer" : undefined}
                      className="mt-5 flex items-center gap-1 font-meta text-[11px] uppercase tracking-widest text-garnet-700"
                    >
                      {ministry.linkLabel}
                      <IconArrowRight className="h-3 w-3" />
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
