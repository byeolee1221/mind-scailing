"use client";

import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import MyIntroduce from "./myIntroduce";
interface IMypage {
  name: string;
  email: string;
  role: string;
  avatar: string;
  id: string;
  introduce: string;
}

const fetcher = (url: string) =>
  axios.get(url).then((response) => response.data);

const ProfileCard = () => {
  const { data } = useSWR<IMypage>("/api/myPage", fetcher);
  const { data: session } = useSession();

  return (
    <div className="bg-white overflow-hidden rounded-3xl w-full h-72 shadow-xl dark:bg-slate-600 dark:text-white">
      <div className="bg-green-500 h-20"></div>
      <div className="rounded-3xl py-6 bg-white dark:bg-slate-600 relative -top-5">
        <div className="flex flex-col items-start space-y-4 absolute p-2 px-4 -top-9 w-full">
          {!session ? (
            <Image
              src="/user.png"
              alt="프로필"
              width={50}
              height={50}
              className="p-2 bg-slate-300 rounded-full ml-2"
            />
          ) : (
            <img
              src={data?.avatar}
              alt="프로필"
              className="w-16 p-2 rounded-full ml-2"
            />
          )}
          <div className="flex items-center justify-between w-full select-none px-4">
            <h1 className="font-bold">
              {session ? data?.name : "로그인해주세요."}
            </h1>
            <p className="text-sm text-gray-500 dark:text-white">
              {session ? (data?.role === "USER" ? "일반회원" : "관리자") : null}
            </p>
          </div>
          <div className="flex flex-col space-y-10 items-start w-full px-4">
            <p className="font-medium text-sm">
              {session
                ? data?.introduce
                : "로그인하시면 자기소개를 확인할 수 있습니다."}
            </p>
            {session && <MyIntroduce />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
