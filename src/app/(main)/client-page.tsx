"use client";

import { useTina } from "tinacms/dist/react";
import type { HomePageQuery } from "../../../tina/__generated__/types";
import type { EventNode } from "./page";
import { Hero } from "@/components/home/Hero";
import { ServiceBar } from "@/components/home/ServiceBar";
import { QuickLinks } from "@/components/home/QuickLinks";
import { WhoWeAre } from "@/components/home/WhoWeAre";
import { UpcomingEvents } from "@/components/home/UpcomingEvents";
import { Mission } from "@/components/home/Mission";

type Props = {
  query: string;
  variables: object;
  data: HomePageQuery;
  events: EventNode[];
};

export function ClientPage(props: Props) {
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });

  const home = data.homePage;

  return (
    <main>
      <Hero hero={home.hero!} />
      <ServiceBar serviceBar={home.serviceBar!} />
      <QuickLinks quickLinks={home.quickLinks!} />
      <WhoWeAre whoWeAre={home.whoWeAre!} />
      <Mission mission={home.mission!} />
      <UpcomingEvents events={props.events} />
    </main>
  );
}