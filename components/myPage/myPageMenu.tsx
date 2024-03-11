import { Switch } from "@/components/ui/switch";
import Image from "next/image";
import Link from "next/link";

const MypageMenu = () => {
  return (
    <div className="border-t w-full">
      <div className="flex flex-col px-8 py-4 divide-y-[1px] space-y-5">
        <div className="flex items-center justify-between">
          <label htmlFor="dark" className="flex items-center space-x-5">
            <Image src="/moon.png" alt="다크모드" width={30} height={30} />
            <p>다크모드 전환</p>
          </label>
          <Switch id="dark" />
        </div>
        <div className="flex items-center space-x-5 pt-4">
          <Image src="/board.png" alt="게시글" width={30} height={30} />
          <button>내 글 관리</button>
        </div>
        <div className="flex items-center space-x-5 pt-4">
          <Image
            src="/myPageHeart.png"
            alt="내가 좋아요한 글"
            width={30}
            height={30}
          />
          <button>내가 좋아요한 글</button>
        </div>
        <div className="flex items-center space-x-5 pt-4">
          <Image src="/alarm.png" alt="알림" width={30} height={30} />
          <Link href="">알림</Link>
        </div>
        <div className="flex items-center space-x-5 pt-4">
          <Image src="/setting.png" alt="환경설정" width={30} height={30} />
          <button>회원관리</button>
        </div>
      </div>
    </div>
  );
};

export default MypageMenu;
