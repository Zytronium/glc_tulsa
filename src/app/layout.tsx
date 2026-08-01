import type { Metadata } from "next";
import "./globals.css";
import { client } from "@/../tina/__generated__/client";
import sharp from "sharp";
import { readFile } from "fs/promises";
import path from "path";

// -------- favicon squaring --------
async function getFaviconBuffer(favicon: string): Promise<Buffer | undefined> {
  try {
    if (/^https?:\/\//.test(favicon)) {
      const res = await fetch(favicon);
      if (!res.ok) return undefined;
      return Buffer.from(await res.arrayBuffer());
    }

    // relative path -> served from /public
    const filePath = path.join(process.cwd(), "public", favicon);
    return await readFile(filePath);
  } catch (err) {
    console.error("[favicon] failed to load image:", err);
    return undefined;
  }
}

async function squareFaviconDataUrl(favicon: string): Promise<string | undefined> {
  try {
    const buffer = await getFaviconBuffer(favicon);
    if (!buffer) return undefined;

    const image = sharp(buffer);
    const meta = await image.metadata();

    const width = meta.width ?? 0;
    const height = meta.height ?? 0;
    if (!width || !height) return undefined;

    if (width === height) {
      return `data:${meta.format ? `image/${meta.format}` : "image/png"};base64,${buffer.toString("base64")}`;
    }

    const size = Math.max(width, height);
    const left = Math.floor((size - width) / 2);
    const top = Math.floor((size - height) / 2);

    const squared = await image
      .extend({
        top,
        bottom: size - height - top,
        left,
        right: size - width - left,
        background: { r: 0, g: 0, b: 0, alpha: 0 },
      })
      .png()
      .toBuffer();

    return `data:image/png;base64,${squared.toString("base64")}`;
  } catch (err) {
    console.error("[favicon] failed to square image:", err);
    return undefined;
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const { data } = await client.queries.global_variables({
    relativePath: "global_variables.json",
  });
  const favicon = data.global_variables.favicon;

  const squaredFavicon = favicon ? await squareFaviconDataUrl(favicon) : undefined;

  return {
    title: "Grace Evangelical Lutheran Church",
    description:
      "A warm, welcoming Lutheran congregation in Tulsa, Oklahoma, rooted in nearly 2,000 years of historic Christian tradition. LCMS.",
    icons: squaredFavicon
      ? {
        icon: squaredFavicon,
        shortcut: squaredFavicon,
        apple: squaredFavicon,
      }
      : undefined,
  };
}

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
    <body className="font-body">{children}</body>
    </html>
  );
}
