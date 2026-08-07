"use client";

import { useEffect, useState } from "react";
import { notFound } from "next/navigation";
import { useEditState } from "tinacms/dist/react";

type Props = {
  isVisible: boolean;
  children: React.ReactNode;
};

export function PublishGuard({ isVisible, children }: Props) {
  const { edit } = useEditState();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // give Tina's edit-mode handshake a moment to resolve before deciding
    const timer = setTimeout(() => setReady(true), 300);
    return () => clearTimeout(timer);
  }, []);

  if (isVisible) {
    return <>{children}</>;
  }

  if (edit) {
    return (
      <>
        <div className="border-b border-brass-500 bg-brass-200 px-5 py-2 text-center font-meta text-[12px] uppercase tracking-[0.08em] text-vestment-900">
          This page is unpublished. It is only visible to you because you&apos;re in edit mode.
        </div>
        {children}
      </>
    );
  }

  if (!ready) {
    // still waiting to confirm whether we're inside Tina's edit iframe
    return null;
  }

  notFound();
}
