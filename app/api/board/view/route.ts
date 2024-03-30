import { prismadb } from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { id } = body;
    let viewCount;

    if (!id) {
      return new NextResponse("게시글을 찾을 수 없습니다.", { status: 404 });
    }

    const findPost = await prismadb.post.findUnique({
      where: {
        id: +id,
      },
    });

    // console.log(findPost);
    if (findPost) {
      const viewUpdate = await prismadb.post.update({
        where: {
          id: +id,
        },
        data: {
          view: {
            increment: 1,
          },
        },
      });
      viewCount = viewUpdate.view - 1;
    }

    return NextResponse.json(viewCount, { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse(
      "오류가 발생하였습니다. 새로고침 후 다시 시도해주세요.",
      { status: 500 }
    );
  }
}
