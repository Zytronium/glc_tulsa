import Image from "next/image";
import { tinaField } from "tinacms/dist/react";

type SideImage = {
  image?: string | null;
  caption?: string | null;
  width?: string | null;
};

type TimelineItem = {
  year?: string | null;
  text?: string | null;
};

type Section = {
  heading?: string | null;
  headingSize?: string | null;
  body?: string | null;
  layout?: string | null;
  sideImages?: (SideImage | null)[] | null;
  timelineItems?: (TimelineItem | null)[] | null;
};

const HEADING_CLASSES: Record<string, string> = {
  large: "text-[28px] sm:text-[32px]",
  medium: "text-[22px]",
  small: "text-[13px] uppercase tracking-[0.14em] font-meta font-normal",
};

function SectionHeading({ section }: { section: Section }) {
  if (!section.heading) return null;
  const sizeClass = HEADING_CLASSES[section.headingSize ?? "medium"] ?? HEADING_CLASSES.medium;

  return (
    <h2
      data-tina-field={tinaField(section, "heading")}
      className={`font-display font-medium leading-tight text-ink ${sizeClass}`}
    >
      {section.heading}
    </h2>
  );
}

function BodyText({ section }: { section: Section }) {
  const paragraphs = (section.body ?? "").split("\n\n").filter(Boolean);
  if (paragraphs.length === 0) return null;

  return (
    <div
      data-tina-field={tinaField(section, "body")}
      className="mt-4 space-y-4 text-[15px] leading-7 text-stone-700"
    >
      {paragraphs.map((para, i) => (
        <p key={i}>{para}</p>
      ))}
    </div>
  );
}

function Figure({ item, className }: { item: SideImage; className?: string }) {
  if (!item.image) return null;
  return (
    <figure className={className}>
      <div className="relative aspect-4/3 overflow-hidden rounded-sm">
        <Image
          fill
          src={item.image}
          alt=""
          sizes="(min-width: 1024px) 33vw, 50vw"
          className="object-cover"
          data-tina-field={tinaField(item, "image")}
        />
      </div>
      {item.caption && (
        <figcaption
          data-tina-field={tinaField(item, "caption")}
          className="mt-2 text-[12px] leading-5 text-stone-500"
        >
          {item.caption}
        </figcaption>
      )}
    </figure>
  );
}

export function HistorySection({ section }: { section: Section }) {
  const images = (section.sideImages ?? []).filter((i): i is SideImage => i !== null);
  const timelineItems = (section.timelineItems ?? []).filter((i): i is TimelineItem => i !== null);

  if (section.layout === "timeline") {
    return (
      <div>
        <SectionHeading section={section} />
        <ol
          data-tina-field={section.timelineItems ? tinaField(section, "timelineItems") : undefined}
          className="mt-6 space-y-4 border-l-2 border-brass-500/50 pl-6"
        >
          {timelineItems.map((item, i) => (
            <li key={i} className="text-[14px] leading-6 text-stone-700">
              <span className="mr-2 font-display text-[15px] font-medium text-garnet-700">
                {item.year}
              </span>
              {item.text}
            </li>
          ))}
        </ol>
      </div>
    );
  }

  if (section.layout === "textWithSidebarImages") {
    return (
      <div className="grid gap-10 lg:grid-cols-[1fr_16rem]">
        <div>
          <SectionHeading section={section} />
          <BodyText section={section} />
        </div>
        {images.length > 0 && (
          <div className="flex flex-col gap-6">
            {images.map((item, i) => (
              <Figure key={i} item={item} />
            ))}
          </div>
        )}
      </div>
    );
  }

  if (section.layout === "textWithSideImage") {
    const first = images[0];
    return (
      <div className="grid gap-8 lg:grid-cols-[minmax(0,20rem)_1fr] lg:items-start">
        {first && <Figure item={first} />}
        <div>
          <SectionHeading section={section} />
          <BodyText section={section} />
        </div>
      </div>
    );
  }

  if (section.layout === "imageRow") {
    return (
      <div>
        <SectionHeading section={section} />
        <BodyText section={section} />
        {images.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-6">
            {images.map((item, i) => (
              <Figure
                key={i}
                item={item}
                className={
                  item.width === "full"
                    ? "w-full"
                    : "w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(25%-1.125rem)]"
                }
              />
            ))}
          </div>
        )}
      </div>
    );
  }

  // textOnly
  return (
    <div>
      <SectionHeading section={section} />
      <BodyText section={section} />
    </div>
  );
}
