import React from "react";
import Container from "../common/Container";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import Rightbar from "../common/Rightbar";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { sanitizeUrl } from "@/lib/myFun";

export default function Fromtheblog({
  articles,
  categories,
  imagePath,
  blog_list = [],
}) {
  const lifestyleBlogs = blog_list.slice(0, 6);

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
        "border-0 flex flex-col gap-7 h-full justify-between rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden",
        index === 2 || index === 5
          ? "sm:col-span-2 md:col-span-1"
          : "col-span-1",
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
          title={item.title}
        >
          <Image
            src={`${imagePath}/${item.image || "no-image.png"}`}
            alt={item.title}
            title={item.title}
            width={600}
            height={600}
            className="w-full h-full aspect-[6/4] object-cover transition-transform duration-300 hover:scale-105"
            priority={true}
          />
        </Link>
        {item.article_category && (
          <Link
            title={item.article_category}
            href={
              `/${sanitizeUrl(
                item?.title
              )}` || "#"
            }
            className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm hover:bg-white block z-10 transition-all duration-300"
          >
            <span className="items-center flex flex-row font-medium gap-2 px-4 py-2 text-sm text-gray-700 rounded-full whitespace-nowrap">
              <span
                className={`h-2 w-2 ${getBackground(index)} rounded-full`}
              ></span>
              {item.article_category}
            </span>
          </Link>
        )}
      </div>

      <div className="px-6">
        <Link
          title={item.title}
          href={
            `/${sanitizeUrl(
              item?.title
            )}` || "#"
          }
        >
          <h2 className="text-2xl tracking-tight leading-snug font-bold text-gray-800 mb-3 hover:text-gray-600 transition-colors duration-200">
            {item.title}
          </h2>
        </Link>
      </div>

      <div className="bg-gray-50 px-6 py-4 flex items-center justify-between text-base text-gray-600">
        {item.author && <h3 className="font-medium">by {item.author}</h3>}
        {item.published_at && (
          <h3 className="text-sm">
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
      <div className="flex justify-between items-center mt-24 mb-8">
        <h3 className="text-4xl font-bold text-gray-800">Trending</h3>
        <Link
          title="View all articles"
          href="/blogs"
          className="bg-background3 hover:bg-background4 flex items-center text-sm gap-2 py-2 px-6 rounded-full transition-colors duration-300"
        >
          View All <ChevronRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="flex flex-col md:flex-row gap-8 lg:gap-16">
        <div className="md:w-[30%] lg:w-[23%] md:p-0 py-7 rounded-xl">
          {/* Top Articles */}
          <div className="mb-8">
            <h4 className="text-xl font-bold text-gray-800 mb-4">
              Top Articles
            </h4>
            {blog_list &&
              blog_list.slice(0, 3).map((article, index) => (
                <Link
                  title={article.title}
                  key={article.id || index}
                  href={
                    `/${sanitizeUrl(
                      article?.title
                    )}` || "#"
                  }
                  className="flex items-center gap-4 mb-4 group"
                >
                  <div
                    className={`${backgrounds[index]} w-20 h-20 relative flex-shrink-0`}
                  >
                    <Image
                      src={`${imagePath}/${article.image || "no-image.png"}`}
                      alt={article.title}
                      title={article.title}
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>
                  <h5 className="text-gray-700 group-hover:text-gray-900 transition-colors duration-200">
                    {article.title}
                  </h5>
                </Link>
              ))}
          </div>

          <Rightbar
            articles={articles}
            categories={categories}
            imagePath={imagePath}
            heading=""
          />
        </div>
        <div className="md:w-[70%] lg:w-[77%]">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {lifestyleBlogs.map((item, index) => (
              <BlogCard key={item.id || index} item={item} index={index} />
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
}
