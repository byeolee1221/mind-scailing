import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  ClipboardEditIcon,
  MailXIcon,
  ShieldAlert,
  Trash,
  User,
} from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const PostMenu = (props: any) => {
  const { data: session } = useSession();
  const [isMatch, setIsMatch] = useState(false);
  // console.log(props.user);

  useEffect(() => {
    if (props.user === session?.user?.email) {
      setIsMatch(true);
    } else {
      setIsMatch(false);
    }
  }, [isMatch]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="hover:bg-slate-300 p-1 rounded-full transition-colors focus:outline-none">
          <Image src="/menu.png" alt="메뉴" width={20} height={20} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40">
        <DropdownMenuLabel>게시글 메뉴</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {!isMatch ? (
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>프로필 보기</span>
            </DropdownMenuItem>
          ) : null}
          {!isMatch ? (
            <DropdownMenuItem>
              <ShieldAlert className="mr-2 h-4 w-4" />
              <span>게시글 신고</span>
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem>
              <Trash className="mr-2 h-4 w-4" />
              <span>게시글 삭제</span>
            </DropdownMenuItem>
          )}
          {isMatch && (
            <DropdownMenuItem>
              <ClipboardEditIcon className="mr-2 h-4 w-4" />
              <span>게시글 수정</span>
            </DropdownMenuItem>
          )}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default PostMenu;
