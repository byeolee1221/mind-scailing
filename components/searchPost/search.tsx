import { useState } from "react";
import { useForm } from "react-hook-form";
import { searchSchema } from "@/app/searchPost/constants";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import Image from "next/image";
import SearchList from "./searchList";
import SearchReset from "./searchReset";

const Search = () => {
  const [isSearch, setIsSearch] = useState(false);
  const form = useForm<z.infer<typeof searchSchema>>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      search: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof searchSchema>) => {
    try {
      const fetchSearch = await axios.post("/api/search", {
        search: values.search,
      });

      if (fetchSearch.status === 200) {
        setIsSearch(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full">
      <div className="flex flex-col items-start space-y-1">
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
          <div className="flex items-center space-x-1 pl-2 border-b">
            <Image src="/searchPost.png" alt="검색" width={20} height={20} />
            <input
              {...form.register("search")}
              type="text"
              name="search"
              placeholder="검색할 내용을 입력하세요."
              className="w-full p-2 text-sm focus:outline-none"
            />
            <button type="submit" className="hidden"></button>
          </div>
        </form>
        {isSearch ? (
          <div className="w-full flex flex-col space-y-1 px-1">
            <div className="flex flex-col items-start border-b pb-1.5 px-2">
              <h1 className="text-sm text-gray-500">검색결과</h1>
              <SearchList />
            </div>
            <SearchReset />
          </div>
        ) : (
          <p className="text-sm text-center w-full pt-1">
            검색결과가 없습니다.
          </p>
        )}
      </div>
    </div>
  );
};

export default Search;
