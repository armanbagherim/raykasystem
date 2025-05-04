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
  vendorId,
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
  const [comissionAmount, setComissionAmount] = useState(null);

  const [localTempInventory, setLocalTempInventory] = useState({
    id: activeSpace === null && Math.random(),
    vendorId: "",
    vendorName: "",
    colorId: "",
    colorName: "",
    guaranteeId: "",
    guaranteeName: "",
    guaranteeMonthId: "",
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
    if (!product) return null;
    const activeSpaceProducts = product.filter(
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
      "guaranteeId",
      "guaranteeName",
      "guaranteeMonthId",
      "guaranteeMonthName",
      "qty",
      "firstPrice",
    ];

    return requiredFields.every(
      (field) => localTempInventory[field] !== undefined
    );
  };
  const handleSelectChange = (value, key, label) => {
    setLocalTempInventory((prevInventory) => {
      // Check if the key is 'description' to ensure it's treated as a string
      if (key === "description") {
        return {
          ...prevInventory,
          [key]: value.target.value, // Directly use the value as it's already a string
        };
      } else {
        // Check if the value is null
        if (value === null) {
          return {
            ...prevInventory,
            [key]: null,
            [label]: "",
          };
        } else {
          return {
            ...prevInventory,
            [key]:
              typeof value === "object" && value !== null && value.target
                ? +value.target.value
                : value !== null
                  ? value.id
                  : null,
            [label]:
              typeof value === "object" && value !== null && value.target
                ? value.target.value
                : value.name,
          };
        }
      }
    });
  };
  //
  useEffect(() => {
    if (
      userVendors !== "undefined" &&
      !userVendorsIsLoading &&
      vendorId !== null
    ) {
      const coms = userVendors?.result?.filter(
        (value) => value.id === vendorId
      );

      setComissionAmount(coms[0]?.commissions);
    }
  }, [vendorId]);
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>ساخت موجودی</DialogTitle>
      <DialogContent className="w-full custom-scroll">
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
              variant="outlined"
              onChange={(e) => handleSelectChange(e, "qty")}
            />
          </div>
          <div className="flex-1 ">
            <TextField
              autoComplete="off"
              id="standard-basic"
              label="قیمت خرید"
              variant="outlined"
              defaultValue={localTempInventory?.buyPrice || null}
              onChange={(e) => handleSelectChange(e, "buyPrice")}
            />
            <div className="text-sm font-medium">
              {Number(localTempInventory?.buyPrice || null).toLocaleString()}{" "}
              ءتء
            </div>
          </div>
        </div>
        <div className="flex gap-4 flex-col mb-4" dir="rtl">
          <div className="flex-1 bg-gray-100 p-2">
            <TextField
              autoComplete="off"
              id="standard-basic"
              label="قیمت اقساطی"
              variant="outlined"
              fullWidth
              defaultValue={localTempInventory?.firstPrice}
              onChange={(e) => handleSelectChange(e, "firstPrice")}
            />
            <div className="flex justify-between mt-4">
              <div className="text-sm font-medium">
                قیمت پایه: {Number(localTempInventory?.firstPrice || 0).toLocaleString()} تومان
              </div>
              <div className="text-sm font-medium">
                کمیسیون: {comissionAmount && comissionAmount.length > 0 && comissionAmount[0]?.amount
                  ? Number(
                    ((localTempInventory?.firstPrice || 0) *
                      comissionAmount[0].amount) /
                    100
                  ).toLocaleString()
                  : "0"} تومان ({comissionAmount && comissionAmount.length > 0 ? comissionAmount[0]?.amount : "0"}%)
              </div>
            </div>
            <div className="text-sm font-bold mt-2 text-green-600">
              قیمت نهایی پس از کسر کمیسیون: {comissionAmount && comissionAmount.length > 0 && comissionAmount[0]?.amount
                ? Number(
                  (localTempInventory?.firstPrice || 0) *
                  (1 - comissionAmount[0].amount / 100)
                ).toLocaleString()
                : Number(localTempInventory?.firstPrice || 0).toLocaleString()} تومان
            </div>
          </div>

          <div className="flex-1 bg-gray-100 p-2">
            <TextField
              autoComplete="off"
              fullWidth
              id="standard-basic"
              label="قیمت نقدی"
              className="mb-2"
              variant="outlined"
              defaultValue={localTempInventory?.secondaryPrice || null}
              onChange={(e) => handleSelectChange(e, "secondaryPrice")}
            />
            <div className="flex justify-between mt-2">
              <div className="text-sm font-medium">
                قیمت پایه: {Number(localTempInventory?.secondaryPrice || 0).toLocaleString()} تومان
              </div>
              <div className="text-sm font-medium">
                کمیسیون: {comissionAmount && comissionAmount.length > 0 && comissionAmount[1]?.amount
                  ? Number(
                    ((localTempInventory?.secondaryPrice || 0) *
                      comissionAmount[1]?.amount) /
                    100
                  ).toLocaleString()
                  : "0"} تومان ({comissionAmount && comissionAmount.length > 1 ? comissionAmount[1]?.amount : "0"}%)
              </div>
            </div>
            <div className="text-sm font-bold mt-2 text-green-600">
              قیمت نهایی پس از کسر کمیسیون: {comissionAmount && comissionAmount.length > 1 && comissionAmount[1]?.amount
                ? Number(
                  (localTempInventory?.secondaryPrice || 0) *
                  (1 - comissionAmount[1].amount / 100)
                ).toLocaleString()
                : Number(localTempInventory?.secondaryPrice || 0).toLocaleString()} تومان
            </div>
          </div>
        </div>
        <label
          htmlFor="message"
          className="block mb-2 text-sm font-medium text-gray-900 "
        >
          توضیحات
        </label>
        <textarea
          defaultValue={localTempInventory?.description}
          onChange={(e) => handleSelectChange(e, "description")}
          id="message"
          rows="4"
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
          placeholder="توضیحات"
        ></textarea>
      </DialogContent>
      <DialogActions className="flex w-full justify-between">
        <Button
          variant="outlined"
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
          variant="outlined"
          color="success"
          autoFocus
          onClick={(e) => {
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
