"use client";

import { useTina } from "tinacms/dist/react";
import type { YouthPageQuery, EventConnectionQuery } from "@/../tina/__generated__/types";
import { YouthPage } from "@/components/youth/YouthPage";
import { isPageVisible } from "@/lib/publish-status";
import { PublishGuard } from "@/components/system/PublishGuard";

type TinaQuery<T> = { query: string; variables: object; data: T };

type Props = {
  youthQuery: TinaQuery<YouthPageQuery>;
  eventsQuery: TinaQuery<EventConnectionQuery>;
};

export function ClientPage({ youthQuery, eventsQuery }: Props) {
  const { data: youthData } = useTina(youthQuery);
  const { data: eventsData } = useTina(eventsQuery);

  const youth = youthData.youthPage;

  return (
    <PublishGuard isVisible={isPageVisible(youth)}>
      <YouthPage youth={youth} eventsData={eventsData} />
    </PublishGuard>
  );
}
