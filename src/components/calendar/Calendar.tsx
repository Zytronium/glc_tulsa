"use client";

import React from "react";

type Props = {
  calendarId: string;
};

export function Calendar({ calendarId }: Props) {
  const embedUrl =
    `https://calendar.google.com/calendar/embed?src=${encodeURIComponent(calendarId)}&ctz=America/Chicago`;

  return (
    <div className="mt-10">
      <iframe
        src={embedUrl}
        width="100%"
        height="700"
        frameBorder="0"
        scrolling="no"
        className="block border border-stone-300 w-[80vw] rounded-2xl "
      />
    </div>
  );
}
