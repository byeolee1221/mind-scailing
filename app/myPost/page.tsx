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
import useSWR, { preload } from "swr";

interface IMyPost {
  id: number;
  post: string;
  view: number;
  category: string;
}

const fetcher = (url: string) =>
  axios.get(url).then((response) => response.data);

const MyPost = () => {
  const { data } = useSWR<IMyPost[]>("/api/myPost", fetcher);
  const { data: session } = useSession();
  const router = useRouter();
  const [empty, setEmpty] = useState("");

  useEffect(() => {
    if (!session) {
      alert("이용하시려면 로그인해주세요!");
      router.push("/");
    }

    preload("/api/myPost", fetcher);

    if (data && data.length === 0) {
      setEmpty("게시글이 아직 없습니다.");
    }
  }, []);

  return (
    <NavBar title="내 글" pageBack hasTabBar>
      <div className="w-full flex flex-col space-y-3 border-t dark:bg-slate-800 dark:text-white min-h-screen">
        <div className="border p-2 mt-4 flex flex-col">
          <Table>
            <TableHeader>
              <TableRow className="text-sm tracking-tighter">
                <TableHead>번호</TableHead>
                <TableHead>제목</TableHead>
                <TableHead className="text-right">조회 수</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.map((post: IMyPost) => (
                <TableRow key={post.id}>
                  <TableCell>{post.id}</TableCell>
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
            <p className="text-center text-sm mt-2 w-full">{empty}</p>
          ) : null}
        </div>
      </div>
    </NavBar>
  );
};

export default MyPost;
