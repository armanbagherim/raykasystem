import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useEffect } from "react";
import { toast } from "react-toastify";

export default function DataGridLite({ data }) {
  const columns: GridColDef[] = [
    {
      field: "vendorName",
      headerName: "نام فروشگاه",
      width: 100,
    },
    {
      field: "VendorAddressName",
      headerName: "نام آدرس",
      width: 100,
    },
    {
      field: "colorName",
      headerName: "رنگ",
      width: 100,
    },
    {
      field: "guaranteeName",
      headerName: "نام گارانتی",
      width: 100,
    },
    {
      field: "guaranteeMonthName",
      headerName: "تعداد ماه گارانتی",
      width: 100,
    },
    {
      field: "onlyProvinceName",
      headerName: "استان فروش",
      width: 100,
    },

    {
      field: "qty",
      headerName: "تعداد",
      width: 100,
    },

    {
      field: "firstPrice",
      headerName: "قیمت نقدی",
      width: 100,
    },
    {
      field: "secondaryPrice",
      headerName: "قیمت اقساط",
      width: 100,
    },
    {
      field: "buyPrice",
      headerName: "قیمت خرید",
      width: 100,
    },

    {
      field: "Actions",
      headerName: "عملیات",
      width: 200,
      renderCell: (row) => (
        <>
          <a href={`/admin/eav/entityTypes/edit/${row.id}`}>
            <button
              type="button"
              className="ml-4 focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
            >
              ویرایش
            </button>
          </a>
          <a onClick={(e) => console.log(row.id)}>
            <button
              type="button"
              className="ml-4 focus:outline-none text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
            >
              حذف
            </button>
          </a>
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
