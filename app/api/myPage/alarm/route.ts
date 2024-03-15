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
        post: true
      },
    });

    if (findAlarm) {
      resultData = findAlarm.map((data) => {
        const date = new Date(data.createdAt);
        const formattedDate = date.toISOString().slice(0, 10);
        return {
          alarmId: data.id,
          name: data.user.name,
          createdAt: formattedDate,
          category: data.category,
          postCategory: data.post.category,
          postId: data.postId
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

export async function DELETE(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    const body = await req.json();
    const { alarmId } = body;

    if (!session) {
      return new NextResponse("삭제하시려면 로그인이 필요합니다.", { status: 401 });
    }

    const findAlarm = await prismadb.alarm.findUnique({
      where: {
        id: alarmId
      }
    });

    // console.log(findAlarm);

    if (findAlarm) {
      const deleteAlarm = await prismadb.alarm.delete({
        where: {
          id: findAlarm.id
        }
      });
    }
    
    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.log("alarm DELETE API에서 오류 발생", error);
    return new NextResponse("오류가 발생하여 삭제하지 못했습니다.", { status: 500 });
  }
}