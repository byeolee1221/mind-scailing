import { authOptions } from "@/lib/auth";
import { prismadb } from "@/lib/prismadb";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    const body = await req.json();
    const { id, userId } = body;
    // console.log(id, userId);

    // 유저 확인
    if (!session) {
      return new NextResponse("로그인이 필요한 서비스입니다.", {
        status: 401,
      });
    }
    // 게시글 확인
    const post = await prismadb.post.findUnique({
      where: {
        id: +id,
      },
    });
    // console.log(post);

    // 좋아요 누른 유저가 이미 좋아요를 눌렀는지 먼저 확인
    if (post) {
      const existingLike = await prismadb.like.findUnique({
        where: {
          postId_userId: {
            postId: +id,
            userId,
          },
        },
      });
      // console.log(existingLike);

      // 이미 좋아요를 누르면 좋아요가 취소되도록 함. 그게 아니라면 좋아요가 1 증가하도록 함.
      if (existingLike) {
        const likeCancel = await prismadb.like.delete({
          where: {
            postId_userId: {
              postId: +id,
              userId,
            },
          },
        });

        await prismadb.post.update({
          where: {
            id: +id,
          },
          data: {
            like: {
              decrement: 1,
            },
          },
        });
      } else {
        const createLike = await prismadb.like.create({
          data: {
            userId,
            postId: +id,
          },
        });

        const updatePost = await prismadb.post.update({
          where: {
            id: +id,
          },
          data: {
            like: {
              increment: 1,
            },
          },
        });
        // console.log(updatePost);

        const createAlarm = await prismadb.alarm.create({
          data: {
            toUser: updatePost.userId,
            category: "공감",
            postId: updatePost.id,
            fromUserId: createLike.userId,
            fromEmail: session.user?.email!
          },
          include: {
            user: true,
            post: true,
          },
        });
        // console.log(createAlarm);
      }
    }

    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.log("like POST API에서 오류 발생", error);
    return new NextResponse("오류가 발생하였으니 잠시 후 다시 시도해주세요.", {
      status: 500,
    });
  }
}
