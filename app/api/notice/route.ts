import { authOptions } from "@/lib/auth";
import { prismadb } from "@/lib/prismadb";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    const body = await req.json();
    const { title, notice } = body;

    if (!session) {
      return new NextResponse("로그인이 필요한 서비스입니다.", { status: 401 });
    }

    const userRole = await prismadb.user.findUnique({
      where: {
        email: session.user?.email!,
      },
    });

    if (userRole?.role !== "ADMIN") {
      return new NextResponse("관리자만 접근이 가능합니다.", { status: 401 });
    }

    const createNotice = await prismadb.notice.create({
      data: {
        title,
        notice,
        user: {
          connect: {
            email: userRole?.email!,
          },
        },
      },
      include: {
        user: true
      }
    });

    return NextResponse.json(createNotice.id, { status: 200 });
  } catch (error) {
    console.log("notice POST API에서 오류 발생", error);
    return new NextResponse(
      "오류가 발생하여 업로드하지 못했습니다. 잠시 후 다시 시도해주세요.",
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    const getNotice = await prismadb.notice.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        user: true,
      },
    });

    // console.log(getNotice);

    const resultData = getNotice.map((data) => {
      const date = new Date(data.createdAt);
      const formattedDate = date.toISOString().slice(0, 10);
      return {
        id: data.id,
        title: data.title,
        createdAt: formattedDate,
      };
    });

    return NextResponse.json(resultData, { status: 200 });
  } catch (error) {
    console.log("notice GET API에서 오류 발생", error);
    return new NextResponse("오류가 발생하여 공지사항을 불러오지 못했습니다.", {
      status: 500,
    });
  }
}
