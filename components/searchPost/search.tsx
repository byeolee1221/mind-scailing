"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { searchSchema } from "@/app/searchPost/constants";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import Image from "next/image";
import SearchReset from "./searchReset";
import useSWR, { mutate, preload } from "swr";
import { cls } from "@/lib/styleUtil";
import Link from "next/link";
import { toast } from "sonner";

interface ISearchList {
  id: string;
  search: string;
}

interface IResult {
  id: string;
  cetegory: string;
  name: string;
  newName: string;
  post: string;
  commentCount: number;
  view: number;
  like: number;
  avatar: string;
  createdAt: string;
}

const fetcher = async (url: string) =>
  await axios.get(url).then((response) => response.data);

const Search = () => {
  const { data, error } = useSWR<ISearchList[]>("/api/search", fetcher);
  const [result, setResult] = useState<IResult[]>([]);
  const [empty, setEmpty] = useState(true);

  const form = useForm<z.infer<typeof searchSchema>>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      search: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof searchSchema>) => {
    try {
      const fetchSearch = await axios.post("/api/search", {
        search: values.search,
      });

      if (fetchSearch.status === 200) {
        setEmpty(false);
        setResult(fetchSearch.data);
      }

      form.reset();
    } catch (error: any) {
      console.log("search post 클라이언트에서 오류 발생", error);
      return toast("오류 발생", {
        description: error.response.data,
      });
    }
  };

  const onClick = (data: string) => {
    form.setValue("search", data);
  };

  useEffect(() => {
    preload("/api/search", fetcher);
  }, []);

  useEffect(() => {
    if (data && data.length === 0) {
      setEmpty(true);
    } else {
      setEmpty(false);
    }
  }, []);

  mutate("/api/search");

  return (
    <div className="w-full min-h-screen mt-8 xl:mt-14 xl:w-4/5 xl:m-auto">
      <div className="flex flex-col items-start space-y-1">
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
          <div className="flex items-center space-x-1 pl-2 border-b dark:bg-slate-500">
            <Image src="/searchPost.png" alt="검색" width={20} height={20} />
            <input
              {...form.register("search")}
              type="text"
              name="search"
              placeholder="검색할 내용을 입력하세요."
              className={cls(
                "w-full p-2 text-sm lg:text-base focus:outline-none dark:bg-slate-500 dark:text-white",
                error ? "bg-red-200" : ""
              )}
            />
            <button type="submit" className="hidden"></button>
          </div>
        </form>
        <div className="w-full flex flex-col space-y-1 px-1">
          {!empty ? (
            <div className="flex flex-col items-start border-b pb-1.5 px-2">
              <h1 className="text-sm lg:text-base text-gray-500 dark:text-gray-300 px-1">
                검색내역
              </h1>
              {data?.map((search: ISearchList) => (
                <button
                  onClick={() => onClick(search.search)}
                  key={search.id}
                  className="hover:bg-slate-200 dark:hover:bg-slate-600 w-full cursor-pointer text-sm lg:text-base py-1 px-1"
                >
                  {search ? (
                    <p className="text-start lg:text-base dark:text-white">
                      {search.search}
                    </p>
                  ) : (
                    "검색결과 없음"
                  )}
                </button>
              ))}
            </div>
          ) : (
            <p className="text-center text-sm lg:text-base mt-2 dark:text-white">
              검색내역 없음
            </p>
          )}
          {!empty && <SearchReset />}
        </div>
      </div>
      <div className="px-6 mt-7 text-sm lg:text-base dark:text-white gap-4 lg:grid lg:grid-cols-2 lg:w-4/5 lg:mx-auto">
        {result?.map((post: IResult) => (
          <Link
            href={`/board/${post.cetegory}/${post.id}`}
            key={post.id}
            className="flex flex-col items-start p-5 space-y-5 border-2 border-green-500 rounded-md shadow-sm dark:bg-slate-700"
          >
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center space-x-2">
                <img
                  src={post.avatar}
                  alt="유저프로필"
                  className="bg-slate-400 rounded-full w-10 lg:w-12"
                />
                <div className="flex flex-col items-start">
                  <h2 className="font-semibold">
                    {post.newName ? post.newName : post.name}
                  </h2>
                  <p className="text-gray-500">{post.createdAt}</p>
                </div>
              </div>
            </div>
            <p>{post.post}</p>
            <div className="flex items-center justify-between w-full">
              <div className="w-full space-x-8 flex items-center">
                <div className="flex items-center space-x-2">
                  <Image
                    src="/like.png"
                    alt="좋아요"
                    width={20}
                    height={20}
                    className="dark:invert lg:w-6"
                  />
                  <span className="font-medium">공감 {post.like}</span>
                  <span className="bg-slate-200 px-1 rounded-sm shadow-sm select-none"></span>
                </div>
                <div className="flex items-center space-x-2">
                  <Image
                    src="/comment.png"
                    alt="댓글"
                    width={20}
                    height={20}
                    className="dark:invert lg:w-6"
                  />
                  <span className="font-medium">댓글 {post.commentCount}</span>
                  <span className="bg-slate-200 px-1 rounded-sm shadow-sm select-none"></span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Image
                  src="/view.png"
                  alt="조회"
                  width={20}
                  height={20}
                  className="dark:invert lg:w-6"
                />
                <span>{post.view}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Search;
