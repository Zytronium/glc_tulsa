import { client } from "../../../tina/__generated__/client";
import type { HomePageQuery, EventConnectionQuery } from "../../../tina/__generated__/types";
import { ClientPage } from "./client-page";

export type HomeData = NonNullable<HomePageQuery["homePage"]>;
export type EventNode = NonNullable<NonNullable<NonNullable<EventConnectionQuery["eventConnection"]["edges"]>[number]>["node"]>;

export default async function Home() {
  const [homeData, globalVariablesData, eventsData] = await Promise.all([
    client.queries.homePage({ relativePath: "home.json" }),
    client.queries.global_variables({ relativePath: "global_variables.json" }),
    client.queries.eventConnection(),
  ]);

  const events = (eventsData.data.eventConnection.edges ?? [])
    .map((e) => e!.node!)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return <ClientPage homeQuery={homeData} globalVariablesQuery={globalVariablesData} events={events} />;
}
