import { client } from "../../../../tina/__generated__/client";
import { Calendar } from "@/components/calendar/Calendar";
import Link from "next/link";
import {IconChevronLeft} from "@/components/home/icons";

export default async function CalendarPage() {
  const globalVariablesData = await client.queries.global_variables({
    relativePath: "global_variables.json",
  });
  const googleCalendarId = globalVariablesData.data.global_variables.googleCalendarId || "";

  return (
    <div className="mx-auto max-w-[80vw] px-5 py-14 sm:px-8 sm:py-20">
      <h1 className="mt-3 text-center font-display text-[32px] font-medium text-ink sm:text-[40px]">
        Calendar
      </h1>
      <Link
        href="/events"
        className="mt-2 inline-flex items-center gap-1.5 text-sm text-stone-700 transition hover:text-garnet-700"
      >
        <IconChevronLeft className="h-3.5 w-3.5"/>
        Back to services & events
      </Link>
      <Calendar calendarId={googleCalendarId} />
    </div>
  );
}
