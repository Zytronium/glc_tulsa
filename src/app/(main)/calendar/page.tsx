import { client } from "../../../../tina/__generated__/client";
import type { EventConnectionQuery } from "../../../../tina/__generated__/types";
import { Calendar } from "@/components/calendar/Calendar";

export type CalendarEvent = NonNullable<NonNullable<NonNullable<EventConnectionQuery["eventConnection"]["edges"]>[number]>["node"]>;

export default async function CalendarPage() {
  const eventsData = await client.queries.eventConnection();

  const events = (eventsData.data.eventConnection.edges ?? [])
    .map((e) => e!.node!)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return (
    <div className="mx-auto max-w-3xl px-5 py-14 sm:px-8 sm:py-20">
      <p className="text-center font-meta text-[11px] uppercase tracking-[0.18em] text-garnet-600">
        Parish life
      </p>
      <h1 className="mt-3 text-center font-display text-[32px] font-medium text-ink sm:text-[40px]">
        Calendar
      </h1>
      <Calendar events={events} />
    </div>
  );
}
