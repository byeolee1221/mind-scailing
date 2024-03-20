"use client";

import Image from "next/image";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

const MypageMenu = () => {
  const { setTheme } = useTheme();

  return (
    <div className="border-t w-full dark:border-white dark:text-white">
      <div className="flex flex-col px-8 py-4 divide-y-[1px] space-y-5">
        <div className="flex items-center justify-between">
          <label htmlFor="dark" className="flex items-center space-x-5">
            <Image src="/moon.png" alt="다크모드" width={30} height={30} />
            <p>다크모드 전환</p>
          </label>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">테마 선택</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme("light")}>
                라이트 모드
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                다크 모드
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>
                기기 설정
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
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
          <Link href="/myPage/alarm">알림</Link>
        </div>
        <div className="flex items-center space-x-5 pt-4">
          <Image src="/setting.png" alt="회원관리" width={30} height={30} />
          <Link href="/myPage/accountSetting">계정관리</Link>
        </div>
      </div>
    </div>
  );
};

export default MypageMenu;
