"use client";

import { useEffect, useRef } from "react";

export function EmbedRenderer({ code }: { code?: string | null }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const trimmed = typeof code === "string" ? code.trim() : "";
    if (!container || !trimmed) return;

    container.innerHTML = "";

    const temp = document.createElement("div");
    temp.innerHTML = trimmed;
    const scriptEl = temp.querySelector("script");

    if (scriptEl) {
      const script = document.createElement("script");
      Array.from(scriptEl.attributes).forEach((attr) => {
        script.setAttribute(attr.name, attr.value);
      });
      script.textContent = scriptEl.textContent;
      container.appendChild(script);
    } else {
      container.innerHTML = trimmed;
    }

    return () => {
      container.innerHTML = "";
    };
  }, [code]);

  return <div ref={containerRef} />;
}
