import { MetadataRoute } from "next";

async function getBrands(page) {
  const limit = 100;
  const offset = (page - 1) * limit;
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/v1/api/ecommerce/pages?limit=${limit}&offset=${offset}`;
  const res = await fetch(url, {
    cache: "no-store",
  });
  return res.json();
}

export async function generateSitemaps() {
  const brands = await getBrands(1);
  const totalCount = brands.total;
  const sitemapsNeeded = Math.ceil(totalCount / 100);

  // Generate unique IDs for each sitemap starting from 1
  const sitemapIds = Array.from(
    { length: sitemapsNeeded },
    (_, index) => index + 1 // Start IDs from 1 instead of 0
  );

  const sitemaps = sitemapIds.map((id) => ({ id }));
  return sitemaps;
}

export default async function sitemap({ id }) {
  const brands = await getBrands(id);

  return brands.result.map((brand) => ({
    url: `${process.env.WEBSITE_BASE_URL}/pages/${brand.slug}`,
    lastModified: brand.updatedAt ?? brand.createdAt,
    changeFrequency: "daily",
    priority: 1,
  }));
}
