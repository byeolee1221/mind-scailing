import { authOptions } from "@/lib/auth";
import { prismadb } from "@/lib/prismadb";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    const body = await req.json();
    const { diary, file } = body;

    if (!session) {
      return new NextResponse("로그인이 필요한 서비스입니다.", { status: 401 });
    }

    if (!diary) {
      return new NextResponse("입력하신 내용을 다시 확인해주세요.", { status: 404 });
    }

    const createDiary = await prismadb.diary.create({
      data: {
        diary,
        file,
        user: {
          connect: {
            email: session.user?.email!,
          },
        },
      },
      include: {
        user: true
      }
    });
    // console.log(createDiary);
    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.log("myDiary POST API에서 오류 발생", error);
    return new NextResponse(
      "오류가 발생하여 업로드되지 않았습니다. 잠시 후 다시 시도해주세요.",
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    const body = await req.json();
    const { id } = body;

    if (!session) {
      return new NextResponse("로그인이 필요한 서비스입니다.", { status: 401 });
    }

    const deleteDiary = await prismadb.diary.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.log("myDiary DELETE API에서 오류 발생", error);
    return new NextResponse(
      "오류가 발생하여 삭제되지 않았습니다. 잠시 후 다시 시도해주세요.",
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    let resultData;

    if (!session) {
      return new NextResponse("로그인이 필요한 서비스입니다.", { status: 401 });
    }

    const findDiary = await prismadb.diary.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        user: true,
      },
      where: {
        user: {
          email: session.user?.email
        }
      },
    });

    resultData = findDiary.map((data) => {
      const date = new Date(data.createdAt);
      const formattedDate = date.toISOString().slice(0, 10);
      return {
        ...data,
        createdAt: formattedDate,
        diary: data.diary,
        id: data.id,
        userId: data.userId,
        userEmail: data.user.email,
        avatar: data.user.image
      };
    });

    // console.log(findDiary);
    return NextResponse.json(resultData, { status: 200 });
  } catch (error) {
    console.log("myDiary GET API에서 오류 발생", error);
    return new NextResponse(
      "오류가 발생하였습니다. 잠시 후 다시 방문해주세요.",
      { status: 500 }
    );
  }
}
