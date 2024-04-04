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
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { showModal } from "@/slice/modalSlice";
import { toast } from "sonner";

const DiaryWrite = () => {
  const [file, setFile] = useState<File | null>(null);
  const modalDispatch = useAppDispatch();
  const modal = useAppSelector((state) => state.modal.modal);
  const { data: session } = useSession();
  const router = useRouter();
  // console.log(data);

  useEffect(() => {
    if (!session) {
      alert("로그인이 필요한 서비스입니다.");
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
  const formError = form.formState.errors;

  const onSubmit = async (values: z.infer<typeof diarySchema>) => {
    try {
      const response = await axios.post("/api/myDiary", {
        diary: values.diary,
        file,
      });

      if (response.status === 200) {
        modalDispatch(showModal());
      }
    } catch (error: any) {
      console.log("dirayWrite 클라이언트에서 오류 발생", error);
      return toast("오류 발생", {
        description: error.response.data,
      });
    }
  };

  return (
    <>
      <div className="flex flex-col items-start space-y-2 border rounded-lg py-2 px-3 shadow-sm w-full dark:border-white">
        <div className="flex items-center space-x-2 border-b w-full pb-2 dark:border-gray-500">
          <img
            src={session?.user?.image!}
            alt="프로필"
            className="bg-slate-300 rounded-full w-10 lg:w-12"
          />
          <Dialog>
            <DialogTrigger asChild>
              <button className="text-gray-400 text-sm lg:text-base w-full text-start">
                일기를 쓰려면 여기를 클릭하세요.
              </button>
            </DialogTrigger>
            {!modal ? (
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
                    className="w-full resize-none p-1 border focus:outline-none focus:ring-2 focus:ring-green-500 rounded-md text-sm lg:text-base"
                    rows={10}
                  />
                  {formError.diary ? (
                    <p className="text-red-500 text-sm">
                      {formError.diary.message}
                    </p>
                  ) : null}
                  <div className="flex items-center justify-between w-full">
                    <button
                      type="submit"
                      className="bg-green-500 hover:bg-green-600 px-6 py-2 rounded-lg font-bold transition-colors shadow-md lg:text-base"
                    >
                      {isLoading ? "업로드하는 중..." : "업로드하기"}
                    </button>
                    <label
                      htmlFor="photo"
                      className="bg-white dark:bg-slate-500 hover:bg-slate-200 dark:hover:bg-slate-600 border-2 border-green-500 px-6 py-2 rounded-lg font-bold transition-colors shadow-md lg:text-base"
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
    </>
  );
};

export default DiaryWrite;
