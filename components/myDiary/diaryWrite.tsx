"use client";

import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { diarySchema } from "@/app/myDiary/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import axios from "axios";
import DiaryList from "./diaryList";

const DiaryWrite = () => {
  const [file, setFile] = useState<File | null>(null);
  const [formError, setFormError] = useState("");
  const [close, setClose] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!session) {
      alert("이용하시려면 로그인해주세요!");
      router.push("/");
    }
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

  const form = useForm<z.infer<typeof diarySchema>>({
    resolver: zodResolver(diarySchema),
    defaultValues: {
      diary: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof diarySchema>) => {
    if (!session || !values.diary) {
      setFormError("내용을 입력해주세요.");
    }

    try {
      const response = await axios.post("/api/myDiary", {
        diary: values.diary,
        file,
        user: {
          name: session?.user?.name,
          email: session?.user?.email,
        },
      });

      if (response.status === 200) {
        setClose(true);
        // console.log(response.data);
      }
    } catch (error) {
      console.log(error);
      alert("오류가 발생하여 업로드되지 않았습니다. 다시 시도해주세요.");
    }
  };

  return (
    <>
      <div className="flex flex-col items-start space-y-2 border rounded-lg py-2 px-3 shadow-sm w-full">
        <div className="flex items-center space-x-2 border-b w-full pb-2">
          <Image
            src="/user.png"
            alt="프로필"
            width={35}
            height={35}
            className="p-2 bg-slate-300 rounded-full"
          />
          <Dialog>
            <DialogTrigger asChild>
              <button className="text-gray-400 text-sm">
                일기를 쓰려면 여기를 클릭하세요.
              </button>
            </DialogTrigger>
            {!close ? (
              <DialogContent className="w-[90%] rounded-xl">
                <DialogHeader>
                  <DialogTitle className="text-start">
                    나만의 일기장
                  </DialogTitle>
                  <DialogDescription className="text-start">
                    적고싶은 오늘의 이야기를 남겨보세요.
                  </DialogDescription>
                </DialogHeader>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="flex flex-col items-center space-y-4"
                >
                  <textarea
                    {...form.register("diary", {
                      required: "내용을 입력해주세요.",
                    })}
                    className="w-full resize-none p-1 border focus:outline-none focus:ring-2 focus:ring-green-500 rounded-md text-sm"
                    rows={10}
                  />
                  {form.formState.errors.diary ? (
                    <p className="text-red-500 text-sm">
                      {form.formState.errors.diary.message}
                    </p>
                  ) : null}
                  {formError ? (
                    <p className="text-red-500 text-xs">{formError}</p>
                  ) : null}
                  <div className="flex items-center justify-between w-full">
                    <button
                      type="submit"
                      className="bg-green-500 hover:bg-green-600 px-6 py-2 rounded-lg font-bold transition-colors shadow-md"
                    >
                      {isLoading ? "업로드하는 중..." : "업로드하기"}
                    </button>
                    <label
                      htmlFor="photo"
                      className="bg-white hover:bg-slate-200 border-2 border-green-500 px-6 py-2 rounded-lg font-bold transition-colors shadow-md"
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
            ) : null}
          </Dialog>
        </div>
      </div>
      <DiaryList session={session} />
    </>
  );
};

export default DiaryWrite;