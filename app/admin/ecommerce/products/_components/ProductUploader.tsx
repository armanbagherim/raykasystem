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
}: ProductUploaderProps) {
  return (
    <div className="w-full p-4 border-2 border-dashed border-gray-400 rounded-2xl">
      <Uploader
        setPhotos={setPhotos}
        location={"v1/api/ecommerce/productphotos/image"}
      />
      <div className="flex pt-4 gap-4 flex-wrap">
        {photos.map((value, index) => {
          return (
            <Image
              key={index} // It's a good practice to provide a key when mapping over elements
              width={50}
              height={50}
              crossOrigin="anonymous"
              src={`${process.env.NEXT_PUBLIC_BASE_URL}/v1/api/ecommerce/productphotos/image/${value.fileName}`}
              alt=""
              className="rounded-2xl"
            />
          );
        })}
      </div>
    </div>
  );
}
