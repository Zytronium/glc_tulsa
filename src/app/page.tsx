import { client } from "../../tina/__generated__/client";
import type { HomePageQuery, EventConnectionQuery } from "../../tina/__generated__/types";
import { Hero } from "@/components/home/Hero";
import { ServiceBar } from "@/components/home/ServiceBar";
import { QuickLinks } from "@/components/home/QuickLinks";
import { WhoWeAre } from "@/components/home/WhoWeAre";
import { UpcomingEvents } from "@/components/home/UpcomingEvents";
import { Mission } from "@/components/home/Mission";

export type HomeData = NonNullable<HomePageQuery["homePage"]>;
export type EventNode = NonNullable<NonNullable<NonNullable<EventConnectionQuery["eventConnection"]["edges"]>[number]>["node"]>;

export default async function Home() {
  const [homeData, eventsData] = await Promise.all([
    client.queries.homePage({ relativePath: "home.json" }),
    client.queries.eventConnection(),
  ]);

  const home = homeData.data.homePage;

  const events = (eventsData.data.eventConnection.edges ?? [])
    .map((e) => e!.node!)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return (
    <main>
      <Hero hero={home.hero!} />
      <ServiceBar serviceBar={home.serviceBar!} />
      <QuickLinks quickLinks={home.quickLinks!} />
      <WhoWeAre whoWeAre={home.whoWeAre!} />
      <Mission mission={home.mission!} />
    </main>
  );
}
