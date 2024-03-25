import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { z } from "zod";
import { introduceSchema } from "@/app/myPage/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useState } from "react";
import { toast } from "sonner";

const MyIntroduce = () => {
  const [error, setError] = useState("");
  const [close, setClose] = useState(false);

  const form = useForm<z.infer<typeof introduceSchema>>({
    resolver: zodResolver(introduceSchema),
    defaultValues: {
      introduce: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof introduceSchema>) => {
    try {
      const postData = await axios.post("/api/myPage", {
        introduce: values.introduce,
      });

      if (postData.status === 200) {
        alert("자기소개글이 수정되었습니다.");
        form.reset();
        setClose(true);
      }
    } catch (error: any) {
      console.log("myPage POST 클라이언트에서 오류 발생", error);
      return toast("오류 발생", {
        description: error.response.data
      });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex items-center justify-end w-full space-x-3">
          <button className="greenBtn">자기소개 수정</button>
        </div>
      </DialogTrigger>
      {!close ? (
        <DialogContent>
          <DialogHeader className="text-start">
            <DialogTitle>자기소개 수정</DialogTitle>
            <DialogDescription>
              자기소개를 입력하고 저장을 눌러주세요.
            </DialogDescription>
          </DialogHeader>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col space-y-5"
            autoComplete="off"
          >
            <input
              {...form.register("introduce", {
                required: "수정하려면 자기소개를 입력해주세요.",
              })}
              type="text"
              name="introduce"
              className="p-2 w-full border rounded-md text-sm focus:outline-none"
            />
            {error ? <p className="text-sm text-red-500">{error}</p> : null}
            <button type="submit" className="greenBtn w-24 text-sm">
              {isLoading ? "저장중..." : "저장"}
            </button>
          </form>
        </DialogContent>
      ) : null}
    </Dialog>
  );
};

export default MyIntroduce;
