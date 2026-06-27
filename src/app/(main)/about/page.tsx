import type { Metadata } from "next";
import { client } from "../../../../tina/__generated__/client";
import type { AboutPageQuery } from "../../../../tina/__generated__/types";
import { ClientPage } from "./client-page";

export const metadata: Metadata = {
  title: "About | Grace Evangelical Lutheran Church",
  description:
    "Learn who we are: our mission, doctrine, and what it means to be an evangelical, catholic, biblical, and incarnational Lutheran congregation in Tulsa, OK.",
};

export type AboutData = NonNullable<AboutPageQuery["aboutPage"]>;

export default async function AboutPage() {
  const aboutData = await client.queries.aboutPage({ relativePath: "about.json" });
  return <ClientPage {...aboutData} />;
}
