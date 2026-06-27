import Image from "next/image";
import { tinaField } from "tinacms/dist/react";
import type { AboutData } from "@/app/(main)/about/page";

type Props = { marks: NonNullable<AboutData["marks"]> };

export function FourMarks({ marks }: Props) {
  const items = (marks ?? []).filter((m) => m !== null);

  return (
    <section
      className="border-b border-stone-200 bg-white"
      style={{
        backgroundImage: "url('/images/paper.png')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
        <p className="font-meta text-[11px] uppercase tracking-[0.18em] text-garnet-600">
          The four marks
        </p>
        <h2 className="mt-3 max-w-lg font-display text-[28px] font-medium leading-tight text-ink sm:text-[32px]">
          What it means to be Lutheran
        </h2>

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {items.map((mark) => (
            <div
              key={mark.label}
              className="overflow-hidden rounded-sm border border-stone-200 bg-stone-50"
            >
              {mark.image && (
                <div className="relative h-44 w-full">
                  <Image
                    src={mark.image}
                    alt={mark.imageAlt ?? ""}
                    fill
                    sizes="(min-width: 1024px) 45vw, 100vw"
                    className="object-cover"
                    data-tina-field={tinaField(mark, "image")}
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-vestment-900/20"
                  />
                </div>
              )}
              <div className="m-5 border-l-2 border-brass-500 py-3 pl-4 pr-3">
                <p
                  data-tina-field={tinaField(mark, "label")}
                  className="font-display text-[20px] font-medium capitalize text-ink"
                >
                  {mark.label}
                </p>
                <p
                  data-tina-field={tinaField(mark, "body")}
                  className="mt-2 text-[14px] leading-6 text-stone-700"
                >
                  {mark.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
