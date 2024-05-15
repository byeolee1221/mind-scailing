import { prismadb } from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const url = req.url.split("noticeId=");
    const noticeId = url[1];

    const findNotice = await prismadb.notice.findUnique({
      where: {
        id: noticeId,
      },
    });

    // console.log(findNotice);
    const date = new Date(findNotice?.createdAt!);
    const formattedDate = date.toISOString().slice(0, 10);

    const resultData = {
      ...findNotice,
      formattedDate
    }

    // console.log(resultData);

    return NextResponse.json(resultData, { status: 200 });
  } catch (error) {
    console.log("noticeDetail GET API에서 오류 발생", error);
    return new NextResponse("오류가 발생하여 공지사항을 불러오지 못했습니다.", {
      status: 500,
    });
  }
}
