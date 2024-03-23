import React, { useEffect, useMemo, useRef, useState } from "react";
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
  setActiveSpace,
}) {
  const [localTempInventory, setLocalTempInventory] = useState({
    id: activeSpace === null && Math.random(),
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

  const activeSpaceProductsObject = useMemo(() => {
    const activeSpaceProducts = product?.filter(
      (value) =>
        (typeof value.id === "string" ? value.id : +value.id) ===
        (typeof value.id === "string" ? activeSpace : +activeSpace)
    );
    return activeSpaceProducts?.reduce(
      (acc, curr) => ({ ...acc, ...curr }),
      {}
    );
  }, [product, activeSpace]);
  function generateRandomId() {
    return `new_${Math.floor(Math.random() * 1000000)}`; // Generates a random number between 0 and 999999 and prefixes it with 'new_'
  }
  useEffect(() => {
    if (activeSpaceProductsObject) {
      // Check if activeSpace is null
      if (!activeSpace) {
        // Check if the object already has an ID without the 'new_' prefix
        if (
          !activeSpaceProductsObject.id ||
          !activeSpaceProductsObject.id.startsWith("new_")
        ) {
          // Generate a random ID and add it to the activeSpaceProductsObject
          const updatedObject = {
            ...activeSpaceProductsObject,
            id: generateRandomId(), // Add the random ID to the object
          };
          setLocalTempInventory(updatedObject);
        } else {
          // If the object already has an ID with the 'new_' prefix, handle accordingly
          // For example, you might want to skip adding a new ID or handle this case differently
          console.log("Object already has an ID with the new_ prefix.");
        }
      } else {
        // If activeSpace is not null, just set the activeSpaceProductsObject as is
        setLocalTempInventory(activeSpaceProductsObject);
      }
    }
  }, [activeSpaceProductsObject, activeSpace]);

  useEffect(() => {
    if (activeSpaceProductsObject) {
      setVendorId(+activeSpaceProductsObject.vendorId);
    }
  }, [activeSpaceProductsObject]);

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
      (field) => localTempInventory[field] !== undefined
    );
  };

  const handleSelectChange = (value, key, label) => {
    console.log(value, key, label);

    setLocalTempInventory((prevInventory) => {
      // Check if the key is 'description' to ensure it's treated as a string
      if (key === "description") {
        return {
          ...prevInventory,
          [key]: value.target.value, // Directly use the value as it's already a string
        };
      } else {
        return {
          ...prevInventory,
          [key]:
            typeof value === "object" && value !== null && value.target
              ? +value.target.value
              : value.id !== null
              ? value.id
              : null,
          [label]:
            typeof value === "object" && value !== null && value.target
              ? value.target.value
              : value.name,
        };
      }
    });
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
            defaultValue={localTempInventory?.vendorId}
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
            defaultValue={localTempInventory?.vendorAddressId}
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
            defaultValue={localTempInventory?.colorId}
            nullable={true}
            onChange={(e) => handleSelectChange(e, "colorId", "colorName")}
          />
        </div>
        <div className="mb-4">
          <SelectSearch
            loadingState={guaranteesIsLoading}
            data={guarantees?.result}
            label="گارانتی"
            defaultValue={localTempInventory?.guaranteeId}
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
            defaultValue={localTempInventory?.onlyProvinceId}
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
            defaultValue={localTempInventory?.guaranteeMonthId}
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
              defaultValue={localTempInventory?.qty}
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
              defaultValue={localTempInventory?.buyPrice}
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
              defaultValue={localTempInventory?.firstPrice}
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
              defaultValue={localTempInventory?.secondaryPrice}
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
            defaultValue={localTempInventory?.weight}
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
          defaultValue={localTempInventory?.description}
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
            setActiveSpace(null);
            setLocalTempInventory({});
          }}
        >
          لغو
        </Button>
        <Button
          variant="standard"
          color="success"
          autoFocus
          onClick={(e) => {
            console.log(localTempInventory);

            if (!isFormValid()) {
              // Optionally display an error message
              toast.error("لطفا تمام فیلد ها را پر نمایید");
              return;
            }

            handleInventoryCreate(localTempInventory);
          }}
        >
          ثبت
        </Button>
      </DialogActions>
    </Dialog>
  );
}
