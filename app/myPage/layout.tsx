import { Metadata } from "next";

export const metadata: Metadata = {
  title: "내 프로필",
};

const MyPageLayout = ({ children }: { children: React.ReactNode }) => {
  return children;
};

export default MyPageLayout;
