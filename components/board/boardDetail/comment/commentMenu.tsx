import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import CommentDelete from "./commentDelete";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import CommentUserProfile from "./commentUserProfile";
import CommentReport from "./commentReport";

interface IProps {
  id: string;
  userEmail: string;
  postId: string;
}

const CommentMenu = (props: IProps) => {
  const { data: session } = useSession();
  const [isMatch, setIsMatch] = useState(false);

  useEffect(() => {
    if (props.userEmail === session?.user?.email) {
      setIsMatch(true);
    } else {
      setIsMatch(false);
    }
  }, [props.userEmail, session?.user?.email]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button>
          <Image
            src="/menu.png"
            alt="메뉴"
            width={30}
            height={30}
            className="p-1 rounded-full hover:bg-slate-300 dark:invert dark:hover:bg-white transition-colors"
          />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40">
        <DropdownMenuLabel>댓글 메뉴</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {isMatch && (
            <CommentDelete commentId={props.id} postId={props.postId} />
          )}
          {!isMatch && (
            <>
              <CommentUserProfile commentId={props.id} />
              <CommentReport commentId={props.id} />
            </>
          )}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CommentMenu;
