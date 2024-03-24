import Image from "next/image";
import Link from "next/link";

interface IBoardList {
  route: string;
  fileName: string;
  alt: string;
  text: string;
}

const BoardList = () => {
  const boardArr: IBoardList[] = [
    {
      route: "/board/daily",
      fileName: "/daily.png",
      alt: "일상",
      text: "일상",
    },
    {
      route: "/board/company",
      fileName: "/job.png",
      alt: "직장",
      text: "직장",
    },
    {
      route: "/board/employment",
      fileName: "/employment.png",
      alt: "취업",
      text: "취업",
    },
    {
      route: "/board/study",
      fileName: "/study.png",
      alt: "학업",
      text: "학업",
    },
    {
      route: "/board/health",
      fileName: "/health.png",
      alt: "건강",
      text: "건강",
    },
    {
      route: "/board/relationship",
      fileName: "/relationship.png",
      alt: "관계",
      text: "관계",
    },
  ];

  return (
    <div className="flex flex-col items-start px-6">
      <h1 className="font-bold">이야기 공간</h1>
      <p className="text-gray-500 text-sm lg:text-xl">
        고민을 나누고 이야기하며 기분을 풀어봐요
      </p>
      <div className="flex items-center justify-around mt-4 w-full">
        {boardArr.map((item, i) => (
          <Link
            key={i}
            href={item.route}
            className="flex flex-col items-center space-y-2"
          >
            <Image
              src={item.fileName}
              alt={item.alt}
              width={45}
              height={45}
              className="bg-slate-200 hover:bg-slate-300 rounded-full p-2 transition-colors lg:w-20"
            />
            <p className="text-sm lg:text-xl">{item.text}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BoardList;
