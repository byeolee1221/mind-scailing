"use client";

import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { mutate } from "swr";

interface IView {
  id: string;
}

const ViewCount = (props: IView) => {
  const [view, setView] = useState(0);
  mutate("/api/board/view");

  useEffect(() => {
    const fetchView = async () => {
      try {
        const response = await axios.post("/api/board/view", {
          id: props.id,
        });

        if (response.status === 200) {
          setView(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchView();
  }, []);

  return (
    <div className="flex items-center space-x-2">
      <Image
        src="/view.png"
        alt="조회"
        width={20}
        height={20}
        className="select-none dark:invert"
      />
      <span className="text-sm">{view}</span>
    </div>
  );
};

export default ViewCount;
