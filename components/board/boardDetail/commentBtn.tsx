import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { btnClickEffect } from "@/lib/style";
import Image from "next/image";

const CommentBtn = (props: any) => {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <button className={btnClickEffect}>
          <Image src="/comment.png" alt="댓글" width={25} height={25} />
        </button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="w-full h-[35rem]">
          <DrawerHeader>
            <DrawerTitle>댓글</DrawerTitle>
          </DrawerHeader>
          <div className="flex flex-col items-start justify-between h-[90%]">
            <div className="grid grid-cols-1 items-start space-y-6 px-4 divide-y pt-2 w-full">
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center space-x-3">
                  <Image
                    src="/user.png"
                    alt="프로필"
                    width={40}
                    height={40}
                    className="p-2 bg-slate-300 rounded-full"
                  />
                  <div className="flex flex-col items-start">
                    <h1 className="font-semibold text-sm">바위별</h1>
                    <p className="text-sm">공감해요</p>
                  </div>
                </div>
                <button>
                  <Image
                    src="/menu.png"
                    alt="메뉴"
                    width={30}
                    height={30}
                    className="p-1 rounded-full hover:bg-slate-300 transition-colors"
                  />
                </button>
              </div>
            </div>
            <div className="border-t w-full px-4">
              <div className="flex items-center space-x-2 py-3">
                <Image
                  src="/user.png"
                  alt="프로필"
                  width={40}
                  height={40}
                  className="p-2 bg-slate-300 rounded-full"
                />
                <form className="flex items-center space-x-3 w-full">
                  <input
                    type="text"
                    name="comment"
                    placeholder="댓글 입력"
                    className="border px-4 py-1.5 rounded-3xl w-full"
                  />
                  <button className="bg-blue-200 hover:bg-blue-300 px-2 py-1 rounded-3xl transition-colors">
                    <Image
                      src="/up-arrow.png"
                      alt="화살표"
                      width={30}
                      height={30}
                    />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default CommentBtn;
