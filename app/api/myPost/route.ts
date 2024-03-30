import { authOptions } from "@/lib/auth";
import { prismadb } from "@/lib/prismadb";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new NextResponse("로그인이 필요한 서비스입니다.", { status: 401 });
    }

    const getPost = await prismadb.post.findMany({
      orderBy: {
        createdAt: "asc",
      },
      where: {
        user: {
          email: session.user?.email
        }
      }
    });

    return NextResponse.json(getPost, { status: 200 });
  } catch (error) {
    console.log("myPOST GET API에서 오류 발생", error);
    return new NextResponse("오류가 발생하여 게시글을 불러오지 못했습니다.", {
      status: 500,
    });
  }
}
