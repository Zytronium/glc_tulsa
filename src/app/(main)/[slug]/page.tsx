import { notFound } from "next/navigation";
import { client } from "../../../../tina/__generated__/client";
import { ClientPage } from "./client-page";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function DynamicPage({ params }: Props) {
  const { slug } = await params;

  const result = await client.queries.sitePageConnection({
    filter: { slug: { eq: slug } },
  });

  const doc = result.data.sitePageConnection.edges?.[0]?.node;

  if (!doc) {
    notFound();
  }

  const now = new Date();
  const publishAt = doc.schedule?.publishAt ? new Date(doc.schedule.publishAt) : null;
  const unpublishAt = doc.schedule?.unpublishAt ? new Date(doc.schedule.unpublishAt) : null;

  const isPublished = doc.status === "published";
  const afterStart = !publishAt || publishAt <= now;
  const beforeEnd = !unpublishAt || unpublishAt >= now;

  if (!isPublished || !afterStart || !beforeEnd) {
    notFound();
  }

  return <ClientPage query={result} relativePath={doc._sys.relativePath} />;
}
