import Image from "next/image";
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

  if (!res.ok) {
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
        <picture>
          <source media="(max-width: 768px)" srcSet="/images/mobile-1.jpg" />
          <Image
            src="/images/slide.png"
            alt="Descriptive text for the image"
            width={500}
            height={300}
            quality={100}
            layout="responsive"
          />
        </picture>
        <picture>
          <source media="(max-width: 768px)" srcSet="/images/mobile-2.png" />
          <Image
            src="/images/slide-2.png"
            alt="Descriptive text for the image"
            width={500}
            quality={100}
            height={300}
            layout="responsive"
          />
        </picture>
      </Slider>
      <div className="container mx-auto mb-24 px-4">
        <Title text="سه شنبه های تخفیفی" color={"primary"} />
        <div className="flex flex-wrap gap-5 to-scroll">
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
        <div className=" auto-rows-fr grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 to-scroll">
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
            <Image
              className="w-full h-full"
              src="/images/right.png"
              width={0}
              height={0}
              sizes="100vw"
            />
          </div>
          <div className="flex-1">
            <Image
              className="w-full h-full"
              alt=""
              width={0}
              height={0}
              sizes="100vw"
              src="/images/left.png"
            />
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
            <Image
              className="w-full h-full"
              alt=""
              width={0}
              height={0}
              sizes="100vw"
              src="/images/banner.png"
            />
          </div>
          <div className="w-full xl:w-2/3">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6 to-scroll">
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
        <Image
          className="w-full h-full"
          alt=""
          width={0}
          height={0}
          sizes="100vw"
          src="/images/banner-big.png"
        />
      </div>
      <div className="container mx-auto mb-24 px-4">
        <div className="flex gap-5">
          <div className="w-1/3 hidden lg:block xl:block 2xl:block">
            <Image
              className="w-full h-full"
              alt=""
              width={0}
              height={0}
              sizes="100vw"
              src="/images/banner.png"
            />
          </div>
          <div className="w-full md:w-2/3">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6 to-scroll">
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
