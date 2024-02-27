import Image from "next/image";
import Link from "next/link";

interface ITodayPost {
  userId: string;
  contents: string;
  commentCount: number;
  view: number;
  uploadTime: number;
  avatar: string;
}

const TodayPost = () => {
  const dummyData: ITodayPost[] = [
    {
      userId: "hong1125",
      contents:
        "취업이 안되서 너무 힘들어요.. 다른 분들은 취준기간이 어떻게 되시나요?",
      commentCount: 16,
      view: 222,
      uploadTime: 1,
      avatar: "/user.png",
    },
    {
      userId: "imdayeong99",
      contents:
        "왜 이렇게 힘들어졌을까요? 이건 취준생 개개인의 문제가 아니잖아요 ㅜㅜ",
      commentCount: 10,
      view: 187,
      uploadTime: 2,
      avatar: "/user.png",
    },
    {
      userId: "moon0221",
      contents: "회사에서 상사가 이런식으로 말해도 되는건가요?",
      commentCount: 7,
      view: 58,
      uploadTime: 2,
      avatar: "/user.png",
    },
    {
      userId: "keyoflife111",
      contents: "갈수록 힘듭니다..진심 이건 좀 아닌 것 같아요. 어쩌라는 거죠?",
      commentCount: 23,
      view: 867,
      uploadTime: 10,
      avatar: "/user.png",
    },
  ];

  return (
    <div className="flex flex-col items-start px-6">
      <h1 className="font-bold">오늘의 고민 글</h1>
      <p className="text-sm text-gray-500">
        고민을 함께하고 위로나 격로를 해주세요.
      </p>
      <div className="grid grid-cols-2 gap-x-5">
        {dummyData.map((data, i) => (
          <Link
            key={i}
            href=""
            className="flex flex-col items-start space-y-2 bg-green-500 w-full rounded-xl shadow-xl p-3 mt-5"
          >
            <div className="flex items-center">
              <Image
                src={data.avatar}
                alt="프로필"
                width={35}
                height={35}
                className="bg-white rounded-full p-2"
              />
              <div className="ml-2">
                <h2 className="font-semibold text-xs">{data.userId}</h2>
                <p className="text-gray-500 text-xs">
                  {data.uploadTime}시간 전
                </p>
              </div>
            </div>
            <p className="text-sm border-b-2 border-green-600 pb-2 h-16 text-ellipsis overflow-hidden">
              {data.contents}
            </p>
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center space-x-2">
                <Image src="/comment.png" alt="댓글" width={20} height={20} />
                <p className="text-sm">{data.commentCount}</p>
              </div>
              <div className="flex items-center space-x-2">
                <Image src="/view.png" alt="조회" width={20} height={20} />
                <p className="text-sm">{data.view}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TodayPost;
