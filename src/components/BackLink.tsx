"use client";

import {useRouter} from "next/navigation";
import {IconChevronLeft} from "@/components/home/icons";

type Props = {
  fallbackHref: string;
  children: React.ReactNode;
};

export function BackLink({fallbackHref, children}: Props) {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push(fallbackHref);
    }
  };

  return (
    <a
      href={fallbackHref}
      onClick={handleClick}
      className="mt-2 inline-flex items-center gap-1.5 text-sm text-stone-700 transition hover:text-garnet-700"
    >
      <IconChevronLeft className="h-3.5 w-3.5"/>
      {children}
    </a>
  );
}
