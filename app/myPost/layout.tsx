import { Metadata } from "next";

export const metadata: Metadata = {
  title: "내 글 | Mind Scaling",
};

const MyPostLayout = ({ children }: { children: React.ReactNode }) => {
  return children;
};

export default MyPostLayout;
