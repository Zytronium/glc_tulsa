import Image from "next/image";
import Link from "next/link";
import { tinaField } from "tinacms/dist/react";
import { ArchTop, IconArrowRight } from "@/components/home/icons";
import type { SignUpData } from "@/app/(main)/sign-up/page";

type Props = {
  signUps: NonNullable<SignUpData["signUps"]>;
  emptyMessage?: string | null;
};

export function SignUpGrid({ signUps, emptyMessage }: Props) {
  const items = (signUps ?? []).filter((s) => s !== null);

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-5xl px-5 py-14 text-center sm:px-8 sm:py-20">
        <p className="text-[15px] leading-7 text-stone-700">
          {emptyMessage || "There's nothing to sign up for at this time. Check back soon."}
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
      <div className="flex flex-wrap justify-center gap-6">
        {items.map((signUp) => {
          const external = !!signUp?.isExternal;
          const href = signUp?.linkHref ?? "#";

          return (
            <div
              key={signUp?.label}
              className="flex w-full flex-col overflow-hidden rounded-sm border border-stone-200 bg-white sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)]"
            >
              {signUp?.image && (
                <div className="relative h-40 w-full">
                  <Image
                    fill
                    src={signUp.image}
                    alt=""
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover"
                    data-tina-field={tinaField(signUp, "image")}
                  />
                </div>
              )}

              <div className="flex flex-1 flex-col px-6 py-7">
                <p
                  data-tina-field={tinaField(signUp, "label")}
                  className="mt-2 font-display text-[18px] text-ink"
                >
                  {signUp?.label}
                </p>
                {signUp?.summary && (
                  <p
                    data-tina-field={tinaField(signUp, "summary")}
                    className="mt-2 flex-1 text-[13px] leading-6 text-stone-700"
                  >
                    {signUp.summary}
                  </p>
                )}

                {signUp?.linkHref && (
                  <Link
                    href={href}
                    data-tina-field={tinaField(signUp, "linkLabel")}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noopener noreferrer" : undefined}
                    className="mt-5 flex items-center gap-1 font-meta text-[11px] uppercase tracking-[0.1em] text-garnet-700"
                  >
                    {signUp.linkLabel}
                    <IconArrowRight className="h-3 w-3" />
                  </Link>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
