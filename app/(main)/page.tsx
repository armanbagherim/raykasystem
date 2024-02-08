import Image from "next/image";
import fetcher from "../components/global/fetcher";
import Slider from "../components/design/Slider";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/authOptions";
import ProductCard from "../components/design/Cards/ProductCard/ProductCard";
import Title from "../components/design/Title";

export default async function Home() {
  const session = await getServerSession(authOptions);

  // const products = await fetcher("products");
  return (
    <>
      <Slider>
        <img className="w-full rounded-3xl" src="/images/slide.png" alt="" />
        <img className="w-full rounded-3xl" src="/images/slide-2.png" alt="" />
        <img className="w-full rounded-3xl" src="/images/slide.png" alt="" />
      </Slider>
      <div className="container mx-auto">
        <Title text="سه شنبه های تخفیفی" />
        <div className="flex gap-5">
          <ProductCard type="small" />
          <ProductCard type="small" />
        </div>
      </div>
    </>
  );
}
