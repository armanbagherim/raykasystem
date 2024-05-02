import Image from "next/image";
import Slider from "../components/design/Slider";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/authOptions";
import ProductCard from "../components/design/Cards/ProductCard/ProductCard";
import Title from "../components/design/Title";
import Link from "next/link";

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

async function getBrands() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/v1/api/ecommerce/brands?sortOrder=DESC&offset=22&limit=10&orderBy=id&ignorePaging=false`,
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
  const { result: brands } = await getBrands();

  return (
    <>
      <div className="mb-20">
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
              height={406}
              loading="eager"
              layout="responsive"
            />
          </picture>
        </Slider>
      </div>
      <div className="container mx-auto mb-5 px-4">
        <Title text="سه شنبه های تخفیفی" color={"primary"} />
        <div className="flex gap-5 px-4">
          <Slider>
            {products.map((value, key) => (
              <ProductCard key={key} data={value} type="main" />
            ))}
          </Slider>
        </div>
      </div>
      <div className="container mx-auto mb-20">
        <div className="flex flex-col xl:flex-row lg:flex-row xl:flex-row gap-5">
          <div className="flex-1">
            <img
              className="w-full h-full"
              src="/images/sorkh.png"
              width={0}
              height={0}
              sizes="100vw"
            />
          </div>
          <div className="flex-1">
            <img
              className="w-full h-full"
              alt=""
              width={0}
              height={0}
              sizes="100vw"
              src="/images/goosht.png"
            />
          </div>
          <div className="flex-1">
            <img
              className="w-full h-full"
              alt=""
              width={0}
              height={0}
              sizes="100vw"
              src="/images/jaroo.png"
            />
          </div>
        </div>
      </div>
      <div className="bg-primary py-10 mb-20 bg-[url('/images/pattern.png')]">
        <div className="container mx-auto">
          <Title text="تخفیف های شگفت انگیز" color="white" />
          <div className="flex gap-5 px-4">
            <Slider>
              {products.map((value, key) => (
                <ProductCard key={key} data={value} type="main" />
              ))}
            </Slider>
          </div>
        </div>
      </div>
      <div className="container mx-auto mb-14 px-4">
        <Title text="پرفروش ترین ها" color={"primary"} />
        <div className="flex gap-5 px-4">
          <Slider>
            {products.map((value, key) => (
              <ProductCard key={key} data={value} type="main" />
            ))}
          </Slider>
        </div>
      </div>
      <div className="container mx-auto mb-20">
        <div className="flex flex-col xl:flex-row lg:flex-row xl:flex-row gap-5">
          <div className="flex-1">
            <img
              className="w-full h-full"
              src="/images/right.png"
              width={0}
              height={0}
              sizes="100vw"
            />
          </div>
          <div className="flex-1">
            <img
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
      <div className="container mx-auto px-4 mb-32">
        <Title text="پرفروش ترین ها" color={"primary"} />
        <Slider>
          {products.map((value, key) => (
            <ProductCard
              key={key}
              data={value}
              type="main"
              className="w-full sm:w-1/2 xl:w-1/3"
            />
          ))}
        </Slider>
      </div>

      <div className="container mx-auto px-4 mb-32">
        <Title text="برترین برند ها" color={"primary"} />
        <Slider slidesPerView={8}>
          {brands.map((value, key) => (
            <Link
              className="w-full text-center"
              href={`/brand/${value?.slug}`}
              key={value.id}
            >
              <Image
                src={`${process.env.NEXT_PUBLIC_BASE_URL}/v1/api/ecommerce/brands/image/${value?.attachment?.fileName}`}
                width={115}
                loading="eager"
                height={115}
                alt={value?.name}
              />
            </Link>
          ))}
        </Slider>
      </div>

      <div className="container mx-auto mb-24 px-4">
        <Title text="پرفروش ترین ها" color={"primary"} />
        <div className="flex gap-5">
          <div className="w-full">
            <div className="flex gap-5 px-4">
              <Slider>
                {products.map((value, key) => (
                  <ProductCard key={key} data={value} type="main" />
                ))}
              </Slider>
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
              className="w-full sm:w-1/2 xl:w-1/3"
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
          <div className="w-full">
            <div className="flex gap-5 px-4">
              <Slider>
                {products.map((value, key) => (
                  <ProductCard key={key} data={value} type="main" />
                ))}
              </Slider>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
