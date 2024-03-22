"use client";

import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { toast } from "sonner";
import { mutate } from "swr";

const LikeBtn = (props: any) => {
  const id = props.id;
  const { data: session } = useSession();

  const onClick = async () => {
    try {
      const response = await axios.post("/api/board/like", {
        id,
        userId: session?.user?.email,
      });
    } catch (error: any) {
      console.log("LikeBtn POST 클라이언트에서 오류 발생", error);
      return toast("오류 발생", {
        description: error.response.data
      });
    }
  };

  mutate("/api/board/like");

  return (
    <>
      <button onClick={onClick} className="btnClickEffect">
        <Image
          src="/like.png"
          alt="좋아요"
          width={25}
          height={25}
          className="dark:invert"
        />
      </button>
    </>
  );
};

export default LikeBtn;
