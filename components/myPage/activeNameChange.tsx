import { MoveRight } from "lucide-react";
import Image from "next/image";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { useSession } from "next-auth/react";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { accountSchema } from "@/app/myPage/accountSetting/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import axios from "axios";
import useSWR from "swr";
import { toast } from "sonner";

const fetcher = (url: string) =>
  axios.get(url).then((response) => response.data);

const ActiveNameChange = () => {
  const { data: session } = useSession();
  const { data } = useSWR<string>("/api/myPage/setting", fetcher);
  const router = useRouter();

  const form = useForm<z.infer<typeof accountSchema>>({
    resolver: zodResolver(accountSchema),
    defaultValues: {
      accountName: "",
    },
  });

  const isLoading = form.formState.isSubmitting;
  const formError = form.formState.errors;

  const onSubmit = async (values: z.infer<typeof accountSchema>) => {
    try {
      const fetchData = await axios.post("/api/myPage/setting", {
        newName: values.accountName,
      });

      if (fetchData.status === 200) {
        alert("프로필이름이 수정되었습니다.");
        router.push("/myPage");
        form.reset();
      }
    } catch (error: any) {
      console.log("activeNameChange POST 클라이언트에서 오류 발생", error);
      return toast("오류 발생", {
        description: error.response.data,
      });
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="border-2 dark:border-white rounded-md flex items-center p-2 shadow-sm hover:bg-green-100 dark:hover:bg-green-600 transition-colors justify-between lg:w-2/5 lg:mx-auto">
          <div className="flex items-center space-x-2">
            <Image src="/name.png" alt="계정" width={30} height={30} />
            <h1 className="font-semibold">프로필이름 변경</h1>
          </div>
          <MoveRight className="bg-slate-100 dark:bg-slate-600 p-1 rounded-full w-8 h-8 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all" />
        </button>
      </SheetTrigger>
      <SheetContent className="w-full">
        <SheetHeader className="text-left">
          <SheetTitle>프로필이름 변경</SheetTitle>
          <SheetDescription>
            다른 회원들에게 노출되는 이름을 수정할 수 있습니다.
          </SheetDescription>
        </SheetHeader>
        <div className="flex flex-col space-y-5">
          <div className="flex flex-col space-y-1 mt-4">
            <h2 className="text-sm font-semibold">현재 프로필이름</h2>
            <p className="text-sm">{data ? data : session?.user?.name}</p>
          </div>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col space-y-3"
          >
            <label htmlFor="name" className="text-sm font-semibold">
              변경할 이름
            </label>
            <input
              {...form.register("accountName")}
              id="name"
              type="text"
              className="border rounded-md p-1 px-2 text-sm focus:outline-none focus:border-green-500"
              placeholder="8자리 이내로 입력"
            />
            {formError && (
              <p className="text-xs text-red-500">
                {formError.accountName?.message}
              </p>
            )}
            <span className="text-xs text-red-500">
              프로필이름에 비속어 및 혐오문구, 정치 관련 표현 등이 포함되면
              계정이 정지될 수 있습니다.
            </span>
            <Button type="submit">
              {!isLoading ? "이름 변경" : "변경중..."}
            </Button>
          </form>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ActiveNameChange;
