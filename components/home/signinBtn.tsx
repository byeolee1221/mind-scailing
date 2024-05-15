"use client";

import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const SigninBtn = () => {
  const { data: session, status } = useSession();
  const [statusMsg, setStatusMsg] = useState("");

  useEffect(() => {
    if (status === "loading") {
      setStatusMsg("로딩중...");
    } else if (status === "authenticated") {
      setStatusMsg("로그아웃하기");
    }
  }, [session]);

  const onSignin = () => {
    signIn("google");
  };

  const onSignOut = () => {
    signOut();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {!session ? (
          <button className="whiteBgBtn">로그인하고 시작하기</button>
        ) : (
          <button onClick={onSignOut} className="whiteBgBtn">
            {statusMsg}
          </button>
        )}
      </DialogTrigger>
      {!session ? (
        <DialogContent className="w-[90%] rounded-md">
          <DialogHeader className="lg:text-center">
            <DialogTitle>마인드스케일링 로그인</DialogTitle>
            <DialogDescription>
              아래 방법으로 로그인할 수 있습니다.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center space-y-4">
            <button
              onClick={onSignin}
              className="flex items-center justify-center lg:justify-center lg:space-x-3 rounded-md border-2 px-3 py-2 w-full lg:w-3/5"
            >
              <Image
                src="/g-logo.png"
                alt="구글"
                width={30}
                height={30}
                className="rounded-full"
              />
              <p className="lg:text-base">구글로 로그인하기</p>
            </button>
          </div>
        </DialogContent>
      ) : null}
    </Dialog>
  );
};

export default SigninBtn;
