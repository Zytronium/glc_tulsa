import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const IMAGE_EXTENSIONS = /\.(jpe?g|png|webp|gif)$/i;

export async function GET(request: NextRequest) {
  const folder = request.nextUrl.searchParams.get("folder");
  if (!folder) {
    return NextResponse.json({ error: "Missing folder" }, { status: 400 });
  }

  const folderPath = path.join(process.cwd(), "public", "images", "photos", folder);
  try {
    const files = fs.readdirSync(folderPath).filter((f) => IMAGE_EXTENSIONS.test(f));
    return NextResponse.json({ files: files.map((f) => `/images/photos/${folder}/${f}`) });
  } catch {
    return NextResponse.json({ files: [] });
  }
}
