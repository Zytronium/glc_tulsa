import { client } from "../../../../tina/__generated__/client";
import { Calendar } from "@/components/calendar/Calendar";

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
      <Calendar calendarId={googleCalendarId} />
    </div>
  );
}
