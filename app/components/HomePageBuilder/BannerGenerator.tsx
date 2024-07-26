import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function BannerGenerator({ data }) {
  return (
    <div className="container mx-auto mb-20">
      <div
        className={`grid grid-cols-1 md:grid-cols-${data.length} gap-1 md:gap-5`}
      >
        {data.map((banner, index) => {
          return (
            <Link key={index} href={banner.link}>
              <Image
                className="w-full h-full rounded-none md:rounded-2xl"
                src={banner.imageUrl}
                alt=""
                width={0}
                height={0}
                sizes="100vw"
              />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
