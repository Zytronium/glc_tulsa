import { client } from "../../../tina/__generated__/client";
import type { Global_VariablesQuery, LayoutQuery } from "../../../tina/__generated__/types";
import { LayoutShell } from "@/components/layout/LayoutShell";

export type LayoutData = NonNullable<LayoutQuery["layout"]>;
export type GlobalVariablesData = NonNullable<Global_VariablesQuery["global_variables"]>;

export default async function MainLayout({ children }: { children: React.ReactNode }) {
  const [layoutQuery, globalVariablesQuery] = await Promise.all([
    client.queries.layout({ relativePath: "layout.json" }),
    client.queries.global_variables({ relativePath: "global_variables.json" }),
  ]);

  return (
    <LayoutShell
      layoutQuery={layoutQuery}
      globalVariablesQuery={globalVariablesQuery}
    >
      {children}
    </LayoutShell>
  );
}
