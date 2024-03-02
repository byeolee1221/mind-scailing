import { prismadb } from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const data = await prismadb.post.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        user: true,
      },
      take: 4,
    });

    const formattedPosts = data.map((post) => {
      const date = new Date(post.createdAt);
      const formattedDate = date.toISOString().slice(0, 10);
      return {
        ...post,
        createdAt: formattedDate,
        userId: post.user.name,
      };
    });

    return NextResponse.json(formattedPosts, { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse("오류가 발생하여 게시글을 가져오지 못했습니다.", {
      status: 500,
    });
  }
}
