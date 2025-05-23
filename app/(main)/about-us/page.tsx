import React from "react";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "درباره ما | رایکا سیستم",
  };
}

export default function page() {
  return (
    <div className="container mx-auto">
      <div className="rounded-3xl bg-white border border-gray-100 p-10">
        <h1 className="peyda text-[26px] mb-4">درباره ما</h1>

        <p>
          فروشگاه اینترنتی رایکا سیستم در سال 1395 کار خود را به عنوان فروشگاه لوازم
          خانه، آشپزخانه و لوازم الکترونیکی عروس آغاز نمود. ما در رایکا سیستم همواره میکوشیم تا
          محصولاتی با بهترین کیفیت و قیمت عرضه کنیم.
        </p>
      </div>
    </div>
  );
}
