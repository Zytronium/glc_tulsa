"use client";

import { useEffect, useRef } from "react";
import { tinaField } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { backgroundStyleFor } from "./backgroundStyles";

type Props = {
  section: {
    heading?: string | null;
    bodyRichText?: Parameters<typeof TinaMarkdown>[0]["content"];
    embedCode?: string | null;
    maxWidth?: string | null;
    background?: string | null;
  };
};

const MAX_WIDTH_CLASSES: Record<string, string> = {
  sm: "max-w-md",
  md: "max-w-2xl",
  lg: "max-w-4xl",
  full: "max-w-none",
};

export function EmbedBlock({ section }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const raw = section.embedCode;
    const code = typeof raw === "string" ? raw.trim() : "";
    if (!container || !code) return;

    container.innerHTML = "";

    // -------- parse the pasted markup --------
    const temp = document.createElement("div");
    temp.innerHTML = code;

    const scriptEl = temp.querySelector("script");

    if (scriptEl) {
      // recreate the script tag so the browser actually executes it
      const script = document.createElement("script");
      Array.from(scriptEl.attributes).forEach((attr) => {
        script.setAttribute(attr.name, attr.value);
      });
      script.textContent = scriptEl.textContent;
      container.appendChild(script);
    } else {
      // iframe or other static markup, safe to insert directly
      container.innerHTML = code;
    }

    return () => {
      container.innerHTML = "";
    };
  }, [section.embedCode]);

  if (typeof section.embedCode !== "string" || !section.embedCode.trim()) return null;

  const bg = backgroundStyleFor(section.background);
  const maxWidthClass = MAX_WIDTH_CLASSES[section.maxWidth ?? "md"] ?? MAX_WIDTH_CLASSES.md;

  return (
    <section className={`border-b border-stone-200 ${bg.className}`} style={bg.style}>
      <div className={`mx-auto px-5 py-14 sm:px-8 sm:py-20 ${maxWidthClass}`}>
        {section.heading && (
          <h2
            data-tina-field={tinaField(section, "heading")}
            className={`mb-4 text-center font-display text-2xl sm:text-3xl font-medium ${
              bg.isDark ? "text-stone-50" : "text-ink"
            }`}
          >
            {section.heading}
          </h2>
        )}
        {section.bodyRichText && (
          <div
            data-tina-field={tinaField(section, "bodyRichText")}
            className={`tina-markdown prose prose-stone mx-auto mb-6 max-w-none text-base leading-6 ${
              bg.isDark ? "prose-invert text-stone-200/85" : "text-stone-700"
            }`}
          >
            <TinaMarkdown content={section.bodyRichText} />
          </div>
        )}
        <div data-tina-field={tinaField(section, "embedCode")} ref={containerRef} />
      </div>
    </section>
  );
}
