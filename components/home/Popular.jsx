import React from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import Container from "../common/Container";
import { ChevronRight } from "lucide-react";
import { sanitizeUrl } from "@/lib/myFun";

export default function Popular({ blog_list = [], imagePath }) {
  const popularBlogs = blog_list.slice(0, 3);

  // Array of background classes
  const backgrounds = [
    "bg-background1",
    "bg-background2",
    "bg-background3",
    "bg-background4",
  ];

  const getBackground = () =>
    backgrounds[Math.floor(Math.random() * backgrounds.length)];

  const BlogCard = ({ item, index }) => (
    <div
      className={cn(
        "border flex flex-col gap-7 h-full justify-between rounded-lg overflow-hidden group shadow-sm hover:shadow-md transition-shadow duration-300",
        getBackground()
      )}
    >
      <div className="relative w-full overflow-hidden">
        <Link
          title={item.title}
          href={
            `/${sanitizeUrl(item.article_category)}/${sanitizeUrl(
              item?.title
            )}` || "#"
          }
        >
          <Image
            src={`${imagePath}/${item.image || "no-image.png"}`}
            alt={item.title}
            title={item.title}
            width={600}
            height={600}
            className="w-full h-full aspect-[6/4] object-cover transition-transform duration-300 group-hover:scale-105"
            priority={true}
          />
        </Link>
        {item.article_category && (
          <Link
            title={item.article_category}
            href={
              `/${sanitizeUrl(item.article_category)}/${sanitizeUrl(
                item?.title
              )}` || "#"
            }
            className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm md:bg-white/90 md:top-32 md:left-0 block z-10 transition-transform hover:translate-x-1"
          >
            <span className="items-center flex flex-row font-bold gap-2 px-4 py-2 text-xs text-gray-600 rounded-full whitespace-nowrap">
              <span
                className={`h-2 w-2 ${getBackground()} rounded-full`}
              ></span>
              {item.article_category}
            </span>
          </Link>
        )}
      </div>

      <div className="px-[30px] flex-grow">
        <Link
          title={item.title}
          href={
            `/${sanitizeUrl(item.article_category)}/${sanitizeUrl(
              item?.title
            )}` || "#"
          }
        >
          <h2 className="text-[28px] tracking-tighter leading-[34px] font-bold text-gray-800 mb-4 transition-colors hover:text-gray-600">
            {item.title}
          </h2>
        </Link>
        {item.articleContent && (
          <p className="text-sm text-gray-600 line-clamp-3">
            {item.articleContent}
          </p>
        )}
      </div>

      <div className="bg-black/[0.03] px-[30px] py-6 flex flex-col gap-2 text-base leading-5 text-gray-600">
        {item.author && <h3 className="font-medium">by {item.author}</h3>}
        {item.published_at && (
          <h3 className="text-gray-500">
            {new Date(item.published_at).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </h3>
        )}
      </div>
    </div>
  );

  return (
    <Container>
      <div className="flex justify-between items-center">
        <h3 className="text-3xl font-bold text-gray-800 py-12">Popular</h3>
        <Link
          title="View all articles"
          href="/blogs"
          className="bg-background1 flex items-center text-sm gap-2 py-2 px-5 rounded-full hover:bg-opacity-90 transition-colors"
        >
          View All <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
        {popularBlogs.map((item, index) => (
          <BlogCard key={item.id || index} item={item} index={index} />
        ))}
      </div>
    </Container>
  );
}
