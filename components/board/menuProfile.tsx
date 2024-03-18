import { User } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { DropdownMenuItem } from "../ui/dropdown-menu";
import axios from "axios";
import useSWR from "swr";

interface IUser {
  name: string;
  email: string;
}

interface IPostProfile {
  id: number;
  category: string;
  userId: string;
  avatar: string;
  post: string;
  commentCount: number;
  view: number;
  like: number;
  createdAt: number;
  user: IUser;
}

interface IPost {
  post: IPostProfile;
}

interface IProfileData {
  introduce: string;
  postCount: number;
  commentCount: number;
}

const fetcher = (url: string) =>
  axios.get(url).then((response) => response.data);

const MenuProfile = (props: IPost) => {
  const { data, error } = useSWR<IProfileData[]>(
    `/api/board/boardMenu?postId=${props.post.id}`,
    fetcher
  );
  // console.log(data);

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
        {data?.map((item) => (
          <div
            key={item.introduce}
            className="w-full flex flex-col px-2 space-y-3"
          >
            <div className="flex flex-col items-center space-y-2">
              <img
                src={props.post.avatar}
                alt="프로필"
                className="bg-slate-300 rounded-full w-20"
              />
              <h1 className="font-semibold">{props.post.user.name}</h1>
              <div className="flex flex-col space-y-1 items-center">
                {!error && <p className="text-sm">{item?.introduce}</p>}
                {error && (
                  <p className="text-sm text-red-500">
                    오류가 발생하여 불러오지 못했습니다.
                  </p>
                )}
                <p className="text-xs text-gray-500">
                  가입일: {props.post.createdAt}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 bg-slate-200 p-2 rounded-md text-center">
              <div className="flex flex-col space-y-1 border-r-2 border-gray-300">
                <p className="font-semibold">{item.postCount}</p>
                <h2 className="text-sm">게시글 수</h2>
              </div>
              <div className="flex flex-col space-y-1">
                <p className="font-semibold">{item.commentCount}</p>
                <h2 className="text-sm">댓글 수</h2>
              </div>
            </div>
          </div>
        ))}
      </DialogContent>
    </Dialog>
  );
};

export default MenuProfile;
