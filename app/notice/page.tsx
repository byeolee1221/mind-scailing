"use client";

import NavBar from "@/components/navBar";
import NoticeWrite from "@/components/notice/noticeWrite";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import axios from "axios";
import Link from "next/link";
import useSWR from "swr";

interface INotice {
  id: number;
  title: string;
  createdAt: string;
}

const fetcher = (url: string) =>
  axios.get(url).then((response) => response.data);

const Notice = () => {
  const { data, error } = useSWR<INotice[]>("/api/notice", fetcher, {
    refreshInterval: 0,
  });

  // console.log(data);

  return (
    <NavBar title="공지사항" hasTabBar pageBack>
      <div className="mt-8 px-6 flex flex-col space-y-5 min-h-screen max-w-screen-xl xl:w-4/5 xl:m-auto xl:mt-16">
        <h1 className="font-semibold lg:text-lg">공지사항</h1>
        <div className="p-1 border dark:border-gray-500 rounded-md">
          <Table>
            <TableHeader>
              <TableRow className="text-sm lg:text-base tracking-tighter dark:border-gray-500">
                <TableHead>번호</TableHead>
                <TableHead>제목</TableHead>
                <TableHead className="text-right">게시일</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.map((item) => (
                <TableRow key={item.id} className="dark:border-gray-500">
                  <TableCell>{item.id}</TableCell>
                  <Link href={`/notice/${item.id}`}>
                    <TableCell>{item.title}</TableCell>
                  </Link>
                  <TableCell className="text-right">{item.createdAt}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {error && (
            <p className="text-sm text-center p-2">
              오류가 발생하여 공지사항을 불러오지 못했습니다.
            </p>
          )}
        </div>
        <NoticeWrite />
      </div>
    </NavBar>
  );
};

export default Notice;
