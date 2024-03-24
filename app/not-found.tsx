import Image from "next/image";

export const metadata = {
  title: "Not Found",
};

const NotFound = () => {
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center">
      <div className="flex items-center space-x-1">
        <Image src="/404.png" alt="404" width={60} height={60} />
        <div className="flex flex-col space-y-1">
          <h1 className="font-bold">페이지를 찾을 수 없습니다.</h1>
          <p className="text-sm">
            경로가 올바르지 않습니다. 다시 한번 확인해주세요.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
