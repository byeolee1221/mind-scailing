import { ClipboardEditIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { DropdownMenuItem } from "../ui/dropdown-menu";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { editPostSchema } from "@/app/board/[category]/editConstants";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { showModal } from "@/slice/modalSlice";

interface IProps {
  postId: string;
  post: string;
  file: string | undefined;
}

const PostEdit = (props: IProps) => {
  const router = useRouter();
  const modalDispatch = useAppDispatch();
  const modal = useAppSelector((state) => state.modal.modal);
  const [file, setFile] = useState<File | null>(null);

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

  const form = useForm<z.infer<typeof editPostSchema>>({
    resolver: zodResolver(editPostSchema),
    defaultValues: {
      post: props.post,
    },
  });

  const isLoading = form.formState.isSubmitting;
  const formError = form.formState.errors;

  const onSubmit = async (values: z.infer<typeof editPostSchema>) => {
    try {
      const response = await axios.post("/api/board/boardMenu/postEdit", {
        newPost: values.post,
        postId: props.postId,
        file,
      });

      if (response.status === 200) {
        alert("게시글이 수정되었습니다.");
        router.refresh();
        modalDispatch(showModal());
      }
    } catch (error: any) {
      console.log("postEdit post 클라이언트에서 오류 발생", error);
      return toast("오류 발생", {
        description: error.response.data,
      });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          <ClipboardEditIcon className="mr-2 h-4 w-4" />
          <span>게시글 수정</span>
        </DropdownMenuItem>
      </DialogTrigger>
      {!modal ? (
        <DialogContent className="w-[90%] rounded-xl">
          <DialogHeader className="text-left">
            <DialogTitle>게시글 수정</DialogTitle>
            <DialogDescription>
              수정하신 후 업로드를 눌러주세요.
            </DialogDescription>
          </DialogHeader>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col items-center space-y-4"
          >
            <textarea
              {...form.register("post", {
                required: "수정하실 내용을 입력해주세요.",
              })}
              className="w-full resize-none p-1 border focus:outline-none focus:ring-2 focus:ring-green-500 rounded-md text-sm lg:text-base"
              rows={10}
            />
            <div className="w-full flex flex-col space-y-1">
              <h2 className="text-sm lg:text-base font-semibold">
                현재 업로드된 사진
              </h2>
              {props.file !== null ? (
                <img
                  src={props.file}
                  alt="사진"
                  className="w-full h-24 object-fill"
                />
              ) : (
                <span className="text-xs lg:text-sm">없음</span>
              )}
            </div>
            <p className="text-red-500 text-xs lg:text-sm text-start">
              상호 비방, 허가받지 않은 광고 등 관련이 없는 글은 예고없이 삭제될
              수 있습니다.
            </p>
            {formError.post ? (
              <p className="text-red-500 text-sm">{formError.post.message}</p>
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
                className="bg-white dark:bg-slate-500 hover:bg-slate-200 dark:hover:bg-slate-600 border-2 border-green-500 px-6 py-2 rounded-lg font-bold transition-colors shadow-md cursor-pointer lg:text-base"
              >
                {file ? "사진 추가됨 😊" : "사진 변경"}
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
  );
};

export default PostEdit;
