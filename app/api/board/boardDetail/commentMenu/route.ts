import { authOptions } from "@/lib/auth";
import { prismadb } from "@/lib/prismadb";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    const commentUrl = req.url.split("commentId=");
    const commentId = commentUrl[1];

    // console.log(commentId);

    if (!session) {
      return new NextResponse("로그인이 필요한 서비스입니다.", { status: 401 });
    }

    if (!commentId) {
      return new NextResponse(
        "댓글을 찾을 수 없습니다. 새로고침 후 다시 시도해주세요.",
        { status: 404 }
      );
    }

    const findComment = await prismadb.comment.findUnique({
      where: {
        id: commentId,
      },
      include: {
        user: true,
      },
    });

    const userPostCount = await prismadb.post.count({
      where: {
        userId: findComment?.userId,
      },
    });

    const userCommentCount = await prismadb.comment.count({
      where: {
        userId: findComment?.userId,
      },
    });

    const userProfile = await prismadb.profile.findFirst({
      where: {
        userId: findComment?.userId!,
      },
    });

    const date = new Date(findComment?.user?.createdAt!);
    const formattedDate = date.toISOString().slice(0, 10);

    const resultData = {
      image: findComment?.user.image,
      userName: findComment?.user.name,
      userNewName: findComment?.user.newName,
      introduce: userProfile?.introduce,
      userCreatedAt: formattedDate,
      postCount: userPostCount,
      commentCount: userCommentCount,
    };

    // console.log(resultData);

    return NextResponse.json(resultData, { status: 200 });
  } catch (error) {
    console.log("commentMenu GET API에서 오류 발생", error);
    return new NextResponse(
      "오류가 있어 정보를 불러오지 못했습니다. 잠시 후 다시 시도해주세요.",
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    const body = await req.json();
    const { commentId } = body;

    // console.log(commentId);
    if (!session) {
      return new NextResponse("로그인이 필요한 서비스입니다.", { status: 401 });
    }

    if (!commentId) {
      return new NextResponse(
        "댓글을 찾을 수 없습니다. 새로고침 후 다시 시도해주세요.",
        { status: 404 }
      );
    }

    const findComment = await prismadb.comment.findUnique({
      where: {
        id: commentId,
      },
    });

    const findReportExisted = await prismadb.report.findFirst({
      where: {
        targetId: findComment?.userId,
      },
    });
    // console.log(findReportExisted);
    
    const findFromUser = await prismadb.user.findUnique({
      where: {
        email: session?.user?.email!,
      },
    });

    if (!findReportExisted) {
      const createReport = await prismadb.report.create({
        data: {
          commentId,
          targetId: findComment?.userId!,
          fromUserId: findFromUser?.id!,
          postId: findComment?.postId!,
        },
        include: {
          targetUser: true,
          post: true,
        },
      });

      const updateReportCount = await prismadb.report.update({
        data: {
          report: {
            increment: 1,
          },
        },
        where: {
          id: createReport.id,
        },
      });
    } else {
      const checkReport = await prismadb.report.findMany({
        where: {
          commentId,
          fromUserId: findFromUser?.id,
        },
      });

      if (checkReport) {
        return new NextResponse("이미 신고하신 댓글입니다.", { status: 422 });
      }

      const updateReportCount = await prismadb.report.update({
        data: {
          report: {
            increment: 1,
          },
        },
        where: {
          id: findReportExisted.id,
        },
      });
    }

    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.log("commentMenu POST API에서 오류 발생", error);
    return new NextResponse(
      "오류가 발생하여 신고가 되지 않았습니다. 잠시 후 다시 시도해주세요.",
      { status: 500 }
    );
  }
}
