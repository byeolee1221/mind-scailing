import { authOptions } from "@/lib/auth";
import { prismadb } from "@/lib/prismadb";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new NextResponse("", { status: 401 });
    }

    const getAlarmCount = await prismadb.alarm.count({
      where: {
        user: {
          email: session.user?.email
        }
      }
    });

    // console.log(getAlarmCount);
    return NextResponse.json(getAlarmCount, { status: 200 });
  } catch (error) {
    console.log("alarmCount GET API에서 오류 발생", error);
    return new NextResponse("오류가 발생하여 알림정보를 받아오지 못했습니다.", { status: 500 });
  }
} 