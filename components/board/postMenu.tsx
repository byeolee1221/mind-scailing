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
import { ClipboardEditIcon, ShieldAlert, Trash } from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import MenuProfile from "./menuProfile";
import MenuReport from "./menuReport";

interface IUser {
  name: string;
  email: string;
}

interface IPostMenu {
  id: number;
  category: string;
  userId: string;
  avatar: string;
  post: string;
  commentCount: number;
  view: number;
  like: number;
  createdAt: number;
  user: IUser
}

interface IPost {
  post: IPostMenu
}

const PostMenu = (props: IPost) => {
  const { data: session } = useSession();
  const [isMatch, setIsMatch] = useState(false);
  // console.log(props);

  useEffect(() => {
    if (props.post.user.email === session?.user?.email) {
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
          {!isMatch ? <MenuProfile post={props.post} /> : null}
          {!isMatch ? (
            <MenuReport />
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
