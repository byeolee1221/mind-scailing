"use client";

import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import useSWR from "swr";
import PostMenu from "./postMenu";
import { useSession } from "next-auth/react";
import Providers from "@/app/reduxProvider";

interface IUser {
  name: string;
  newName: string;
  email: string;
}

interface IPostList {
  id: number;
  category: string;
  post: string;
  file: string | undefined;
  userId: string;
  userCreatedAt: string;
  avatar: string;
  commentCount: number;
  view: number;
  like: number;
  createdAt: number;
  user: IUser;
}

const fetcher = (url: string) =>
  axios.get(url).then((response) => response.data);

const PostList = () => {
  // useSWR 훅은 데이터를 비동기적으로 가져옴. 따라서 가져온 데이터를 필터링하려면 조건을 걸어줘야 함.
  const { data, error } = useSWR<IPostList[]>("/api/board", fetcher);
  const { data: session } = useSession();
  const [currentCategory, setCurrentCategory] = useState("");
  const [postError, setPostError] = useState("");
  const [empty, setEmpty] = useState(false);
  const pathname = usePathname();
  let filteredPost: any;

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

  useEffect(() => {
    if (filteredPost && filteredPost.length === 0) {
      setEmpty(true);
    } else {
      setEmpty(false);
    }
  }, [filteredPost]);

  return (
    <Providers>
      {empty && (
        <p className="text-center mt-2 bg-slate-200 dark:bg-slate-500 rounded-md p-2 lg:text-lg">
          게시글이 아직 없습니다.
        </p>
      )}
      <div className="flex flex-col lg:grid lg:grid-cols-2 lg:gap-5 lg:w-4/5 lg:mx-auto">
        {!error ? (
          filteredPost?.map((post: IPostList) => (
            <div
              key={post.id}
              className="items-start p-3 space-y-5 border-2 border-green-500 rounded-md shadow-sm dark:bg-slate-700 dark:text-white"
            >
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center space-x-2">
                  <img
                    src={post.avatar}
                    alt="프로필"
                    className="bg-slate-300 rounded-full w-10 lg:w-12"
                  />
                  <div className="flex flex-col items-start">
                    <h1 className="font-semibold text-sm lg:text-base">
                      {post.user.newName ? post.user.newName : post.userId}
                    </h1>
                    <p className="text-xs lg:text-sm text-gray-500 dark:text-gray-900">
                      {post.createdAt}
                    </p>
                  </div>
                </div>
                {session ? <PostMenu post={post} /> : null}
              </div>
              <Link
                href={`${pathname}/${post.id}`}
                className="flex flex-col items-start w-full"
              >
                <p className="text-sm lg:text-base h-10 text-ellipsis overflow-hidden">
                  {post.post}
                </p>
                <div className="w-full">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Image
                        src="/like.png"
                        alt="좋아요"
                        width={20}
                        height={20}
                        className="dark:invert lg:w-6"
                      />
                      <span className="font-semibold text-sm lg:text-base">
                        공감
                      </span>
                      <span className="bg-slate-200 dark:bg-slate-400 px-1 rounded-sm shadow-sm select-none text-sm lg:text-base">
                        {post.like}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Image
                        src="/comment.png"
                        alt="댓글"
                        width={20}
                        height={20}
                        className="dark:invert lg:w-6"
                      />
                      <span className="font-semibold text-sm lg:text-base">
                        댓글
                      </span>
                      <span className="bg-slate-200 dark:bg-slate-400 px-1 rounded-sm shadow-sm select-none text-sm lg:text-base">
                        {post.commentCount}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Image
                        src="/view.png"
                        alt="조회"
                        width={20}
                        height={20}
                        className="dark:invert lg:w-6"
                      />
                      <span className="bg-slate-200 dark:bg-slate-400 px-1 rounded-sm shadow-sm select-none text-sm lg:text-base">
                        {post.view}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))
        ) : (
          <p className="text-red-500 text-sm">{postError}</p>
        )}
      </div>
    </Providers>
  );
};

export default PostList;
