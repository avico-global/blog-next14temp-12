import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/container/navbar/Navbar";
import Banner from "@/components/container/banner/Banner";
import Latest from "@/components/home/Latest";
import Popular from "@/components/home/Popular";
import Fromtheblog from "@/components/home/Fromtheblog";
import Footer from "@/components/container/footer/Footer";
import Head from "next/head";
import GoogleTagManager from "@/lib/GoogleTagManager";

import {
  callBackendApi,
  getDomain,
  getImagePath,
  robotsTxt,
  sanitizeUrl,
} from "@/lib/myFun";
import JsonLd from "@/components/json/JsonLd";

export default function Home({
  categories,
  imagePath,
  banner,
  domain,
  logo,
  meta,
  favicon,
  blog_list,
}) {
  const filteredBlogList = blog_list?.filter((blog) => blog.image) || [];

  return (
    <div className="">
      <Head>
        <meta charSet="UTF-8" />
        <title>{meta?.title}</title>
        <meta name="description" content={meta?.description} />
        <link rel="author" href={`https://${domain}`} />
        <link rel="publisher" href={`https://${domain}`} />
        <link rel="canonical" href={`https://${domain}`} />
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
      <Banner myblog={banner} imagePath={imagePath} />
      <Latest
        blog_list={filteredBlogList}
        imagePath={imagePath}
        categories={categories}
        articles={filteredBlogList}
      />
      <Popular blog_list={filteredBlogList} imagePath={imagePath} />

      <Fromtheblog
        categories={categories}
        blog_list={filteredBlogList}
        imagePath={imagePath}
      />
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
              "@type": "WebSite",
              "@id": `https://${domain}/`,
              url: `https://${domain}/`,
              name: meta?.title,
              isPartOf: {
                "@id": `https://${domain}`,
              },
              description: meta?.description,
              inLanguage: "en-US",
              primaryImageOfPage: {
                "@type": "ImageObject",
                url: `${imagePath}/${banner?.file_name}`,
                width: 1920,
                height: 1080,
              },
            },
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
  const copyright = await callBackendApi({ domain, type: "copyright" });
  const banner = await callBackendApi({ domain, type: "banner" });
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

  robotsTxt({ domain });

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
      copyright: copyright?.data[0]?.value || null,
      banner: banner?.data[0],
      page,
    },
  };
}
