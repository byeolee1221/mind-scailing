"use client";

import NavBar from "@/components/navBar";
import Image from "next/image";

const PostDetail = () => {
  return (
    <NavBar title="게시글" hasTabBar pageBack>
      <div className="px-6 mt-4 space-y-6 mb-10">
        <div className="flex flex-col items-start space-y-3">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center space-x-2">
              <Image
                src="/user.png"
                alt="프로필"
                width={40}
                height={40}
                className="p-2 bg-slate-300 rounded-full"
              />
              <div className="flex flex-col items-start">
                <h1 className="text-sm font-semibold">바위별</h1>
                <p className="text-xs text-gray-500">2024-03-03</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Image
                  src="/view.png"
                  alt="조회"
                  width={20}
                  height={20}
                  className="select-none"
                />
                <span className="text-sm">220</span>
              </div>
              <button>
                <Image
                  src="/menu.png"
                  alt="메뉴"
                  width={30}
                  height={30}
                  className="hover:bg-slate-300 p-1 rounded-full"
                />
              </button>
            </div>
          </div>
          <div className="flex flex-col space-y-2">
            <Image
              src="/ai.png"
              alt="사진"
              width={400}
              height={100}
              className="bg-slate-300 rounded-lg"
            />
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Image src="/like.png" alt="좋아요" width={25} height={25} />
                <Image src="/comment.png" alt="댓글" width={25} height={25} />
                <Image src="/paper.png" alt="DM" width={25} height={25} />
              </div>
              <div className="flex items-center space-x-3 text-sm text-gray-500 select-none">
                <p>좋아요 220개</p>
                <p>댓글 12개</p>
              </div>
            </div>
            <p>안녕하세요.</p>
          </div>
        </div>
      </div>
    </NavBar>
  );
};

export default PostDetail;
