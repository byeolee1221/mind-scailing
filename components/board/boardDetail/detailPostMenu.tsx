import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ClipboardEditIcon, ShieldAlert, Trash } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";

const DetailPostMenu = (props: any) => {
  const { data: session } = useSession();
  const [isMatch, setIsMatch] = useState(false);
  
  useEffect(() => {
    if (props.user === session?.user?.email) {
      setIsMatch(true);
    } else {
      setIsMatch(false);
    }
  }, [isMatch]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <button className="hover:bg-slate-300 focus:outline-none rounded-full p-1 dark:invert transition-colors">
          <Image src="/menu.png" alt="메뉴" width={30} height={30} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40">
        <DropdownMenuLabel>게시글 메뉴</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {!isMatch ? (
            <DropdownMenuItem>
              <ShieldAlert className="mr-2 h-4 w-4" />
              <span>게시글 신고</span>
            </DropdownMenuItem>
          ) : null}
          {isMatch && (
            <>
              <DropdownMenuItem>
                <Trash className="mr-2 h-4 w-4" />
                <span>게시글 삭제</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <ClipboardEditIcon className="mr-2 h-4 w-4" />
                <span>게시글 수정</span>
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DetailPostMenu;
