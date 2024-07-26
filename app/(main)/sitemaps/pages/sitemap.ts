import { MetadataRoute } from "next";

async function getProducts() {
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/v1/api/ecommerce/pages?limit=1`;
  const res = await fetch(url, {
    cache: "no-store",
  });
  return res.json();
}

export default async function sitemap() {
  const productsResponse = await getProducts();
  const totalCount = Math.ceil(productsResponse.total / 100);

  if (totalCount > 0) {
    const sitemaps = Array.from({ length: totalCount }, (_, index) => ({
      url: `${process.env.WEBSITE_BASE_URL}/pages/sitemap/${index + 1}.xml`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    }));

    return sitemaps;
  } else {
    return [];
  }
}
