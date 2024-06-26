"use client";

import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { mutate } from "swr";

interface IProps {
  id: string;
}

const LikeBtn = (props: IProps) => {
  const id = props.id;
  const router = useRouter();

  const onClick = async () => {
    try {
      const response = await axios.post("/api/board/like", {
        id,
      });

      if (response.status === 200) {
        router.refresh();
        return toast("공감 완료", {
          description: "화면에 반영되지 않으면 새로고침을 해주세요.",
        });
      }
    } catch (error: any) {
      console.log("LikeBtn POST 클라이언트에서 오류 발생", error);
      return toast("오류 발생", {
        description: error.response.data,
      });
    }
  };

  mutate("/api/board/like");

  return (
    <>
      <button onClick={onClick} className="btnClickEffect">
        <Image
          src="/like.png"
          alt="공감"
          width={25}
          height={25}
          className="dark:invert lg:w-6"
        />
      </button>
    </>
  );
};

export default LikeBtn;
