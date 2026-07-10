import type { Metadata } from "next";
import { client } from "@/../tina/__generated__/client";
import { ClientPage } from "./client-page";

export const metadata: Metadata = {
  title: "News & Announcements | Grace Evangelical Lutheran Church",
  description: "Recent news and announcements from Grace Evangelical Lutheran Church.",
};

export default async function NewsPage() {
  const newsQuery = await client.queries.newsItemConnection({
    sort: "date",
  });

  return <ClientPage newsQuery={newsQuery} />;
}
