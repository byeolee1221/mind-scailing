"use client";

import CommentBtn from "@/components/board/boardDetail/commentBtn";
import LikeBtn from "@/components/board/boardDetail/likeBtn";
import ViewCount from "@/components/board/boardDetail/viewCount";
import NavBar from "@/components/navBar";
import axios from "axios";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import useSWR, { mutate, preload } from "swr";

interface IUser {
  name: string;
  image: string;
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
}

interface IPost {
  createdAt: number;
  data: IPostDetail;
}

const fetcher = (url: string) =>
  axios.get(url).then((response) => response.data);

const PostDetail = () => {
  const params = useParams<{ id: string }>();
  const [isLoading, setIsLoading] = useState(false);
  const id = params.id;
  const { data } = useSWR(`/api/board/boardDetail?postId=${id}`, fetcher);

  useEffect(() => {
    mutate("/api/board/boardDetail?postId=${id}");
  }, [data]);

  return (
    <NavBar title="게시글" hasTabBar pageBack>
      {!isLoading ? (
        <div className="px-6 mt-4 space-y-6 mb-10">
          <div className="flex flex-col items-start space-y-3">
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center space-x-2">
                <img src={data?.findPost.user.image} className="rounded-full w-10" />
                <div className="flex flex-col items-start">
                  <h1 className="text-sm font-semibold">{data?.findPost.user.name}</h1>
                  <p className="text-xs text-gray-500">{data?.formattedDate}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <ViewCount id={id} />
                <button>
                  <Image
                    src="/menu.png"
                    alt="메뉴"
                    width={30}
                    height={30}
                    className="hover:bg-slate-300 p-1 rounded-full"
                  />
                </button>
              </div>
            </div>
            <div className="flex flex-col space-y-2 w-full">
              <p className="whitespace-pre-line">{data?.findPost.post}</p>
              {data?.findPost.file ? (
                <img
                  src={data?.findPost.file}
                  className="bg-slate-300 rounded-lg shadow-sm"
                />
              ) : null}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <LikeBtn id={id} />
                  <CommentBtn id={id} />
                </div>
                <div className="flex items-center space-x-3 text-sm text-gray-500 select-none">
                  <p>공감 {data?.findPost.like}개</p>
                  <p>댓글 {data?.findPost.commentCount}개</p>
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
