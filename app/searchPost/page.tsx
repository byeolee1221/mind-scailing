"use client";

import { useState } from "react";
import NavBar from "@/components/navBar";
import Search from "@/components/searchPost/search";
import axios from "axios";
import useSWR from "swr";

const fetcher = (url: string) =>
  axios.get(url).then((response) => response.data);

const SearchPost = () => {
  const [isSearch, setIsSearch] = useState(false);
  const { data, error } = useSWR("/api/search", fetcher);

  return (
    <div className="w-full space-y-2">
      <NavBar title="검색" hasTabBar pageBack>
        <Search />
      </NavBar>
    </div>
  );
};

export default SearchPost;
