import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";

const NotoSansKR = Noto_Sans_KR({ subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  title: "마인드스케일링 | Mind Scailing",
  description: "마음이 가벼워 지는 곳, 마인드스케일링",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={NotoSansKR.className}>
        <div className="max-w-5xl text-gray-900">{children}</div>
      </body>
    </html>
  );
}
