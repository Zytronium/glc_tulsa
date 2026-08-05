"use client";

import {useTina} from "tinacms/dist/react";
import {tinaField} from "tinacms/dist/react";
import Image from "next/image";
import {TinaMarkdown} from "tinacms/dist/rich-text";
import type {PastorBlogPostQuery} from "@/../tina/__generated__/types";
import {BackLink} from "@/components/BackLink";

type TinaQuery<T> = { query: string; variables: object; data: T };

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", {month: "long", day: "numeric", year: "numeric", timeZone: "UTC"});
}

export function ClientPage({query}: { query: TinaQuery<PastorBlogPostQuery> }) {
  const {data} = useTina(query);
  const post = data.pastorBlogPost;

  return (
    <main>
      <section style={{
        backgroundImage: "url('/images/aged_paper.png')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}>
        <div className="border-b border-stone-200 px-5 pt-10 sm:px-8">
          <div className="mx-auto max-w-2xl">
            <BackLink fallbackHref={"/pastors-blog"}>
              Back to Pastor&apos;s Blog
            </BackLink>
            <h1
              data-tina-field={tinaField(post, "title")}
              className="mt-4 font-display text-[28px] font-medium text-ink sm:text-[34px]"
            >
              {post.title}
            </h1>
            <p className="mb-8 mt-2 font-meta text-[12px] uppercase tracking-widest text-stone-500">
              <span data-tina-field={tinaField(post, "author")}>{post.author}</span>
              {" · "}
              <span data-tina-field={tinaField(post, "date")}>{formatDate(post.date)}</span>
            </p>
          </div>
        </div>
      </section>
      <section style={{
        backgroundImage: "url('/images/paper.png')",
        backgroundRepeat: "repeat-y",
        backgroundSize: "100%",
        backgroundPosition: "center",
      }}>

        <div className="mx-auto max-w-2xl px-5 py-10 sm:px-8">
          {post.coverImage && (
            <div className="relative mb-8 aspect-video overflow-hidden rounded-sm">
              <Image
                fill
                src={post.coverImage}
                alt=""
                sizes="(min-width: 672px) 672px, 100vw"
                className="object-cover"
                data-tina-field={tinaField(post, "coverImage")}
              />
            </div>
          )}

          <div
            data-tina-field={tinaField(post, "body")}
            className="tina-markdown prose prose-stone max-w-none text-[15px] leading-7 text-stone-700 prose-headings:font-display prose-headings:text-ink prose-a:text-garnet-700"
          >
            <TinaMarkdown content={post.body}/>
          </div>
        </div>
      </section>
    </main>
  );
}
