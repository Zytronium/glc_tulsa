import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(request: NextRequest) {
  const src = request.nextUrl.searchParams.get("src");
  if (!src || !src.startsWith("/images/photos/")) {
    return NextResponse.json({ error: "Invalid photo path" }, { status: 400 });
  }

  const filePath = path.join(process.cwd(), "public", src);
  try {
    const file = fs.readFileSync(filePath);
    const filename = path.basename(filePath);
    return new NextResponse(file, {
      headers: {
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Content-Type": "application/octet-stream",
      },
    });
  } catch {
    return NextResponse.json({ error: "File not found" }, { status: 404 });
  }
}
