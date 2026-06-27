"use client";

import { useTina } from "tinacms/dist/react";
import type { HomePageQuery, LayoutQuery } from "../../../tina/__generated__/types";
import type { EventNode } from "./page";
import { Hero } from "@/components/home/Hero";
import { ServiceBar } from "@/components/home/ServiceBar";
import { QuickLinks } from "@/components/home/QuickLinks";
import { WhoWeAre } from "@/components/home/WhoWeAre";
import { UpcomingEvents } from "@/components/home/UpcomingEvents";
import { Mission } from "@/components/home/Mission";

type TinaQuery<T> = { query: string; variables: object; data: T };

type Props = {
  homeQuery: TinaQuery<HomePageQuery>;
  layoutQuery: TinaQuery<LayoutQuery>;
  events: EventNode[];
};

export function ClientPage({ homeQuery, layoutQuery, events }: Props) {
  const { data: homeData } = useTina(homeQuery);
  const { data: layoutData } = useTina(layoutQuery);

  const home = homeData.homePage;
  const footer = layoutData.layout.footer!;

  return (
    <main>
      <Hero hero={home.hero!} />
      <ServiceBar serviceBar={home.serviceBar!} footer={footer} />
      <QuickLinks quickLinks={home.quickLinks!} />
      <WhoWeAre whoWeAre={home.whoWeAre!} />
      <Mission mission={home.mission!} />
      <UpcomingEvents events={events} />
    </main>
  );
}
