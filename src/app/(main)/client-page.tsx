"use client";

import { useTina } from "tinacms/dist/react";
import type { HomePageQuery, Global_VariablesQuery, NewsItemConnectionQuery } from "@/../tina/__generated__/types";
import type { EventNode } from "./page";
import { Hero } from "@/components/home/Hero";
import { ServiceBar } from "@/components/home/ServiceBar";
import { QuickLinks } from "@/components/home/QuickLinks";
import { WhoWeAre } from "@/components/home/WhoWeAre";
import { UpcomingEvents } from "@/components/home/UpcomingEvents";
import { Mission } from "@/components/home/Mission";
import { RecentNews } from "@/components/home/RecentNews";
import { NewsletterSignup } from "@/components/home/NewsletterSignup";

type TinaQuery<T> = { query: string; variables: object; data: T };

type NewsNode = NonNullable<NonNullable<NewsItemConnectionQuery["newsItemConnection"]["edges"]>[number]>["node"];

type Props = {
  homeQuery: TinaQuery<HomePageQuery>;
  globalVariablesQuery: TinaQuery<Global_VariablesQuery>;
  events: EventNode[];
  newsItems: NonNullable<NewsNode>[];
};

export function ClientPage({ homeQuery, globalVariablesQuery, events, newsItems }: Props) {
  const { data: homeData } = useTina(homeQuery);
  const { data: globalVariablesData } = useTina(globalVariablesQuery);

  const home = homeData.homePage;
  const globalVariables = globalVariablesData.global_variables!;

  return (
    <main>
      <Hero hero={home.hero!} />
      <ServiceBar serviceBar={home.serviceBar!} globalVars={globalVariables} />
      <QuickLinks quickLinks={home.quickLinks!} />
      <WhoWeAre whoWeAre={home.whoWeAre!} />
      <Mission mission={home.mission!} />
      <UpcomingEvents events={events} />
      <RecentNews items={newsItems} />
      <NewsletterSignup />
    </main>
  );
}
