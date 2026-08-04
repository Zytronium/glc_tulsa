import { HistorySection } from "./HistorySection";
import type { HistoryData } from "@/app/(main)/history/page";

type Props = { sections: NonNullable<HistoryData["sections"]> };

export function HistoryContent({ sections }: Props) {
  const items = (sections ?? []).filter((s) => s !== null);

  let bgToggle = 0;

  return (
    <div className="flex flex-col">
      {items.map((section, i) => {
        // -------- only advance the alternating background when this section starts a new visual block --------
        if (section?.heading) {
          bgToggle += 1;
        }
        const isAged = bgToggle % 2 === 0;

        return (
        <section
          key={i}
          className={`border-b border-stone-200 last:border-b-0 ${
              isAged ? "bg-stone-100" : "bg-white"
          }`}
          style={{
            backgroundImage: `url('${isAged ? "/images/aged_paper.png" : "/images/paper.png"}')`,
            backgroundRepeat: "repeat-y",
            backgroundSize: "100% auto",
            backgroundPosition: "center",
          }}
        >
          <div className="mx-auto max-w-5xl px-5 py-12 sm:px-8 sm:py-16">
            <HistorySection section={section} />
          </div>
        </section>
        );
      })}
    </div>
  );
}
