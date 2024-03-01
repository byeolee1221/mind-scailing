"use client"

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
    { link: "/", imageSrc: "/home.png", imageAlt: "홈", className: "p-3" },
    {
      link: "/board/job",
      imageSrc: "/community.png",
      imageAlt: "게시판",
      className: "p-3",
    },
    {
      link: "/searchPost",
      imageSrc: "/search.png",
      imageAlt: "검색",
      className:
        "p-3 bg-green-500 hover:bg-green-600 rounded-xl shadow-md transition-colors",
    },
    {
      link: "/reservation",
      imageSrc: "/business.png",
      imageAlt: "예약현황",
      className: "p-3",
    },
    {
      link: "/myPage",
      imageSrc: "/user.png",
      imageAlt: "프로필",
      className: "p-3",
    },
  ];

  const onClickBack = () => {
    router.back();
  }

  return (
    <div>
      <div
        className={cls(
          "bg-white w-full text-lg font-medium px-10 py-3 fixed text-gray-900 border-b top-0 flex items-center max-w-xl z-20",
          pageBack ? "justify-between" : "justify-center"
        )}
      >
        {pageBack ? (
          <button onClick={onClickBack} className="border p-1 rounded-lg shadow-sm hover:bg-slate-100 transition-colors">
            <Image src="/back.png" alt="뒤로가기" width={20} height={20} />
          </button>
        ) : (
          ""
        )}
        <div className="flex items-center justify-center">
          <span className="font-semibold text-center">{title}</span>
        </div>
        {pageBack ? <div className="w-8 h-8" /> : null}
      </div>
      <div className={cls("pt-14", hasTabBar ? "pb-20" : "")}>{children}</div>
      <nav className="bg-white text-gray-800 border-t fixed bottom-0 pb-5 pt-3 flex justify-around items-center max-w-xl w-full">
        {navBarMenu.map((item, i) => (
          <Link key={i} href={item.link} className={item.className}>
            <Image
              src={item.imageSrc}
              alt={item.imageAlt}
              width={25}
              height={25}
            />
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default NavBar;
