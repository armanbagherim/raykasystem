import Uploader from "@/app/components/global/Uploader";
import { Add, Delete } from "@mui/icons-material";
import { Box, IconButton, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import HomeUploader from "./HomeUploader";
import Image from "next/image";

export default function SliderSection({
  item,
  handleSliderImageChange,
  handleDeleteSlide,
  handleAddSlide,
  index,
}) {
  const [photo, setPhoto] = useState({ id: "" /* other properties */ });

  // Define the callback function to be called by Uploader

  useEffect(() => {
    console.log(photo);
  }, [photo]);
  return (
    <Box>
      {item.content.map((slide, slideIndex) => (
        <Box
          key={slideIndex}
          className="mb-4 flex justify-between bg-blue-950/5 rounded-xl p-4"
        >
          <div className="flex gap-4">
            {" "}
            <HomeUploader
              buttonText="آپلود تصویر اصلی"
              setPhotos={setPhoto}
              location="v1/api/ecommerce/homePagePhotos/image"
              onUploadSuccess={(e) =>
                handleSliderImageChange(
                  index,
                  slideIndex,
                  +e,
                  slide.imageAttachmentId,
                  slide.alt,
                  slide.link
                )
              } // Pass the callback
            />
            <Image
              src={`${process.env.NEXT_PUBLIC_BASE_URL}/v1/api/ecommerce/homePagePhotos/image/${slide.imageAttachmentId}`}
              width={60}
              height={60}
              alt=""
            />
            <HomeUploader
              buttonText="آپلود تصویر موبایل"
              setPhotos={setPhoto}
              location="v1/api/ecommerce/homePagePhotos/image"
              onUploadSuccess={(e) =>
                handleSliderImageChange(
                  index,
                  slideIndex,
                  slide.imageAttachmentId,
                  +e,
                  slide.alt,
                  slide.link
                )
              } // Pass the callback
            />
            <Image
              src={`${process.env.NEXT_PUBLIC_BASE_URL}/v1/api/ecommerce/homePagePhotos/image/${slide.mobileImageAttachmentId}`}
              width={60}
              height={60}
              alt=""
            />
            <div className="hidden">
              <TextField
                className=""
                label="لینک عکس"
                value={slide.imageAttachmentId}
                onChange={(e) =>
                  handleSliderImageChange(
                    index,
                    slideIndex,
                    e.target.value,
                    slide.mobileImageAttachmentId,
                    slide.alt,
                    slide.link
                  )
                }
              />
            </div>
            <div className="hidden">
              <TextField
                className=""
                label="لینک عکس"
                value={slide.mobileImageAttachmentId}
                onChange={(e) =>
                  handleSliderImageChange(
                    index,
                    slideIndex,
                    slide.imageAttachmentId,
                    slide.mobileImageAttachmentId,
                    e.target.value,
                    slide.alt,
                    slide.link
                  )
                }
              />
            </div>
            <TextField
              label="متن جایگزین"
              value={slide.alt}
              onChange={(e) =>
                handleSliderImageChange(
                  index,
                  slideIndex,
                  slide.imageAttachmentId,
                  slide.mobileImageAttachmentId,
                  e.target.value,
                  slide.link
                )
              }
            />
            <TextField
              label="لینک"
              value={slide.link}
              onChange={(e) =>
                handleSliderImageChange(
                  index,
                  slideIndex,
                  slide.imageAttachmentId,
                  slide.mobileImageAttachmentId,
                  slide.alt,
                  e.target.value
                )
              }
            />
          </div>
          <IconButton onClick={() => handleDeleteSlide(index, slideIndex)}>
            <Delete />
          </IconButton>
        </Box>
      ))}
      <IconButton onClick={() => handleAddSlide(index)}>
        <Add />
      </IconButton>
    </Box>
  );
}
