import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function Cards({mdcol,lgcol,data}) {
  // Array of background classes
  const backgrounds = ['bg-background1', 'bg-background2', 'bg-background3', 'bg-background4','bg-background1', 'bg-background2'];

  // Pre-calculate backgrounds without dependencies
  const getBackground = () => backgrounds[Math.floor(Math.random() * backgrounds.length)];
  return (
    <div className="flex flex-row gap-14">
      <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-${mdcol} lg:grid-cols-${lgcol} gap-6 md:gap-9 lg:gap-12 `}>
      {data.map((item, index) => (
         <div
         key={index}
         className={`${index===2||index===5 ? "sm:col-span-2 md:col-span-1" : " col-span-1"} border flex flex-col gap-7 h-full justify-between ${getBackground(index)} rounded-[5px] group `}
       >
         {/* Vertical Category Tag */}
         {/* Image Container */}
         <div className="relative w-full">
          <Link href={`/blog/${item.title.toLowerCase().replace(/ /g, '-')}`}>
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
               <span className={`h-2 w-2 ${getBackground(index)}  rounded-full justify-center items-center`}></span>
               {item.category}
             </span>
           </Link>
         </div>

         {/* Content */}
         <div className="px-[30px]">
           <h2 className="text-[28px] tracking-tighter leading-[28px] font-bold text-gray-700 mb-3">
             {item.title}
           </h2>
         </div>
         <div className="bg-black/5 px-[30px] py-6 flex flex-col gap-1 text-lg leading-5 text-gray-700">
           <h3>by {item.postby}</h3>
           <h3>Date{item.date}</h3>
         </div>
       </div>
        ))}
      </div>
    </div>
  );
}
