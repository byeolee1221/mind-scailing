import { prismadb } from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { id } = body;
    // console.log(id);

    const data = await prismadb.post.findUnique({
      where: {
        id: +id,
      },
      include: {
        user: true
      }
    });
    // console.log(data);

    const formattedDate = new Date(data?.createdAt!)
    const createdAt = formattedDate.toISOString().slice(0, 10);
    // console.log(date);

    return NextResponse.json({data, createdAt}, { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse("오류가 있어 게시글을 불러오지 못했습니다.", {
      status: 500,
    });
  }
}
