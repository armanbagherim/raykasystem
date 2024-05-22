import Image from "next/image";
import Slider from "../components/design/Slider";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/authOptions";
import ProductCard from "../components/design/Cards/ProductCard/ProductCard";
import Title from "../components/design/Title";
import Link from "next/link";
import ProductListFilter from "../components/ProductListFilter";

async function getProducts(listFilter?: ProductListFilter) {
  const queryString = new URLSearchParams(
    JSON.parse(JSON.stringify(listFilter))
  ).toString();
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/v1/api/ecommerce/products?${queryString}`,
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
    `${process.env.NEXT_PUBLIC_BASE_URL}/v1/api/ecommerce/brands?sortOrder=DESC&offset=33&limit=10&orderBy=id&ignorePaging=false`,
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

  //for
  /*
  0: check type == 1: products load
  1: check type == 2: shegaft angiz load
  1: check type == 3: brands load
  2: check type == 4: entity type load
  3: check type == 5: banner
  */

  const { result: products } = await getProducts({ entityTypeId: 1004 });

  const items: { name: string; fetchFunction: Promise<any> }[] = [
    {
      name: "سرخ کن ها",
      fetchFunction: getProducts({ entityTypeId: 1078, inventoryStatusId: 1 }),
    },
    {
      name: "تخفیف های شگفت انگیز",
      fetchFunction: getProducts({
        inventoryStatusId: 1,
        discountTypeId: 2,
      }),
    },
    {
      name: "اسپرسو ساز ها",
      fetchFunction: getProducts({ entityTypeId: 1020, inventoryStatusId: 1 }),
    },
    {
      name: "ماگ ها",
      fetchFunction: getProducts({ entityTypeId: 1098, inventoryStatusId: 1 }),
    },
    {
      name: "خرد کن",
      fetchFunction: getProducts({ entityTypeId: 1077, inventoryStatusId: 1 }),
    },
    {
      name: "گوشت کوب برقی",
      fetchFunction: getProducts({ entityTypeId: 1079, inventoryStatusId: 1 }),
    },
    {
      name: "قابلمه و تابه",
      fetchFunction: getProducts({ entityTypeId: 1050, inventoryStatusId: 1 }),
    },
    {
      name: "فنجان و لیوان",
      fetchFunction: getProducts({ entityTypeId: 1063, inventoryStatusId: 1 }),
    },
    ,
  ];

  const promises: Promise<any>[] = [];

  items.forEach((item) => {
    promises.push(item.fetchFunction);
  });

  const promiseResults = await Promise.all(promises);
  const productLists = promiseResults.map((promiseResult) => {
    return promiseResult.result;
  });

  const { result: brands } = await getBrands();

  // for dovom baraye rendering data

  return (
    <>
      <div className="mb-8 md:mb-20">
        <Slider slidesPerView={1}>
          <picture>
            <source media="(max-width: 768px)" srcSet="/images/mobile-1.jpg" />
            <Image
              src="/images/slide.png"
              alt="Descriptive text for the image"
              width={500}
              height={300}
              quality={100}
              unoptimized={false}
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
              unoptimized={false}
              height={406}
              loading="eager"
              layout="responsive"
            />
          </picture>
        </Slider>
      </div>
      <div className="container mx-auto mb-5 px-4">
        <Title text={items[0].name} color={"primary"} />
        <div className="flex gap-5 px-4">
          <Slider>
            {productLists[0].map((value, key) => (
              <ProductCard key={key} data={value} type="main" />
            ))}
          </Slider>
        </div>
      </div>
      <div className="container mx-auto mb-20">
        <div className="flex flex-col xl:flex-row lg:flex-row gap-1 md:gap-5">
          <div className="flex-1">
            <Link href="/category/airfryer">
              <img
                className="w-full h-full rounded-none md:rounded-2xl"
                src="/images/sorkh.png"
                width={0}
                height={0}
                sizes="100vw"
              />
            </Link>
          </div>
          <div className="flex-1">
            <Link href="/category/hand-blender">
              <img
                className="w-full h-full rounded-none md:rounded-2xl"
                alt=""
                width={0}
                height={0}
                sizes="100vw"
                src="/images/goosht.png"
              />
            </Link>
          </div>
          <div className="flex-1">
            <Link href="/category/handheld-vacuum">
              <img
                className="w-full h-full rounded-none md:rounded-2xl"
                alt=""
                width={0}
                height={0}
                sizes="100vw"
                src="/images/jaroo.png"
              />
            </Link>
          </div>
        </div>
      </div>
      <div className="bg-primary py-10 mb-8 md:mb-20 bg-[url('/images/pattern.png')]">
        <div className="container mx-auto">
          <Title text={items[1].name} color="white" />
          <div className="flex gap-5 px-4">
            <Slider>
              {productLists[1].map((value, key) => (
                <ProductCard key={key} data={value} type="main" />
              ))}
            </Slider>
          </div>
        </div>
      </div>
      <div className="container mx-auto mb-4 md:mb-14 px-4">
        <Title text={items[2].name} color={"primary"} />
        <div className="flex gap-5 px-4">
          <Slider>
            {productLists[2].map((value, key) => (
              <ProductCard key={key} data={value} type="main" />
            ))}
          </Slider>
        </div>
      </div>
      <div className="container mx-auto mb-8 md:mb-20">
        <div className="flex flex-col xl:flex-row lg:flex-row xl:flex-row gap-5">
          <div className="flex-1">
            <Link href="/brand/smeg">
              <img
                className="w-full h-full"
                src="/images/right.png"
                width={0}
                height={0}
                sizes="100vw"
              />
            </Link>
          </div>
          <div className="flex-1">
            <Link href="/brand/delonghi">
              <img
                className="w-full h-full"
                alt=""
                width={0}
                height={0}
                sizes="100vw"
                src="/images/left.png"
              />
            </Link>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 mb-8 md:mb-32">
        <Title text={items[3].name} color={"primary"} />
        <Slider>
          {productLists[3].map((value, key) => (
            <ProductCard
              key={key}
              data={value}
              type="main"
              className="w-full sm:w-1/2 xl:w-1/3"
            />
          ))}
        </Slider>
      </div>

      <div className="container mx-auto px-4 mb-8 md:mb-32">
        <Title text="محبوب‌ترین برندها" color={"primary"} />
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

      <div className="container mx-auto mb-8 md:mb-24 px-4">
        <Title text={items[4].name} color={"primary"} />
        <div className="flex gap-5">
          <div className="w-full">
            <div className="flex gap-5 px-4">
              <Slider>
                {productLists[4].map((value, key) => (
                  <ProductCard key={key} data={value} type="main" />
                ))}
              </Slider>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto mb-8 md:mb-24 px-4">
        <Title text={items[5].name} color={"primary"} />
        <Slider>
          {productLists[5].map((value, key) => (
            <ProductCard
              key={key}
              data={value}
              type="main"
              className="w-full sm:w-1/2 xl:w-1/3"
            />
          ))}
        </Slider>
      </div>
      <div className="container mx-auto mb-8 md:mb-24 px-4">
        <Link href="/brand/moser">
          <img
            className="w-full h-full"
            alt=""
            width={0}
            height={0}
            sizes="100vw"
            src="/images/banner-big.png"
          />
        </Link>
      </div>
      <div className="container mx-auto mb-8 md:mb-24 px-4">
        <div className="flex gap-5">
          <div className="w-full">
            <Title text={items[6].name} color={"primary"} />
            <div className="flex gap-5 px-4">
              <Slider>
                {productLists[6].map((value, key) => (
                  <ProductCard key={key} data={value} type="main" />
                ))}
              </Slider>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto mb-8 md:mb-24 px-4">
        <div className="flex gap-5">
          <div className="w-full">
            <Title text={items[7].name} color={"primary"} />
            <div className="flex gap-5 px-4">
              <Slider>
                {productLists[7].map((value, key) => (
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
