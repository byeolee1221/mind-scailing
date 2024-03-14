import { authOptions } from "@/lib/auth";
import { prismadb } from "@/lib/prismadb";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    let resultData;

    if (!session) {
      return new NextResponse("로그인이 필요한 서비스입니다.", { status: 401 });
    }

    const findAlarm = await prismadb.alarm.findMany({
      orderBy: {
        createdAt: "desc",
      },
      where: {
        user: {
          email: session.user?.email,
        },
      },
      include: {
        user: true,
      },
    });

    if (findAlarm) {
      resultData = findAlarm.map((data) => {
        const date = new Date(data.createdAt);
        const formattedDate = date.toISOString().slice(0, 10);
        return {
          name: data.user.name,
          createdAt: formattedDate,
          category: data.category,
        };
      });
    }

    // console.log(resultData);
    return NextResponse.json(resultData, { status: 200 });
  } catch (error) {
    console.log("alarm GET API에서 오류 발생", error);
    return new NextResponse("오류가 발생하여 알림을 불러오지 못했습니다.", {
      status: 500,
    });
  }
}
