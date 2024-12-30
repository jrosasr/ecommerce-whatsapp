"use client";
import Marquee from "@/components/ui/marquee";
import Image from "next/image";
import { posters } from "./PostersMarquee.data";

type Poster = {
  id: string;
  img: string;
};

const firstRow: Poster[] = posters.slice(0, posters.length / 2);
const secondRow: Poster[] = posters.slice(posters.length / 2);

export function PostersMarquee() {
  return (
    <div
      className="relative flex flex-col justify-center items-center md:shadow-xl border rounded-lg w-full h-[500px] overflow-hidden"
    >
      <Marquee className="[--duration:20s]">
        {firstRow.map((review, index) => (
          <div
            key={review.id}
          >
            <Image
              key={review.id}
              width={150}
              height={225}
              alt={review.id}
              src={review.img}
              priority
            />
          </div>
        ))}
      </Marquee>
      <Marquee reverse className="[--duration:20s]">
        {secondRow.map((review, index) => (
          <div
            key={review.id}
          >
            <Image
              key={review.id}
              width={150}
              height={225}
              alt={review.id}
              src={review.img}
              priority
            />
          </div>
        ))}
      </Marquee>
      <div className="left-0 absolute inset-y-0 bg-gradient-to-r from-white dark:from-background w-1/3 pointer-events-none"></div>
      <div className="right-0 absolute inset-y-0 bg-gradient-to-l from-white dark:from-background w-1/3 pointer-events-none"></div>
    </div>
  );
}

