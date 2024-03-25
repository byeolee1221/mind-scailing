"use client";

import DiaryWrite from "@/components/myDiary/diaryWrite";
import NavBar from "@/components/navBar";
import Providers from "../reduxProvider";
import DiaryList from "@/components/myDiary/diaryList";

const MyDiary = () => {
  return (
    <Providers>
      <NavBar title="일기장" pageBack hasTabBar>
        <div className="w-full px-6 lg:px-12 flex flex-col items-start space-y-5 mb-10 min-h-screen">
          <div className="bg-green-500 p-2 w-full rounded-lg mt-8 text-sm lg:text-lg shadow-md leading-6 text-white lg:w-2/5 lg:mx-auto">
            <p>하루 정리, 분풀이용, 개인적인 계획 등...</p>
            <p>어떠한 용도로 쓰셔도 돼요!</p>
            <p>여러분만의 공간이니 많이 이용해주세요!</p>
          </div>
          <DiaryWrite />
          <DiaryList />
        </div>
      </NavBar>
    </Providers>
  );
};

export default MyDiary;
