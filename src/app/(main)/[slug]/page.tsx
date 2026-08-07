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

  // Publish/schedule visibility is handled client-side by PublishGuard.
  // This lets editors still load the page while it's unpublished.
  // Unfortunately, it also sometimes causes a content flash and may allow crawlers to see the
  // content of an unpublished page.

  // password-protected pages: only pass the slug, never the content (this IS protected from
  // crawlers and content flashes).
  // /api/protected-page enforces both doc.status === "published" and the schedule window before
  // returning content, so you don't need to worry about visibility checks here.
  if (doc.passwordProtected) {
    return <PasswordGate slug={slug} />;
  }

  return <ClientPage query={result} relativePath={doc._sys.relativePath} />;
}
