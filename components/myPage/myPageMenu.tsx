"use client";

import { Switch } from "@/components/ui/switch";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { themeDark, themeLight } from "@/slice/themeSlice";
import Image from "next/image";
import Link from "next/link";

const MypageMenu = () => {
  const dispatch = useAppDispatch();

  const onDark = () => {
    const currentTheme = localStorage.getItem("theme");

    if (currentTheme === "light") {
      localStorage.setItem("theme", "dark");
      dispatch(themeDark());
    } else {
      localStorage.setItem("theme", "light");
      dispatch(themeLight());
    }
  };

  return (
    <div className="border-t w-full dark:border-white dark:text-white">
      <div className="flex flex-col px-8 py-4 divide-y-[1px] space-y-5">
        <div className="flex items-center justify-between">
          <label htmlFor="dark" className="flex items-center space-x-5">
            <Image src="/moon.png" alt="다크모드" width={30} height={30} />
            <p>다크모드 전환</p>
          </label>
          <button onClick={onDark}>
            <Switch id="dark" className="dark:bg-white" />
          </button>
        </div>
        <div className="flex items-center space-x-5 pt-4">
          <Image src="/board.png" alt="게시글" width={30} height={30} />
          <Link href="/myPost">내 글 관리</Link>
        </div>
        <div className="flex items-center space-x-5 pt-4">
          <Image
            src="/myPageHeart.png"
            alt="내가 공감한 글"
            width={30}
            height={30}
          />
          <Link href="/myPage/likePost">내가 공감한 글</Link>
        </div>
        <div className="flex items-center space-x-5 pt-4">
          <Image src="/alarm.png" alt="알림" width={30} height={30} />
          <Link href="">알림</Link>
        </div>
        <div className="flex items-center space-x-5 pt-4">
          <Image src="/setting.png" alt="회원관리" width={30} height={30} />
          <button>회원관리</button>
        </div>
      </div>
    </div>
  );
};

export default MypageMenu;
