import Slider from "@/app/components/design/Slider";
import React from "react";

const getProduct = async (slug:number) => {
  const res = await fetch(`https://json.xstack.ir/api/v1/product/${slug}`);
  const response = await res.json();
  return response;
};

export default async function page({ params }) {
  const product = await getProduct(params.slug);
  console.log(product);
  return (
    <div className="container mx-auto">
      <Slider slidesPerView={1}>
        <img src={product.images[0]} alt={product.name} />
        <img src={product.images[1]} alt={product.name} />
        <img src={product.images[2]} alt={product.name} />
        <img src={product.images[0]} alt={product.name} />
        <img src={product.images[1]} alt={product.name} />
        <h1>{product.name}</h1>
      </Slider>
    </div>
  );
}
