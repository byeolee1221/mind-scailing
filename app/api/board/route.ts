import { authOptions } from "@/lib/auth";
import { prismadb } from "@/lib/prismadb";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    const body = await req.json();
    const { post, file, category, userId, userEmail } = body;

    if (!session) {
      return new NextResponse("업로드하시려면 로그인해주세요.", {
        status: 401,
      });
    }

    if (!userId) {
      return new NextResponse("잘못된 접근입니다.", { status: 401 });
    }

    if (!post) {
      return new NextResponse("내용을 입력해주세요.", { status: 400 });
    }

    const userCheck = await prismadb.user.findUnique({
      where: {
        email: userEmail,
      },
    });

    if (userCheck) {
      await prismadb.post.create({
        data: {
          post,
          file,
          category,
          user: {
            connect: {
              email: userEmail,
            },
          },
        },
      });
    }

    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.log("board api에서 오류 발생", error);
    return new NextResponse("오류가 발생했으니 잠시 후 다시 업로드해주세요.", {
      status: 500,
    });
  }
}

export async function GET(req: Request) {
  try {
    const data = await prismadb.post.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        user: true
      },
    });

    const formattedPosts = data.map((post) => {
      const date = new Date(post.createdAt);
      const formattedDate = date.toISOString().slice(0, 10);
      return {
        ...post,
        createdAt: formattedDate,
        userId: post.user.name
      };
    });

    return NextResponse.json(formattedPosts, { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse("오류가 발생하여 게시글을 가져오지 못했습니다.", {
      status: 500,
    });
  }
}
