import React, { useMemo } from "react";
import Container from "../../common/Container";
import Link from "next/link";
import Image from "next/image";
import { sanitizeUrl } from "@/lib/myFun";

export default function Footer({ articles = [], categories = [], imagePath }) {

  const { mostViewedArticles, latestArticles, popularArticles } =
    useMemo(() => {
      const articlesCopy = [...articles];
      const mostViewed = articlesCopy
        .sort((a, b) => (b.views || 0) - (a.views || 0))
        .slice(0, 2);

      const latest = articlesCopy
        .filter((article) => !mostViewed.includes(article))
        .sort((a, b) => new Date(b.published_at) - new Date(a.published_at))
        .slice(0, 2);
      const popular = articlesCopy
        .filter(
          (article) =>
            !mostViewed.includes(article) && !latest.includes(article)
        )
        .sort((a, b) => (b.popularity || 0) - (a.popularity || 0))
        .slice(0, 2);

      return {
        mostViewedArticles: mostViewed,
        latestArticles: latest,
        popularArticles: popular,
      };
    }, [articles]);

  const FooterArticle = ({ item }) => (
    <div className="flex items-start gap-3 mb-6">
      <div className="relative w-20 h-20 flex-shrink-0 bg-background1 rounded-full overflow-hidden">
        <Link
          href={`/${sanitizeUrl(
            item.title || ""
          )}`}
          title={item.title || "Read article"}
        >
          <Image
            src={item.image ? `${imagePath}/${item.image}` : "/no-image.png"}
            alt={item.title || "Article image"}
            title={item.title || "Article image"}
            fill={true}
            className="object-cover rounded-full hover:scale-110 transition-transform duration-300"
          />
        </Link>
      </div>
      <div>
        <Link
          href={`/${sanitizeUrl(
            item.title || ""
          )}`}
          className="text-lg font-extrabold hover:underline"
          title={item.title || "Read article"}
        >
          {item.title}
        </Link>
        <p className="text-xs text-gray-500 mt-1">
          {item.published_at &&
            new Date(item.published_at).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
        </p>
      </div>
    </div>
  );

  return (
    <Container className="pb-24 pt-10 mt-8 border-t">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Popular Articles */}
        <div className="pb-10 md:pb-0 p-6 rounded-[5px]">
          <div className="inline-block px-4 py-2 rounded-md mb-2">
            <h3 className="text-xl font-bold">Popular Articles</h3>
          </div>
          <h4 className="text-sm font-bold text-gray-500 pb-6">
            Most read stories
          </h4>
          <div>
            {popularArticles.map((article, index) => (
              <FooterArticle key={article.id || index} item={article} />
            ))}
          </div>
        </div>

        {/* Latest Articles */}
        <div className="pb-10 md:pb-0 p-6 rounded-[5px]">
          <div className="inline-block px-4 py-2 rounded-md mb-2">
            <h3 className="text-xl font-bold">Latest Articles</h3>
          </div>
          <h4 className="text-sm font-bold text-gray-500 pb-6">
            Fresh content
          </h4>
          <div>
            {latestArticles.map((article, index) => (
              <FooterArticle key={article.id || index} item={article} />
            ))}
          </div>
        </div>

        {/* Most Viewed */}
        <div className="pb-10 md:pb-0 p-6 rounded-[5px]">
          <div className="inline-block px-4 py-2 rounded-md mb-2">
            <h3 className="text-xl font-bold">Most Viewed</h3>
          </div>
          <h4 className="text-sm font-bold text-gray-500 pb-6">Top stories</h4>
          <div>
            {mostViewedArticles.map((article, index) => (
              <FooterArticle key={article.id || index} item={article} />
            ))}
          </div>
        </div>

        {/* Categories */}
        <div className="rounded-[5px] p-6 bg-gray-100 ">
          <div className="inline-block px-4 py-2 rounded-md mb-2">
            <h3 className="text-xl font-bold">Help & Info</h3>
          </div>
          <div className="flex flex-col gap-[10px] mt-4">
            {categories.map((category, index) => (
              <div
                className="border-b border-black/10 pb-[10px] rounded-md"
                key={index}
              >
                <Link
                  href={`/category/${sanitizeUrl(category.title || "")}`}
                  className="hover:text-gray-600 transition-colors duration-200 block p-2"
                  title={`View ${category.title} category`}
                >
                  {category.title}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className=" text-center space-y-8">
        <h2 className=" text-lg font-bold ">Quick Links</h2>
        <div className="flex justify-center items-center text-center font-semibold  gap-4 lg:gap-16">
          <Link title="Home" href="/">Home</Link>

          <Link title="Privacy & Policy" href="/privacy-policy">Privacy & Policy</Link>

          <Link title="Term & Condition" href="/terms-and-conditions">Terms & conditions</Link>
        </div>
      </div>
    </Container>
  );
}
