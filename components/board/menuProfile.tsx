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
import { useEffect, useState } from "react";

interface IUser {
  name: string;
  newName: string;
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
    fetcher, {refreshInterval: 0}
  );
  const [empty, setEmpty] = useState(false);
  // console.log(props);

  useEffect(() => {
    if (data && data.length === 0) {
      setEmpty(true);
    } else {
      setEmpty(false);
    }
  }, [])

  return (
    <Dialog>
      <DialogTrigger asChild>
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          <User className="mr-2 h-4 w-4 lg:h-6 lg:w-6" />
          <span className="lg:text-base">프로필 보기</span>
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogContent className="w-[90%] rounded-md">
        <DialogHeader>
          <DialogTitle>회원 프로필</DialogTitle>
        </DialogHeader>
        {!empty ? data?.map((item) => (
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
              <h1 className="font-semibold lg:text-xl">
                {props.post.user.newName !== null
                  ? props.post.user.newName
                  : props.post.user.name}
              </h1>
              <div className="flex flex-col space-y-1 items-center">
                {!error && (
                  <p className="text-sm lg:text-lg">{item?.introduce}</p>
                )}
                {error && (
                  <p className="text-sm lg:text-base text-red-500">
                    오류가 발생하여 불러오지 못했습니다.
                  </p>
                )}
                <p className="text-xs lg:text-base text-gray-500">
                  가입일: {props.post.createdAt}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 bg-slate-200 dark:bg-slate-900 p-2 rounded-md text-center">
              <div className="flex flex-col space-y-1 border-r-2 border-gray-300">
                <p className="font-semibold">{item.postCount}</p>
                <h2 className="text-sm lg:text-base">게시글 수</h2>
              </div>
              <div className="flex flex-col space-y-1">
                <p className="font-semibold">{item.commentCount}</p>
                <h2 className="text-sm lg:text-base">댓글 수</h2>
              </div>
            </div>
          </div>
        )) : <p className="text-center">회원이 프로필을 등록하면 확인하실 수 있습니다.</p>}
      </DialogContent>
    </Dialog>
  );
};

export default MenuProfile;
