import { client } from "../../../tina/__generated__/client";
import type { LayoutQuery } from "../../../tina/__generated__/types";
import { LayoutShell } from "@/components/layout/LayoutShell";

export type FooterData = NonNullable<LayoutQuery["layout"]["footer"]>;
export type NavbarData = NonNullable<LayoutQuery["layout"]["navbar"]>;

export default async function MainLayout({ children }: { children: React.ReactNode }) {
  const layoutQuery = await client.queries.layout({ relativePath: "layout.json" });

  return (
    <LayoutShell
      query={layoutQuery.query}
      variables={layoutQuery.variables}
      data={layoutQuery.data}
    >
      {children}
    </LayoutShell>
  );
}