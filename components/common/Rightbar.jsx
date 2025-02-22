import React from "react";
import Link from "next/link";
import { MoveRightIcon } from "lucide-react";
import { sanitizeUrl } from "@/lib/myFun";

export default function Rightbar({ articles, categories, heading, className }) {
  const slicedArticles = articles?.slice(0, 4);

  // Array of background colors for the numbers
  const bgColors = [
    "bg-background1",
    "bg-background2",

    "bg-background3",
    "bg-background4",
    "bg-background1",
    "bg-background2",
  ];

  return (
    <div className={`${className}`}>
      <h3 className="text-2xl font-bold pb-6 text-gray-900 border-b border-gray-100 mb-6">
        {heading}
      </h3>
      <div className="flex flex-col ">
        {slicedArticles?.map((item, index) => (
          <div
            key={index}
            className="flex gap-5 group hover:bg-gradient-to-r hover:from-gray-50/80 hover:to-transparent rounded-2xl transition-all duration-300 border border-transparent hover:border-gray-100/80"
          >
            <div
              className={`${bgColors[index]} w-[70px] h-[70px] rounded-2xl flex items-center justify-center text-2xl font-bold text-white shrink-0 shadow-sm group-hover:scale-105 transition-transform duration-300`}
            >
              {index + 1}
            </div>
            <div className="flex flex-col gap-2.5">
              <Link
                href={`/${sanitizeUrl(
                  item.article_category || ""
                )}/${sanitizeUrl(item.title || "")}`}
                className="text-[17px] leading-7 font-bold group-hover:text-primary1 transition-colors duration-300"
                title={`Read full article: ${item.title}`}
              >
                {item.title}
              </Link>
              <Link
                href={`/${sanitizeUrl(item.article_category || "")}`}
                className="text-sm text-gray-500 hover:text-primary1 transition-colors duration-300 flex items-center gap-1.5 w-fit px-3 py-1 rounded-full bg-gray-50 hover:bg-gray-100"
                title={`View all articles in ${item.article_category}`}
              >
                {item.article_category}
              </Link>
            </div>
          </div>
        ))}
       
        {categories && (
          <div className="pt-8 flex flex-col gap-4 text-md font-bold text-gray-900">
            {categories.map((category, index) => (
              <div
                key={index}
                className={`${bgColors[index]} rounded-2xl  p-4 border border-gray-100/80 hover:border-primary1/50 hover:shadow-md transition-all duration-300`}
              >
                <Link
                  className="flex flex-row text-center items-center justify-between group"
                  href={`/${sanitizeUrl(category.title || "")}`}
                  title={`Browse all articles in ${category.title} category`}
                >
                  <span className="group-hover:text-primary1 transition-colors duration-300 pl-2">
                    {category.title}
                  </span>
                  <div className="bg-white/80 rounded-xl p-3 group-hover:bg-primary1/10 transition-all duration-300 group-hover:scale-105">
                    <MoveRightIcon className="w-4.5 h-4.5 group-hover:text-primary1 transition-colors duration-300" />
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
