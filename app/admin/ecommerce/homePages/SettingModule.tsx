"use client";
import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import {
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
  IconButton,
} from "@mui/material";
import { ExpandMore, Delete } from "@mui/icons-material";
import {
  AmazingOffers,
  Banner,
  Cats,
  PopularBrands,
  PopularCats,
  Sliders,
} from "@/app/components/design/Icons";
import SliderSection from "./_components/SliderSection";
import BannerSection from "./_components/BannerSection";
import ProductListSection from "./_components/ProductListSection";
import ComponentLists from "./_components/ComponentLists";
import { fetcher } from "@/app/components/global/fetcher";
import { toast } from "react-toastify";
import ProductBrandSection from "./_components/ProductBrandSection";
import PopularCategories from "./_components/PopularCategories";
import PopularBrandSection from "./_components/PopularBrandSection";
import AmazingSection from "./_components/AamzingSection";
import ProductSection from "./_components/ProductSection";

const ELEMENT_TYPES = [
  { id: "slider", name: "اسلایدر", icon: <Sliders /> },
  { id: "banner", name: "بنر", icon: <Banner /> },
  { id: "product", name: "محصولات", icon: <Cats /> },
  { id: "productCategory", name: "محصولات بر اساس دسته بندی", icon: <Cats /> },
  { id: "productBrand", name: "محصولات بر اساس برند", icon: <Cats /> },
  { id: "category", name: "دسته بندی های محبوب", icon: <PopularCats /> },
  { id: "brand", name: "برند های محبوب", icon: <PopularBrands /> },
  { id: "amazing", name: "تخفیفات شگفت انگیز", icon: <AmazingOffers /> },
];

