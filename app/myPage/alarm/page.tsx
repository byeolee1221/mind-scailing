"use client";

import NavBar from "@/components/navBar";
import axios from "axios";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import useSWR from "swr";

interface IAlarm {
  alarmId: number;
  name: string;
  newName: string;
  createdAt: string;
  category: string;
  postCategory: string;
  postId: number;
}

const fetcher = (url: string) =>
  axios.get(url).then((response) => response.data);

const Alarm = () => {
  const { data: session } = useSession();
  const { data, error } = useSWR<IAlarm[]>("/api/myPage/alarm", fetcher);
  const [empty, setEmpty] = useState(false);
  const router = useRouter();
  console.log(data)
  useEffect(() => {
    if (data && data.length === 0) {
      setEmpty(true);
    } else {
      setEmpty(false);
    }
  }, []);

  const onDelete = async (alarmId: number) => {
    const deleteAlarm = await axios.delete("/api/myPage/alarm", {
      data: {
        alarmId,
      },
    });

    if (deleteAlarm.status === 200) {
      alert("알림이 삭제되었습니다.");
      router.refresh();
    }
  };

  // console.log(data);

  return (
    <NavBar title="내 알림" pageBack hasTabBar>
      <div className="w-full min-h-screen divide-y flex flex-col space-y-2 px-2 dark:text-white">
        {empty && (
          <p className="text-center mt-2">받은 알림이 아직 없습니다.</p>
        )}
        {session ? (
          !error ? (
            data?.map((item) => (
              <div key={item.alarmId} className="flex items-center justify-around pt-2">
                <Link
                  href={`/board/${item.postCategory}/${item.postId}`}
                  className="flex flex-col"
                >
                  <p className="text-sm">{item?.createdAt}</p>
                  <p className="text-sm">
                    <span className="font-semibold">{item.newName ? item.newName : item.name}</span>
                    {item.category === "댓글" &&
                      "님이 회원님의 게시글에 댓글을 남겼습니다."}
                    {item.category === "공감" &&
                      "님이 회원님의 게시글에 공감을 눌렀습니다."}
                  </p>
                </Link>
                <button
                  onClick={() => onDelete(item.alarmId)}
                  className="border p-2 rounded-md shadow-sm text-sm hover:bg-slate-200 transition-colors dark:border-white dark:bg-green-600 dark:hover:bg-green-700"
                >
                  삭제
                </button>
              </div>
            ))
          ) : (
            <p className="text-center">
              오류가 발생하여 알림을 불러오지 못했습니다.
            </p>
          )
        ) : (
          <p className="text-center mt-4">로그인이 필요한 서비스입니다.</p>
        )}
      </div>
    </NavBar>
  );
};

export default Alarm;
