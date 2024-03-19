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
import { useState } from "react";

const ActiveNameChange = () => {
  const { data: session } = useSession();
  const [error, setError] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof accountSchema>>({
    resolver: zodResolver(accountSchema),
    defaultValues: {
      accountName: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof accountSchema>) => {
    if (!session) {
      alert("로그인이 필요한 서비스입니다.");
      router.push("/");
    }

    try {
      const fetchData = await axios.post("/api/myPage/setting", {
        newName: values.accountName,
      });

      if (fetchData.status === 200) {
        alert("프로필이름이 수정되었습니다.");
        router.push("/myPage");
        form.reset();
      }
    } catch (error) {
      console.log("activeNameChange POST 클라이언트에서 오류 발생", error);
      setError(true);
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="border-2 rounded-md flex items-center p-2 shadow-sm hover:bg-green-100 transition-colors justify-between">
          <div className="flex items-center space-x-2">
            <Image src="/name.png" alt="계정" width={30} height={30} />
            <h1 className="font-semibold">프로필이름 변경</h1>
          </div>
          <MoveRight className="bg-slate-100 p-1 rounded-full w-8 h-8 hover:bg-slate-200 transition-all" />
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
            <p className="text-sm">{session?.user?.name}</p>
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
            {form.formState.errors && <p className="text-xs text-red-500">{form.formState.errors.accountName?.message}</p>}
            {error && <p className="text-xs text-red-500">오류가 발생하여 수정되지 않았습니다. 잠시 후 다시 시도해주세요.</p>}
            <span className="text-xs text-red-500">
              프로필이름에 비속어 및 혐오문구, 정치 관련 표현 등이 포함되면
              계정이 정지될 수 있습니다.
            </span>
            <Button type="submit">{!isLoading ? "이름 변경" : "변경중..."}</Button>
          </form>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ActiveNameChange;
