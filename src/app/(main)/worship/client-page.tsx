"use client";

import { useTina } from "tinacms/dist/react";
import type { WorshipPageQuery } from "@/../tina/__generated__/types";
import { WorshipHero } from "@/components/worship/WorshipHero";
import { WorshipTimesAndServices } from "@/components/worship/WorshipTimesAndServices";
import { LentSection } from "@/components/worship/LentSection";
import { HolyWeekSection } from "@/components/worship/HolyWeekSection";

type TinaQuery<T> = { query: string; variables: object; data: T };

type Props = {
  worshipQuery: TinaQuery<WorshipPageQuery>;
};

export function ClientPage({ worshipQuery }: Props) {
  const { data } = useTina(worshipQuery);
  const worship = data.worshipPage;

  return (
    <main>
      <WorshipHero hero={worship.hero!} />
      <WorshipTimesAndServices
        worshipTimes={worship.worshipTimes!}
        specialServices={worship.specialServices!}
      />
      <LentSection lent={worship.lent!} />
      <HolyWeekSection holyWeek={worship.holyWeek!} />
    </main>
  );
}
