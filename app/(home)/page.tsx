"use client";

import BoardList from "@/components/home/boardList";
import SigninBtn from "@/components/home/signinBtn";
import TalkAI from "@/components/home/talkAI";
import TodayPost from "@/components/home/todayPost";
import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import useSWR from "swr";

const fetcher = (url: string) =>
  axios.get(url).then((response) => response.data);

const Home = () => {
  const { data: session } = useSession();
  const { data, error } = useSWR("/api/myPage/setting", fetcher, {
    refreshInterval: 0,
  });
  const { data: alarmCount } = useSWR("/api/home/alarmCount", fetcher, {
    refreshInterval: 0,
  });
  const [alarmPing, setAlarmPing] = useState(false);
  // console.log(alarmCount, alarmPing);

  useEffect(() => {
    if (error) {
      console.log("home GET 클라이언트에서 오류 발생", error);
    }
  }, []);

  useEffect(() => {
    if (alarmCount) {
      setAlarmPing(true);
    } else {
      setAlarmPing(false);
    }
  }, [alarmCount]);

  return (
    <div className="space-y-16 dark:bg-slate-800 dark:text-white lg:text-lg xl:m-auto max-w-screen-xl">
      <div className="flex items-center justify-between mt-8 xl:mt-16 px-6">
        <div className="flex flex-col items-start">
          <h1 className="font-semibold">
            {session
              ? data
                ? `${data}님, 안녕하세요!`
                : `${session.user?.name}님, 안녕하세요!`
              : "안녕하세요!"}
          </h1>
          <p className="text-sm lg:text-base">오늘은 어떤 하루를 보내셨나요?</p>
        </div>
        <Link
          href="/myPage/alarm"
          className="bg-slate-200 p-2 rounded-full hover:bg-slate-300 transition-colors relative w-10 h-10 lg:w-14 lg:h-14 flex items-center justify-center"
          onSelect={() => setAlarmPing(false)}
        >
          <Image
            src="/notifications.png"
            alt="알림"
            width={30}
            height={30}
            className="lg:w-8 lg:h-8"
          />
          {alarmPing ? (
            <span className="absolute flex h-3 w-3 bottom-7 left-7 lg:bottom-11 lg:left-10">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
            </span>
          ) : null}
        </Link>
      </div>
      <div className="xl:flex xl:items-center xl:justify-between xl:space-x-14 space-y-16 xl:space-y-0 px-6">
        <div className="bg-green-500 mx-6 rounded-3xl shadow-xl p-5 space-y-2 text-sm lg:text-base lg:w-2/5 lg:mx-auto">
          <p>오늘 하루는 잘 보내셨나요?</p>
          <p className="tracking-tight">
            혹시 오늘 스트레스를 많이 받지는 않으셨나요?
          </p>
          <p>혼자 해결하기 힘든 고민이 생기셨나요?</p>
          <p>그럼 여기서 이야기를 맘껏 나눠봐요!</p>
          <SigninBtn />
        </div>
        <BoardList />
      </div>
      <TodayPost />
      <TalkAI />
    </div>
  );
};

export default Home;
