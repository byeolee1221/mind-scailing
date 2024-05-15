import { prismadb } from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const url = req.url.split("postId=");
    const postId = url[1];
    // console.log(postId);

    const findPost = await prismadb.post.findUnique({
      where: {
        id: postId,
      },
      include: {
        user: true,
      },
    });

    // console.log(findPost);
    const date = new Date(findPost?.createdAt!);
    const formattedDate = date.toISOString().slice(0, 10);

    const post = {
      id: findPost?.id,
      category: findPost?.category,
      userId: findPost?.userId,
      avatar: findPost?.user.image,
      post: findPost?.post,
      file: findPost?.file,
      commentCount: findPost?.commentCount,
      view: findPost?.view,
      like: findPost?.like,
      createdAt: formattedDate,
      user: findPost?.user,
    };
    // console.log(post);

    return NextResponse.json(post, { status: 200 });
  } catch (error) {
    console.log("detailPostMenu GET API에서 오류 발생", error);
    return new NextResponse("오류가 발생하여 프로필을 불러오지 못했습니다.", {
      status: 500,
    });
  }
}
