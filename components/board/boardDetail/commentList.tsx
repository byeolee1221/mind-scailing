"use client";

import axios from "axios";
import { useState } from "react";
import useSWR, { mutate } from "swr";
import CommentMenu from "./commentMenu";
import { useSession } from "next-auth/react";

interface ICommentList {
  avatar: string;
  userName: string;
  userNewName: string;
  userEmail: string;
  comment: string;
  id: number;
  createdAt: string;
  postId: number;
}

interface IProps {
  id: string;
}

const fetcher = (url: string) =>
  axios.get(url).then((response) => response.data);

const CommentList = (props: IProps) => {
  const postId = props.id;
  const { data, error } = useSWR<ICommentList[]>("/api/board/comment", fetcher);
  const [commentError, setCommentError] = useState("");
  const { data: session } = useSession();
  let filteredComment;

  if (error) {
    setCommentError("오류가 발생하여 게시글을 가져오지 못했습니다.");
  }

  if (data) {
    filteredComment = data.filter(
      (comment: ICommentList) => comment.postId === +postId
    );
  }
  mutate("/api/board/comment");

  return (
    <>
      {!error ? (
        <div className="grid grid-cols-1 items-start space-y-4 px-4 divide-y w-full overflow-auto mb-2">
          {filteredComment?.map((comment) => (
            <div
              key={comment.id}
              className="flex items-center justify-between w-full pt-3"
            >
              <div className="flex items-center space-x-3">
                <img src={comment.avatar} className="rounded-full w-10" />
                <div className="flex flex-col items-start">
                  <div className="flex items-center space-x-2">
                    <h1 className="font-semibold text-sm">
                      {comment.userNewName
                        ? comment.userNewName
                        : comment.userName}
                    </h1>
                    <p className="text-gray-500 text-xs">{comment.createdAt}</p>
                  </div>
                  <p className="text-sm">{comment.comment}</p>
                </div>
              </div>
              {session && <CommentMenu id={comment.id} userEmail={comment.userEmail} postId={postId} />}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-red-500 text-center">{commentError}</p>
      )}
    </>
  );
};

export default CommentList;
