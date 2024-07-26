import { Add, Delete } from "@mui/icons-material";
import { Box, IconButton, TextField } from "@mui/material";
import React, { useState } from "react";
import HomeUploader from "./HomeUploader";
import Image from "next/image";

export default function BannerSection({
  handleAddBanner,
  handleDeleteBanner,
  item,
  handleBannerChange,
  index,
}) {
  const [photo, setPhoto] = useState({ id: "" /* other properties */ });

  return (
    <Box>
      {item.content.map((banner, bannerIndex) => (
        <Box key={bannerIndex} className={`mb-4 w-full`}>
          <div className="flex justify-between items-center w-full">
            <div className="flex gap-4">
              <HomeUploader
                setPhotos={setPhoto}
                location="v1/api/ecommerce/homePagePhotos/image"
                onUploadSuccess={(e) =>
                  handleBannerChange(index, bannerIndex, +e, banner.link)
                } // Pass the callback
              />
              <Image
                src={`${process.env.NEXT_PUBLIC_BASE_URL}/v1/api/ecommerce/homePagePhotos/image/${banner.imageAttachmentId}`}
                width={60}
                height={60}
                alt=""
              />
              <TextField
                label="Image"
                value={banner.imageAttachmentId}
                onChange={(e) =>
                  handleBannerChange(
                    index,
                    bannerIndex,
                    e.target.value,
                    banner.link
                  )
                }
              />
              <TextField
                label="Link"
                value={banner.link}
                onChange={(e) =>
                  handleBannerChange(
                    index,
                    bannerIndex,
                    banner.imageAttachmentId,
                    e.target.value
                  )
                }
              />
            </div>
            <IconButton onClick={() => handleDeleteBanner(index, bannerIndex)}>
              <Delete />
            </IconButton>
          </div>
        </Box>
      ))}
      <IconButton onClick={() => handleAddBanner(index)}>
        <Add />
      </IconButton>
    </Box>
  );
}
