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

const AccountDisconnect = () => {
  const { data: session } = useSession();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="border-2 dark:border-white rounded-md flex items-center p-2 shadow-sm hover:bg-green-100 dark:hover:bg-green-600 transition-colors justify-between">
          <div className="flex items-center space-x-2">
            <Image src="/account.png" alt="계정" width={30} height={30} />
            <h1 className="font-semibold">계정연결 해제</h1>
          </div>
          <MoveRight className="bg-slate-100 dark:bg-slate-600 p-1 rounded-full w-8 h-8 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all" />
        </button>
      </SheetTrigger>
      <SheetContent className="w-full">
        <SheetHeader className="text-left">
          <SheetTitle>계정연결 해제</SheetTitle>
          <SheetDescription>
            연결을 해제하셔도 언제든 재가입이 가능합니다.
          </SheetDescription>
        </SheetHeader>
        <div className="flex flex-col space-y-5">
          <div className="flex flex-col space-y-1 mt-4">
            <h2 className="text-sm font-semibold">현재 로그인된 이메일</h2>
            <p className="text-sm">{session?.user?.email}</p>
          </div>
          <span className="text-xs text-red-500">
            연결 해제시 게시한 모든 게시글과 댓글을 포함한 정보가 삭제됩니다.
          </span>
          <Button>연결 해제</Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default AccountDisconnect;
