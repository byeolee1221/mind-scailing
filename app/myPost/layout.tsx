import { Metadata } from "next";

export const metadata: Metadata = {
  title: "내 글",
};

const MyPostLayout = ({ children }: { children: React.ReactNode }) => {
  return children;
};

export default MyPostLayout;
