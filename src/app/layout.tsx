import type {Metadata} from "next";
import "./globals.css";
import { client } from "../../tina/__generated__/client";
import type { HomePageQuery } from "../../tina/__generated__/types";
import {Navbar} from "@/components/home/Navbar";
import {Footer} from "@/components/home/Footer";

export const metadata: Metadata = {
  title: "Grace Evangelical Lutheran Church | Tulsa, OK",
  description:
    "A warm, welcoming Lutheran congregation in Tulsa, Oklahoma, rooted in nearly 2,000 years of historic Christian tradition. LCMS.",
};

export type FooterData = NonNullable<HomePageQuery["homePage"]["footer"]>;
export type NavbarData = NonNullable<HomePageQuery["homePage"]["navbar"]>;

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const homeData = await client.queries.homePage({ relativePath: "home.json" });
  const footer = homeData.data.homePage.footer!;
  const navbar = homeData.data.homePage.navbar!;

  return (
    <html lang="en">
      <body className="font-body">
        <Navbar navbar={navbar} />
        {children}
        <Footer footer={footer} />
      </body>
    </html>
  );
}
