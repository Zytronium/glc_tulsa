import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { client } from "@/../tina/__generated__/client";
import { ClientPage } from "./client-page";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  try {
    const { data } = await client.queries.newsItem({ relativePath: `${id}.json` });
    return {
      title: `${data.newsItem.title} | Grace Evangelical Lutheran Church`,
      description: data.newsItem.summary,
    };
  } catch {
    return { title: "Announcement | Grace Evangelical Lutheran Church" };
  }
}

export default async function AnnouncementPage({ params }: Props) {
  const { id } = await params;

  let newsQuery;
  try {
    newsQuery = await client.queries.newsItem({ relativePath: `${id}.json` });
  } catch {
    notFound();
  }

  // keep news items off the /announcements URL
  if (newsQuery.data.newsItem.type !== "announcement") {
    notFound();
  }

  return <ClientPage newsQuery={newsQuery} />;
}
