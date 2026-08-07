"use client";

import {useTina} from "tinacms/dist/react";
import type {AboutPageQuery, Global_VariablesQuery} from "../../../../tina/__generated__/types";
import {AboutHero} from "@/components/about/AboutHero";
import {AboutIntro} from "@/components/about/AboutIntro";
import {AboutMission} from "@/components/about/AboutMission";
import {AboutDoctrine} from "@/components/about/AboutDoctrine";
import {FourMarks} from "@/components/about/FourMarks";
import {AboutPhotoGallery} from "@/components/about/AboutPhotoGallery";
import {AboutMap} from "@/components/about/AboutMap";
import {isPageVisible} from "@/lib/publish-status";
import {PublishGuard} from "@/components/system/PublishGuard";

type TinaQuery<T> = { query: string; variables: object; data: T };

type Props = {
  aboutQuery: TinaQuery<AboutPageQuery>;
  globalVariablesQuery: TinaQuery<Global_VariablesQuery>;
};

export function ClientPage({aboutQuery, globalVariablesQuery}: Props) {
  const {data: aboutData} = useTina(aboutQuery);
  const {data: globalVariablesData} = useTina(globalVariablesQuery);

  const about = aboutData.aboutPage;
  const globalVars = globalVariablesData.global_variables!;

  return (
    <PublishGuard isVisible={isPageVisible(about)}>
      <main>
        <AboutHero hero={about.hero!}/>
        <AboutIntro intro={about.intro!}/>
        <AboutMission mission={about.mission!}/>
        <AboutDoctrine doctrine={about.doctrine!}/>
        <FourMarks marks={about.marks!}/>
        <AboutPhotoGallery photoGalleryPreview={about.photoGalleryPreview!}/>
        <AboutMap globalVars={globalVars}/>
      </main>
    </PublishGuard>
  );
}
