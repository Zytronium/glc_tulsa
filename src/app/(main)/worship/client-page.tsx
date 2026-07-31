"use client";

import { useTina } from "tinacms/dist/react";
import type {Global_VariablesQuery, WorshipPageQuery} from "@/../tina/__generated__/types";
import { WorshipHero } from "@/components/worship/WorshipHero";
import { WorshipTimesAndServices } from "@/components/worship/WorshipTimesAndServices";
import { MapSection } from "@/components/worship/MapSection";
import { LentSection } from "@/components/worship/LentSection";
import { HolyWeekSection } from "@/components/worship/HolyWeekSection";

type TinaQuery<T> = { query: string; variables: object; data: T };

type Props = {
  worshipQuery: TinaQuery<WorshipPageQuery>;
  globalVariablesQuery: TinaQuery<Global_VariablesQuery>;
};

export function ClientPage({ worshipQuery, globalVariablesQuery }: Props) {
  const { data } = useTina(worshipQuery);
  const worship = data.worshipPage;

  const { data: globalVariablesData } = useTina(globalVariablesQuery);
  const globalVars = globalVariablesData.global_variables;

  return (
    <main>
      <WorshipHero hero={worship.hero!} />
      <WorshipTimesAndServices
        worshipTimes={worship.worshipTimes!}
        graceNight={worship.graceNight!}
        specialServices={worship.specialServices!}
      />
      <MapSection globalVars={globalVars!} worshipData={worship!}/>
      {worship.lent!.visible && (<LentSection lent={worship.lent!} />)}
      {worship.holyWeek!.visible && (<HolyWeekSection holyWeek={worship.holyWeek!} />)}

    </main>
  );
}
