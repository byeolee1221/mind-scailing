"use client";

import { formSchema } from "@/app/(home)/constants";
import Image from "next/image";
import { ChatCompletionMessageParam } from "openai/resources/chat/completions";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { cls } from "@/lib/styleUtil";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

const TalkAI = () => {
  const { data: session } = useSession();
  const [message, setMessage] = useState<ChatCompletionMessageParam[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      conversation: "",
    },
  });

  const isLoading = form.formState.isSubmitting;
  const formError = form.formState.errors;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const userMessage: ChatCompletionMessageParam = {
        role: "user",
        content: values.conversation,
      };

      const newMessages = [...message, userMessage];

      const response = await axios.post("/api/conversation", {
        message: newMessages,
      });

      setMessage((current) => [...current, userMessage, response.data]);

      form.reset();
    } catch (error: any) {
      console.log("talkAI onSubmit에서 오류 발생", error);
      return toast("오류 발생", {
        description: error.response.data,
      });
    }
  };

  return (
    <div
      className={cls(
        "flex flex-col px-6 items-start",
        session ? "h-[600px] overflow-auto" : ""
      )}
    >
      <h1 className="font-bold">AI와의 고민 이야기</h1>
      <p className="text-sm lg:text-base text-gray-500 tracking-tighter">
        고민을 들어주는 AI에게 고민을 말하고 도움을 받아보세요.
      </p>
      {session ? (
        <div className="w-full mt-2 space-y-5">
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col items-center space-y-4"
          >
            <textarea
              {...form.register("conversation", {
                required: "대화하려면 질문을 입력해주세요.",
              })}
              rows={5}
              className="resize-none w-full border-2 rounded-lg border-slate-200 focus:ring-2 focus:ring-offset-2 focus:ring-green-500 focus:outline-none p-2 text-sm lg:text-base transition-all"
              placeholder="왜 나는 잘 풀리는 게 없을까?"
            />
            {formError?.conversation ? (
              <p className="text-xs lg:text-lg text-red-500">
                {formError.conversation.message}
              </p>
            ) : null}
            <button
              className="bg-green-500 hover:bg-green-600 px-5 py-2 rounded-lg shadow-md transition-colors text-sm lg:text-base font-semibold"
              disabled={isLoading}
            >
              {isLoading ? "답변 생각중..." : "AI와 대화하기"}
            </button>
          </form>
          <div className="flex flex-col items-center space-y-2">
            {message.length === 0 && !isLoading ? (
              <div className="flex flex-col items-center">
                <Image src="/ai.png" alt="ai" width={50} height={50} />
                <p className="text-gray-400 text-sm lg:text-base">
                  아직 대화가 없습니다.
                </p>
              </div>
            ) : null}
            <div className="flex flex-col-reverse gap-y-4">
              {message.map((data, i) => (
                <div
                  key={i}
                  className={cls(
                    "p-8 w-full flex items-start gap-x-8 rounded-lg",
                    data.role === "user"
                      ? "bg-white border border-black/10"
                      : "bg-muted"
                  )}
                >
                  <div className="flex items-center space-x-3">
                    {data.role === "user" ? (
                      <img
                        src={session.user?.image!}
                        alt="프로필"
                        className="bg-slate-300 rounded-full w-10"
                      />
                    ) : (
                      <Image
                        src="/ai.png"
                        alt="ai"
                        width={40}
                        height={40}
                        className="bg-slate-200 rounded-full p-1"
                      />
                    )}
                    <p className="text-sm lg:text-base">
                      {data.content as string}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <p className="text-sm lg:text-base text-green-500 mt-4 text-center w-full">
          AI와 대화하시려면 로그인해주세요.
        </p>
      )}
    </div>
  );
};

export default TalkAI;
