import { prismadb } from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { search } = body;

    if (!search) {
      return new NextResponse("입력한 내용이 없습니다.", { status: 401 });
    }

    const searchData = await prismadb.search.create({
      data: {
        search,
      },
    });

    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse("잠시 후 다시 시도해주세요.", { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const resultData = await prismadb.search.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    
    // console.log(resultData);

    return NextResponse.json(resultData, { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse("잠시 후 다시 시도해주세요.", { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const deleteSearch = await prismadb.search.deleteMany();

    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse("잠시 후 다시 시도해주세요.", { status: 500 });
  }
}