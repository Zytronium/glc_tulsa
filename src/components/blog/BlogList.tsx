import Image from "next/image";
import Link from "next/link";
import { IconArrowRight } from "@/components/home/icons";

type BlogPostSummary = {
  id: string;
  title: string;
  author: string;
  date: string;
  summary?: string | null;
  coverImage?: string | null;
};

function getSlug(id: string) {
  const lastSlash = id.lastIndexOf("/");
  const lastDot = id.lastIndexOf(".json");
  return id.substring(lastSlash + 1, lastDot);
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" });
}

export function BlogList({ posts }: { posts: BlogPostSummary[] }) {
  if (posts.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-5 py-14 text-center sm:px-8 sm:py-20">
        <p className="text-[15px] leading-7 text-stone-700">
          There are no posts yet. Check back soon.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-5 py-14 sm:px-8 sm:py-20">
      <div className="flex flex-col divide-y divide-stone-200">
        {posts.map((post) => {
          const href = `/pastors-blog/${getSlug(post.id)}`;
          return (
            <article key={post.id} className="grid gap-6 py-10 first:pt-0 last:pb-0 sm:grid-cols-[10rem_1fr]">
              {post.coverImage && (
                <Link href={href} className="relative block aspect-4/3 overflow-hidden rounded-sm">
                  <Image
                    fill
                    src={post.coverImage}
                    alt=""
                    sizes="160px"
                    className="object-cover"
                  />
                </Link>
              )}

              <div>
                <p className="font-meta text-[11px] uppercase tracking-widest text-stone-500">
                  {post.author} &middot; {formatDate(post.date)}
                </p>
                <h2 className="mt-1 font-display text-[20px] text-ink">
                  <Link href={href} className="hover:text-garnet-700">
                    {post.title}
                  </Link>
                </h2>
                {post.summary && (
                  <p className="mt-2 text-[14px] leading-6 text-stone-700">{post.summary}</p>
                )}
                <Link
                  href={href}
                  className="mt-3 flex flex-row font-meta text-[11px] uppercase tracking-widest text-garnet-700"
                >
                  Read More
                  <IconArrowRight className="ml-1 h-3.5 w-3.5" />
                </Link>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
