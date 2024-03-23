"use client"

import { cls } from "@/lib/styleUtil";
import Link from "next/link";
import { usePathname } from "next/navigation";

const TermsMenu = () => {
  const pathname = usePathname();
  return (
    <>
      <div className="mt-10 flex flex-col">
        <h1 className="text-2xl font-bold">LEGAL</h1>
        <p className="text-sm text-gray-500">마지막 업데이트: 2024.03.24</p>
      </div>
      <div className="flex items-center space-x-10 border-b pb-2">
        <Link
          href="/useTerms"
          className={cls(
            "font-semibold text-sm",
            pathname === "/useTerms" ? "text-blue-500" : ""
          )}
        >
          서비스 이용약관
        </Link>
        <Link
          href="/privacyTerms"
          className={cls(
            "font-semibold text-sm",
            pathname === "/privacyTerms" ? "text-blue-500" : ""
          )}
        >
          개인정보처리방침
        </Link>
      </div>
    </>
  );
};

export default TermsMenu;
