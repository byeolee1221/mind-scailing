import { authOptions } from "@/lib/auth";
import { prismadb } from "@/lib/prismadb";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function DELETE(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    const body = await req.json();
    const { postId } = body;

    if (!session) {
      return new NextResponse("로그인이 필요한 서비스입니다.", { status: 401 });
    }

    if (!postId) {
      return new NextResponse("새로고침 후 다시 시도해주세요.", {
        status: 404,
      });
    }

    const deletePost = await prismadb.post.delete({
      where: {
        id: postId,
      },
    });
    // console.log(deletePost);

    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.log("postDelete DELETE API에서 오류 발생", error);
    return new NextResponse(
      "오류가 발생하여 삭제하지 못했습니다. 잠시 후 다시 시도해주세요.",
      { status: 500 }
    );
  }
}
