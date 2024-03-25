"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { postSchema } from "@/app/board/[category]/constants";
import axios from "axios";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";

const Write = () => {
  const { data: session } = useSession();
  const [file, setFile] = useState<File | null>(null);
  const [category, setCategory] = useState("");
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const nameMapping: Record<string, string> = {
      "/board/daily": "daily",
      "/board/company": "company",
      "/board/employment": "employment",
      "/board/study": "study",
      "/board/health": "health",
    };

    setCategory(nameMapping[pathname] || "relationship");
  }, []);

  const onChangePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;

    if (files && files.length === 1) {
      if (files[0].size <= 1024 * 1024) {
        setFile(files[0]);
      } else {
        alert("파일은 1MB 이내로 업로드해주세요.");
        return;
      }
    }
  };

  const form = useForm<z.infer<typeof postSchema>>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      post: "",
    },
  });

  const isLoading = form.formState.isSubmitting;
  const formError = form.formState.errors;

  const onSubmit = async (values: z.infer<typeof postSchema>) => {
    if (!session || !values.post) {
      return;
    }

    try {
      const response = await axios.post("/api/board", {
        post: values.post,
        file,
        category,
        userId: session.user!.name,
        userEmail: session.user!.email,
      });

      if (response.status === 200) {
        form.reset();
        router.push(`/board/${category}/${response.data}`);
      }
    } catch (error: any) {
      console.log("board write POST 클라이언트에서 오류 발생", error);
      return toast("오류 발생", {
        description: error.response.data,
      });
    }
  };

  return (
    <div className="flex flex-col items-start space-y-2 border rounded-lg py-2 px-3 shadow-sm dark:border-white">
      <div className="flex items-center space-x-2 border-b w-full pb-2 dark:border-white">
        <img
          src={session?.user?.image!}
          alt="프로필"
          className="w-10 lg:w-12 bg-slate-300 rounded-full"
        />
        <Dialog>
          <DialogTrigger asChild>
            <button className="text-gray-400 text-sm lg:text-lg w-full text-start">
              글을 쓰려면 여기를 클릭하세요.
            </button>
          </DialogTrigger>
          <DialogContent className="w-[90%] rounded-xl">
            <DialogHeader>
              <DialogTitle className="text-start">게시글 업로드</DialogTitle>
              <DialogDescription className="text-start">
                오늘 있었던 일을 들려주세요.
              </DialogDescription>
            </DialogHeader>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col items-center space-y-4"
            >
              <textarea
                {...form.register("post", { required: "내용을 입력해주세요." })}
                className="w-full resize-none p-1 border focus:outline-none focus:ring-2 focus:ring-green-500 rounded-md text-sm lg:text-base"
                rows={10}
              />
              <p className="text-red-500 text-xs lg:text-base text-start">
                상호 비방, 허가받지 않은 광고 등 관련이 없는 글은 예고없이
                삭제될 수 있습니다.
              </p>
              {formError.post ? (
                <p className="text-red-500 text-sm lg:text-base">
                  {formError.post.message}
                </p>
              ) : null}
              <div className="flex items-center justify-between w-full">
                <button
                  type="submit"
                  className="bg-green-500 hover:bg-green-600 px-6 py-2 rounded-lg font-bold transition-colors shadow-md lg:text-lg"
                >
                  {isLoading ? "업로드하는 중..." : "업로드하기"}
                </button>
                <label
                  htmlFor="photo"
                  className="bg-white dark:bg-slate-500 hover:bg-slate-200 dark:hover:bg-slate-600 border-2 border-green-500 px-6 py-2 rounded-lg font-bold transition-colors shadow-md cursor-pointer lg:text-lg"
                >
                  {file ? "사진 추가됨 😊" : "사진 추가"}
                </label>
                <input
                  onChange={onChangePhoto}
                  id="photo"
                  type="file"
                  accept="image/*"
                  className="hidden"
                />
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <p className="text-xs lg:text-base text-green-500">
        오늘의 한마디: 당신은 혼자가 아니에요. 힘내세요!
      </p>
    </div>
  );
};

export default Write;
