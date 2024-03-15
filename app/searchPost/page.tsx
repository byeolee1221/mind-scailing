import NavBar from "@/components/navBar";
import Search from "@/components/searchPost/search";

const SearchPost = () => {
  return (
    <div className="w-full space-y-2">
      <NavBar title="검색" hasTabBar pageBack>
        <Search />
      </NavBar>
    </div>
  );
};

export default SearchPost;
