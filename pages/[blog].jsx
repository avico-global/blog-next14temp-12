import React, { useEffect } from "react";
import Navbar from "@/components/container/navbar/Navbar";
import Banner from "@/components/container/banner/Banner";
import Footer from "@/components/container/footer/Footer";

import {
  callBackendApi,
  getDomain,
  getImagePath,
  sanitizeUrl,
} from "@/lib/myFun";
import Head from "next/head";
import MarkdownIt from "markdown-it";
import { useRouter } from "next/router";
import JsonLd from "@/components/json/JsonLd";
import useBreadcrumbs from "@/lib/useBreadcrumbs";
import Container from "@/components/common/Container";
import GoogleTagManager from "@/lib/GoogleTagManager";
import { Raleway } from "next/font/google";
import Rightbar from "@/components/common/Rightbar";
import Link from "next/link";
import Image from "next/image";

const myFont = Raleway({
  subsets: ["cyrillic", "cyrillic-ext", "latin", "latin-ext"],
});

export default function Blog({
  imagePath,
  myblog,
  logo,
  categories,
  blog_list,
  domain,
  favicon,
  blog_type,
  project_id,
  data,
  layout,
}) {
  const backgrounds = [
    "bg-background1",
    "bg-background2",
    "bg-background3",
    "bg-background4",
    "bg-background1",
    "bg-background2",
  ];
  const router = useRouter();
  const { category, blog } = router.query;
  const breadcrumbs = useBreadcrumbs();

  const markdownIt = new MarkdownIt();
  const content = markdownIt.render(
    myblog?.value?.articleContent?.replaceAll(
      `https://api.sitebuilderz.com/images/project_images/${project_id}/`,
      imagePath
    ) || ""
  );

  useEffect(() => {
    if (blog.includes("%20") || blog.includes(" ", "-")) {
      const newBlog = sanitizeUrl(blog);
      router.replace(`/${newBlog}`);
    }
  }, [router, blog]);

  const page = layout?.find((page) => page.page === "blog page");

  return (
    <div className={myFont.className}>
      <Head>
        <meta charSet="UTF-8" />
        <title>{myblog?.value?.meta_title}</title>
        <meta name="description" content={myblog?.value?.meta_description} />
        <link rel="author" href={`https://www.${domain}`} />
        <link
          rel="canonical"
          href={`https://www.${domain}/${category}/${blog}`}
        />
        <meta name="theme-color" content="#008DE5" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <GoogleTagManager />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href={`${process.env.NEXT_PUBLIC_SITE_MANAGER}/images/${imagePath}/${favicon}`}
        />
      </Head>

      <Navbar
        logo={logo}
        imagePath={imagePath}
        categories={categories}
        blog_list={blog_list}
      />

      <Banner myblog={myblog} imagePath={imagePath} blog_type={blog_type} />

      <Container className="py-20">
        <div className="relative flex flex-col lg:flex-row gap-6 lg:gap-14">
          <div className="w-full lg:w-[77%]">
            <article className="prose lg:prose-xl">
              <div dangerouslySetInnerHTML={{ __html: content }} />
            </article>
          </div>
          <div className="w-full lg:w-[23%]">
            <div className="sticky top-20">
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
                      href={encodeURI(
                        `/blog/${
                          article.slug ||
                          article.title.toLowerCase().replace(/ /g, "-")
                        }`
                      )}
                      className="flex items-center gap-4 mb-4 group"
                    >
                      <div
                        className={`${backgrounds[index]} w-20 h-20 relative flex-shrink-0`}
                      >
                        <Image
                          src={`${imagePath}/${
                            article.image || "no-image.png"
                          }`}
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
                className="md:sticky  rounded-lg  "
                hiddennumber="hidden"
                categories={categories || []}
                imagePath={imagePath}
                blog_list={blog_list}
              />
            </div>
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
              "@type": "BlogPosting",
              mainEntityOfPage: {
                "@type": "WebPage",
                "@id": myblog
                  ? `https://${domain}${sanitizeUrl(
                      myblog.article_category
                    )}/${sanitizeUrl(myblog.value.title)}`
                  : "",
                url: myblog
                  ? `https://${domain}${sanitizeUrl(
                      myblog.article_category
                    )}/${sanitizeUrl(myblog.value.title)}`
                  : "",
              },
              headline: myblog?.value?.title || "Default Title",
              description:
                myblog?.value?.articleContent || "Default Description",
              datePublished:
                myblog?.value?.published_at || new Date().toISOString(),
              author: {
                "@type": "Person",
                name: myblog?.value?.author || "Unknown Author",
              },
              image: myblog?.file_name
                ? `${imagePath}/${myblog.file_name}`
                : `${imagePath}/default-image.jpg`,
              publisher: {
                "@type": "Organization",
                name: "Site Manager",
                logo: {
                  "@type": "ImageObject",
                  url: `${imagePath}/${logo?.file_name}`,
                },
              },
            },
            {
              "@type": "BreadcrumbList",
              itemListElement: breadcrumbs.map((breadcrumb, index) => ({
                "@type": "ListItem",
                position: index + 1,
                name: breadcrumb.label || `Breadcrumb ${index + 1}`,
                item: breadcrumb.url
                  ? `https://${domain}${breadcrumb.url}`
                  : `https://${domain}`,
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
  const { category, blog } = query;

  const blog_list = await callBackendApi({ domain, type: "blog_list" });

  const isValidBlog = blog_list?.data[0]?.value?.find(
    (item) => sanitizeUrl(item.title) === blog
  );

  let layoutPages = await callBackendApi({
    domain,
    type: "layout",
  });

  const nav_type = await callBackendApi({ domain, type: "nav_type" });
  const categories = await callBackendApi({ domain, type: "categories" });
  const myblog = await callBackendApi({ domain, type: isValidBlog?.key });
  const tag_list = await callBackendApi({ domain, type: "tag_list" });
  const logo = await callBackendApi({ domain, type: "logo" });
  const favicon = await callBackendApi({ domain, type: "favicon" });
  const about_me = await callBackendApi({ domain, type: "about_me" });
  const contact_details = await callBackendApi({
    domain,
    type: "contact_details",
  });

  if (!isValidBlog) {
    return {
      notFound: true,
    };
  }

  let page = null;
  if (Array.isArray(layoutPages?.data) && layoutPages.data.length > 0) {
    const valueData = layoutPages.data[0].value;
    page = valueData?.find((page) => page.page === "blog page");
  }

  if (!page?.enable) {
    return {
      notFound: true,
    };
  }

  let project_id = logo?.data[0]?.project_id || null;
  let imagePath = await getImagePath(project_id, domain);

  return {
    props: {
      page,
      domain,
      imagePath,
      project_id,
      logo: logo?.data[0] || null,
      myblog: myblog?.data[0] || {},
      about_me: about_me.data[0] || null,
      nav_type: nav_type?.data[0]?.value || {},
      tag_list: tag_list?.data[0]?.value || null,
      blog_list: blog_list.data[0]?.value || null,
      favicon: favicon?.data[0]?.file_name || null,
      categories: categories?.data[0]?.value || null,
      contact_details: contact_details?.data[0]?.value || null,
    },
  };
}
