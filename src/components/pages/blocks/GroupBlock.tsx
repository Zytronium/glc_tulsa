import { backgroundStyleFor } from "./backgroundStyles";
import { SectionRenderer } from "../SectionRenderer";

type Slot = {
  sections?: (Record<string, unknown> | null)[] | null;
};

type Props = {
  section: {
    groupLayout?: string | null;
    background?: string | null;
    slots?: (Slot | null)[] | null;
  };
};

// -------- grid-template-areas + column/row tracks per layout, keyed by slot index --------
const LAYOUTS: Record<string, { areas: string; columns: string; rows?: string; slotAreas: string[] }> = {
    sidebarLeft: {
      areas: `"sidebar main"`,
      columns: "minmax(0,1fr) minmax(0,2fr)",
      slotAreas: ["sidebar", "main"],
    },
    sidebarRight: {
      areas: `"main sidebar"`,
      columns: "minmax(0,2fr) minmax(0,1fr)",
      slotAreas: ["main", "sidebar"],
    },
    twoColEven: {
      areas: `"colA colB"`,
      columns: "minmax(0,1fr) minmax(0,1fr)",
      slotAreas: ["colA", "colB"],
    },
    threeTopBottomSplit: {
      areas: `"top top" "bottomLeft bottomRight"`,
      columns: "minmax(0,1fr) minmax(0,1fr)",
      rows: "auto auto",
      slotAreas: ["top", "bottomLeft", "bottomRight"],
    },
    threeLeftRightSplit: {
      areas: `"left rightTop" "left rightBottom"`,
      columns: "minmax(0,1fr) minmax(0,1fr)",
      rows: "auto auto",
      slotAreas: ["left", "rightTop", "rightBottom"],
    },
  };

export function GroupBlock({ section }: Props) {
  const layoutKey = section.groupLayout ?? "twoColEven";
  const layout = LAYOUTS[layoutKey] ?? LAYOUTS.twoColEven;
  const bg = backgroundStyleFor(section.background);
  const slots = (section.slots ?? []).filter((s): s is Slot => s !== null);

  return (
    <section className={`border-b border-stone-200 ${bg.className}`} style={bg.style}>
      <div
        className="mx-auto max-w-6xl gap-8 px-5 py-14 sm:px-8 sm:py-20 sm:grid"
        style={{
          gridTemplateAreas: layout.areas,
          gridTemplateColumns: layout.columns,
          gridTemplateRows: layout.rows,
        }}
      >
        {slots.map((slot, i) => {
          // fall back to stacking if editor added more/fewer slots than the layout expects
          const area = layout.slotAreas[i];
          const slotSections = (slot.sections ?? []).filter(
            (s): s is Record<string, unknown> => s !== null
          );

          return (
            <div key={i} style={area ? { gridArea: area } : undefined} className="min-w-0">
              <SectionRenderer sections={slotSections} nested />
            </div>
          );
        })}
      </div>
    </section>
  );
}
