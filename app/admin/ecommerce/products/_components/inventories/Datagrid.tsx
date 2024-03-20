import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useEffect } from "react";
import { toast } from "react-toastify";

export default function DataGridLite({
  data,
  handleClickOpen,
  removeInventory,
}) {
  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "id",
    },
    {
      field: "vendorName",
      headerName: "نام فروشگاه",
      width: 100,
      valueGetter({ row }) {
        console.log(row);
      },
    },
    {
      field: "VendorAddressName",
      headerName: "نام آدرس",
      width: 100,
      valueGetter({ row }) {
        return !row.VendorAddressName
          ? row.vendorAddress.address.name
          : row.VendorAddressName;
      },
    },
    {
      field: "colorName",
      headerName: "رنگ",
      width: 100,
      valueGetter({ row }) {
        return !row.colorName ? row.color.name : row.colorName;
      },
    },
    {
      field: "guaranteeName",
      headerName: "نام گارانتی",
      width: 100,
      valueGetter({ row }) {
        return !row.guaranteeName ? row.guarantee.name : row.guaranteeName;
      },
    },
    {
      field: "guaranteeMonthName",
      headerName: "تعداد ماه گارانتی",
      width: 100,
      valueGetter({ row }) {
        return !row.guaranteeMonthName
          ? row.guaranteeMonth.name
          : row.guaranteeMonthName;
      },
    },
    {
      field: "onlyProvinceName",
      headerName: "استان فروش",
      width: 100,
      valueGetter({ row }) {
        return !row.onlyProvinceName
          ? row.onlyProvince.name
          : row.onlyProvinceName;
      },
    },

    {
      field: "qty",
      headerName: "تعداد",
      width: 100,
    },

    {
      field: "firstPrice",
      headerName: "قیمت اقساطی",
      width: 100,
      valueGetter({ row }) {
        return row.firstPrice.price ? row.firstPrice.price : row.firstPrice;
      },
    },
    {
      field: "secondaryPrice",
      headerName: "قیمت نقدی",
      width: 100,
      valueGetter({ row }) {
        return row.secondaryPrice.price
          ? row.secondaryPrice.price
          : row.secondaryPrice;
      },
    },
    {
      field: "buyPrice",
      headerName: "قیمت خرید",
      width: 100,
      valueGetter({ row }) {
        return !row.buyPrice ? row.buyPrice : row.buyPrice;
      },
    },

    {
      field: "Actions",
      headerName: "عملیات",
      width: 200,
      renderCell: ({ row }) => (
        <>
          <button
            type="button"
            className="ml-4 focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
            onClick={(e) => handleClickOpen(row.id)}
          >
            ویرایش
          </button>

          <button
            type="button"
            className="ml-4 focus:outline-none text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
            onClick={(e) => removeInventory(row.id)}
          >
            حذف
          </button>
        </>
      ),
    },
  ];

  return (
    <div>
      <DataGrid rows={data} columns={columns} />
    </div>
  );
}
