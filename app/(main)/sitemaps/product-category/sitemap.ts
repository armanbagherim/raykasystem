import { MetadataRoute } from "next";

async function getProducts() {
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/v1/api/eav/admin/entityTypes?ignorePaging=true&entityModelId=1`;
  const res = await fetch(url, {
    cache: "no-store",
  });
  return res.json();
}

export default async function sitemap() {
  const products = await getProducts();

  return products.result.map((product) => ({
    url: `${process.env.WEBSITE_BASE_URL}/category/${product.slug}`,
    lastModified: product.createdAt,
    changeFrequency: "daily",
    priority: 1,
  }));
}
