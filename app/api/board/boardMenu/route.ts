import { prismadb } from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const postUrl = req.url.split("postId=");
    const postId = postUrl[1];
    let resultData;
    // console.log(postId);

    const findPost = await prismadb.post.findUnique({
      where: {
        id: +postId,
      },
      include: {
        user: true,
      },
    });
    // console.log(findPost);

    const userPosts = await prismadb.post.count({
      where: {
        userId: findPost?.userId,
      },
    });

    const userComments = await prismadb.comment.count({
      where: {
        userId: findPost?.userId,
      },
    });
    // console.log(userPosts, userComments);
    if (findPost) {
      const findIntroduce = await prismadb.profile.findMany({
        where: {
          userId: findPost.userId,
        },
      });
      // console.log(findIntroduce);
      resultData = findIntroduce.map((data) => {
        return {
          introduce: data.introduce,
          postCount: userPosts,
          commentCount: userComments,
        };
      });
    }
    // console.log(resultData);
    return NextResponse.json(resultData, { status: 200 });
  } catch (error) {
    console.log("boardMenu GET API에서 오류 발생", error);
    return new NextResponse("오류가 발생하여 불러오지 못했습니다.", {
      status: 500,
    });
  }
}
