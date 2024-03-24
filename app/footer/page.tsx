import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="w-full border-t flex flex-col lg:justify-around lg:flex-row space-y-5 px-6 pt-8 pb-28 bg-slate-100 mb-8 dark:bg-slate-600 lg:text-xl">
      <div className="flex items-center space-x-2">
        <Image src="/icon.png" alt="로고" width={30} height={30} />
        <h2 className="font-semibold lg:text-2xl">마인드스케일링</h2>
      </div>
      <div className="flex flex-col space-y-4">
        <div className="flex flex-col space-y-2">
          <p className="font-semibold">마음이 가벼워 지는 곳, 마인드스케일링</p>
          <div className="text-sm lg:text-lg flex flex-col">
            <p>contact: dev.mck1221@gmail.com</p>
            <p>© 2024 Mind-Scaling. All rights reserved</p>
            <p>© Icons by Icons8</p>
            <p>© Icons by 2024 Lucide Contributors</p>
          </div>
        </div>
        <div className="flex items-center space-x-10 text-sm lg:text-lg font-semibold">
          <Link href="/useTerms">이용약관</Link>
          <Link href="/privacyTerms">개인정보처리방침</Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
