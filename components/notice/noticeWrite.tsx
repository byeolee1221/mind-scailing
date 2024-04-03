"use client";

import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { z } from "zod";
import { noticeSchema } from "@/app/notice/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const NoticeWrite = () => {
  const router = useRouter();

  const form = useForm<z.infer<typeof noticeSchema>>({
    resolver: zodResolver(noticeSchema),
    defaultValues: {
      title: "",
      notice: "",
    },
  });

  const isLoading = form.formState.isSubmitting;
  const formError = form.formState.errors;

  const onSubmit = async (values: z.infer<typeof noticeSchema>) => {
    try {
      const response = await axios.post("/api/notice", {
        title: values.title,
        notice: values.notice,
      });

      if (response.status === 200) {
        form.reset();
        router.push(`/notice/${response.data}`);
      }
    } catch (error: any) {
      console.log("noticeWrite POST 클라이언트에서 오류 발생", error);
      return toast("오류 발생", {
        description: error.response.data,
      });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="bg-green-500 hover:bg-green-600 w-32 px-5 py-2 rounded-md transition-colors">
          공지 올리기
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-left">공지사항 올리기</DialogTitle>
        </DialogHeader>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col space-y-4"
        >
          <div className="flex flex-col space-y-1">
            <label htmlFor="title" className="text-gray-500">
              제목
            </label>
            <input
              {...form.register("title")}
              type="text"
              id="title"
              className="focus:outline-none border px-2 py-1 text-sm rounded-sm"
            />
            {formError.title && (
              <p className="text-xs text-red-500">{formError.title?.message}</p>
            )}
          </div>
          <div className="flex flex-col space-y-1">
            <label htmlFor="notice" className="text-gray-500">
              본문
            </label>
            <textarea
              {...form.register("notice")}
              id="notice"
              rows={10}
              className="border resize-none px-2 py-1 text-sm focus:outline-none rounded-sm"
            />
            {formError.notice && (
              <p className="text-xs text-red-500">
                {formError.notice?.message}
              </p>
            )}
          </div>

          <div className="flex items-center space-x-2 justify-end">
            <Button type="submit">
              {isLoading ? "게시중..." : "게시하기"}
            </Button>
            <DialogClose asChild>
              <Button variant="outline">취소하기</Button>
            </DialogClose>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NoticeWrite;
