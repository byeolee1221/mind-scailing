import { cls } from "@/lib/styleUtil";
import axios from "axios";
import { useEffect, useState } from "react";
import useSWR, { mutate } from "swr";

interface ISearchList {
  id: number;
  search: string;
}

const fetcher = (url: string) =>
  axios.get(url).then((response) => response.data);

const SearchList = () => {
  const { data, error } = useSWR("/api/search", fetcher);
  const [searchError, setSearchError] = useState(false);

  useEffect(() => {
    if (data && data.length === 0) {
      setSearchError(true);
    }
  }, [data]);

  return (
    <>
      {data.map((search: ISearchList) => (
        <p
          key={search.id}
          className={cls(
            "hover:bg-slate-200 w-full cursor-default text-sm py-1",
            error || searchError ? "bg-red-300 hover:bg-red-300" : ""
          )}
        >
          {search.search}
        </p>
      ))}
    </>
  );
};

export default SearchList;
