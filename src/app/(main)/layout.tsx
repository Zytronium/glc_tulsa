import { client } from "../../../tina/__generated__/client";
import type { LayoutQuery } from "../../../tina/__generated__/types";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export type FooterData = NonNullable<LayoutQuery["layout"]["footer"]>;
export type NavbarData = NonNullable<LayoutQuery["layout"]["navbar"]>;

export default async function MainLayout({
                                           children,
                                         }: {
  children: React.ReactNode;
}) {
  const layoutData = await client.queries.layout({ relativePath: "layout.json" });
  const footer = layoutData.data.layout.footer!;
  const navbar = layoutData.data.layout.navbar!;

  return (
    <>
      <Navbar navbar={navbar} editMode={false} />
      {children}
      <Footer footer={footer} editMode={false} />
    </>
  );
}