export default function SettingModule({
  EntityTypes,
  TypeSorts,
  HomePageData,
  brands,
}) {
  const [items, setItems] = useState(HomePageData);
  const [open, setOpen] = useState(false);
  const [bannerColumnsOpen, setBannerColumnsOpen] = useState(false);
  const [newElementType, setNewElementType] = useState("");
  const [bannerColumns, setBannerColumns] = useState(3);
  const [loading, setLoading] = useState(false);

  const onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const newItems = reorder(
      items,
      result.source.index,
      result.destination.index
    );
    setItems(newItems);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setBannerColumnsOpen(false);
  };

  const handleElementTypeSelect = (type) => {
    setNewElementType(type);
    if (type === "banner") {
      setBannerColumnsOpen(true);
    } else {
      setOpen(false);
      setItems([
        ...items,
        {
          id: `item-${items.length}`,
          type,
          name: ELEMENT_TYPES.find((t) => t.id === type).name,
          priority: items.length,
          content:
            type === "slider"
              ? [{ imageAttachmentId: "", alt: "", link: "" }]
              : type === "banner"
              ? Array.from({ length: bannerColumns }, () => ({
                  image: "",
                  link: "",
                }))
              : { sortBy: "", title: "" },
        },
      ]);
    }
  };

  const handleBannerColumnsSelect = (columns) => {
    setBannerColumns(columns);
    setOpen(false);
    setBannerColumnsOpen(false);
    setItems([
      ...items,
      {
        id: `item-${items.length}`,
        type: "banner",
        name: ELEMENT_TYPES.find((t) => t.id === "banner").name,
        priority: items.length,
        content: Array.from({ length: columns }, () => ({
          image: "",
          link: "",
        })),
      },
    ]);
  };

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const handleSliderImageChange = (
    index,
    slideIndex,
    imageAttachmentId,
    mobileImageAttachmentId,
    alt,
    link
  ) => {
    const newItems = [...items];
    newItems[index].content[slideIndex] = {
      imageAttachmentId,
      mobileImageAttachmentId,
      alt,
      link,
    };
    setItems(newItems);
  };

  const handleAddSlide = (index) => {
    const newItems = [...items];
    newItems[index].content.push({ imageAttachmentId: "", alt: "", link: "" });
    setItems(newItems);
  };

  const handleDeleteSlide = (index, slideIndex) => {
    const newItems = [...items];
    newItems[index].content.splice(slideIndex, 1);
    setItems(newItems);
  };

  const handleBannerChange = (index, bannerIndex, imageAttachmentId, link) => {
    const newItems = [...items];
    newItems[index].content[bannerIndex] = { imageAttachmentId, link };
    setItems(newItems);
  };

  const handleAddBanner = (index) => {
    const newItems = [...items];
    newItems[index].content.push({ imageAttachmentId: "", link: "" });
    setItems(newItems);
  };

  const handleDeleteBanner = (index, bannerIndex) => {
    const newItems = [...items];
    newItems[index].content.splice(bannerIndex, 1);
    setItems(newItems);
  };

  const handleProductChange = (index, entityTypeId, title, sortBy) => {
    const newItems = [...items];
    newItems[index].content = { entityTypeId, title, sortBy };
    setItems(newItems);
  };

  const handleAmazingChange = (index, title, sortBy) => {
    const newItems = [...items];
    newItems[index].content = { title, sortBy };
    setItems(newItems);
  };

  const handleProductSectionChange = (index, title, sortBy) => {
    const newItems = [...items];
    newItems[index].content = { title, sortBy };
    setItems(newItems);
  };

  const handleProductBrandChange = (index, brandId, title, sortBy) => {
    const newItems = [...items];
    newItems[index].content = { brandId, title, sortBy };
    setItems(newItems);
  };

  const handlePopularCategories = (index, title) => {
    const newItems = [...items];
    newItems[index].content = { title };
    setItems(newItems);
  };

  const handlePopularBrands = (index, title) => {
    const newItems = [...items];
    newItems[index].content = { title };
    setItems(newItems);
  };

  const handleRemoveItem = (index) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
  };

  const handleSave = async () => {
    setLoading(true);
    const cleanItems = items.map((item, index) => {
      return {
        type: item.type,
        name: item.name,
        id: item.id,
        priority: index,
        content:
          item.type === "slider"
            ? item.content
            : item.type === "banner"
            ? item.content
            : item.content,
      };
    });

    try {
      const req = await fetcher({
        url: "/v1/api/ecommerce/admin/homePages",
        method: "POST",
        body: {
          data: JSON.parse(JSON.stringify(cleanItems)),
        },
      });
      toast.success("موفق");
      setLoading(false);
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <div className="fixed flex-col w-full h-full left-0 top-0 bg-[#f2f2f2] z-[999999] flex items-center justify-center">
          <img src="/images/loading.gif" className="w-[400px]" alt="" />
          <h2 className="peyda text-2xl mb-4">در حال ذخیره سازی</h2>
          <p className="text-md">لطفا کمی صبر کنید</p>
        </div>
      ) : (
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable">
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className={`${
                  snapshot.isDraggingOver ? "bg-blue-200" : "bg-gray-200"
                } p-4 w-full rounded-lg`}
              >
                {items.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided, snapshot) => (
                      <Box>
                        <Accordion
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={`${
                            snapshot.isDragging ? "bg-green-300" : "bg-gray-400"
                          } user-select-none !rounded-lg !shadow-none mb-4`}
                        >
                          <AccordionSummary
                            className="flex !items-center !justify-between"
                            expandIcon={<ExpandMore />}
                            aria-controls={`panel-${index}-content`}
                            id={`panel-${index}-header`}
                          >
                            <div className="flex w-full !items-center !justify-between">
                              <Typography>{item.name}</Typography>
                              <IconButton
                                onClick={() => handleRemoveItem(index)}
                              >
                                <Delete />
                              </IconButton>
                            </div>
                          </AccordionSummary>
                          <AccordionDetails>
                            {item.type === "slider" && (
                              <SliderSection
                                handleAddSlide={handleAddSlide}
                                handleDeleteSlide={handleDeleteSlide}
                                handleSliderImageChange={
                                  handleSliderImageChange
                                }
                                item={item}
                                index={index}
                              />
                            )}
                            {item.type === "banner" && (
                              <BannerSection
                                handleAddBanner={handleAddBanner}
                                handleBannerChange={handleBannerChange}
                                handleDeleteBanner={handleDeleteBanner}
                                item={item}
                                index={index}
                              />
                            )}
                            {item.type === "productCategory" && (
                              <ProductListSection
                                handleProductChange={handleProductChange}
                                index={index}
                                item={item}
                                EntityTypes={EntityTypes}
                                TypeSorts={TypeSorts}
                              />
                            )}
                            {item.type === "productBrand" && (
                              <ProductBrandSection
                                handleProductBrandChange={
                                  handleProductBrandChange
                                }
                                index={index}
                                item={item}
                                brands={brands}
                                TypeSorts={TypeSorts}
                              />
                            )}
                            {item.type === "category" && (
                              <PopularCategories
                                handlePopularCategories={
                                  handlePopularCategories
                                }
                                index={index}
                                item={item}
                              />
                            )}
                            {item.type === "brand" && (
                              <PopularBrandSection
                                handlePopularBrands={handlePopularBrands}
                                index={index}
                                item={item}
                              />
                            )}
                            {item.type === "amazing" && (
                              <AmazingSection
                                handleAmazingChange={handleAmazingChange}
                                index={index}
                                item={item}
                                TypeSorts={TypeSorts}
                              />
                            )}
                            {item.type === "product" && (
                              <ProductSection
                                handleProductSectionChange={
                                  handleProductSectionChange
                                }
                                index={index}
                                item={item}
                                TypeSorts={TypeSorts}
                              />
                            )}
                          </AccordionDetails>
                        </Accordion>
                      </Box>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          <Box className="flex justify-between mt-4">
            <Button variant="contained" onClick={handleClickOpen}>
              ایجاد آیتم
            </Button>
            <Button variant="contained" onClick={handleSave}>
              ذخیره
            </Button>
          </Box>
          <ComponentLists
            ELEMENT_TYPES={ELEMENT_TYPES}
            bannerColumnsOpen={bannerColumnsOpen}
            handleBannerColumnsSelect={handleBannerColumnsSelect}
            handleClose={handleClose}
            handleElementTypeSelect={handleElementTypeSelect}
            open={open}
          />
        </DragDropContext>
      )}
    </>
  );
}
