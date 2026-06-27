import type { Metadata } from "next";
import { client } from "../../../../tina/__generated__/client";
import type { AboutPageQuery, LayoutQuery } from "../../../../tina/__generated__/types";
import { ClientPage } from "./client-page";

export const metadata: Metadata = {
  title: "About | Grace Evangelical Lutheran Church",
  description:
    "Learn who we are: our mission, doctrine, and what it means to be an evangelical, catholic, biblical, and incarnational Lutheran congregation in Tulsa, OK.",
};

export type AboutData = NonNullable<AboutPageQuery["aboutPage"]>;

export default async function AboutPage() {
  const [aboutData, layoutData] = await Promise.all([
    client.queries.aboutPage({ relativePath: "about.json" }),
    client.queries.layout({ relativePath: "layout.json" }),
  ]);

  return <ClientPage aboutQuery={aboutData} layoutQuery={layoutData} />;
}
