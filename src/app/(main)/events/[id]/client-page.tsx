"use client";

import { useTina } from "tinacms/dist/react";
import type { EventQuery } from "@/../tina/__generated__/types";
import { EventDetail } from "@/components/events/EventDetail";

type TinaQuery<T> = { query: string; variables: object; data: T };

type Props = {
  eventQuery: TinaQuery<EventQuery>;
};

export function ClientPage({ eventQuery }: Props) {
  const { data } = useTina(eventQuery);

  return (
    <main>
      <EventDetail event={data.event} />
    </main>
  );
}
