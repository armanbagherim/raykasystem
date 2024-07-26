import React from "react";
import Uploader from "@/app/components/global/Uploader";
import Image from "next/image";

// Define an interface for the photo object
interface Photo {
  fileName: string;
}

// Define the props for the ProductUploader component
interface ProductUploaderProps {
  setPhotos: React.Dispatch<React.SetStateAction<Photo[]>>;
  photos: Photo[];
}

export default function ProductUploader({
  setPhotos,
  photos,
  removePhoto,
}: ProductUploaderProps) {
  return (
    <div className="w-full p-4 border-2 border-dashed border-gray-200 rounded-2xl">
      <Uploader
        setPhotos={setPhotos}
        location={"v1/api/ecommerce/productphotos/image"}
      />
      <div className="flex pt-4 gap-4 flex-wrap justify-between my-4">
        {photos.map((value, index) => {
          return (
            <div className="relative group " key={index}>
              <button
                onClick={(e) => removePhoto(value.id)}
                className="bg-red-700 p-1 rounded-md absolute -right-4 -top-2 invisible group-hover:visible transition duration-600"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M21 5.97998C17.67 5.64998 14.32 5.47998 10.98 5.47998C9 5.47998 7.02 5.57998 5.04 5.77998L3 5.97998"
                    stroke="#fff"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M8.5 4.97L8.72 3.66C8.88 2.71 9 2 10.69 2H13.31C15 2 15.13 2.75 15.28 3.67L15.5 4.97"
                    stroke="#fff"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M18.85 9.14001L18.2 19.21C18.09 20.78 18 22 15.21 22H8.79002C6.00002 22 5.91002 20.78 5.80002 19.21L5.15002 9.14001"
                    stroke="#fff"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M10.33 16.5H13.66"
                    stroke="#fff"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M9.5 12.5H14.5"
                    stroke="#fff"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <Image
                key={index} // It's a good practice to provide a key when mapping over elements
                width={70}
                height={70}
                crossOrigin="anonymous"
                src={`${process.env.NEXT_PUBLIC_BASE_URL}/v1/api/ecommerce/productphotos/image/${value.fileName}`}
                alt=""
                className="rounded-2xl"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
