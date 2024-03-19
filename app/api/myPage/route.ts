import { authOptions } from "@/lib/auth";
import { prismadb } from "@/lib/prismadb";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    let userInfo;

    if (session) {
      const findUser = await prismadb.user.findUnique({
        where: {
          email: session.user!.email!,
        },
      });

      const findProfile = await prismadb.profile.findMany({
        where: {
          user: {
            email: findUser?.email,
          },
        },
      });

      const profileIntroduce = findProfile.map((data) => {
        return data.introduce;
      });

      // console.log(findProfile)

      userInfo = {
        name: findUser?.name,
        newName: findUser?.newName,
        email: findUser?.email,
        role: findUser?.role,
        avatar: findUser?.image,
        id: findUser?.id,
        introduce: profileIntroduce[0],
      };
    }

    // console.log(userInfo);
    return NextResponse.json(userInfo, { status: 200 });
  } catch (error) {
    console.log("myPage GET API에서 오류 발생", error);
    return new NextResponse(
      "오류가 발생하여 사용자 정보를 가져오지 못했습니다.",
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    const body = await req.json();
    const { introduce } = body;

    if (!session) {
      return new NextResponse("수정하시려면 로그인해주세요.", { status: 401 });
    }

    const checkProfileEmpty = await prismadb.profile.findMany({
      where: {
        user: {
          email: session.user?.email,
        },
      },
    });
    // console.log(checkProfileEmpty)
    if (checkProfileEmpty.length === 0) {
      const createIntroduce = await prismadb.profile.create({
        data: {
          introduce,
          user: {
            connect: {
              email: session.user?.email!,
            },
          },
        },
      });
    } else {
      const confirmProfile = checkProfileEmpty.map((data) => {
        return {
          id: data.id,
        };
      });

      const updateIntroduce = await prismadb.profile.update({
        where: {
          id: confirmProfile[0].id,
        },
        data: {
          introduce,
        },
      });
    }

    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.log("myPage POST API에서 오류 발생", error);
    return new NextResponse(
      "오류가 발생하여 수정하지 못했습니다. 잠시 후 다시 시도해주세요.",
      { status: 500 }
    );
  }
}
