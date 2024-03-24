import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";
import { NextAuthProvider } from "@/lib/nextauthProvider";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import Footer from "./footer/page";
import { Metadata } from "next";

const NotoSansKR = Noto_Sans_KR({ subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  title: { template: "%s | Mind-Scaling", default: "마인드스케일링" },
  description: "마음이 가벼워 지는 곳, 마인드스케일링",
  icons: { icon: "/icon.png", shortcut: "/icon.png" },
  metadataBase: new URL("http://localhost:3000"),
  openGraph: {
    title: "마인드스케일링 | Mind-Scaling",
    description: "마음이 가벼워 지는 곳, 마인드스케일링",
    images: "/icon.png",
    url: "http://localhost:3000",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={NotoSansKR.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="class"
          enableSystem
          disableTransitionOnChange
        >
          <NextAuthProvider>
            <div className="max-w-5xl text-gray-900 dark:bg-slate-800 dark:text-white transition-all">
              {children}
              <Toaster />
              <Footer />
            </div>
          </NextAuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
