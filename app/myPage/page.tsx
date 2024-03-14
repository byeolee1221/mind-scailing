import MypageMenu from "@/components/myPage/myPageMenu";
import ProfileCard from "@/components/myPage/profileCard";
import NavBar from "@/components/navBar";
import StoreProvider from "../storeProvider";

const MyPage = () => {
  return (
    <NavBar title="내 프로필" pageBack hasTabBar>
      <StoreProvider>
        <div className="flex flex-col space-y-16 items-start mt-4 mb-10">
          <ProfileCard />
          <MypageMenu />
        </div>
      </StoreProvider>
    </NavBar>
  );
};

export default MyPage;
