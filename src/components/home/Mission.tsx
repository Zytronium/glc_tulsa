import { ArchTop, IconBookOpen, IconUsers, IconWorld } from "./icons";

const MISSION = [
  {
    label: "Gather",
    description: "Around Word & Sacrament every Sunday",
    Icon: IconUsers,
  },
  {
    label: "Grow",
    description: "In faith through Bible study and discipleship",
    Icon: IconBookOpen,
  },
  {
    label: "Go",
    description: "Into Tulsa proclaiming the Gospel in word and deed",
    Icon: IconWorld,
  },
];

export function Mission() {
  return (
    <section className="border-b border-stone-200 bg-white">
      <div className="mx-auto max-w-5xl px-5 py-14 text-center sm:px-8 sm:py-20">
        <p className="font-meta text-[11px] uppercase tracking-[0.18em] text-garnet-600">
          Our mission
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {MISSION.map(({ label, description, Icon }) => (
            <div
              key={label}
              className="flex flex-col items-center rounded-sm bg-stone-50 px-6 py-9"
            >
              <ArchTop className="h-6 w-10 text-garnet-200" />
              <Icon className="h-7 w-7 text-garnet-600" />
              <p className="mt-3 font-display text-[18px] text-ink">
                {label}
              </p>
              <p className="mt-1.5 max-w-[14rem] text-[13px] leading-6 text-stone-700">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
