import BoardList from "@/components/home/boardList";
import SigninBtn from "@/components/home/signinBtn";
import TalkAI from "@/components/home/talkAI";
import TodayPost from "@/components/home/todayPost";
import NavBar from "@/components/navBar";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Image from "next/image";

const Home = async () => {
  const session = await getServerSession(authOptions);

  return (
    <NavBar title="홈" hasTabBar>
      <div className="space-y-16 mb-10">
        <div className="flex items-center justify-between mt-4 px-6">
          <div className="flex flex-col items-start">
            <h1 className="font-semibold">
              {session ? `${session.user?.name}님, 안녕하세요!` : "안녕하세요!"}
            </h1>
            <p className="text-sm">오늘은 어떤 하루를 보내셨나요?</p>
          </div>
          <button className="bg-slate-200 p-2 rounded-full hover:bg-slate-300 transition-colors">
            <Image src="/notifications.png" alt="알림" width={30} height={30} />
          </button>
        </div>
        <div className="bg-green-500 mx-6 rounded-3xl shadow-xl p-5 space-y-2">
          <div className="space-y-2 text-sm">
            <p>오늘 하루는 잘 보내셨나요?</p>
            <p className="tracking-tight">
              혹시 오늘 스트레스를 많이 받지는 않으셨나요?
            </p>
            <p>혼자 해결하기 힘든 고민이 생기셨나요?</p>
            <p>그럼 여기서 이야기를 맘껏 나눠봐요!</p>
            <SigninBtn />
          </div>
        </div>
        <BoardList />
        <TodayPost />
        <TalkAI />
      </div>
    </NavBar>
  );
};

export default Home;
