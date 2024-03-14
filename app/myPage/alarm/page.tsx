"use client";

import NavBar from "@/components/navBar";
import axios from "axios";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import useSWR from "swr";

interface IAlarm {
  name: string;
  createdAt: string;
  category: string;
}

const fetcher = (url: string) =>
  axios.get(url).then((response) => response.data);

const Alarm = () => {
  const { data: session } = useSession();
  const { data, error } = useSWR<IAlarm[]>("/api/myPage/alarm", fetcher);

  // console.log(data);

  return (
    <NavBar title="내 알림" pageBack hasTabBar>
      <div className="w-full min-h-screen divide-y flex flex-col space-y-2 pt-2 px-2">
        {session ? (
          !error ? (
            data?.map((item) => (
              <div className="flex items-center justify-around">
                <Link href="" className="flex flex-col">
                  <p className="text-sm">{item?.createdAt}</p>
                  <p className="text-sm">
                    <span className="font-semibold">{item?.name}</span>
                    {item.category === "댓글" &&
                      "님이 회원님의 게시글에 댓글을 남겼습니다."}
                    {item.category === "공감" &&
                      "님이 회원님의 게시글에 공감을 눌렀습니다."}
                  </p>
                </Link>
                <button className="border p-2 rounded-md shadow-sm text-sm hover:bg-slate-200 transition-colors">
                  삭제
                </button>
              </div>
            ))
          ) : (
            <p className="text-center">
              오류가 발생하여 알림을 불러오지 못했습니다.
            </p>
          )
        ) : (
          <p className="text-center">로그인이 필요한 서비스입니다.</p>
        )}
      </div>
    </NavBar>
  );
};

export default Alarm;
