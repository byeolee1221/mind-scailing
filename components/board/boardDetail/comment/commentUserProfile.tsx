import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import axios from "axios";
import { User } from "lucide-react";
import { useEffect } from "react";
import useSWR from "swr";

interface IProps {
  commentId: string;
}

interface IProfileData {
  image: string;
  userName: string;
  userNewName: string;
  introduce: string;
  userCreatedAt: string;
  postCount: number;
  commentCount: number;
}

const fetcher = (url: string) =>
  axios.get(url).then((response) => response.data);

const CommentUserProfile = (props: IProps) => {
  const { data, error } = useSWR<IProfileData>(
    `/api/board/boardDetail/commentMenu?commentId=${props.commentId}`,
    fetcher, {refreshInterval: 0}
  );

  useEffect(() => {
    if (error) {
      alert(error.info.message);
    }
  }, []);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          <User className="mr-2 h-4 w-4" />
          <span>프로필 보기</span>
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogContent className="w-[90%] rounded-md">
        <DialogHeader>
          <DialogTitle>회원 프로필</DialogTitle>
        </DialogHeader>
        <div className="w-full flex flex-col px-2 space-y-3">
          <div className="flex flex-col items-center space-y-2">
            <img
              src={data?.image}
              alt="프로필"
              className="bg-slate-300 rounded-full w-20"
            />
            <h1 className="font-semibold lg:text-xl">
              {data?.userNewName ? data.userNewName : data?.userName}
            </h1>
            <div className="flex flex-col space-y-1 items-center">
              <p className="text-sm lg:text-lg">{data?.introduce}</p>
              <p className="text-xs lg:text-base text-gray-500">
                가입일: {data?.userCreatedAt}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 bg-slate-200 dark:bg-slate-900 p-2 rounded-md text-center">
            <div className="flex flex-col space-y-1 border-r-2 border-gray-300">
              <p className="font-semibold">{data?.postCount}</p>
              <h2 className="text-sm lg:text-base">게시글 수</h2>
            </div>
            <div className="flex flex-col space-y-1">
              <p className="font-semibold">{data?.commentCount}</p>
              <h2 className="text-sm lg:text-base">댓글 수</h2>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CommentUserProfile;
