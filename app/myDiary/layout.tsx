import { Metadata } from "next";

export const metadata: Metadata = {
  title: "일기장",
};

const MyDiaryLayout = ({ children }: { children: React.ReactNode }) => {
  return children;
};

export default MyDiaryLayout;
