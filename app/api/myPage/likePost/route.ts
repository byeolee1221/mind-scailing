import { authOptions } from "@/lib/auth";
import { prismadb } from "@/lib/prismadb";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    let resultPost;

    if (!session) {
      return new NextResponse("로그인이 필요한 서비스입니다.", { status: 401 });
    }

    const findLike = await prismadb.like.findMany({
      where: {
        user: {
          email: session.user?.email!
        }
      },
    });
    // console.log(findLike);
    const findId = findLike.map((data) => data.postId);

    if (findLike) {
      const findPost = await prismadb.post.findMany({
        orderBy: {
          createdAt: "desc",
        },
        where: {
          id: {
            in: findId,
          },
        },
        include: {
          user: true,
        },
      });
      // console.log(findPost);

      resultPost = findPost.map((post) => {
        const date = new Date(post.createdAt);
        const formattedDate = date.toISOString().slice(0, 10);
        return {
          id: post.id,
          createdAt: formattedDate,
          avatar: post.user.image,
          name: post.user.name,
          post: post.post,
          category: post.category,
        };
      });
    }

    // console.log(resultPost);
    return NextResponse.json(resultPost, { status: 200 });
  } catch (error) {
    console.log("likePost GET API에서 오류 발생", error);
    return new NextResponse("오류가 발생하여 불러올 수 없습니다.", {
      status: 500,
    });
  }
}
