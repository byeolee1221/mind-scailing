import { authOptions } from "@/lib/auth";
import { prismadb } from "@/lib/prismadb";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const postUrl = req.url.split("postId=");
    const postId = postUrl[1];
    let resultData;
    console.log(postId);

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

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    const body = await req.json();
    const { postId } = body;

    if (!session) {
      return new NextResponse("로그인이 필요한 서비스입니다.", { status: 401 });
    }

    const findPost = await prismadb.post.findUnique({
      where: {
        id: postId,
      },
    });

    // console.log(findPost);

    const findReportExisted = await prismadb.report.findFirst({
      where: {
        targetId: findPost?.userId,
      },
    });

    const findFromUser = await prismadb.user.findUnique({
      where: {
        email: session?.user?.email!,
      },
    });

    if (!findReportExisted) {
      const createReport = await prismadb.report.create({
        data: {
          targetId: findPost?.userId!,
          fromUserId: findFromUser?.id!,
          postId: findPost?.id!,
        },
        include: {
          targetUser: true,
          post: true,
        },
      });

      const updateReportCount = await prismadb.report.update({
        data: {
          report: {
            increment: 1
          }
        },
        where: {
          id: createReport.id
        }
      });
    } else {
      const checkAlreadyReport = await prismadb.report.findMany({
        where: {
          postId: postId,
          fromUserId: findFromUser?.id
        }
      });
      
      if (checkAlreadyReport) {
        return new NextResponse("이미 신고하신 게시글입니다.", { status: 422 });
      }

      const updateReportCount = await prismadb.report.update({
        data: {
          report: {
            increment: 1
          }
        },
        where: {
          id: findReportExisted.id
        }
      });
    }
    
    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.log("boardMenu POST API에서 오류 발생", error);
    return new NextResponse(
      "오류가 발생하여 신고되지 않았습니다. 잠시 후 다시 시도해주세요.",
      { status: 500 }
    );
  }
}
