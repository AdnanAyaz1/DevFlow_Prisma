import { db } from "@/lib/primsadb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const params = await req.json();   console.log("params", params);

    if (!params.search || !params.filter) {
      return NextResponse.json({
        success: false,
        message: "Missing required parameters",
      });
    }

    let results;

    if (params.filter === "Question") {
      results = await db.question.findMany({
        where: {
          OR: [
            { title: { contains: params.search, mode: "insensitive" } },
            { content: { contains: params.search, mode: "insensitive" } },
          ],
        },
        take: 5,
      });
    } else if (params.filter === "Tag") {
      results = await db.tag.findMany({
        where: {
          OR: [
            { title: { contains: params.search, mode: "insensitive" } },
          
          ],
        },
        take: 5,
      });
    } else if (params.filter === "User") {
      results = await db.user.findMany({
        where: {
          OR: [
            { name: { contains: params.search, mode: "insensitive" } },
            { bio: { contains: params.search, mode: "insensitive" } },
          ],
        },
        take: 5,
      });
    }

    return NextResponse.json({ success: true, data: results || [] });
  } catch (error) {
    console.error("Search error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
