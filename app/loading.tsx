import Image from "next/image";

const Loading = () => {
  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <Image
        src="/restart.png"
        alt="로딩"
        width={50}
        height={50}
        className="rounded-full animate-spin"
      />
      <p className="text-sm lg:text-lg">잠시만 기다려주세요!</p>
    </div>
  );
};

export default Loading;
