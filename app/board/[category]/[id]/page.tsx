"use client";

import NavBar from "@/components/navBar";
import axios from "axios";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import useSWR from "swr";

interface IUser {
  name: string;
  image: string;
}
interface IPostDetail {
  id: number;
  category: string;
  post: string;
  file: string | null;
  commentCount: number;
  view: number;
  like: number;
  user: IUser;
}

interface IPost {
  createdAt: number;
  data: IPostDetail;
}

const PostDetail = () => {
  const params = useParams<{ id: string }>();
  const [post, setPost] = useState<IPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const id = params.id;
  // console.log(post);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.post("/api/board/boardDetail", {
        id,
      });

      if (response.status === 200) {
        setPost(response.data);
      }
      setIsLoading(false);
    };

    fetchData();
  }, []);

  return (
    <NavBar title="게시글" hasTabBar pageBack>
      {!isLoading ? (
        <div className="px-6 mt-4 space-y-6 mb-10">
          <div className="flex flex-col items-start space-y-3">
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center space-x-2">
                <img
                  src={post?.data.user.image}
                  className="rounded-full w-10"
                />
                <div className="flex flex-col items-start">
                  <h1 className="text-sm font-semibold">
                    {post?.data.user.name}
                  </h1>
                  <p className="text-xs text-gray-500">{post?.createdAt}</p>
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
                  <span className="text-sm">{post?.data.view}</span>
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
                className="bg-slate-300 rounded-lg shadow-sm"
              />
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Image src="/like.png" alt="좋아요" width={25} height={25} />
                  <Image src="/comment.png" alt="댓글" width={25} height={25} />
                  <Image src="/paper.png" alt="DM" width={25} height={25} />
                </div>
                <div className="flex items-center space-x-3 text-sm text-gray-500 select-none">
                  <p>공감 {post?.data.like}개</p>
                  <p>댓글 {post?.data.commentCount}개</p>
                </div>
              </div>
              <p className="whitespace-pre-line">{post?.data.post}</p>
            </div>
          </div>
        </div>
      ) : (
        <p className="h-screen flex items-center justify-center">
          게시글을 불러오고 있습니다.
        </p>
      )}
    </NavBar>
  );
};

export default PostDetail;
