"use client";

import NavBar from "@/components/navBar";
import axios from "axios";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import useSWR from "swr";

interface ILikePost {
  id: number;
  createdAt: string;
  avatar: string;
  name: string;
  post: string;
  category: string;
}

const fetcher = (url: string) =>
  axios.get(url).then((response) => response.data);

const LikePost = () => {
  const { data, error } = useSWR("/api/myPage/likePost", fetcher, {refreshInterval: 0});
  const { data: session } = useSession();
  const [empty, setEmpty] = useState(false);
  const router = useRouter();
  console.log(data);

  useEffect(() => {
    if (!session) {
      alert("확인하시려면 로그인해주세요.");
      router.push("/");
    }
  }, []);

  useEffect(() => {
    if (data && data.length === 0) {
      setEmpty(true);
    }
  }, []);

  return (
    <NavBar title="내가 공감한 글" hasTabBar pageBack>
      <div className="w-full min-h-screen divide-y flex flex-col space-y-2 xl:w-4/5 xl:m-auto xl:mt-16">
        {!error ? (
          !empty ? (
            data?.map((post: ILikePost) => (
              <Link
                key={post.id}
                href={`/board/${post.category}/${post.id}`}
                className="w-full pt-2 px-2 flex space-x-2 hover:bg-slate-200 rounded-sm transition-colors"
              >
                <img
                  src={post.avatar}
                  className="w-10 h-10 bg-slate-300 rounded-full"
                />
                <div className="flex flex-col">
                  <div className="flex space-x-2 items-center">
                    <h1 className="text-sm lg:text-lg font-semibold">
                      {post.name}
                    </h1>
                    <p className="text-xs lg:text-base text-gray-500">
                      {post.createdAt}
                    </p>
                  </div>
                  <p className="text-sm lg:text-base">{post.post}</p>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-center mt-8 lg:text-lg">
              공감한 게시글이 없습니다.
            </p>
          )
        ) : (
          <p className="text-center mt-8 lg:text-lg">
            오류가 발생하여 불러오지 못했습니다.
          </p>
        )}
      </div>
    </NavBar>
  );
};

export default LikePost;
