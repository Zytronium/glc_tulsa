import type { Metadata } from "next";
import { client } from "@/../tina/__generated__/client";
import { ClientPage } from "./client-page";

export const metadata: Metadata = {
  title: "Events | Grace Evangelical Lutheran Church",
  description:
    "Upcoming services and events at Grace Evangelical Lutheran Church in Tulsa, OK.",
};

export default async function EventsPage() {
  const eventsQuery = await client.queries.eventConnection({
    sort: "date",
  });

  return <ClientPage eventsQuery={eventsQuery} />;
}
