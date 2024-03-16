"use client";

import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import useSWR, { preload } from "swr";

interface ITodayPost {
  id: number;
  userId: string;
  category: string;
  avatar: string;
  post: string;
  commentCount: number;
  view: number;
  like: number;
  createdAt: number;
}

const fetcher = (url: string) =>
  axios.get(url).then((response) => response.data);

const TodayPost = () => {
  const { data, error } = useSWR("/api/home", fetcher);
  const [empty, setEmpty] = useState("");

  useEffect(() => {
    preload("/api/home", fetcher);

    if (data && data.length === 0) {
      setEmpty("게시글이 아직 없습니다.");
    }
  }, []);

  return (
    <div className="flex flex-col items-start px-6">
      <h1 className="font-bold">오늘의 고민 글</h1>
      <p className="text-sm text-gray-500">
        고민을 함께하고 위로나 격로를 해주세요.
      </p>
      {empty ? (
        <p className="m-auto mt-4 text-green-500 bg-slate-100 p-2 rounded-md">
          {empty}
        </p>
      ) : null}
      {!error ? (
        <div className="grid grid-cols-2 gap-x-5">
          {data?.map((post: ITodayPost) => (
            <Link
              key={post.id}
              href={`/board/${post.category}/${post.id}`}
              className="flex flex-col items-start space-y-2 bg-green-500 w-full rounded-xl shadow-xl p-3 mt-5"
            >
              <div className="flex items-center">
                <Image
                  src="/user.png"
                  alt="프로필"
                  width={35}
                  height={35}
                  className="bg-white rounded-full p-2"
                />
                <div className="ml-2">
                  <h2 className="font-semibold text-xs">{post.userId}</h2>
                  <p className="text-gray-500 text-xs">{post.createdAt}</p>
                </div>
              </div>
              <p className="text-sm border-b-2 border-green-600 pb-2 h-12 text-ellipsis overflow-hidden w-full ...">
                {post.post}
              </p>
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center space-x-2">
                  <Image src="/comment.png" alt="댓글" width={20} height={20} />
                  <p className="text-sm">{post.commentCount}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Image src="/view.png" alt="조회" width={20} height={20} />
                  <p className="text-sm">{post.view}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-red-500 text-sm">
          오류가 발생하여 게시글을 불러오지 못했습니다.
        </p>
      )}
    </div>
  );
};

export default TodayPost;
