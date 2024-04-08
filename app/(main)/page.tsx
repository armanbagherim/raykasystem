import Image from "next/image";
import Slider from "../components/design/Slider";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/authOptions";
import ProductCard from "../components/design/Cards/ProductCard/ProductCard";
import Title from "../components/design/Title";
import Interseptor from "../components/global/Interseptor";
import { Metadata } from "next";

async function getProducts() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/v1/api/ecommerce/products?sortOrder=DESC&offset=0&limit=10&orderBy=id`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

// async function getCart() {
//   const res = await Interseptor("/v1/api/ecommerce/user/stocks");
//   return res.json();
// }

export default async function Home() {
  const session = await getServerSession(authOptions);
  const { result: products } = await getProducts();
  // const cart = await getCart();
  // console.log("cartsssssssssssssss", cart);
  return (
    <>
      <Slider slidesPerView={1}>
        <Image
          src={"/images/slide.png"}
          width={0}
          height={0}
          alt="تصویر اسلایدر"
          sizes="100vw"
          style={{ width: "100%", height: "auto" }} // optional
          property=""
        />
        <Image
          src={"/images/slide-2.png"}
          width={0}
          height={0}
          alt="تصویر اسلایدر"
          sizes="100vw"
          style={{ width: "100%", height: "auto" }} // optional
          property=""
        />
        <Image
          src={"/images/slide.png"}
          width={0}
          height={0}
          alt="تصویر اسلایدر"
          sizes="100vw"
          style={{ width: "100%", height: "auto" }} // optional
          property=""
        />
      </Slider>
      <div className="container mx-auto mb-24 px-4">
        <Title text="سه شنبه های تخفیفی" color={"primary"} />
        <div className="flex flex-wrap gap-5">
          {products.slice(0, 2).map((value) => (
            <ProductCard
              key={value.id} // Assuming 'value' has an 'id' property, use it for the key
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
          <div className="flex gap-5 px-4">
            <Slider>
              {products.map((value, key) => (
                <ProductCard key={key} data={value} type="main" />
              ))}
            </Slider>
          </div>
        </div>
      </div>
      <div className="container mx-auto mb-24 px-4">
        <Title text="پرفروش ترین ها" color={"primary"} />
        <div className="grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
          {products.map((value, key) => (
            <ProductCard
              key={key}
              data={value}
              type="long"
              className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5"
            />
          ))}
        </div>
      </div>
      <div className="container mx-auto mb-20">
        <div className="flex flex-col md:flex-row lg:flex-row xl:flex-row gap-5">
          <div className="flex-1">
            <img className="w-full" src="/images/right.png" alt="" />
          </div>
          <div className="flex-1">
            <img className="w-full" src="/images/left.png" alt="" />
          </div>
        </div>
      </div>
      <div className="container mx-auto mb-24 px-4">
        <Title text="پرفروش ترین ها" color={"primary"} />
        <Slider>
          {products.map((value, key) => (
            <ProductCard
              key={key}
              data={value}
              type="main"
              className="w-full sm:w-1/2 md:w-1/3"
            />
          ))}
        </Slider>
      </div>
      <div className="container mx-auto mb-24 px-4">
        <div className="flex gap-5">
          <div className="w-1/3 hidden md:block lg:block xl:block 2xl:block">
            <img className="h-full" src="/images/banner.png" alt="" />
          </div>
          <div className="w-full xl:w-2/3">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6">
              {products.slice(0, 6).map((value, key) => (
                <ProductCard
                  key={key}
                  data={value}
                  type="long"
                  className="w-full sm:w-1/2 md:w-1/3"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto mb-24 px-4">
        <Title text=" محبوب ترین  محصولات" color={"primary"} />
        <Slider>
          {products.map((value, key) => (
            <ProductCard
              key={key}
              data={value}
              type="main"
              className="w-full sm:w-1/2 md:w-1/3"
            />
          ))}
        </Slider>
      </div>

      <div className="container mx-auto mb-24 px-4">
        <img src="/images/banner-big.png" className="w-full" alt="" />
      </div>
      <div className="container mx-auto mb-24 px-4">
        <div className="flex gap-5">
          <div className="w-1/3 hidden lg:block xl:block 2xl:block">
            <img className="h-full" src="/images/banner.png" alt="" />
          </div>
          <div className="w-full md:w-2/3">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6">
              {products.slice(0, 6).map((value, key) => (
                <ProductCard
                  key={key}
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
