"use client";

import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import useSWR, { mutate } from "swr";

interface IPostList {
  id: number;
  category: string;
  userId: string;
  avatar: string;
  post: string;
  commentCount: number;
  view: number;
  like: number;
  createdAt: number;
}

const fetcher = (url: string) =>
  axios.get(url).then((response) => response.data);

const PostList = () => {
  // useSWR 훅은 데이터를 비동기적으로 가져옴. 따라서 가져온 데이터를 필터링하려면 조건을 걸어줘야 함.
  const { data, error } = useSWR("/api/board", fetcher);
  const [currentCategory, setCurrentCategory] = useState("");
  const [postError, setPostError] = useState("");
  const pathname = usePathname();
  let filteredPost;

  if (data) {
    filteredPost = data.filter(
      (post: IPostList) => post.category === currentCategory
    );
  }

  if (error) {
    setPostError("오류가 발생하여 게시글을 가져오지 못했습니다.");
  }

  useEffect(() => {
    const nameMapping: Record<string, string> = {
      "/board/daily": "daily",
      "/board/company": "company",
      "/board/employment": "employment",
      "/board/study": "study",
      "/board/health": "health",
    };

    setCurrentCategory(nameMapping[pathname] || "relationship");
  }, []);

  return (
    <>
      {!error ? (
        filteredPost?.map((post: IPostList) => (
          <Link
            key={post.id}
            href={`${pathname}/${post.id}`}
            className="flex flex-col items-start p-3 space-y-5 border-2 border-green-500 rounded-md shadow-sm dark:bg-slate-500 dark:text-white"
          >
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center space-x-2">
                <img
                  src={post.avatar}
                  alt="프로필"
                  className="bg-slate-300 rounded-full w-10"
                />
                <div className="flex flex-col items-start">
                  <h1 className="font-semibold text-sm">{post.userId}</h1>
                  <p className="text-xs text-gray-500 dark:text-gray-900">
                    {post.createdAt}
                  </p>
                </div>
              </div>
              <button className="hover:bg-slate-300 p-1 rounded-full transition-colors">
                <Image src="/menu.png" alt="메뉴" width={20} height={20} />
              </button>
            </div>
            <p className="text-sm h-10 text-ellipsis overflow-hidden">
              {post.post}
            </p>
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center space-x-2">
                  <Image
                    src="/like.png"
                    alt="좋아요"
                    width={20}
                    height={20}
                    className="dark:invert"
                  />
                  <span className="font-semibold text-sm">공감</span>
                  <span className="bg-slate-200 dark:bg-slate-400 px-1 rounded-sm shadow-sm select-none text-sm">
                    {post.like}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Image
                    src="/comment.png"
                    alt="댓글"
                    width={20}
                    height={20}
                    className="dark:invert"
                  />
                  <span className="font-semibold text-sm">댓글</span>
                  <span className="bg-slate-200 dark:bg-slate-400 px-1 rounded-sm shadow-sm select-none text-sm">
                    {post.commentCount}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Image
                    src="/view.png"
                    alt="조회"
                    width={20}
                    height={20}
                    className="dark:invert"
                  />
                  <span className="bg-slate-200 dark:bg-slate-400 px-1 rounded-sm shadow-sm select-none text-sm">
                    {post.view}
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))
      ) : (
        <p className="text-red-500 text-sm">{postError}</p>
      )}
    </>
  );
};

export default PostList;
