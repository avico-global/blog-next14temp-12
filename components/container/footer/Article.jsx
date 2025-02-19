import React from "react";
import Link from "next/link";
import Image from "next/image";
export default function Article({ data }) {
  const backgrounds = [
    "bg-background1",
    "bg-background2",
    "bg-background3",
    "bg-background4",
  ];
  const getBackground = () =>
    backgrounds[Math.floor(Math.random() * backgrounds.length)];
  return (
    <div className="flex flex-col gap-4">
      {data.map((data, index) => (
        <Link
          href={`/${data.category}/${data.title}`}
          className="flex flex-row gap-3 "
          key={index}
        >
          <div
            className={`relative h-[90px] w-[90px] rounded-full shrink-0 overflow-hidden ${getBackground()}`}
          >
            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
              <Image
                src={data.image}
                alt="article"
                fill
                sizes="100px"
                style={{ objectFit: "cover" }}
              />
            </div>
          </div>
          <div className="flex flex-col gap-1 ">
            <h2 className="text-lg font-extrabold  break-words leading-5 lg:max-w-[200px]">
              {data.title}
            </h2>
            <h2 className="text-xs pt-2 font-bold text-gray-500">
              {data.date}
            </h2>
          </div>
        </Link>
      ))}
    </div>
  );
}
