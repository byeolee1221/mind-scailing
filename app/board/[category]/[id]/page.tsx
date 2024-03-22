"use client";

import CommentBtn from "@/components/board/boardDetail/comment/commentBtn";
import DetailPostMenu from "@/components/board/boardDetail/detailPostMenu";
import LikeBtn from "@/components/board/boardDetail/likeBtn";
import ViewCount from "@/components/board/boardDetail/viewCount";
import NavBar from "@/components/navBar";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import useSWR, { mutate } from "swr";

interface IUser {
  name: string;
  newName: string;
  image: string;
  email: string;
}
interface IPostDetail {
  id: number;
  category: string;
  post: string;
  file: string | null;
  commentCount: number;
  view: number;
  like: number;
  user: IUser;
  formattedDate: string;
}

const fetcher = (url: string) =>
  axios.get(url).then((response) => response.data);

const PostDetail = () => {
  const { data: session } = useSession();
  const params = useParams<{ id: string }>();
  const [isLoading, setIsLoading] = useState(false);
  const id = params.id;
  const { data } = useSWR<IPostDetail>(
    `/api/board/boardDetail?postId=${id}`,
    fetcher
  );
  // console.log(data);

  mutate("/api/board/boardDetail?postId=${id}");

  return (
    <NavBar title="게시글" hasTabBar pageBack>
      {!isLoading ? (
        <div className="px-6 mt-4 space-y-6 mb-10 min-h-screen dark:text-white">
          <div className="flex flex-col items-start space-y-3">
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center space-x-2">
                <img src={data?.user.image} className="rounded-full w-10" />
                <div className="flex flex-col items-start">
                  <h1 className="text-sm font-semibold">
                    {data?.user.newName ? data?.user.newName : data?.user.name}
                  </h1>
                  <p className="text-xs text-gray-500">{data?.formattedDate}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <ViewCount id={id} />
                {session ? (
                  <DetailPostMenu
                    email={data?.user.email!}
                    postId={data?.id!}
                  />
                ) : null}
              </div>
            </div>
            <div className="flex flex-col space-y-2 w-full">
              <p className="whitespace-pre-line">{data?.post}</p>
              {data?.file ? (
                <img
                  src={data?.file}
                  className="bg-slate-300 rounded-lg shadow-sm"
                />
              ) : null}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <LikeBtn id={id} />
                  <CommentBtn id={id} />
                </div>
                <div className="flex items-center space-x-3 text-sm text-gray-500 dark:text-white select-none">
                  <p>공감 {data?.like}개</p>
                  <p>댓글 {data?.commentCount}개</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p className="h-screen flex items-center justify-center">
          게시글을 불러오고 있습니다.
        </p>
      )}
    </NavBar>
  );
};

export default PostDetail;
