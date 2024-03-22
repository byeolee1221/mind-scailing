import { authOptions } from "@/lib/auth";
import { prismadb } from "@/lib/prismadb";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    const body = await req.json();
    const { newName } = body;

    if (!session) {
      return new NextResponse("로그인이 필요한 서비스입니다.", { status: 401 });
    }

    if (!newName) {
      return new NextResponse("변경한 이름을 다시 확인해주세요.", {
        status: 400,
      });
    }

    const checkNewName = await prismadb.user.findFirst({
      where: {
        newName
      }
    });

    if (!checkNewName) {
      const updateUserName = await prismadb.user.update({
        where: {
          email: session.user?.email!
        },
        data: {
          newName
        }
      });
    } else {
      return new NextResponse("이미 등록된 이름입니다.", { status: 409 });
    }

    // console.log(updateUserName);

    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.log("setting POST API에서 오류 발생", error);
    return new NextResponse("오류가 발생하여 수정되지 않았습니다.", { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    let result;

    if (!session) {
      return new NextResponse("로그인이 필요한 서비스입니다.", { status: 401 });
    }

    const getNewName = await prismadb.user.findUnique({
      where: {
        email: session.user?.email!
      }
    });

    // console.log(getNewName);
    result = getNewName?.newName;

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.log("setting GET API에서 오류 발생", error);
    return new NextResponse("오류가 발생하여 이름을 불러오지 못했습니다.", { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new NextResponse("로그인이 필요한 서비스입니다.", { status: 401 });
    }

    const deletePost = await prismadb.post.deleteMany({
      where: {
        user: {
          email: session.user?.email
        }
      }
    });

    const deleteComment = await prismadb.comment.deleteMany({
      where: {
        user: {
          email: session.user?.email
        }
      }
    });

    const deleteLike = await prismadb.like.deleteMany({
      where: {
        user: {
          email: session.user?.email
        }
      }
    });

    if (deletePost && deleteComment && deleteLike) {
      const deleteUser = await prismadb.user.delete({
        where: {
          email: session.user?.email!
        }
      });
    }

    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.log("setting DELETE API에서 오류 발생", error);
    return new NextResponse("오류가 발생하여 삭제되지 않았습니다. 잠시 후 다시 시도해주세요.", { status: 500 });
  }
}