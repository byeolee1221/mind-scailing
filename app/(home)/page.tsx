"use client";

import BoardList from "@/components/home/boardList";
import SigninBtn from "@/components/home/signinBtn";
import TalkAI from "@/components/home/talkAI";
import TodayPost from "@/components/home/todayPost";
import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import useSWR from "swr";

const fetcher = (url: string) =>
  axios.get(url).then((response) => response.data);

const Home = () => {
  const { data: session } = useSession();
  const { data, error } = useSWR("/api/myPage/setting", fetcher);
  // console.log(data);

  useEffect(() => {
    if (error) {
      console.log("home GET 클라이언트에서 오류 발생", error);
    }
  }, []);

  return (
    <div className="space-y-16 mb-10 dark:bg-slate-800 dark:text-white">
      <div className="flex items-center justify-between mt-4 px-6">
        <div className="flex flex-col items-start">
          <h1 className="font-semibold">
            {session
              ? data
                ? `${data}님, 안녕하세요!`
                : `${session.user?.name}님, 안녕하세요!`
              : "안녕하세요!"}
          </h1>
          <p className="text-sm">오늘은 어떤 하루를 보내셨나요?</p>
        </div>
        <Link
          href="/myPage/alarm"
          className="bg-slate-200 p-2 rounded-full hover:bg-slate-300 transition-colors"
        >
          <Image src="/notifications.png" alt="알림" width={30} height={30} />
        </Link>
      </div>
      <div className="bg-green-500 mx-6 rounded-3xl shadow-xl p-5 space-y-2">
        <div className="space-y-2 text-sm">
          <p>오늘 하루는 잘 보내셨나요?</p>
          <p className="tracking-tight">
            혹시 오늘 스트레스를 많이 받지는 않으셨나요?
          </p>
          <p>혼자 해결하기 힘든 고민이 생기셨나요?</p>
          <p>그럼 여기서 이야기를 맘껏 나눠봐요!</p>
          <SigninBtn />
        </div>
      </div>
      <BoardList />
      <TodayPost />
      <TalkAI />
    </div>
  );
};

export default Home;
