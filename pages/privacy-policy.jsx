import React, { useEffect } from "react";

// Components
import Container from "@/components/common/Container";
import Fullcontainer from "@/components/common/Fullcontainer";


import Navbar from "@/components/container/navbar/Navbar";
import Footer from "@/components/container/footer/Footer";
import GoogleTagManager from "@/lib/GoogleTagManager";
import MarkdownIt from "markdown-it";
import Breadcrumbs from "@/components/common/Breadcrumbs";

import useBreadcrumbs from "@/lib/useBreadcrumbs";

import { callBackendApi, getDomain, getImagePath } from "@/lib/myFun";

import Head from "next/head";
import { Raleway } from "next/font/google";
import JsonLd from "@/components/json/JsonLd";
import { useRouter } from "next/router";
const myFont = Raleway({
  subsets: ["cyrillic", "cyrillic-ext", "latin", "latin-ext"],
});


export default function PriavcyPolicy({
  categories,
  imagePath,
  favicon,
  policy,
  logo,
  meta,
  page,
  domain,
  nav_type,
  blog_list,
  footer_type,
  contact_details,
}) {
  const markdownIt = new MarkdownIt();
  const content = markdownIt.render(policy || "");
  const breadcrumbs = useBreadcrumbs();
  const router = useRouter();
  const currentPath = router.pathname;

  useEffect(() => {
    if (currentPath.includes("%20") || currentPath.includes(" ")) {
      router.replace("/privacy-policy");
    }
  }, [currentPath, router]);

  return (
    <div
      className={`min-h-screen flex flex-col justify-between ${myFont.className}`}
    >
      <Head>
        <meta charSet="UTF-8" />
        <title>{meta?.title}</title>
        <meta name="description" content={meta?.description} />
        <link rel="author" href={`https://${domain}`} />
        <link rel="publisher" href={`https://${domain}`} />
        <link rel="canonical" href={`https://${domain}/privacy-policy`} />
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

      {page?.enable
        ? page?.sections?.map((item, index) => {
            if (!item.enable) return null;
            switch (item.section?.toLowerCase()) {
              case "navbar":
                return (
                  <Navbar
                    key={index}
                    imagePath={imagePath}
                    blog_list={blog_list}
                    categories={categories}
                    logo={logo}
                  />
                );
              case "breadcrumbs":
                return (
                  <Fullcontainer key={index}>
                    <Container>
                      <Breadcrumbs breadcrumbs={breadcrumbs} className="py-7 mt-24" />
                    </Container>
                  </Fullcontainer>
                );
              case "text":
                return (
                  <Fullcontainer key={index}>
                    <Container>
                      <div
                        className="prose max-w-full w-full mb-5"
                        dangerouslySetInnerHTML={{ __html: content }}
                      />
                    </Container>
                  </Fullcontainer>
                );
              case "footer":
                return (
                  <Footer
                    key={index}
                    imagePath={imagePath}
                    articles={blog_list}
                    categories={categories}
                  />
                );
              default:
                return null;
            }
          })
        : "Page Disabled, under maintenance"}

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "WebPage",
              "@id": `https://${domain}/privacy-policy`,
              url: `https://${domain}/privacy-policy`,
              name: meta?.title,
              description: meta?.description,
              isPartOf: {
                "@id": `https://${domain}`,
              },
              inLanguage: "en-US",
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

  const meta = await callBackendApi({ domain, type: "meta_privacy" });
  const logo = await callBackendApi({ domain, type: "logo" });
  const favicon = await callBackendApi({ domain, type: "favicon" });
  const blog_list = await callBackendApi({ domain, type: "blog_list" });
  const categories = await callBackendApi({
    domain,
    type: "categories",
  });
  const contact_details = await callBackendApi({
    domain,
    type: "contact_details",
  });
  const terms = await callBackendApi({ domain, type: "terms" });
  const policy = await callBackendApi({ domain, type: "policy" });
  const nav_type = await callBackendApi({ domain, type: "nav_type" });
  const footer_type = await callBackendApi({ domain, type: "footer_type" });

  let page = null;
  if (Array.isArray(layoutPages?.data) && layoutPages.data.length > 0) {
    const valueData = layoutPages.data[0].value;
    page = valueData?.find((page) => page.page === "privacy policy");
  }

  if (!page?.enable) {
    return {
      notFound: true,
    };
  }

  let project_id = logo?.data[0]?.project_id || null;
  let imagePath = null;
  imagePath = await getImagePath(project_id, domain);

  return {
    props: {
      domain,
      imagePath,
      favicon: favicon?.data[0]?.file_name || null,
      logo: logo?.data[0] || null,
      blog_list: blog_list?.data[0]?.value || [],
      categories: categories?.data[0]?.value || null,
      meta: meta?.data[0]?.value || null,
      contact_details: contact_details?.data[0]?.value || null,
      terms: terms?.data[0]?.value || "",
      policy: policy?.data[0]?.value || "",
      nav_type: nav_type?.data[0]?.value || {},
      footer_type: footer_type?.data[0]?.value || {},
      page,
    },
  };
}
