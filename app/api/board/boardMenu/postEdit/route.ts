import { authOptions } from "@/lib/auth";
import { prismadb } from "@/lib/prismadb";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    const body = await req.json();
    const { newPost, postId, file } = body;

    // console.log(newPost, postId, file);

    if (!session) {
      return new NextResponse("로그인이 필요한 서비스입니다.", { status: 401 });
    }

    if (!newPost || !postId) {
      return new NextResponse("수정사항을 올바르게 입력하셨는지 다시 확인해주세요.", { status: 404 });
    }

    const updatePost = await prismadb.post.update({
      where: {
        id: postId
      },
      data: {
        post: newPost,
        file
      }
    });

    // console.log(updatePost);

    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.log("postEdit POST API에서 오류 발생", error);
    return new NextResponse(
      "오류가 발생하여 수정하지 못했습니다. 잠시 후 다시 시도해주세요.",
      { status: 500 }
    );
  }
}
