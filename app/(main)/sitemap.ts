import { MetadataRoute } from "next";

async function getProducts() {
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/v1/api/ecommerce/products?limit=1`;
  const res = await fetch(url, {
    cache: "no-store",
  });
  return res.json();
}

export default async function sitemap() {
  return [
    {
      url: `${process.env.WEBSITE_BASE_URL}/sitemaps/products/sitemap.xml`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${process.env.WEBSITE_BASE_URL}/sitemaps/brands/sitemap.xml`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${process.env.WEBSITE_BASE_URL}/sitemaps/product-category/sitemap.xml`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${process.env.WEBSITE_BASE_URL}/sitemaps/pages/sitemap.xml`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${process.env.WEBSITE_BASE_URL}/contactus`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${process.env.WEBSITE_BASE_URL}/about-us`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${process.env.WEBSITE_BASE_URL}/brands`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${process.env.WEBSITE_BASE_URL}/amazing`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${process.env.WEBSITE_BASE_URL}/search`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },

    {
      url: `/blog`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
