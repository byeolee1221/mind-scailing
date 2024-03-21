"use client";

import { commentSchema } from "@/app/board/[category]/[id]/constants";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { cls } from "@/lib/styleUtil";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import CommentList from "./commentList";
import { mutate } from "swr";

const CommentBtn = (props: any) => {
  const { data: session } = useSession();
  const [error, setError] = useState(false);
  const form = useForm<z.infer<typeof commentSchema>>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      comment: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof commentSchema>) => {
    if (!session || !values.comment) {
      return;
    }

    try {
      const fetchComment = await axios.post("/api/board/comment", {
        comment: values.comment,
        userEmail: session.user!.email,
        postId: props.id,
      });

      if (fetchComment.status === 200) {
        form.reset();
        mutate("/api/board/comment");
      }
    } catch (error: any) {
      console.log(error);
      setError(true);
      alert(error.response.data);
    }
  };

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <button className="btnClickEffect">
          <Image
            src="/comment.png"
            alt="댓글"
            width={25}
            height={25}
            className="dark:invert"
          />
        </button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="w-full h-[35rem]">
          <DrawerHeader>
            <DrawerTitle>댓글</DrawerTitle>
          </DrawerHeader>
          <div className="flex flex-col items-start justify-between h-[90%]">
            <CommentList id={props.id} />
            <div className="border-t w-full px-4">
              {session ? (
                <div className="flex items-center space-x-2 py-3">
                  <img
                    src={session.user?.image!}
                    alt="프로필"
                    className="w-10 h-10 bg-slate-300 rounded-full"
                  />
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="flex items-center space-x-3 w-full"
                    autoComplete="off"
                  >
                    <input
                      {...form.register("comment", {
                        required: "댓글을 입력해주세요.",
                      })}
                      type="text"
                      name="comment"
                      placeholder="댓글 입력"
                      className={cls(
                        "border px-4 py-1.5 rounded-3xl w-full focus:border-green-500 focus:outline-none text-sm",
                        error ? "bg-red-200" : ""
                      )}
                    />
                    <button
                      type="submit"
                      className={cls(
                        "bg-blue-200 hover:bg-blue-300 px-2 py-1 rounded-3xl transition-colors",
                        isLoading ? "animate-pulse" : ""
                      )}
                    >
                      <Image
                        src="/up-arrow.png"
                        alt="화살표"
                        width={30}
                        height={30}
                      />
                    </button>
                  </form>
                </div>
              ) : (
                <p className="text-green-500 text-center p-4">
                  댓글을 쓰려면 로그인해주세요.
                </p>
              )}
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default CommentBtn;
