"use client";

import PostList from "@/components/board/postList";
import ShortPost from "@/components/board/shortPost";
import Write from "@/components/board/write";
import NavBar from "@/components/navBar";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const Board = () => {
  const pathname = usePathname();
  const [name, setName] = useState("");
  const { data: session } = useSession();

  useEffect(() => {
    const nameMapping: Record<string, string> = {
      "/board/daily": "일상고민 커뮤니티",
      "/board/company": "직장고민 커뮤니티",
      "/board/employment": "취업고민 커뮤니티",
      "/board/study": "학업고민 커뮤니티",
      "/board/health": "건강고민 커뮤니티",
    };

    setName(nameMapping[pathname] || "관계고민 커뮤니티");
  }, [pathname]);

  return (
    <NavBar title={name} hasTabBar pageBack>
      <div className="px-6 space-y-6 mt-4 lg:mt-8 mb-10 min-h-screen overflow-auto">
        {session ? (
          <Write />
        ) : (
          <p className="text-center bg-slate-300 p-2 text-sm lg:text-xl rounded-md">
            글을 게시하려면 로그인해주세요.
          </p>
        )}
        <ShortPost />
        <PostList />
      </div>
    </NavBar>
  );
};

export default Board;
