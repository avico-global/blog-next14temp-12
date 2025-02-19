import React from "react";
import Image from "next/image";
import Link from "next/link";
import { MoveRightIcon } from "lucide-react";


export default function Rightbar({
  data,
  hiddennumber,
  hiddenbox,
  hiddenimage,
  hiddencategories,
  heading,
  className,
}) {
  const categories = ["Life style", "Travel", "Art and Design", "Beauty"];
  const backgrounds = ['bg-background1', 'bg-background2', 'bg-background3', 'bg-background4','bg-background1', 'bg-background2'];

  // Pre-calculate backgrounds without dependencies
  const getBackground = () => backgrounds[Math.floor(Math.random() * backgrounds.length)];
  return (
    <div className={`${className}`}>
      <h3 className="text-2xl font-bold pb-4">{heading}</h3>
      <div className="flex flex-col gap-4 ">
        {data.map((item, index) => (
          <div key={index} className={`flex gap-4  `}>
            <div
              className={`${hiddenbox} ${
                index === 0
                  ? "bg-background3"
                  : index === 1 || index === 3
                  ? "bg-background4"
                  : "bg-background2"
              }  rounded-[4px] h-[70px] w-[70px] text-center flex items-center justify-center text-3xl text-gray-600 font-bold  aspect-square`}
            >
              <div className={`${hiddennumber}`}>0{index + 1}</div>

              <Image
                src={item.image}
                width={300}
                height={300}
                alt="image"
                className={`h-full w-full  ${hiddenimage}`}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Link
                href={`/categories/${item.title}`}
                className="text-[16px] leading-5 font-bold"
              >
                {item.title}
              </Link>
              <Link
                href={`/${item.category}`}
                className="text-sm text-gray-500 pt-2"
              >
                {item.category}
              </Link>
            </div>
          </div>
        ))}
        
        <div className={`${hiddencategories} pt-4 flex flex-col gap-3 text-md font-bold text-gray-900  `}>
          {categories.map((item, index) => (
            <div key={index} className={`rounded-[5px] ${getBackground(index)}  p-4 border`}>
              <Link key={index} className="flex flex-row text-center items-center justify-between" href={`/${item}`}>
                {item}
                <div className="bg-black/5 rounded-[3px] p-3">
                <MoveRightIcon className="w-4 h-4" />
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
