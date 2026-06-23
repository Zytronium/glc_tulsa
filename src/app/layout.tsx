import type {Metadata} from "next";
import "./globals.css";
import {Navbar} from "@/components/home/Navbar";
import {Footer} from "@/components/home/Footer";

export const metadata: Metadata = {
  title: "Grace Evangelical Lutheran Church | Tulsa, OK",
  description:
    "A warm, welcoming Lutheran congregation in Tulsa, Oklahoma, rooted in nearly 2,000 years of historic Christian tradition. LCMS.",
};

export default function RootLayout({ children }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-body">
        <Navbar/>
        {children}
        <Footer/>
      </body>
    </html>
  );
}
