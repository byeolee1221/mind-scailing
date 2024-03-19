import { authOptions } from "@/lib/auth";
import { prismadb } from "@/lib/prismadb";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    const body = await req.json();
    const { comment, userEmail, postId } = body;
    let createComment;

    if (!session) {
      return new NextResponse("로그인이 필요한 서비스입니다.", { status: 401 });
    }

    if (!comment) {
      return new NextResponse("댓글을 입력해주세요", { status: 400 });
    }

    const userCheck = await prismadb.user.findUnique({
      where: {
        email: userEmail,
      },
    });

    if (userCheck) {
      const findPost = await prismadb.post.findUnique({
        where: {
          id: +postId,
        },
      });
      // console.log(findPost);

      if (findPost) {
        createComment = await prismadb.comment.create({
          data: {
            comment,
            user: {
              connect: {
                email: userEmail,
              },
            },
            post: {
              connect: {
                id: +postId,
              },
            },
          },
          include: {
            user: true,
          },
        });
        // console.log(createComment);
        const updatePost = await prismadb.post.update({
          where: {
            id: +postId,
          },
          data: {
            commentCount: {
              increment: 1,
            },
          },
        });

        // console.log(updatePost);
        const sendAlarm = await prismadb.alarm.create({
          data: {
            toUser: updatePost.userId,
            category: "댓글",
            postId: updatePost.id,
            fromUserId: createComment.userId
          },
          include: {
            user: true,
            post: true,
          },
        });
        // console.log(sendAlarm)
      } else {
        return new NextResponse("해당 게시글을 찾을 수 없습니다.", {
          status: 500,
        });
      }
    }

    // console.log(createComment);

    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse("오류가 발생하였으니 잠시 후 다시 시도해주세요.", {
      status: 500,
    });
  }
}

export async function GET(req: Request) {
  try {
    const data = await prismadb.comment.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        user: true,
        post: true,
      },
    });

    const formattedComments = data.map((comment) => {
      const date = new Date(comment.createdAt);
      const formattedDate = date.toISOString().slice(0, 10);
      return {
        ...comment,
        createdAt: formattedDate,
        userName: comment.user.name,
        avatar: comment.user.image,
        id: comment.id,
        postId: comment.postId,
      };
    });

    return NextResponse.json(formattedComments, { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse("오류가 발생하여 댓글을 가져오지 못했습니다.", {
      status: 500,
    });
  }
}
