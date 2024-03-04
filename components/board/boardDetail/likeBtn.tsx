"use client";

import { btnClickEffect } from "@/lib/style";
import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";

const LikeBtn = (props: any) => {
  const id = props.id;
  const { data: session } = useSession();

  const onClick = async () => {
    if (session) {
      const response = await axios.post("/api/board/like", {
        id,
        userId: session?.user?.email,
      });
    } else {
      alert("공감하시려면 로그인해주세요.");
    }
  };

  return (
    <>
      <button onClick={onClick} className={btnClickEffect}>
        <Image src="/like.png" alt="좋아요" width={25} height={25} />
      </button>
    </>
  );
};

export default LikeBtn;
