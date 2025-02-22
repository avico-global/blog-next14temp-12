import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Container from "../../components/common/Container";
import Navbar from "../../components/container/navbar/Navbar";
import Footer from "../../components/container/footer/Footer";
import Rightbar from "../../components/common/Rightbar";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Raleway } from "next/font/google";
import useBreadcrumbs from "@/lib/useBreadcrumbs";
import JsonLd from "@/components/json/JsonLd";
import GoogleTagManager from "@/lib/GoogleTagManager";

import {
  callBackendApi,
  getDomain,
  getImagePath,
  robotsTxt,
  sanitizeUrl,
} from "@/lib/myFun";
import Head from "next/head";

// Initialize Raleway font
const raleway = Raleway({
  subsets: ["cyrillic", "cyrillic-ext", "latin", "latin-ext"],
});

export default function Categories({
  imagePath,
  blog_list,
  logo,
  meta,
  domain,
  categories,
  favicon,
}) {
  const router = useRouter();
  const { category } = router.query;
  const breadcrumbs = useBreadcrumbs();
  const safeBlogList = Array.isArray(blog_list) ? blog_list : [];
  const filteredBlogList = safeBlogList.filter((item) => {
    const searchContent = sanitizeUrl(category);
    return sanitizeUrl(item.article_category) === searchContent;
  });

  useEffect(() => {
    if (category && (category.includes("%20") || category.includes(" "))) {
      const newCategory = category.replace(/%20/g, "-").replace(/ /g, "-");
      router.replace(`/${newCategory}`);
    }
  }, [category, router]);

  const formattedCategory = category ? category.replaceAll("-", " ") : "";

  const backgrounds = [
    "bg-background1",
    "bg-background2",
    "bg-background3",
    "bg-background4",
    "bg-background1",
    "bg-background2",
  ];

  const getBackground = () =>
    backgrounds[Math.floor(Math.random() * backgrounds.length)];

  return (
    <div className={cn(raleway.className, "flex flex-col min-h-screen")}>
      <Head>
        <meta charSet="UTF-8" />
        <title>
          {meta?.title?.replaceAll(
            "##category##",
            category
              ?.replace(/[-&]+/g, " ")
              .replace(/\s+/g, " ")
              .trim()
              .split(" ")
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(" ")
          )}
        </title>
        <meta
          name="description"
          content={meta?.description.replaceAll(
            "##category##",
            category
              ?.replace(/[-&]+/g, " ")
              .replace(/\s+/g, " ")
              .trim()
              .split(" ")
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(" ")
          )}
        />
        <link rel="author" href={`https://www.${domain}`} />
        <link rel="publisher" href={`https://www.${domain}`} />
        <link rel="canonical" href={`https://www.${domain}/${category}`} />
        {/* <meta name="robots" content="noindex" /> */}
        <meta name="theme-color" content="#008DE5" />
        <link rel="manifest" href="/manifest.json" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <GoogleTagManager />
        <meta
          name="google-site-verification"
          content="zbriSQArMtpCR3s5simGqO5aZTDqEZZi9qwinSrsRPk"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href={`${process.env.NEXT_PUBLIC_SITE_MANAGER}/images/${imagePath}/${favicon}`}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href={`${process.env.NEXT_PUBLIC_SITE_MANAGER}/images/${imagePath}/${favicon}`}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href={`${process.env.NEXT_PUBLIC_SITE_MANAGER}/images/${imagePath}/${favicon}`}
        />
      </Head>

      <Navbar logo={logo} imagePath={imagePath} blog_list={blog_list} categories={categories || []} />
      <Container>
        <div className="pt-20 grid grid-cols-1  md:grid-cols-3 lg:grid-cols-4 gap-12 mt-16 ">
          <div className="flex flex-col gap-6 md:gap-9 lg:gap-12 col-span-1  md:col-span-2 lg:col-span-3">
            <div className="flex flex-col gap-4">
              <h1 className="text-5xl md:text-6xl font-bold capitalize">
                {formattedCategory}
              </h1>
              <p className="text-xl text-gray-500">
                Pianoforte solicitude so decisively unpleasing conviction is
                partiality he. Or particular so diminution entreaties oh do.
                Real he me fond show gave shot plan. Mean are sons too sold nor
                said
              </p>
            </div>

            {filteredBlogList?.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-9 lg:gap-12">
                {filteredBlogList.map((item, index) => {
                  if (!item) return null;
                  return (
                    <div
                      key={index}
                      className={`${getBackground(index)} rounded-[5px]  ${
                        index === 1 ? "row-span-1" : "row-span-2"
                      }`}
                    >
                      <div className="space-y-4 h-full   flex flex-col items-center  justify-between">
                        <div
                          href={item?.id ? `/blog/${item.id}` : "#"}
                          className={`${
                            index === 1 ? "hidden" : ""
                          } relative w-full `}
                        >
                          <Link
                            href={`/${sanitizeUrl(
                              item.article_category
                            )}/${sanitizeUrl(item?.title)}`}
                            title={item?.title || "Blog post"}
                          >
                            <Image
                              src={`${imagePath}/${item?.image}`}
                              alt={item?.title || "Blog post"}
                              title={item?.title || "Blog post"}
                              width={600}
                              height={600}
                              className="w-full h-full aspect-[6/4] object-cover transition-transform duration-300"
                            />
                          </Link>
                          <Link
                            title={item?.title || "Blog post"}
                            href={`/${sanitizeUrl(
                              item.article_category
                            )}/${sanitizeUrl(item?.title)}`}
                            className="absolute top-4 left-4 bg-white lg:bg-transparent md:top-44 md:left-[-24px] block z-10 md:rotate-[-90deg] origin-top-left"
                          >
                            <span className="items-center flex flex-row font-bold gap-2 px-3 py-1 text-xs text-gray-300 rounded-[4px] whitespace-nowrap">
                              <span
                                className={`h-2 w-2 ${getBackground(
                                  index
                                )}  rounded-full justify-center items-center`}
                              ></span>
                              {item?.category}
                            </span>
                          </Link>
                        </div>
                        <div className=" h-full flex flex-col items-center justify-between space-y-2  ">
                          <Link
                            title={item?.title || "Blog post"}
                            href={`/${sanitizeUrl(
                              item.article_category
                            )}/${sanitizeUrl(item?.title)}`}
                            className="px-6 text-[28px] tracking-tighter leading-[28px] font-bold text-gray-700 mb-3 "
                          >
                            <h2>{item?.title}</h2>
                          </Link>
                          <p
                            className={`text-gray-600 px-6 ${
                              index === 1 ? "hidden" : ""
                            }`}
                          >
                            {item?.description}
                          </p>
                          <div className="bg-black/5  w-full px-6 py-4 flex flex-col gap-1 text-lg leading-5 text-gray-700">
                            <h3>by {item?.author}</h3>
                            <h3>Date{item?.published_at}</h3>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="flex items-center justify-center border px-10 py-40 text-lg bg-gray-200">
                No articles found related to {formattedCategory}
              </div>
            )}
          </div>
          <div className="  col-span-1 rounded-[5px]">
            <Rightbar
              className={`md:sticky md:top-14`}
              hiddennumber={"hidden"}
              categories={categories || []}
              imagePath={imagePath}
              articles={blog_list}
              heading={"Most viewed"}
            />
          </div>
        </div>
      </Container>
      <Footer
        articles={blog_list}
        categories={categories}
        imagePath={imagePath}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "BreadcrumbList",
              itemListElement: breadcrumbs.map((breadcrumb, index) => ({
                "@type": "ListItem",
                position: index + 1,
                name: breadcrumb.label,
                item: `https://${domain}${breadcrumb.url}`,
              })),
            },
            {
              "@type": "WebPage",
              "@id": `https://${domain}/${category}`,
              url: `https://${domain}/${category}`,
              name: meta?.title?.replaceAll(
                "##category##",
                category
                  ?.replace(/[-&]+/g, " ")
                  .replace(/\s+/g, " ")
                  .trim()
                  .split(" ")
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(" ")
              ),
              description: meta?.description?.replaceAll(
                "##category##",
                category
                  ?.replace(/[-&]+/g, " ")
                  .replace(/\s+/g, " ")
                  .trim()
                  .split(" ")
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(" ")
              ),
              inLanguage: "en-US",
              publisher: {
                "@type": "Organization",
                "@id": `https://${domain}`,
              },
            },
            {
              "@type": "ItemList",
              url: `https://${domain}/${category}`,
              name: "blog",
              itemListElement: blog_list?.map((blog, index) => ({
                "@type": "ListItem",
                position: index + 1,
                item: {
                  "@type": "Article",
                  url: `https://${domain}/${sanitizeUrl(
                    blog?.article_category
                  )}/${sanitizeUrl(blog?.title)}`,
                  name: blog.title,
                },
              })),
            },
          ],
        }}
      />
    </div>
  );
}

