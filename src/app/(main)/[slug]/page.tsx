import { notFound, redirect } from "next/navigation";
import { client } from "@/../tina/__generated__/client";
import { ClientPage } from "./client-page";
import { PasswordGate } from "@/components/pages/PasswordGate";
import { getRedirectTarget } from "@/lib/redirects";

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
    const redirectTarget = getRedirectTarget(slug);
    if (redirectTarget) {
      redirect(redirectTarget);
    }
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

  // password-protected pages: only pass the slug, never the content
  if (doc.passwordProtected) {
    return <PasswordGate slug={slug} />;
  }

  return <ClientPage query={result} relativePath={doc._sys.relativePath} />;
}
