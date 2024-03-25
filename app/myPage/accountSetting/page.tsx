"use client";

import AccountDisconnect from "@/components/myPage/accountDisconnect";
import ActiveNameChange from "@/components/myPage/activeNameChange";
import NavBar from "@/components/navBar";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const AccountSetting = () => {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!session) {
      alert("로그인이 필요한 서비스입니다.");
      router.push("/");
    }
  }, []);

  return (
    <NavBar title="계정관리" hasTabBar pageBack>
      <div className="px-6 w-full min-h-screen mt-8 flex flex-col space-y-5">
        <ActiveNameChange />
        <AccountDisconnect />
      </div>
    </NavBar>
  );
};

export default AccountSetting;
