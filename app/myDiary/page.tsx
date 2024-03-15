import DiaryWrite from "@/components/myDiary/diaryWrite";
import NavBar from "@/components/navBar";

const MyDiary = () => {
  return (
    <NavBar title="일기장" pageBack hasTabBar>
      <div className="w-full px-6 flex flex-col items-start space-y-5 mb-10 min-h-screen">
        <div className="bg-green-500 p-2 w-full rounded-lg mt-4 text-sm shadow-md leading-6 text-white">
          <p>하루 정리, 분풀이용, 개인적인 계획 등...</p>
          <p>어떠한 용도로 쓰셔도 돼요!</p>
          <p>여러분만의 공간이니 많이 이용해주세요!</p>
        </div>
        <DiaryWrite />
      </div>
    </NavBar>
  );
};

export default MyDiary;
