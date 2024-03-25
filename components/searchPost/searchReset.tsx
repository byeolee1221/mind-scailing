import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { mutate } from "swr";

const SearchReset = () => {
  const router = useRouter();
  const onDelete = async () => {
    try {
      const deleteSearch = await axios.delete("/api/search");

      if (deleteSearch.status === 200) {
        router.refresh();
        return toast("초기화 완료", {
          description: "검색 기록이 초기화되었습니다.",
        });
      }
    } catch (error: any) {
      console.log("searchReset DELETE 클라이언트에서 오류 발생", error);
      return toast("오류 발생", {
        description: error.response.data,
      });
    }
  };

  mutate("/api/search");

  return (
    <div className="flex flex-col items-start px-2">
      <h1 className="text-sm lg:text-base text-gray-500 dark:text-gray-300 px-1">
        검색결과 관리
      </h1>
      <button
        onClick={onDelete}
        className="hover:bg-slate-200 dark:hover:bg-slate-600 w-full text-sm lg:text-base py-1 text-start cursor-pointer dark:text-white px-1"
      >
        검색결과 초기화
      </button>
    </div>
  );
};

export default SearchReset;
