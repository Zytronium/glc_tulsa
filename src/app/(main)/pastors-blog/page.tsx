import { client } from "@/../tina/__generated__/client";
import { BlogList } from "@/components/blog/BlogList";

export default async function PastorsBlogPage() {
  const result = await client.queries.pastorBlogPostConnection();

  const posts = (result.data.pastorBlogPostConnection.edges ?? [])
    .map((e) => e!.node!)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <main>
      <div
        className="border-b border-stone-200 bg-stone-100 px-5 py-14 text-center sm:px-8 sm:py-20"
        style={{
          backgroundImage: "url('/images/aged_paper.png')",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <p className="font-meta text-[11px] uppercase tracking-[0.18em] text-garnet-600">
          From the Pastor
        </p>
        <h1 className="mt-3 font-display text-[30px] font-medium text-ink sm:text-[36px]">
          Pastor&apos;s Blog
        </h1>
      </div>
      <div style={{
        backgroundImage: "url('/images/paper.png')",
        backgroundRepeat: "repeat-y",
        backgroundSize: "100%",
        backgroundPosition: "center",
      }}>
        <BlogList posts={posts} />
      </div>
    </main>
  );
}
