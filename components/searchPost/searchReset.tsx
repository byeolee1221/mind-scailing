import axios from "axios";
import { useRouter } from "next/navigation";

const SearchReset = () => {
  const router = useRouter();
  const onDelete = async () => {
    const deleteSearch = await axios.delete("/api/search");
  };

  return (
    <div className="flex flex-col items-start px-2">
      <h1 className="text-sm text-gray-500 dark:text-gray-300 px-1">
        검색결과 관리
      </h1>
      <button
        onClick={onDelete}
        className="hover:bg-slate-200 dark:hover:bg-slate-600 w-full text-sm py-1 text-start cursor-pointer dark:text-white px-1"
      >
        검색결과 초기화
      </button>
    </div>
  );
};

export default SearchReset;
