import Image from "next/image";

const ProfileCard = () => {
  const dummyData = [
    {
      id: "mck1221",
      role: "일반회원",
      introduce: "안녕하세요? 오랜 취준기간을 거닐고 있습니다. 다같이 힘내요!",
    },
  ];

  return (
    <div className="bg-white overflow-hidden rounded-3xl w-full h-72 shadow-xl">
      <div className="bg-green-500 h-20"></div>
      <div className="rounded-3xl py-6 bg-white relative -top-5">
        {dummyData.map((data, i) => (
          <div
            key={i}
            className="flex flex-col items-start space-y-4 absolute p-2 px-4 -top-8"
          >
            <Image
              src="/user.png"
              alt="프로필"
              width={50}
              height={50}
              className="p-2 bg-slate-300 rounded-full ml-2"
            />
            <div className="flex items-center justify-between w-full select-none">
              <h1 className="font-bold">{data.id}</h1>
              <p className="text-sm text-gray-500">{data.role}</p>
            </div>
            <div className="flex flex-col space-y-10 items-start">
              <p className="font-medium text-sm">{data.introduce}</p>
              <div className="flex items-center justify-end w-full space-x-3">
                <button className="greenBtn">
                  자기소개 수정
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileCard;
