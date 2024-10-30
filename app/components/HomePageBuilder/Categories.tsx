import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Categories({ title, data }) {
  return (
    <div className="container !px-4 md:!px-8 mx-auto mb-10 bg-white !py-4 md:rounded-3xl">
      <h4 className="text-md md:text-xl mb-8 font-black text-center text-primary peyda">
        {title}
      </h4>
      <div className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-8 justify-center gap-4">
        {data.map((category) => {
          return (
            <Link
              key={category?.id}
              href={`${process.env.WEBSITE_BASE_URL}/category/${category?.slug}`}
              className="block text-center "
            >
              {category?.attachment ? (
                <Image
                  src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/entitytypes/${category?.attachment?.fileName}`}
                  alt={category?.name}
                  width={150}
                  priority
                  className="!h-[70px] w-auto object-contain mb-4"
                  height={150}
                  loading="eager"
                  layout="responsive"
                />
              ) : (
                <img
                  width={30}
                  height={30}
                  className="!h-[150px] w-auto object-contain mb-4"
                  src="/images/no-photos.png"
                  alt=""
                />
              )}

              <span className="peyda text-xs text-center md:text-sm text-primary font-bold">
                {category?.name}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
