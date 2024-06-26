"use client";

import NavBar from "@/components/navBar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import axios from "axios";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import useSWR from "swr";

interface IMyPost {
  id: string;
  post: string;
  view: number;
  category: string;
}

const fetcher = (url: string) =>
  axios.get(url).then((response) => response.data);

const MyPost = () => {
  const { data } = useSWR<IMyPost[]>("/api/myPost", fetcher, {
    refreshInterval: 0,
  });
  const { data: session } = useSession();
  const router = useRouter();
  const [empty, setEmpty] = useState("");

  useEffect(() => {
    if (!session) {
      alert("이용하시려면 로그인해주세요!");
      router.push("/");
    }
  }, []);

  useEffect(() => {
    if (data && data.length === 0) {
      setEmpty("게시글이 아직 없습니다.");
    }
  }, []);

  return (
    <NavBar title="내 글" pageBack hasTabBar>
      <div className="mt-8 px-6 flex flex-col space-y-5 min-h-screen max-w-screen-xl xl:w-4/5 xl:m-auto xl:mt-16">
        <h1 className="font-semibold lg:text-lg">내가 게시한 글</h1>
        <div className="p-1 border dark:border-gray-500 rounded-md">
          <Table>
            <TableHeader>
              <TableRow className="text-sm lg:text-base tracking-tighter dark:border-gray-500">
                <TableHead>번호</TableHead>
                <TableHead>제목</TableHead>
                <TableHead className="text-right">조회 수</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.map((post: IMyPost, i) => (
                <TableRow
                  key={post.id}
                  className="lg:text-sm dark:border-gray-500"
                >
                  <TableCell>{i+1}</TableCell>
                  <Link
                    key={post.id}
                    href={`/board/${post.category}/${post.id}`}
                  >
                    <TableCell>{post.post}</TableCell>
                  </Link>
                  <TableCell className="text-right">{post.view}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {empty ? (
            <p className="text-center text-sm lg:text-base mt-8 xl:mt-16 w-full">
              {empty}
            </p>
          ) : null}
        </div>
      </div>
    </NavBar>
  );
};

export default MyPost;
