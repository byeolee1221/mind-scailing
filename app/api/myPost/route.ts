import { authOptions } from "@/lib/auth";
import { prismadb } from "@/lib/prismadb";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new NextResponse("확인하시려면 로그인해주세요.", { status: 401 });
    }

    const getPost = await prismadb.post.findMany({
      orderBy: {
        createdAt: "asc",
      },
      include: {
        user: true
      },
    });

    return NextResponse.json(getPost, { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse("오류가 발생하여 불러오지 못했습니다.", {
      status: 500,
    });
  }
}
