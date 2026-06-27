"use client";

import { useTina } from "tinacms/dist/react";
import type { AboutPageQuery, LayoutQuery } from "../../../../tina/__generated__/types";
import { AboutHero } from "@/components/about/AboutHero";
import { AboutIntro } from "@/components/about/AboutIntro";
import { AboutMission } from "@/components/about/AboutMission";
import { AboutDoctrine } from "@/components/about/AboutDoctrine";
import { FourMarks } from "@/components/about/FourMarks";
import { AboutMap } from "@/components/about/AboutMap";

type TinaQuery<T> = { query: string; variables: object; data: T };

type Props = {
  aboutQuery: TinaQuery<AboutPageQuery>;
  layoutQuery: TinaQuery<LayoutQuery>;
};

export function ClientPage({ aboutQuery, layoutQuery }: Props) {
  const { data: aboutData } = useTina(aboutQuery);
  const { data: layoutData } = useTina(layoutQuery);

  const about = aboutData.aboutPage;
  const footer = layoutData.layout.footer!;

  return (
    <main>
      <AboutHero hero={about.hero!} />
      <AboutIntro intro={about.intro!} />
      <AboutMission mission={about.mission!} />
      <AboutDoctrine doctrine={about.doctrine!} />
      <FourMarks marks={about.marks!} />
      <AboutMap footer={footer} />
    </main>
  );
}
