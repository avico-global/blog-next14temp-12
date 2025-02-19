import React from "react";
import Image from "next/image";
import data from "../../jason/lifestyle.json";
import Link from "next/link";

export default function BlogGrid() {
  const backgrounds = [
    "bg-background1",
    "bg-background2",
    "bg-background3",
    "bg-background4",
    "bg-background1",
    "bg-background2",
  ];

  // Pre-calculate backgrounds without dependencies
  const getBackground = () =>
    backgrounds[Math.floor(Math.random() * backgrounds.length)];
  return (
    <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-9 lg:gap-12 ">
      {data.map((item, index) => {
        return (
          <div
            key={index}
            className={`${getBackground(index)} rounded-[5px]  ${
              index === 1 ? "row-span-1" : "row-span-2"
            }`}
          >
            <div className="space-y-4 h-full   flex flex-col items-center  justify-between">
              <div
                href={`/blog/${item.id}`}
                className={`${index === 1 ? "hidden" : " "} relative w-full `}
              >
                <Link href={`/blog/${item.id}`}>
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={600}
                    height={600}
                    className="w-full h-full aspect-[6/4] object-cover transition-transform duration-300"
                  />
                </Link>
                <Link href={`/${item.category.toLowerCase().replace(/ /g, '-')}`} className="absolute top-4 left-4 bg-white lg:bg-transparent md:top-44 md:left-[-24px] block z-10 md:rotate-[-90deg] origin-top-left">
                  <span className="items-center flex flex-row font-bold gap-2 px-3 py-1 text-xs text-gray-300 rounded-[4px] whitespace-nowrap">
                    <span
                      className={`h-2 w-2 ${getBackground(
                        index
                      )}  rounded-full justify-center items-center`}
                    ></span>
                    {item.category}
                  </span>
                </Link>
              </div>
              <div className=" h-full flex flex-col items-center justify-between space-y-2  ">
                <Link
                  href={`/blog/${item.id}`}
                  className="px-6 text-[28px] tracking-tighter leading-[28px] font-bold text-gray-700 mb-3 "
                >
                  {item.title}
                </Link>
                <p className={`text-gray-600 px-6 ${index === 1 ? "hidden" : " "}`}>
                  {item.description}
                </p>
                <div className="bg-black/5  w-full px-6 py-4 flex flex-col gap-1 text-lg leading-5 text-gray-700">
                  <h3>by {item.postby}</h3>
                  <h3>Date{item.date}</h3>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
