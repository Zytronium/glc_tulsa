import Link from "next/link";
import { tinaField } from "tinacms/dist/react";
import { IconArrowRight } from "@/components/home/icons";
import type { FastingData } from "@/app/(main)/fasting/page";

type Props = {
  intro: FastingData["intro"];
  page: FastingData;
  guideDownload: NonNullable<FastingData["guideDownload"]>;
  definitions: NonNullable<FastingData["definitions"]>;
  rules: NonNullable<FastingData["rules"]>;
};

export function FastingContent({ intro, page, guideDownload, definitions, rules }: Props) {
  const paragraphs = (intro ?? "").split("\n\n").filter(Boolean);
  const terms = (definitions.terms ?? []).filter((t) => t !== null);
  const rows = (rules.rows ?? []).filter((r) => r !== null);

  return (
    <>
      {/* -------- intro -------- */}
      <section
        className="border-b border-stone-200 bg-stone-100"
        style={{
          backgroundImage: "url('/images/aged_paper.png')",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="mx-auto max-w-3xl px-5 py-14 sm:px-8 sm:py-20">
          <div
            data-tina-field={tinaField(page, "intro")}
            className="space-y-4 text-[15px] leading-7 text-stone-700"
          >
            {paragraphs.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>

          {guideDownload.file && (
            <Link
              href={guideDownload.file}
              data-tina-field={tinaField(guideDownload, "label")}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-1.5 rounded-sm bg-garnet-700 px-5 py-2.5 text-sm font-semibold text-stone-50 transition hover:bg-garnet-600"
            >
              {guideDownload.label}
              <IconArrowRight className="h-3.5 w-3.5" />
            </Link>
          )}
        </div>
      </section>

      {/* -------- definitions -------- */}
      <section
        className="border-b border-stone-200 bg-white"
        style={{
          backgroundImage: "url('/images/paper.png')",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="mx-auto max-w-3xl px-5 py-14 sm:px-8 sm:py-20">
          <h2
            data-tina-field={tinaField(definitions, "heading")}
            className="font-display text-[22px] font-medium leading-tight text-ink"
          >
            {definitions.heading}
          </h2>

          <dl className="mt-6 space-y-5">
            {terms.map((term, i) => {
              const definitionLines = (term?.definition ?? []).filter((d): d is string => !!d);
              return (
                <div key={i} className="border-l-2 border-brass-500 pl-4">
                  <dt
                    data-tina-field={tinaField(term, "term")}
                    className="font-display text-[16px] font-medium text-ink"
                  >
                    {term?.term}
                  </dt>
                  <dd
                    data-tina-field={tinaField(term, "definition")}
                    className="mt-1 space-y-1 text-[14px] leading-6 text-stone-700"
                  >
                    {definitionLines.map((line, li) => (
                      <p key={li}>{line}</p>
                    ))}
                  </dd>
                </div>
              );
            })}
          </dl>
        </div>
      </section>

      {/* -------- rules -------- */}
      <section
        className="bg-stone-100"
        style={{
          backgroundImage: "url('/images/aged_paper.png')",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="mx-auto max-w-3xl px-5 py-14 sm:px-8 sm:py-20">
          <h2
            data-tina-field={tinaField(rules, "heading")}
            className="font-display text-[22px] font-medium leading-tight text-ink"
          >
            {rules.heading}
          </h2>

          <div className="mt-6 overflow-hidden rounded-sm border border-stone-200 bg-white">
            {rows.map((row, i) => (
              <div
                key={i}
                className="grid gap-1 border-b border-stone-200 px-5 py-4 last:border-b-0 sm:grid-cols-[8rem_1fr] sm:gap-4"
              >
                <p
                  data-tina-field={tinaField(row, "label")}
                  className="font-meta text-[11px] uppercase tracking-widest text-garnet-700"
                >
                  {row?.label}
                </p>
                <p
                  data-tina-field={tinaField(row, "detail")}
                  className="text-[14px] leading-6 text-stone-700"
                >
                  {row?.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
