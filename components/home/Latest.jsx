import React from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import Container from "../common/Container";
import Rightbar from "../common/Rightbar";
import { ChevronRight } from "lucide-react";
import { sanitizeUrl } from "@/lib/myFun";

export default function Latest({ blog_list = [], imagePath, articles, categories }) {
  const latestBlogs = blog_list.slice(0, 2);

  // Array of background classes
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

  const BlogCard = ({ item, index }) => (
    <div
      className={cn(
        "border flex flex-col gap-7 h-full justify-between rounded-[5px] group hover:shadow-lg transition-all duration-300",
        index === 2 || index === 5 ? "sm:col-span-2 md:col-span-1" : "col-span-1",
        getBackground(index)
      )}
    >
      <div className="relative w-full overflow-hidden">
        <Link
          href={
            `/${sanitizeUrl(
              item?.title
            )}` || "#"
          }
          title={`Read more about ${item.title}`}
        >
          <Image
            src={`${imagePath}/${item.image || "no-image.png"}`}
            alt={item.title}
            title={`${item.title} featured image`}
            width={600}
            height={600}
            className="w-full h-full aspect-[6/4] object-cover transition-transform duration-300 group-hover:scale-105"
            priority={true}
          />
        </Link>
        {item.article_category && (
          <Link
          href={
            `/${sanitizeUrl(
              item?.title
            )}` || "#"
          }
            className="absolute top-4 left-4 bg-white/90 hover:bg-white lg:bg-transparent md:top-44 md:left-[-24px] block z-10 md:rotate-[-90deg] origin-top-left transition-colors duration-300"
            title={`View all articles in ${item.article_category}`}
          >
            <span className="items-center flex flex-row font-bold gap-2 px-3 py-1 text-xs text-gray-400 rounded-[4px] whitespace-nowrap hover:text-gray-600">
              <span className={`h-2 w-2 ${getBackground(index)} rounded-full`}></span>
              {item.article_category}
            </span>
          </Link>
        )}
      </div>

      <div className="px-[30px]">
        <Link
         href={
          `/${sanitizeUrl(
            item?.title
          )}` || "#"
        }
          title={`Read full article: ${item.title}`}
        >
          <h2 className="text-[28px] tracking-tighter leading-[34px] font-bold text-gray-700 mb-3 hover:underline transition-colors duration-300">
            {item.title}
          </h2>
        </Link>
        
        {item.articleContent && (
          <p className="text-sm text-gray-700 line-clamp-3">{item.articleContent}</p>
        )}
      </div>

      <div className="bg-black/5 px-[30px] py-6 flex flex-col gap-1 text-lg leading-5 text-gray-700">
        {item.author && <h3 className="hover:text-gray-900 transition-colors duration-300">by {item.author}</h3>}
        {item.published_at && (
          <h3 className="text-gray-500">
            {new Date(item.published_at).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric'
            })}
          </h3>
        )}
      </div>
    </div>
  );

  return (
    <div className="bg-white py-16">
      <Container>
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg text-gray-400 mb-2">Stay Updated with Latest Tech</h3>
            <h2 className="text-3xl font-bold text-gray-700 tracking-tight">Latest Articles</h2>
          </div>
          <Link
            href="/blogs"
            title="View all articles"
            className="bg-background1 flex items-center text-sm gap-2 py-2 px-5 rounded-full hover:shadow-md transition-all duration-300"
          >
            View All <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="flex flex-col lg:flex-row gap-14 mt-10">
          <div className="w-full lg:w-[77%]">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-9">
              {latestBlogs.map((item, index) => (
                <BlogCard key={item.id || index} item={item} index={index} />
              ))}
            </div>
          </div>
          <div className="w-full lg:w-[23%]">
            <Rightbar
               articles={articles}
               imagePath={imagePath}
                heading="Most Viewed"

            />
          </div>
        </div>
      </Container>
    </div>
  );
}
