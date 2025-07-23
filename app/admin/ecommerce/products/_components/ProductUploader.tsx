"use client";

import React, { useState } from "react";
import Uploader from "@/app/components/global/Uploader";
import Image from "next/image";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

// Photo type
interface Photo {
  fileName: string;
  id: string; // You’re using this for removePhoto, so ensure this is included
}

// Props
interface ProductUploaderProps {
  setPhotos: React.Dispatch<React.SetStateAction<Photo[]>>;
  photos: Photo[];
  location: string;
  text: string;
  type: string;
  disabled: boolean;
  isFull?: boolean;
  removePhoto: (id: string) => void;
}

function SortablePhoto({ photo, type }: { photo: Photo; type: string }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: photo.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners} className="mb-4">
      {type === "image" ? (
        <Image
          width={100}
          height={100}
          src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/products/${photo.fileName}`}
          alt=""
          className="rounded-xl"
        />
      ) : (
        <video
          width={100}
          height={100}
          controls
          className="rounded-xl"
          src={`https://image.raykasystem.com/productvideos/${photo.fileName}`}
        />
      )}
    </div>
  );
}

export default function ProductUploader({
  setPhotos,
  photos,
  removePhoto,
  location,
  text,
  type,
  disabled = false,
  isFull = false,
}: ProductUploaderProps) {
  const [open, setOpen] = useState(false);
  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = photos.findIndex((p) => p.id === active.id);
      const newIndex = photos.findIndex((p) => p.id === over.id);
      const reordered = arrayMove(photos, oldIndex, newIndex);
      setPhotos(reordered);
    }
  };

  return (
    <div className="w-full p-4 border border-dashed border-primary rounded-2xl mb-4 relative">
      {disabled && (
        <div className="absolute w-full h-full bg-black/20 left-0 top-0 z-50"></div>
      )}

      <Uploader
        photos={photos}
        text={text}
        setPhotos={setPhotos}
        location={location}
        type={type}
        isFull={isFull}
      />

      <div className="flex justify-end mt-4">
        <Button variant="outlined" onClick={() => setOpen(true)}>
          View & Reorder
        </Button>
      </div>

      {photos?.length !== 0 && (
        <div className="flex pt-4 gap-4 flex-wrap justify-between my-4">
          {photos.map((value, index) => (
            <div className="relative group" key={index}>
              <button
                onClick={() => removePhoto(value.id)}
                className="bg-red-700 p-1 rounded-md absolute -right-4 -top-2 invisible group-hover:visible transition duration-600"
              >
                <CloseIcon sx={{ color: "#fff", fontSize: 16 }} />
              </button>
              {type === "image" ? (
                <Image
                  width={70}
                  height={70}
                  crossOrigin="anonymous"
                  src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/products/${value.fileName}`}
                  alt=""
                  className="rounded-2xl"
                />
              ) : (
                <video
                  height={150}
                  crossOrigin="anonymous"
                  className="rounded-2xl"
                  controls
                  src={`https://image.raykasystem.com/productvideos/${value.fileName}`}
                ></video>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Modal Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle className="flex justify-between items-center">
          Reorder Photos
          <IconButton onClick={() => setOpen(false)}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext
              items={photos.map((p) => p.id)}
              strategy={verticalListSortingStrategy}
            >
              {photos.map((photo) => (
                <SortablePhoto key={photo.id} photo={photo} type={type} />
              ))}
            </SortableContext>
          </DndContext>
        </DialogContent>
      </Dialog>
    </div>
  );
}
