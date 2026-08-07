import type { Metadata } from "next";
import { client } from "@/../tina/__generated__/client";
import { ClientPage } from "./client-page";

export const metadata: Metadata = {
  title: "Youth | Grace Evangelical Lutheran Church",
  description:
    "Grace Lutheran Youth (GLY) offers Sunday School, Youth Nights, Youth Events, Youth Gatherings, and fundraisers for 6th through 12th grade members in Tulsa, OK.",
};

export default async function Youth() {
  const [youthQuery, eventsQuery] = await Promise.all([
    client.queries.youthPage({ relativePath: "youth.json" }),
    client.queries.eventConnection(),
  ]);

  return <ClientPage youthQuery={youthQuery} eventsQuery={eventsQuery} />;
}
