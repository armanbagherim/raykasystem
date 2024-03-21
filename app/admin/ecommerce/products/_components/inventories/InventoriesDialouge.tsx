import React, { useEffect, useRef, useState } from "react";
import SelectSearch from "@/app/components/global/SearchSelect";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { toast } from "react-toastify";

export default function InventoriesDialouge({
  handleClose,
  vendorAddresses,
  setVendorId,
  colorsIsLoading,
  guaranteeMonthIsLoading,
  userVendorsIsLoading,
  userVendors,
  colors,
  guaranteesIsLoading,
  guarantees,
  proviencesIsLoading,
  proviences,
  handleInventoryCreate,
  setOpen,
  open,
  guaranteeMonth,
  product,
  activeSpace,
}) {
  console.log("product", product);
  const [localTempInventory, setLocalTempInventory] = useState({
    id: Math.random(),
    vendorId: "",
    vendorName: "",
    colorId: "",
    colorName: "",
    guaranteeId: "",
    guaranteeName: "",
    guaranteeMonthId: "",
    weight: "",
    guaranteeMonthName: "",
    buyPrice: "",
    onlyProvinceId: "",
    onlyProvinceName: "",
    qty: "",
    vendorAddressId: "",
    description: "",
    firstPrice: "",
    secondaryPrice: "",
    vendorAddressName: "",
  });

  const activeSpaceProducts = product?.filter(
    (value) => +value.id === +activeSpace
  );

  const activeSpaceProductsObject = activeSpaceProducts?.reduce(
    (acc, curr) => ({ ...acc, ...curr }),
    {}
  );
  const defaultObj = {
    id: activeSpaceProductsObject
      ? +activeSpaceProductsObject?.id
      : Math.random(),
    vendorId: activeSpaceProductsObject?.vendor?.id,
    vendorName: activeSpaceProductsObject?.vendor?.name,
    colorId: activeSpaceProductsObject?.color?.id,
    colorName: activeSpaceProductsObject?.color?.name,
    guaranteeId: activeSpaceProductsObject?.guarantee?.id,
    guaranteeName: activeSpaceProductsObject?.guarantee?.name,
    guaranteeMonthId: activeSpaceProductsObject?.guaranteeMonth?.id,
    guaranteeMonthName: activeSpaceProductsObject?.guaranteeMonth?.name,
    weight: activeSpaceProductsObject?.weight,
    buyPrice: activeSpaceProductsObject?.buyPrice,
    onlyProvinceId: activeSpaceProductsObject?.onlyProvince?.id,
    onlyProvinceName: activeSpaceProductsObject?.onlyProvince?.name,
    qty: activeSpaceProductsObject?.qty,
    vendorAddressId: activeSpaceProductsObject?.vendorAddress?.id,
    vendorAddressName: activeSpaceProductsObject?.vendorAddress?.address?.name,
    description: activeSpaceProductsObject?.description,
    firstPrice: activeSpaceProductsObject?.firstPrice?.price,
    secondaryPrice: activeSpaceProductsObject?.secondaryPrice?.price,
  };
  console.log(
    "new logggggggggggggggggggggggggggggggggggg",
    activeSpaceProductsObject
  );

  useEffect(() => {
    setLocalTempInventory(defaultObj);
  }, [activeSpace]);

  useEffect(() => {
    setVendorId(+activeSpaceProductsObject.vendorId);
  }, [product, activeSpaceProductsObject]);

  const isFormValid = () => {
    const requiredFields = [
      "vendorId",
      "vendorName",
      "colorId",
      "colorName",
      "guaranteeId",
      "guaranteeName",
      "guaranteeMonthId",
      "guaranteeMonthName",
      "weight",
      "qty",
      "buyPrice",
      "firstPrice",
      "secondaryPrice",
    ];

    return requiredFields.every(
      (field) =>
        localTempInventory[field] !== null && localTempInventory[field] !== ""
    );
  };

  const handleSelectChange = (value, key, label) => {
    // Check if the first argument is an event object (for text fields)
    if (typeof value === "object" && value !== null && value.target) {
      // Extract the value from the event object
      const inputValue = value.target.value;
      // Update the local state with the input value
      setLocalTempInventory((prevInventory) => ({
        ...prevInventory,
        [key]: +inputValue,
      }));
    } else {
      // If the first argument is not an event object, it's an object with id and name (for select options)
      // Update the local state with the id and name
      setLocalTempInventory((prevInventory) => ({
        ...prevInventory,
        [key]: value.id !== null ? +value.id : null,
        [label]: value.name,
      }));
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>ساخت موجودی</DialogTitle>
      <DialogContent className="w-full">
        <div className="mb-4">
          <SelectSearch
            loadingState={userVendorsIsLoading}
            data={userVendors?.result}
            label="فروشگاه"
            defaultValue={activeSpaceProductsObject?.vendorId}
            onChange={(e) => {
              setVendorId(e.id);
              handleSelectChange(e, "vendorId", "vendorName");
            }}
          />
        </div>
        <div className="mb-4">
          <SelectSearch
            loadingState={false}
            data={vendorAddresses}
            isDiff={true}
            defaultValue={activeSpaceProductsObject?.vendorAddressId}
            label="آدرس"
            diffName={"address.name"}
            onChange={(e) =>
              handleSelectChange(e, "vendorAddressId", "vendorAddressName")
            }
          />
        </div>
        <div className="mb-4">
          <SelectSearch
            loadingState={colorsIsLoading}
            data={colors?.result}
            label="رنگ"
            defaultValue={activeSpaceProductsObject?.colorId}
            nullable={true}
            onChange={(e) => handleSelectChange(e, "colorId", "colorName")}
          />
        </div>
        <div className="mb-4">
          <SelectSearch
            loadingState={guaranteesIsLoading}
            data={guarantees?.result}
            label="گارانتی"
            defaultValue={activeSpaceProductsObject?.guaranteeId}
            nullable={true}
            onChange={(e) =>
              handleSelectChange(e, "guaranteeId", "guaranteeName")
            }
          />
        </div>
        <div className="mb-4">
          <SelectSearch
            loadingState={proviencesIsLoading}
            data={proviences?.result}
            label="فروش فقط در شهر"
            defaultValue={activeSpaceProductsObject?.onlyProvinceId}
            nullable={true}
            onChange={(e) =>
              handleSelectChange(e, "onlyProvinceId", "onlyProvinceName")
            }
          />
        </div>
        <div className="mb-4">
          <SelectSearch
            loadingState={guaranteeMonthIsLoading}
            data={guaranteeMonth?.result}
            label="ماه های گارانتی"
            defaultValue={activeSpaceProductsObject?.guaranteeMonthId}
            nullable={true}
            onChange={(e) =>
              handleSelectChange(e, "guaranteeMonthId", "guaranteeMonthName")
            }
          />
        </div>
        <div className="flex gap-4 mb-4">
          <div className="flex-1">
            <TextField
              autoComplete="off"
              required
              id="standard-basic"
              label="تعداد"
              defaultValue={activeSpaceProductsObject?.qty}
              variant="standard"
              onChange={(e) => handleSelectChange(e, "qty")}
            />
          </div>
          <div className="flex-1">
            <TextField
              autoComplete="off"
              required
              id="standard-basic"
              label="قیمت خرید"
              variant="standard"
              defaultValue={activeSpaceProductsObject?.buyPrice}
              onChange={(e) => handleSelectChange(e, "buyPrice")}
            />
          </div>
        </div>
        <div className="flex gap-4 mb-4" dir="rtl">
          <div className="flex-1">
            <TextField
              autoComplete="off"
              required
              id="standard-basic"
              label="قیمت اقساطی"
              variant="standard"
              defaultValue={activeSpaceProductsObject?.firstPrice?.price}
              onChange={(e) => handleSelectChange(e, "firstPrice")}
            />
          </div>
          <div className="flex-1">
            <TextField
              autoComplete="off"
              required
              id="standard-basic"
              label="قیمت نقدی"
              nullable={true}
              variant="standard"
              defaultValue={activeSpaceProductsObject?.secondaryPrice?.price}
              onChange={(e) => handleSelectChange(e, "secondaryPrice")}
            />
          </div>
        </div>
        <div className="mb-6">
          <TextField
            autoComplete="off"
            required
            fullWidth
            id="standard-basic"
            defaultValue={activeSpaceProductsObject?.weight}
            label="وزن"
            nullable={true}
            variant="standard"
            onChange={(e) => handleSelectChange(e, "weight")}
          />
        </div>
        <label
          htmlFor="message"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          توضیحات
        </label>
        <textarea
          defaultValue={activeSpaceProductsObject?.description}
          onChange={(e) => handleSelectChange(e, "description")}
          id="message"
          rows="4"
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="توضیحات"
        ></textarea>
      </DialogContent>
      <DialogActions className="flex w-full justify-between">
        <Button
          variant="standard"
          color="error"
          onClick={() => {
            setOpen(false);
            setTempInventory({});
          }}
        >
          لغو
        </Button>
        <Button
          variant="standard"
          color="success"
          autoFocus
          onClick={(e) => {
            // if (!isFormValid()) {
            //   // Optionally display an error message
            //   toast.error("لطفا تمام فیلد ها را پر نمایید");
            //   return;
            // }
            console.log(localTempInventory);

            handleInventoryCreate(localTempInventory);
          }}
        >
          ثبت
        </Button>
      </DialogActions>
    </Dialog>
  );
}
