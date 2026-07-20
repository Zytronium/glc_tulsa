import Image from "next/image";
import Link from "next/link";
import { tinaField } from "tinacms/dist/react";
import { IconArrowRight, IconMail } from "@/components/home/icons";
import type { MusicData } from "@/app/(main)/ministries/music/page";

type Props = {
  musicMinistry: NonNullable<MusicData["musicMinistry"]>;
  messiah: NonNullable<MusicData["messiah"]>;
};

export function MusicContent({ musicMinistry, messiah }: Props) {
  const musicParagraphs = (musicMinistry.body ?? "").split("\n\n").filter(Boolean);
  const messiahParagraphs = (messiah.body ?? "").split("\n\n").filter(Boolean);

  return (
    <>
      {/* -------- music ministry -------- */}
      <section
        className="border-b border-stone-200 bg-stone-100"
        style={{
          backgroundImage: "url('/images/aged_paper.png')",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div
          className={`mx-auto grid max-w-5xl gap-10 px-5 py-14 sm:px-8 sm:py-20 ${musicMinistry.image ? 'lg:grid-cols-2 lg:items-center' : ''}`}>
        <div>
            <h2
              data-tina-field={tinaField(musicMinistry, "heading")}
              className="font-display text-[24px] font-medium leading-tight text-ink"
            >
              {musicMinistry.heading}
            </h2>
            {musicParagraphs.length > 0 && (
              <div
                data-tina-field={tinaField(musicMinistry, "body")}
                className="mt-4 space-y-4 text-[15px] leading-7 text-stone-700"
              >
                {musicParagraphs.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            )}
            {(musicMinistry.contactName || musicMinistry.contactEmail) && (
              <div className="mt-5 flex items-center gap-2 border-t border-stone-200 pt-5 text-[14px] text-stone-700">
                <IconMail className="h-4 w-4 text-garnet-600" />
                <span data-tina-field={tinaField(musicMinistry, "contactName")}>
                  {musicMinistry.contactName}
                </span>
                {musicMinistry.contactEmail && (
                  <>
                  {" "}
                <a
                  href={`mailto:${musicMinistry.contactEmail}`}
                  data-tina-field={tinaField(musicMinistry, "contactEmail")}
                  className="text-garnet-700 underline decoration-garnet-600/40 underline-offset-2 transition hover:text-garnet-600 hover:decoration-garnet-600"
                  >
                  {musicMinistry.contactEmail}
                  </a>
                  </>
                  )}
              </div>
            )}
          </div>

          {musicMinistry.image && (
            <div className="relative aspect-4/3 overflow-hidden rounded-sm">
              <Image
                fill
                src={musicMinistry.image}
                alt=""
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
                data-tina-field={tinaField(musicMinistry, "image")}
              />
            </div>
          )}
        </div>
      </section>

      {/* -------- tulsa area lutheran messiah -------- */}
      <section
        className="bg-white"
        style={{
          backgroundImage: "url('/images/paper.png')",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div
          className={`mx-auto grid max-w-5xl gap-10 px-5 py-14 sm:px-8 sm:py-20 ${messiah.image ? 'lg:grid-cols-2 lg:items-center' : ''}`}>
          {messiah.image && (
            <div className="relative aspect-4/3 overflow-hidden rounded-sm lg:order-2">
              <Image
                fill
                src={messiah.image}
                alt=""
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
                data-tina-field={tinaField(messiah, "image")}
              />
            </div>
          )}

          <div className="lg:order-1">
          <h2
              data-tina-field={tinaField(messiah, "heading")}
              className="font-display text-[24px] font-medium leading-tight text-ink"
            >
              {messiah.heading}
            </h2>
            {messiahParagraphs.length > 0 && (
              <div
                data-tina-field={tinaField(messiah, "body")}
                className="mt-4 space-y-4 text-[15px] leading-7 text-stone-700"
              >
                {messiahParagraphs.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            )}
            {messiah.facebookHref && (
              <Link
                href={messiah.facebookHref}
                data-tina-field={tinaField(messiah, "facebookLabel")}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-medium text-garnet-700 hover:text-garnet-600"
              >
                {messiah.facebookLabel}
                <IconArrowRight className="h-3.5 w-3.5" />
              </Link>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
