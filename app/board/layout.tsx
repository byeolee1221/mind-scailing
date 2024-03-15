import { Metadata } from "next";

export const metadata: Metadata = {
  title: "커뮤니티 | Mind Scaling",
  description: "마음이 가벼워 지는 곳, 마인드스케일링",
};

const BoardLayout = ({ children }: { children: React.ReactNode }) => {
  return children;
};

export default BoardLayout;
