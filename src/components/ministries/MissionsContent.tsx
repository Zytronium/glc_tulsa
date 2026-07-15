import Image from "next/image";
import Link from "next/link";
import { tinaField } from "tinacms/dist/react";
import { IconArrowRight } from "@/components/home/icons";
import type { MissionsData } from "@/app/(main)/ministries/missions/page";

type Props = {
  page: MissionsData;
  lwml: NonNullable<MissionsData["lwml"]>;
  missionaries: NonNullable<MissionsData["missionaries"]>;
};

export function MissionsContent({ page, lwml, missionaries }: Props) {
  const supports = (lwml.supports ?? []).filter((s): s is string => !!s);
  const roster = (missionaries ?? []).filter((m) => m !== null);

  return (
    <>
      {/* -------- LWML -------- */}
      <section
        className="border-b border-stone-200 bg-stone-100"
        style={{
          backgroundImage: "url('/images/aged_paper.png')",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="mx-auto grid max-w-5xl gap-10 px-5 py-14 sm:px-8 sm:py-20 lg:grid-cols-[2fr_1fr] lg:items-center">
        <div>
            {lwml.logo && (
              <div className="relative mb-5 h-32 w-auto">
                <Image
                  fill
                  src={lwml.logo}
                  alt=""
                  sizes="800px"
                  className="object-contain object-left"
                  data-tina-field={tinaField(lwml, "logo")}
                />
              </div>
            )}
            <h2
              data-tina-field={tinaField(lwml, "heading")}
              className="font-display text-[24px] font-medium leading-tight text-ink"
            >
              {lwml.heading}
            </h2>
            {lwml.body && (
              <p
                data-tina-field={tinaField(lwml, "body")}
                className="mt-4 text-[15px] leading-7 text-stone-700"
              >
                {lwml.body}
              </p>
            )}
            {supports.length > 0 && (
              <ul data-tina-field={tinaField(lwml, "supports")} className="mt-4 space-y-1">
                {supports.map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-[14px] leading-6 text-stone-700">
                    <span
                      aria-hidden="true"
                      className="mt-[0.55rem] h-1 w-1 shrink-0 rounded-full bg-brass-500"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {lwml.image && (
            <div className="relative aspect-square overflow-hidden rounded-sm">
            <Image
                fill
                src={lwml.image}
                alt=""
                sizes="(min-width: 512px) 25vw, 50vw"
                className="object-cover"
                data-tina-field={tinaField(lwml, "image")}
              />
            </div>
          )}
        </div>
      </section>

      {/* -------- missionaries -------- */}
      <section
        className="bg-white"
               style={{
                 backgroundImage: "url('/images/paper.png')",
                 backgroundRepeat: "no-repeat",
                 backgroundSize: "cover",
                 backgroundPosition: "center",
        }}
      >
        <div className="mx-auto max-w-5xl px-5 py-14 sm:px-8 sm:py-20">
          <h2
            data-tina-field={tinaField(page, "missionariesHeading")}
            className="font-display text-[24px] font-medium leading-tight text-ink"
          >
            {page.missionariesHeading}
          </h2>

          <div className="mt-8 flex flex-col divide-y divide-stone-200">
            {roster.map((missionary, i) => {
              const paragraphs = (missionary?.bio ?? "").split("\n\n").filter(Boolean);

              return (
                <div key={i} className="grid gap-6 py-10 first:pt-0 last:pb-0 sm:grid-cols-[10rem_1fr]">
                  {missionary?.photo && (
                    <div className="relative aspect-4/3 overflow-hidden rounded-md">
                      <Image
                        fill
                        src={missionary.photo}
                        alt=""
                        sizes="160px"
                        className="object-cover"
                        data-tina-field={tinaField(missionary, "photo")}
                      />
                    </div>
                  )}

                  <div>
                    <p
                      data-tina-field={tinaField(missionary, "name")}
                      className="font-display text-[18px] text-ink"
                    >
                      {missionary?.name}
                    </p>
                    <div
                      data-tina-field={tinaField(missionary, "bio")}
                      className="mt-2 space-y-3 text-[14px] leading-6 text-stone-700"
                    >
                      {paragraphs.map((para, pi) => (
                        <p key={pi}>{para}</p>
                      ))}
                    </div>
                    {missionary?.linkHref && (
                      <Link
                        href={missionary.linkHref}
                        data-tina-field={tinaField(missionary, "linkLabel")}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-3 inline-flex items-center gap-1 font-meta text-[11px] uppercase tracking-widest text-garnet-700"
                      >
                        {missionary.linkLabel}
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
    </>
  );
}
