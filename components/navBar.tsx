"use client";

import { cls } from "@/lib/styleUtil";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface INavbar {
  title: string;
  pageBack?: boolean;
  hasTabBar?: boolean;
  children: React.ReactNode;
}

const NavBar = ({ title, pageBack, hasTabBar, children }: INavbar) => {
  const router = useRouter();

  const navBarMenu = [
    {
      link: "/",
      imageSrc: "/home.png",
      imageAlt: "홈",
      menuName: "메인페이지",
      shortName: "홈",
      className: "p-3 dark:invert xl:dark:invert-0 xl:dark:text-white",
    },
    {
      link: "/myPost",
      imageSrc: "/post.png",
      imageAlt: "내 글",
      menuName: "내 글 확인하기",
      shortName: "내 글",
      className: "p-3 dark:invert xl:dark:invert-0 xl:dark:text-white",
    },
    {
      link: "/searchPost",
      imageSrc: "/search.png",
      imageAlt: "검색",
      menuName: "게시물 검색",
      shortName: "검색",
      className:
        "p-3 bg-green-500 xl:bg-inherit hover:bg-green-600 xl:hover:bg-inherit rounded-xl xl:rounded-none shadow-md xl:shadow-none transition-colors xl:dark:text-white",
    },
    {
      link: `/myDiary`,
      imageSrc: "/diary.png",
      imageAlt: "나만의 일기장",
      menuName: "나만의 일기장",
      shortName: "일기장",
      className: "p-3 dark:invert xl:dark:invert-0 xl:dark:text-white",
    },
    {
      link: "/myPage",
      imageSrc: "/user.png",
      imageAlt: "프로필",
      menuName: "프로필",
      shortName: "프로필",
      className: "p-3 dark:invert xl:dark:invert-0 xl:dark:text-white",
    },
  ];

  const onClickBack = () => {
    router.back();
  };

  return (
    <div>
      <div
        className={cls(
          "bg-white w-full text-lg lg:text-xl font-medium px-10 py-3 fixed text-gray-900 border-b top-0 flex items-center z-30 dark:bg-slate-800 dark:text-white dark:border-gray-900",
          pageBack ? "justify-between" : "justify-center"
        )}
      >
        {pageBack ? (
          <button
            onClick={onClickBack}
            className="border p-1 rounded-lg shadow-sm hover:bg-slate-100 transition-colors dark:border-white"
          >
            <Image
              src="/back.png"
              alt="뒤로가기"
              width={20}
              height={20}
              className="dark:invert lg:w-5 lg:h-5"
            />
          </button>
        ) : (
          ""
        )}
        <div className="flex items-center justify-center">
          <span className="font-semibold text-center">{title}</span>
        </div>
        {pageBack ? <div className="w-8 h-8" /> : null}
      </div>
      <nav className="bg-white text-gray-800 border-b fixed top-10 pt-4 hidden xl:flex items-center justify-center space-x-5 w-full dark:bg-slate-800 xl:dark:bg-none dark:border-gray-900 z-20">
        {navBarMenu.map((item, i) => (
          <Link key={i} href={item.link} className={item.className}>
            {item.menuName}
          </Link>
        ))}
      </nav>
      <div
        className={cls(
          "pt-14 dark:bg-slate-800",
          hasTabBar ? "pb-10 dark:bg-slate-800" : ""
        )}
      >
        {children}
      </div>
      <nav className="bg-white text-gray-800 border-t fixed bottom-0 pb-5 pt-3 flex justify-around items-center w-full dark:bg-slate-800 dark:border-gray-900 xl:hidden">
        {navBarMenu.map((item, i) => (
          <div key={i} className="flex flex-col items-center space-y-1">
            <Link href={item.link} className={item.className}>
              <Image
                src={item.imageSrc}
                alt={item.imageAlt}
                width={25}
                height={25}
                className="lg:w-10"
              />
            </Link>
            <h2 className="text-xs font-semibold dark:text-white">
              {item.shortName}
            </h2>
          </div>
        ))}
      </nav>
    </div>
  );
};

export default NavBar;
