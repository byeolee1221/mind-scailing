"use client";

import NavBar from "@/components/navBar";
import axios from "axios";
import Image from "next/image";
import { useParams } from "next/navigation";
import useSWR from "swr";

interface INoticeDetail {
  id: string;
  title: string;
  notice: string;
  formattedDate: string;
}

const fetcher = (url: string) =>
  axios.get(url).then((response) => response.data);

const NoticeDetail = () => {
  const params = useParams<{ id: string }>();
  const id = params.id;
  const { data, error } = useSWR<INoticeDetail>(
    `/api/notice/noticeDetail?noticeId=${id}`,
    fetcher,
    { refreshInterval: 0 }
  );
  // console.log(data);

  return (
    <NavBar title="공지사항" hasTabBar pageBack>
      {!error ? (
        <div className="flex flex-col space-y-5 min-h-screen max-w-screen-lg mt-8 px-6 xl:w-4/5 xl:m-auto xl:mt-16">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Image
                src="/icon.png"
                alt="로고"
                width={40}
                height={40}
                className="bg-blue-100 p-2 rounded-full"
              />
              <div className="flex flex-col">
                <h1 className="font-semibold text-sm">마인드스케일링</h1>
                <p className="text-gray-500 text-xs">{data?.formattedDate}</p>
              </div>
            </div>
            <button>
              <Image
                src="/menu.png"
                alt="메뉴"
                width={20}
                height={20}
                className="dark:invert"
              />
            </button>
          </div>
          <h2 className="font-semibold border-b dark:border-gray-500 pb-1">
            {data?.title}
          </h2>
          <p className="text-sm">{data?.notice}</p>
        </div>
      ) : (
        <p className="text-center text-lg min-h-screen max-w-screen-lg mt-8 px-6 xl:w-4/5 xl:m-auto xl:mt-16">
          오류가 발생하여 공지사항을 불러오지 못했습니다.
        </p>
      )}
    </NavBar>
  );
};

export default NoticeDetail;
