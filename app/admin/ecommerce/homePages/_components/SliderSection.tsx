import { Add, Delete, DragHandle } from "@mui/icons-material";
import { Box, IconButton, TextField } from "@mui/material";
import React from "react";
import HomeUploader from "./HomeUploader";
import Image from "next/image";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
} from "@dnd-kit/sortable";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { CSS } from "@dnd-kit/utilities";

const SortableSlide = ({
  slide,
  slideIndex,
  index,
  handleSliderImageChange,
  handleDeleteSlide,
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: slide.priority });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 100 : 0,
  };

  const handleDragStart = (e) => {
    e.stopPropagation();
    console.log("Drag started for slide with priority:", slide.priority);
  };

  return (
    <Box
      ref={setNodeRef}
      style={style}
      className={`mb-4 flex justify-between bg-blue-950/5 rounded-xl p-4 ${isDragging ? "bg-blue-200" : ""
        }`}
    >
      <div className="flex gap-4 items-center">
        <IconButton
          {...listeners}
          {...attributes}
          sx={{ cursor: isDragging ? "grabbing" : "grab" }}
          onMouseDown={handleDragStart}
          onTouchStart={handleDragStart}
        >
          <DragHandle />
        </IconButton>
        <HomeUploader
          buttonText="آپلود تصویر اصلی"
          setPhotos={() => { }}
          location="v1/api/ecommerce/homePagePhotos/image"
          onUploadSuccess={(e) =>
            handleSliderImageChange(
              index,
              slideIndex,
              +e,
              slide.mobileImageAttachmentId || "",
              slide.alt || "",
              slide.link || ""
            )
          }
        />
        <Image
          src={
            slide.imageAttachmentId
              ? `${process.env.NEXT_PUBLIC_BASE_URL}/v1/api/ecommerce/homePagePhotos/image/${slide.imageAttachmentId}`
              : "/images/placeholder.png"
          }
          width={60}
          height={60}
          alt={slide.alt || ""}
          onError={(e) => {
            e.target.src = "/images/placeholder.png";
          }}
        />
        <HomeUploader
          buttonText="آپلود تصویر موبایل"
          setPhotos={() => { }}
          location="v1/api/ecommerce/homePagePhotos/image"
          onUploadSuccess={(e) =>
            handleSliderImageChange(
              index,
              slideIndex,
              slide.imageAttachmentId || "",
              +e,
              slide.alt || "",
              slide.link || ""
            )
          }
        />
        <Image
          src={
            slide.mobileImageAttachmentId
              ? `${process.env.NEXT_PUBLIC_BASE_URL}/v1/api/ecommerce/homePagePhotos/image/${slide.mobileImageAttachmentId}`
              : "/images/placeholder.png"
          }
          width={60}
          height={60}
          alt={slide.alt || ""}
          onError={(e) => {
            e.target.src = "/images/placeholder.png";
          }}
        />
        <div className="hidden">
          <TextField
            label="لینک عکس"
            value={slide.imageAttachmentId || ""}
            onChange={(e) =>
              handleSliderImageChange(
                index,
                slideIndex,
                e.target.value,
                slide.mobileImageAttachmentId || "",
                slide.alt || "",
                slide.link || ""
              )
            }
          />
        </div>
        <div className="hidden">
          <TextField
            label="لینک عکس"
            value={slide.mobileImageAttachmentId || ""}
            onChange={(e) =>
              handleSliderImageChange(
                index,
                slideIndex,
                slide.imageAttachmentId || "",
                e.target.value,
                slide.alt || "",
                slide.link || ""
              )
            }
          />
        </div>
        <TextField
          label="متن جایگزین"
          value={slide.alt || ""}
          onChange={(e) =>
            handleSliderImageChange(
              index,
              slideIndex,
              slide.imageAttachmentId || "",
              slide.mobileImageAttachmentId || "",
              e.target.value,
              slide.link || ""
            )
          }
        />
        <TextField
          label="لینک"
          value={slide.link || ""}
          onChange={(e) =>
            handleSliderImageChange(
              index,
              slideIndex,
              slide.imageAttachmentId || "",
              slide.mobileImageAttachmentId || "",
              slide.alt || "",
              e.target.value
            )
          }
        />
      </div>
      <IconButton onClick={() => handleDeleteSlide(index, slideIndex)}>
        <Delete />
      </IconButton>
    </Box>
  );
};

export default function SliderSection({
  item,
  handleSliderImageChange,
  handleDeleteSlide,
  handleAddSlide,
  index,
  setItems,
}) {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;
    console.log("Drag end:", { active: active?.id, over: over?.id });
    if (!over || active.id === over.id) return;

    setItems((prevItems) => {
      const slides = [...prevItems[index].content];
      const oldIndex = slides.findIndex((slide) => slide.priority === active.id);
      const newIndex = slides.findIndex((slide) => slide.priority === over.id);
      const newSlides = arrayMove(slides, oldIndex, newIndex).map((slide, i) => ({
        ...slide,
        priority: i,
      }));
      console.log("New slides order:", newSlides.map((s) => s.priority));
      const newItems = [...prevItems];
      newItems[index].content = newSlides;
      return newItems;
    });
  };

  return (
    <Box>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
        modifiers={[restrictToVerticalAxis]}
      >
        <SortableContext
          items={item.content.map((slide) => slide.priority)}
        >
          {item.content.map((slide, slideIndex) => (
            <SortableSlide
              key={slide.priority}
              slide={slide}
              slideIndex={slideIndex}
              index={index}
              handleSliderImageChange={handleSliderImageChange}
              handleDeleteSlide={handleDeleteSlide}
            />
          ))}
        </SortableContext>
      </DndContext>
      <IconButton onClick={() => handleAddSlide(index)}>
        <Add />
      </IconButton>
    </Box>
  );
}