import Navbar from "@/components/container/navbar/Navbar";
import Footer from "@/components/container/footer/Footer";
import Container from "@/components/common/Container";
import Rightbar from "@/components/common/Rightbar";
import JsonLd from "@/components/json/JsonLd";
import Link from "next/link";
import Image from "next/image";
import {
  callBackendApi,
  getDomain,
  getImagePath,
  sanitizeUrl,
} from "@/lib/myFun";
import Head from "next/head";
import GoogleTagManager from "@/lib/GoogleTagManager";

export default function Blogs({
  categories,
  imagePath,

  logo,
  meta,
  domain,
  blog_list,
  favicon,
}) {
  // Filter out any blog entries with empty image paths
  const filteredBlogList = blog_list?.filter((blog) => blog.image) || [];
  const data = filteredBlogList?.slice(0, 3) || [];

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
    <div className="">
      <Head>
        <meta charSet="UTF-8" />
        <title>{meta?.title}</title>
        <meta name="description" content={meta?.description} />
        <link rel="author" href={`https://www.${domain}`} />
        <link rel="publisher" href={`https://www.${domain}`} />
        <link rel="canonical" href={`https://www.${domain}`} />
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
      <Navbar
        imagePath={imagePath}
        categories={categories}
        blog_list={filteredBlogList}
        logo={logo}
      />

      <Container>
        <div className="pt-20 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-12 mt-16">
          <div className="flex flex-col gap-6 md:gap-9 lg:gap-12 col-span-1 md:col-span-2 lg:col-span-3">
            <div className="flex flex-col gap-4">
              <h1 className="text-5xl md:text-6xl font-bold">
                Latest Articles
              </h1>
              <p className="text-xl text-gray-500">
                Discover our latest articles and stay updated with the newest
                trends and insights
              </p>
            </div>

            {filteredBlogList?.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-9 lg:gap-12">
                {filteredBlogList.map((item, index) => {
                  if (!item) return null;
                  return (
                    <div
                      key={index}
                      className={`${getBackground()} rounded-[5px] ${
                        index === 1 ? "row-span-1" : "row-span-2"
                      }`}
                    >
                      <div className="space-y-4 h-full flex flex-col items-center justify-between">
                        <div
                          className={`${
                            index === 1 ? "hidden" : ""
                          } relative w-full`}
                        >
                          <Link
                            href={`/${sanitizeUrl(item?.title)}`}
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
                            title={item?.article_category || "Category"}
                            href={`/${sanitizeUrl(item.article_category)}`}
                            className="absolute top-4 left-4 bg-white lg:bg-transparent md:top-44 md:left-[-24px] block z-10 md:rotate-[-90deg] origin-top-left"
                          >
                            <span className="items-center flex flex-row font-bold gap-2 px-3 py-1 text-xs text-gray-300 rounded-[4px] whitespace-nowrap">
                              <span
                                className={`h-2 w-2 ${getBackground(
                                  index
                                )} rounded-full`}
                              ></span>
                              {item?.article_category}
                            </span>
                          </Link>
                        </div>
                        <div className="h-full flex flex-col items-center justify-between space-y-2">
                          <Link
                            title={item?.title || "Blog post"}
                            href={`/${sanitizeUrl(item?.title)}`}
                            className="px-6 text-[28px] tracking-tighter leading-[28px] font-bold text-gray-700 mb-3"
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
                          <div className="bg-black/5 w-full px-6 py-4 flex flex-col gap-1 text-lg leading-5 text-gray-700">
                            <h3>by {item?.author}</h3>
                            <h3>Date {item?.published_at}</h3>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="flex items-center justify-center border px-10 py-40 text-lg bg-gray-200">
                No articles found
              </div>
            )}
          </div>

          <div className="col-span-1 rounded-[5px]">
            <Rightbar
              className="md:sticky md:top-14"
              hiddennumber="hidden"
              data={data}
              categories={categories || []}
              imagePath={imagePath}
              articles={blog_list}
              blog_list={filteredBlogList}
              heading="Most viewed"
            />
          </div>
        </div>
      </Container>

      <Footer
        articles={filteredBlogList}
        categories={categories}
        imagePath={imagePath}
      />

      <JsonLd
        data={{
          "@context": "https://www.schema.org",
          "@graph": [
           
            {
              "@type": "Organization",
              "@id": `https://${domain}`,
              name: domain,
              url: `https://${domain}`,
              logo: {
                "@type": "ImageObject",
                url: `${imagePath}/${logo.file_name}`,
                width: logo.width,
                height: logo.height,
              },
              sameAs: [
                "https://www.facebook.com",
                "https://www.twitter.com",
                "https://instagram.com",
              ],
            },
            {
              "@type": "ItemList",
              url: `https://${domain}`,
              name: "blog",
              itemListElement: blog_list?.map((blog, index) => ({
                "@type": "ListItem",
                position: index + 1,
                item: {
                  "@type": "Article",
                  url: `https://${domain}/${sanitizeUrl(
                    blog?.article_category
                  )}/${sanitizeUrl(blog?.title)}`,
                  name: blog?.title,
                },
              })),
            },
          ],
        }}
      />
    </div>
  );
}

export async function getServerSideProps({ req }) {
  const domain = getDomain(req?.headers?.host);

  let layoutPages = await callBackendApi({
    domain,
    type: "layout",
  });

  const meta = await callBackendApi({ domain, type: "meta_home" });
  const logo = await callBackendApi({ domain, type: "logo" });
  const favicon = await callBackendApi({ domain, type: "favicon" });
  const blog_list = await callBackendApi({ domain, type: "blog_list" });
  const categories = await callBackendApi({ domain, type: "categories" });

  const project_id = logo?.data[0]?.project_id || null;

  const imagePath = await getImagePath(project_id, domain);

  let page = null;
  if (Array.isArray(layoutPages?.data) && layoutPages.data.length > 0) {
    const valueData = layoutPages.data[0].value;
    page = valueData?.find((page) => page.page === "home");
  }

  if (!page?.enable) {
    return {
      notFound: true,
    };
  }

  // Filter and limit the data to reduce payload size
  const limitedBlogList = blog_list?.data[0]?.value?.slice(0, 20) || [];

  return {
    props: {
      domain,
      imagePath,
      meta: meta?.data[0]?.value || null,
      favicon: favicon?.data[0]?.file_name || null,
      logo: logo?.data[0] || null,
      blog_list: limitedBlogList,
      categories: categories?.data[0]?.value || null,
      page,
    },
  };
}
