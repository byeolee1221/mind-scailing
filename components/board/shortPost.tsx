import Image from "next/image";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";

const ShortPost = () => {
  return (
    <div>
      <Carousel opts={{ align: "start" }} className="w-full">
        <CarouselContent className="p-2">
          {Array.from({ length: 2 }).map((_, index) => (
            <CarouselItem key={index}>
              <div className="flex items-center space-x-3 justify-around dark:text-white">
                {[1, 2, 3, 4, 5].map((item, i) => (
                  <button
                    key={i}
                    className="flex flex-col items-center space-y-1"
                  >
                    <Image
                      src="/user.png"
                      alt="프로필"
                      width={40}
                      height={40}
                      className="p-2 bg-slate-300 rounded-full ring-2 ring-offset-2 ring-green-500 outline-none"
                    />
                    <p className="text-xs">바위별</p>
                  </button>
                ))}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default ShortPost;
