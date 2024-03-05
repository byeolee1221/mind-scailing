import Image from "next/image";

const Loading = () => {
  return (
    <div className="h-screen flex justify-center items-center">
      <Image
        src="/restart.png"
        alt="로딩"
        width={50}
        height={50}
        className="rounded-full animate-spin"
      />
    </div>
  );
};

export default Loading;
