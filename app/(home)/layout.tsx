import NavBar from "@/components/navBar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "마인드스케일링",
};

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  
  return (
    <NavBar title="홈" hasTabBar>{children}</NavBar>  
  );
}

export default HomeLayout;