export async function getServerSideProps({ req, query }) {
  const domain = getDomain(req?.headers?.host);
  const { category } = query;

  let layoutPages = await callBackendApi({
    domain,
    type: "layout",
  });

  const logo = await callBackendApi({ domain, type: "logo" });
  const favicon = await callBackendApi({ domain, type: "favicon" });
  const banner = await callBackendApi({ domain, type: "banner" });

  const blog_list = await callBackendApi({ domain, type: "blog_list" });
  const categories = await callBackendApi({
    domain,
    type: "categories",
  });
  const meta = await callBackendApi({ domain, type: "meta_category" });
  const about_me = await callBackendApi({ domain, type: "about_me" });

  let page = null;
  if (Array.isArray(layoutPages?.data) && layoutPages.data.length > 0) {
    const valueData = layoutPages.data[0].value;
    page = valueData?.find((page) => page.page === "category");
  }

  if (!page?.enable) {
    return {
      notFound: true,
    };
  }

  let project_id = logo?.data[0]?.project_id || null;
  let imagePath = await getImagePath(project_id, domain);

  const categoryExists = categories?.data[0]?.value?.some(
    (cat) =>
      cat?.title?.toLowerCase() === category?.replaceAll("-", " ").toLowerCase()
  );

  if (!categoryExists) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      domain,
      imagePath,
      meta: meta?.data[0]?.value || null,
      favicon: favicon?.data[0]?.file_name || null,
      logo: logo?.data[0],
      banner: banner?.data[0] || null,
      blog_list: blog_list?.data[0]?.value,
      categories: categories?.data[0]?.value || null,
      domain: domain === "hellospace.us" ? req?.headers?.host : domain,
      about_me: about_me?.data[0] || null,
      page,
    },
  };
}
