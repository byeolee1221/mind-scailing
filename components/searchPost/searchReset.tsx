import axios from "axios";

const SearchReset = () => {
  const onDelete = async () => {
    const req = await axios.delete("/api/search");
  };

  return (
    <div className="flex flex-col items-start px-2">
      <h1 className="text-sm text-gray-500">검색결과 관리</h1>
      <button
        onClick={onDelete}
        className="hover:bg-slate-200 w-full text-sm py-1 text-start cursor-pointer"
      >
        검색결과 초기화
      </button>
    </div>
  );
};

export default SearchReset;
