import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ClipboardEditIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import MenuReport from "../menuReport";
import axios from "axios";
import useSWR from "swr";
import MenuProfile from "../menuProfile";
import { useParams } from "next/navigation";
import DetailPostDelete from "./detailPostDelete";
import PostEdit from "../postEdit";
import Providers from "@/app/reduxProvider";

interface IUser {
  name: string;
  newName: string;
  email: string;
}

interface IDetailPostProfile {
  id: number;
  category: string;
  userId: string;
  avatar: string;
  post: string;
  file: string | undefined;
  commentCount: number;
  view: number;
  like: number;
  createdAt: number;
  user: IUser;
}

interface IProps {
  email: string;
  postId: number;
}

const fetcher = (url: string) =>
  axios.get(url).then((response) => response.data);

const DetailPostMenu = (props: IProps) => {
  const { data: session } = useSession();
  const params = useParams<{ id: string }>();
  const [isMatch, setIsMatch] = useState(false);
  const id = params.id;
  const { data } = useSWR<IDetailPostProfile>(
    `/api/board/boardDetail/detailPostMenu?postId=${id}`,
    fetcher, {refreshInterval: 0}
  );

  useEffect(() => {
    if (props.email === session?.user?.email) {
      setIsMatch(true);
    } else {
      setIsMatch(false);
    }
  }, [props.email, session?.user?.email]);

  if (!data) {
    return;
  }

  // console.log(isMatch);
  // console.log(props);
  return (
    <Providers>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="hover:bg-slate-300 focus:outline-none rounded-full p-1 dark:invert transition-colors">
            <Image src="/menu.png" alt="메뉴" width={30} height={30} />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-40">
          <DropdownMenuLabel>게시글 메뉴</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            {!isMatch ? <MenuProfile post={data} /> : null}
            {!isMatch ? <MenuReport postId={props?.postId} /> : null}
            {isMatch && (
              <>
                <DetailPostDelete postId={props?.postId} />
                <PostEdit postId={data.id} post={data.post} file={data.file} />
              </>
            )}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </Providers>
  );
};

export default DetailPostMenu;
