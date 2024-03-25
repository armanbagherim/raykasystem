import Image from "next/image";
import fetcher from "../components/global/fetcher";
import Slider from "../components/design/Slider";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/authOptions";
import ProductCard from "../components/design/Cards/ProductCard/ProductCard";
import Title from "../components/design/Title";

async function getProducts() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/v1/api/ecommerce/products?sortOrder=DESC&offset=0&limit=10&orderBy=id`,
    {
      cache: "no-store",
    }
  );
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function Home() {
  const session = await getServerSession(authOptions);
  const { result: products } = await getProducts();
  return (
    <>
      <Slider slidesPerView={1}>
        <img className="w-full rounded-3xl" src="/images/slide.png" alt="" />
        <img className="w-full rounded-3xl" src="/images/slide-2.png" alt="" />
        <img className="w-full rounded-3xl" src="/images/slide.png" alt="" />
      </Slider>
      <div className="container mx-auto mb-24">
        <Title text="سه شنبه های تخفیفی" color={"primary"} />
        <div className="flex flex-wrap gap-5">
          {products.map((value) => (
            <ProductCard
              data={value}
              type="long"
              className="w-full sm:w-1/2 md:w-1/3"
            />
          ))}
        </div>
      </div>
      <div className="bg-primary py-10 mb-20">
        <div className="container mx-auto">
          <Title text="سه شنبه های تخفیفی" color="white" />
          <div className="flex gap-5">
            <Slider slidesPerView={5}>
              {products.map((value) => (
                <ProductCard data={value} type="main" />
              ))}
            </Slider>
          </div>
        </div>
      </div>
      <div className="container mx-auto mb-24">
        <Title text="پرفروش ترین ها" color={"primary"} />
        <div className="flex flex-wrap gap-5">
          {products.map((value) => (
            <ProductCard
              data={value}
              type="long"
              className="w-full sm:w-1/2 md:w-1/3"
            />
          ))}
        </div>
      </div>
      <div className="container mx-auto mb-20">
        <div className="flex gap-5">
          <img className="w-full" src="/images/right.png" alt="" />
          <img className="w-full" src="/images/left.png" alt="" />
        </div>
      </div>
      <div className="container mx-auto mb-24">
        <Title text="پرفروش ترین ها" color={"primary"} />
        <Slider slidesPerView={5}>
          {products.map((value) => (
            <ProductCard
              data={value}
              type="main"
              className="w-full sm:w-1/2 md:w-1/3"
            />
          ))}
        </Slider>
      </div>
      <div className="container mx-auto mb-24">
        <div className="flex gap-5">
          <div className="w-1/3">
            <img className="h-full" src="/images/banner.png" alt="" />
          </div>
          <div className="w-2/3">
            <div className="flex flex-wrap gap-5">
              {products.map((value) => (
                <ProductCard
                  data={value}
                  type="long"
                  className="w-full sm:w-1/2 md:w-1/3"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto mb-24">
        <Title text=" محبوب ترین  محصولات" color={"primary"} />
        <Slider slidesPerView={5}>
          {products.map((value) => (
            <ProductCard
              data={value}
              type="main"
              className="w-full sm:w-1/2 md:w-1/3"
            />
          ))}
        </Slider>
      </div>

      <div className="container mx-auto mb-24">
        <img src="/images/banner-big.png" className="w-full" alt="" />
      </div>
      <div className="container mx-auto mb-24">
        <div className="flex gap-5">
          <div className="w-1/3">
            <img className="h-full" src="/images/banner.png" alt="" />
          </div>
          <div className="w-2/3">
            <div className="flex flex-wrap gap-5">
              {products.map((value) => (
                <ProductCard
                  data={value}
                  type="long"
                  className="w-full sm:w-1/2 md:w-1/3"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
