"use client";

import { useTina } from "tinacms/dist/react";
import type { EventConnectionQuery } from "@/../tina/__generated__/types";
import { EventsGrid } from "@/components/events/EventsGrid";

type TinaQuery<T> = { query: string; variables: object; data: T };

type Props = {
  eventsQuery: TinaQuery<EventConnectionQuery>;
};

export function ClientPage({ eventsQuery }: Props) {
  const { data } = useTina(eventsQuery);

  const events = (data.eventConnection.edges ?? [])
    .map((edge) => edge?.node)
    .filter((node) => node !== null && node !== undefined);

  return (
    <main>
      <EventsGrid events={events} />
    </main>
  );
}
