"use client";

import { useTina } from "tinacms/dist/react";
import type { AboutPageQuery } from "../../../../tina/__generated__/types";
import { AboutHero } from "@/components/about/AboutHero";
import { AboutIntro } from "@/components/about/AboutIntro";
import { AboutMission } from "@/components/about/AboutMission";
import { AboutDoctrine } from "@/components/about/AboutDoctrine";
import { FourMarks } from "@/components/about/FourMarks";
import { AboutMap } from "@/components/about/AboutMap";

type Props = {
  query: string;
  variables: object;
  data: AboutPageQuery;
};

export function ClientPage(props: Props) {
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });

  const about = data.aboutPage;

  return (
    <main>
      <AboutHero hero={about.hero!} />
      <AboutIntro intro={about.intro!} />
      <AboutMission mission={about.mission!} />
      <AboutDoctrine doctrine={about.doctrine!} />
      <FourMarks marks={about.marks!} />
      <AboutMap />
    </main>
  );
}
