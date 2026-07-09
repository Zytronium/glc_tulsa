import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { client } from "@/../tina/__generated__/client";
import { ClientPage } from "./client-page";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;

  try {
    const eventData = await client.queries.event({
      relativePath: `${id}.json`,
    });
    const event = eventData.data.event;

    return {
      title: `${event.title} | Grace Evangelical Lutheran Church`,
      description: event.detail,
    };
  } catch {
    return { title: "Event | Grace Evangelical Lutheran Church" };
  }
}

export default async function EventPage({ params }: Props) {
  const { id } = await params;

  let eventData;
  try {
    eventData = await client.queries.event({
      relativePath: `${id}.json`,
    });
  } catch {
    notFound();
  }

  return <ClientPage eventQuery={eventData} />;
}
