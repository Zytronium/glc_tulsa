import { notFound } from "next/navigation";
import { client } from "@/../tina/__generated__/client";
import { ClientPage } from "./client-page";

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  let data;
  try {
    data = await client.queries.pastorBlogPost({ relativePath: `${slug}.json` });
  } catch {
    notFound();
  }

  return <ClientPage query={data} />;
}
