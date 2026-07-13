import Image from "next/image";
import { tinaField } from "tinacms/dist/react";
import type { CommunityInvolvementData } from "@/app/(main)/ministries/community-involvement/page";

type Props = { sections: NonNullable<CommunityInvolvementData["sections"]> };

export function CommunityInvolvementSections({ sections }: Props) {
  const items = (sections ?? []).filter((s) => s !== null);

  return (
    <div className="flex flex-col">
      {items.map((section, i) => {
        const paragraphs = (section?.body ?? "").split("\n\n").filter(Boolean);
        const bullets = (section?.items ?? []).filter((b): b is string => !!b);
        const imageOnRight = i % 2 === 1;

        return (
          <section
            key={i}
            className="border-b border-stone-200 bg-stone-100 last:border-b-0"
            style={{
              backgroundImage: `url('/images/${imageOnRight ? "paper" : "aged_paper"}.png')`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div
              className={`mx-auto grid max-w-5xl gap-10 px-5 py-14 sm:px-8 sm:py-20 ${
                section?.image ? "lg:grid-cols-2 lg:items-center" : ""
              }`}
            >
              <div className={imageOnRight && section?.image ? "lg:order-2" : ""}>
                <h2
                  data-tina-field={tinaField(section, "heading")}
                  className="font-display text-[24px] font-medium leading-tight text-ink"
                >
                  {section?.heading}
                </h2>

                {paragraphs.length > 0 && (
                  <div
                    data-tina-field={tinaField(section, "body")}
                    className="mt-4 space-y-4 text-[15px] leading-7 text-stone-700"
                  >
                    {paragraphs.map((para, pi) => (
                      <p key={pi}>{para}</p>
                    ))}
                  </div>
                )}

                {bullets.length > 0 && (
                  <ul
                    data-tina-field={tinaField(section, "items")}
                    className="mt-4 space-y-2.5"
                  >
                    {bullets.map((item, bi) => (
                      <li key={bi} className="flex items-start gap-2.5 text-[14px] leading-6 text-stone-700">
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

              {section?.image && (
                <div className={imageOnRight ? "lg:order-1" : ""}>
                  <div className="relative aspect-4/3 overflow-hidden rounded-sm">
                    <Image
                      fill
                      src={section.image}
                      alt=""
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      className="object-cover"
                      data-tina-field={tinaField(section, "image")}
                    />
                  </div>
                </div>
              )}
            </div>
          </section>
        );
      })}
    </div>
  );
}
