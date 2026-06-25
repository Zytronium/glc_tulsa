import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Grace Evangelical Lutheran Church | Tulsa, OK",
  description:
    "A warm, welcoming Lutheran congregation in Tulsa, Oklahoma, rooted in nearly 2,000 years of historic Christian tradition. LCMS.",
};

export default function RootLayout({
                                     children,
                                   }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
    <body className="font-body">{children}</body>
    </html>
  );
}