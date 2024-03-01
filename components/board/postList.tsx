import Image from "next/image";
import Link from "next/link";

const PostList = () => {
  const dummyData = [
    {
      name: "hong1125",
      uploadTime: 1,
      postPreview: "설날에 잔소리 들은 게 아직도 안잊혀져요..",
      commentCount: 16,
      view: 222,
      like: 35,
    },
    {
      name: "imdayeong99",
      uploadTime: 2,
      postPreview: "흰색 옷 변색된 거 해결방법 아시는 분~",
      commentCount: 10,
      view: 187,
      like: 40,
    },
    {
      name: "moon0221",
      uploadTime: 2,
      postPreview:
        "스트레스 때문에 잠을 잘못 잤나봐요.. 어깨가 하루종일 아프네요 ㅜ",
      commentCount: 7,
      view: 58,
      like: 79,
    },
    {
      name: "keyoflife111",
      uploadTime: 10,
      postPreview: "스트레스 풀 곳 없어서 여기에 좀 풀어봅니당..",
      commentCount: 23,
      view: 867,
      like: 112,
    },
  ];

  return (
    <>
      {dummyData.map((data, i) => (
        <Link
          key={i}
          href=""
          className="flex flex-col items-start p-3 space-y-5 border-2 border-green-500 rounded-md shadow-sm"
        >
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center space-x-2">
              <Image
                src="/user.png"
                alt="프로필"
                width={40}
                height={40}
                className="bg-slate-300 p-2 rounded-full"
              />
              <div className="flex flex-col items-start">
                <h1 className="font-semibold text-sm">{data.name}</h1>
                <p className="text-xs text-gray-500">
                  {data.uploadTime}시간 전
                </p>
              </div>
            </div>
            <button className="hover:bg-slate-300 p-1 rounded-full transition-colors">
              <Image src="/menu.png" alt="메뉴" width={20} height={20} />
            </button>
          </div>
          <p className="text-sm h-10 text-ellipsis overflow-hidden">
            {data.postPreview}
          </p>
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center space-x-2">
                <Image src="/like.png" alt="좋아요" width={20} height={20} />
                <span className="font-semibold text-sm">공감</span>
                <span className="bg-slate-200 px-1 rounded-sm shadow-sm select-none text-sm">
                  {data.like}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Image src="/comment.png" alt="댓글" width={20} height={20} />
                <span className="font-semibold text-sm">댓글</span>
                <span className="bg-slate-200 px-1 rounded-sm shadow-sm select-none text-sm">
                  {data.commentCount}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Image src="/view.png" alt="조회" width={20} height={20} />
                <span className="bg-slate-200 px-1 rounded-sm shadow-sm select-none text-sm">
                  {data.view}
                </span>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </>
  );
};

export default PostList;
