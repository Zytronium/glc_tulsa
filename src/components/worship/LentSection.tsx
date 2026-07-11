import Image from "next/image";
import Link from "next/link";
import { tinaField } from "tinacms/dist/react";
import { ArchTop } from "@/components/home/icons";
import type { WorshipData } from "@/app/(main)/worship/page";

type Props = { lent: NonNullable<WorshipData["lent"]> };

export function LentSection({ lent }: Props) {
  const disciplines = (lent.disciplines ?? []).filter((d) => d !== null);

  return (
    <section className="border-b border-stone-200 bg-vestment-900">
      <div className="mx-auto max-w-5xl px-5 py-14 sm:px-8 sm:py-20">
        <div className="text-center">
          <p
            data-tina-field={tinaField(lent, "eyebrow")}
            className="font-meta text-[11px] uppercase tracking-[0.18em] text-brass-400"
          >
            {lent.eyebrow}
          </p>
          <h2
            data-tina-field={tinaField(lent, "heading")}
            className="mt-3 font-display text-[26px] font-medium text-stone-50"
          >
            {lent.heading}
          </h2>
          <p
            data-tina-field={tinaField(lent, "intro")}
            className="mx-auto mt-4 max-w-2xl text-[15px] leading-7 text-stone-200/90"
          >
            {lent.intro}
          </p>
          {lent.fastingLinkHref && (
            <Link
              href={lent.fastingLinkHref}
              data-tina-field={tinaField(lent, "fastingLinkLabel")}
              className="mt-5 inline-flex items-center gap-1 rounded-sm bg-brass-300 px-5 py-2.5 text-sm font-semibold tracking-wide text-vestment-900 transition hover:bg-brass-400"
            >
              {lent.fastingLinkLabel}
            </Link>
          )}
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {disciplines.map((discipline, i) => (
            <div key={discipline?.label ?? i} className="flex flex-col overflow-hidden rounded-sm bg-white">
              {discipline?.image && (
                <div className="relative h-36 w-full">
                  <Image fill src={discipline.image} alt="" className="object-cover" />
                </div>
              )}
              <div className="flex flex-1 flex-col px-5 py-6">
                <ArchTop className="h-5 w-9 text-garnet-200" />
                <p
                  data-tina-field={tinaField(discipline, "label")}
                  className="mt-2 font-display text-[17px] text-ink"
                >
                  {discipline?.label}
                </p>

                {discipline?.questions && discipline.questions.length > 0 && (
                  <div className="mt-4">
                    <p className="font-meta text-[10px] uppercase tracking-[0.1em] text-garnet-700">
                      Questions
                    </p>
                    <ul className="mt-2 space-y-1.5 text-[13px] leading-5 text-stone-700">
                      {discipline.questions.map((q, qi) => (
                        <li key={qi} className="flex gap-2">
                          <span className="text-brass-500">&bull;</span>
                          <span>{q}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {discipline?.actionItems && discipline.actionItems.length > 0 && (
                  <div className="mt-4">
                    <p className="font-meta text-[10px] uppercase tracking-[0.1em] text-garnet-700">
                      Action Items
                    </p>
                    <ul className="mt-2 space-y-1.5 text-[13px] leading-5 text-stone-700">
                      {discipline.actionItems.map((a, ai) => (
                        <li key={ai} className="flex gap-2">
                          <span className="text-brass-500">&bull;</span>
                          <span>{a}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {discipline?.closingNote && (
                  <p className="mt-4 border-t border-stone-200 pt-4 text-[12px] leading-5 text-stone-500">
                    {discipline.closingNote}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
