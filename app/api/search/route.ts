import { prismadb } from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { search } = body;
    let findPost;

    if (!search) {
      return new NextResponse("입력한 내용이 없습니다.", { status: 401 });
    }

    const searchData = await prismadb.search.create({
      data: {
        search,
      },
    });

    if (searchData) {
      findPost = await prismadb.post.findMany({
        orderBy: {
          createdAt: "desc",
        },
        where: {
          post: {
            contains: search,
          },
        },
        include: {
          user: true
        }
      });
    }

    const result = findPost?.map((data) => {
      const date = new Date(data.createdAt);
      const formattedDate = date.toISOString().slice(0, 10);
      return {
        ...data,
        id: data.id,
        createdAt: formattedDate,
        category: data.category,
        name: data.user.name,
        newName: data.user.newName,
        avatar: data.user.image,
        post: data.post,
        commentCount: data.commentCount,
        like: data.like,
        view: data.view
      }
    })

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse("오류가 발생하였으니 잠시 후 다시 검색해주세요.", { status: 500 });
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

    // console.log(deleteSearch)
    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse("잠시 후 다시 시도해주세요.", { status: 500 });
  }
}
