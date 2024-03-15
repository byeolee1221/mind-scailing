"use client";

import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";
import { NextAuthProvider } from "@/lib/nextauthProvider";
import { cls } from "@/lib/styleUtil";
import { useEffect, useState } from "react";

const NotoSansKR = Noto_Sans_KR({ subsets: ["latin"], weight: "400" });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [theme, setTheme] = useState(false);
  
  // console.log(theme);
  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme && theme === "dark") {
      setTheme(true);
    } else {
      setTheme(false);
    }

  }, [theme]);
  
  return (
    <html lang="ko">
      <body className={NotoSansKR.className}>
        <NextAuthProvider>
          <div
            className={cls(
              "max-w-5xl text-gray-900 dark:bg-slate-800 dark:text-white transition-all",
              theme ? "dark" : ""
            )}
          >
            {children}
          </div>
        </NextAuthProvider>
      </body>
    </html>
  );
}
