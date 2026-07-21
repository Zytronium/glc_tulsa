import Image from "next/image";
import Link from "next/link";
import { tinaField } from "tinacms/dist/react";
import { IconArrowRight } from "@/components/home/icons";
import type { StAndrewSocietyData } from "@/app/(main)/ministries/st-andrew-society/page";

type NumberedSection = {
  heading?: string | null;
  items?: (string | null)[] | null;
};

function NumberedList({
                        section,
                        fieldSource,
                      }: {
  section: NumberedSection;
  fieldSource: NonNullable<StAndrewSocietyData["responsibilities"]>;
}) {
  const items = (section.items ?? []).filter((i): i is string => !!i);

  return (
    <div>
      <h2
        data-tina-field={tinaField(fieldSource, "heading")}
        className="font-display text-[22px] font-medium leading-tight text-ink"
      >
        {section.heading}
      </h2>
      {items.length > 0 && (
        <ol data-tina-field={tinaField(fieldSource, "items")} className="mt-4 space-y-3">
          {items.map((item, i) => (
            <li key={i} className="flex gap-3 text-[14px] leading-6 text-stone-700">
              <span className="shrink-0 font-meta text-[13px] text-garnet-600">{i + 1}.</span>
              <span>{item}</span>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}

type Props = {
  intro: NonNullable<StAndrewSocietyData["intro"]>;
  responsibilities: NonNullable<StAndrewSocietyData["responsibilities"]>;
  benefits: NonNullable<StAndrewSocietyData["benefits"]>;
  expectations: NonNullable<StAndrewSocietyData["expectations"]>;
  application: NonNullable<StAndrewSocietyData["application"]>;
};

export function StAndrewSocietyContent({
                                         intro,
                                         responsibilities,
                                         benefits,
                                         expectations,
                                         application,
                                       }: Props) {
  const introParagraphs = (intro.body ?? "").split("\n\n").filter(Boolean);

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
        <div className="mx-auto grid max-w-5xl gap-10 px-5 py-14 sm:px-8 sm:py-20 lg:grid-cols-2 lg:items-center">
          <div
            data-tina-field={tinaField(intro, "body")}
            className="space-y-4 text-[15px] leading-7 text-stone-700"
          >
            {introParagraphs.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>

          {intro.image && (
            <div className="relative overflow-hidden rounded-sm">
              <Image
                src={intro.image}
                alt=""
                width={600}
                height={800}
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="w-full h-auto"
                data-tina-field={tinaField(intro, "image")}
              />
            </div>
          )}
        </div>
      </section>

      {/* -------- responsibilities / benefits / expectations -------- */}
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
          <NumberedList section={responsibilities} fieldSource={responsibilities} />

          <div className="mt-10 grid gap-10 border-t border-stone-200 pt-10 sm:grid-cols-2">
            <NumberedList section={benefits} fieldSource={benefits} />
            <NumberedList section={expectations} fieldSource={expectations} />
          </div>
        </div>
      </section>

      {/* -------- application -------- */}
      {application.file && (
        <section
          className="border-y border-t-stone-200 border-b-stone-700 bg-vestment-900"
        >
          <div className="mx-auto flex max-w-5xl flex-col items-center px-5 py-14 text-center sm:px-8 sm:py-20">
            <p className="font-meta text-[11px] uppercase tracking-[0.22em] text-brass-400">
              Ready to serve?
            </p>
            <Link
              href={application.file}
              data-tina-field={tinaField(application, "linkLabel")}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-1.5 rounded-sm bg-brass-300 px-6 py-3 text-sm font-semibold tracking-wide text-vestment-900 transition hover:bg-brass-400"
            >
              {application.linkLabel}
              <IconArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </section>
      )}
    </>
  );
}
