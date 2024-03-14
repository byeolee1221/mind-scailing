import { prismadb } from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { id } = body;

    const data = await prismadb.post.findUnique({
      where: {
        id: +id,
      },
      include: {
        user: true,
      },
    });
    // console.log(data);

    const formattedDate = new Date(data?.createdAt!);
    const createdAt = formattedDate.toISOString().slice(0, 10);
    // console.log(date);

    return NextResponse.json({ data, createdAt }, { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse("오류가 있어 게시글을 불러오지 못했습니다.", {
      status: 500,
    });
  }
}

export async function GET(req: Request) {
  try {
    const postUrl = req.url.split("postId=");
    const postId = postUrl[1];
    let resultData;
    // console.log(postId);

    const findPost = await prismadb.post.findUnique({
      where: {
        id: +postId,
      },
      include: {
        user: true
      }
    });

    const date = new Date(findPost?.createdAt!);
    const formattedDate = date.toISOString().slice(0, 10);
    resultData = {
      findPost,
      formattedDate
    }
    // console.log(resultData);

    return NextResponse.json(resultData, { status: 200 });
  } catch (error) {
    console.log("boardDetail GET API에서 오류 발생", error);
    return new NextResponse("오류가 발생하여 게시글을 불러오지 못했습니다.", {
      status: 500,
    });
  }
}
