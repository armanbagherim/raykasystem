import React from "react";
import SelectSearch from "@/app/components/global/SearchSelect";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";

export default function InventoriesDialouge({
  handleClose,
  vendorAddresses,
  setTempInventory,
  setVendorId,
  tempInventory,
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
}) {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>ساخت موجودی</DialogTitle>
      <DialogContent className="w-full">
        <div className="mb-4">
          <SelectSearch
            loadingState={userVendorsIsLoading}
            data={userVendors?.result}
            label="فروشگاه"
            onChange={(e) => {
              setTempInventory({
                ...tempInventory,
                vendorId: e.id,
              });
              setTempInventory({
                ...tempInventory,
                vendorName: e.name,
              });

              setVendorId(e.id);
            }}
          />
        </div>
        <div className="mb-4">
          <SelectSearch
            loadingState={false}
            data={vendorAddresses}
            isDiff={true}
            label="آدرس"
            diffName={"address.name"}
            onChange={(e) => {
              setTempInventory({
                ...tempInventory,
                vendorAddressId: e,
              });
              setTempInventory({
                ...tempInventory,
                VendorAddressName: e.name,
              });
            }}
          />
        </div>
        <div className="mb-4">
          <SelectSearch
            loadingState={colorsIsLoading}
            data={colors?.result}
            label="رنگ"
            nullable={true}
            onChange={(e) => {
              setTempInventory({
                ...tempInventory,
                colorId: e,
              });
              setTempInventory({
                ...tempInventory,
                colorName: e.name,
              });
            }}
          />
        </div>
        <div className="mb-4">
          <SelectSearch
            loadingState={guaranteesIsLoading}
            data={guarantees?.result}
            label="گارانتی"
            nullable={true}
            onChange={(e) => {
              setTempInventory({
                ...tempInventory,
                guaranteeId: e,
              });
              setTempInventory({
                ...tempInventory,
                guaranteeName: e.name,
              });
            }}
          />
        </div>

        <div className="mb-4">
          <SelectSearch
            loadingState={proviencesIsLoading}
            data={proviences?.result}
            label="فروش فقط در شهر"
            nullable={true}
            onChange={(e) => {
              setTempInventory({
                ...tempInventory,
                onlyProvinceId: e,
              });
              setTempInventory({
                ...tempInventory,
                onlyProvinceName: e.name,
              });
            }}
          />
        </div>
        <div className="mb-4">
          <SelectSearch
            loadingState={guaranteeMonthIsLoading}
            data={guaranteeMonth?.result}
            label="ماه های گارانتی"
            nullable={true}
            onChange={(e) => {
              setTempInventory({
                ...tempInventory,
                guaranteeMonthId: e,
              });
              setTempInventory({
                ...tempInventory,
                guaranteeMonthName: e.name,
              });
            }}
          />
        </div>
        <div className="flex gap-4 mb-4">
          <div className="flex-1">
            <TextField
              required
              id="standard-basic"
              label="تعداد"
              variant="standard"
              onChange={(e) =>
                setTempInventory({
                  ...tempInventory,
                  qty: e.target.value,
                })
              }
            />
          </div>
          <div className="flex-1">
            <TextField
              required
              id="standard-basic"
              label="قیمت خرید"
              variant="standard"
              onChange={(e) =>
                setTempInventory({
                  ...tempInventory,
                  buyPrice: e.target.value,
                })
              }
            />
          </div>
        </div>
        <div className="flex gap-4 mb-4" dir="rtl">
          <div className="flex-1">
            <TextField
              required
              id="standard-basic"
              label="قیمت اقساطی"
              variant="standard"
              onChange={(e) =>
                setTempInventory({
                  ...tempInventory,
                  firstPrice: e.target.value,
                })
              }
            />
          </div>
          <div className="flex-1">
            <TextField
              required
              id="standard-basic"
              label="قیمت نقدی"
              nullable={true}
              variant="standard"
              onChange={(e) =>
                setTempInventory({
                  ...tempInventory,
                  secondaryPrice: e.target.value,
                })
              }
            />
          </div>
        </div>
        <label
          htmlFor="message"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          توضیحات
        </label>
        <textarea
          onChange={(e) => {
            setTempInventory({
              ...tempInventory,
              description: e.target.value,
            });
          }}
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
            handleInventoryCreate();
          }}
        >
          ثبت
        </Button>
      </DialogActions>
    </Dialog>
  );
}
