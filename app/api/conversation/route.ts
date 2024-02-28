import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import OpenAI from "openai";
import { ChatCompletionMessageParam } from "openai/resources/index.mjs";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_SECRET,
});

const instructionMessage: ChatCompletionMessageParam = {
  role: "system",
  content:
    "대화상대는 고민이 많은 사람이야. 최대한 공감을 많이 해주면서 질문에 답해줘. 기본값은 존댓말로 해줘.",
};

export async function POST(req: Request) {
  try {
    const session = getServerSession(authOptions);
    const body = await req.json();
    const { message } = body;

    if (!session) {
      return new NextResponse("로그인 해주세요.", { status: 401 });
    }

    if (!openai.apiKey) {
      return new NextResponse("OpenAi api key를 다시 확인해주세요.", {
        status: 500,
      });
    }

    if (!message) {
      return new NextResponse("전달된 메세지가 없습니다.", { status: 400 });
    }

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo-0125",
      messages: [instructionMessage, ...message],
    });

    return NextResponse.json(response.choices[0].message);
  } catch (error) {
    console.log("conversation api에서 에러 발생", error);
    return new NextResponse("오류가 발생했으니 잠시 후 다시 시도해주세요.", {
      status: 500,
    });
  }
}
