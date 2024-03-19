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

    const updateUserName = await prismadb.user.update({
      where: {
        email: session.user?.email!
      },
      data: {
        newName
      }
    });

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