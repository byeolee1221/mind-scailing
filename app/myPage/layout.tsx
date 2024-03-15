import { Metadata } from "next";

export const metadata: Metadata = {
  title: "내 프로필 | Mind Scaling",
  description: "마음이 가벼워 지는 곳, 마인드스케일링",
};

const MyPageLayout = ({ children }: { children: React.ReactNode }) => {
  return children;
};

export default MyPageLayout;
