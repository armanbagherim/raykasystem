"use client";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import React, { useEffect } from "react";
import { fetcher, useFetcher } from "../../../components/global/fetcher";
import Loading from "../../../components/global/loading";
import { useAtom } from "jotai";
import { pageTitle } from "../../layout";
import { toast } from "react-toastify";
import LightDataGrid from "@/app/components/global/LightDataGrid/LightDataGrid";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";

export default function VendorAddress() {
  const [title, setTitle] = useAtom(pageTitle);

  useEffect(() => {
    setTitle({
      title: "آدرس فروشنده ها",
      buttonTitle: "افزودن آدرس جدید",
      link: "/admin/ecommerce/vendors/new",
    });
  }, []);

  const deleteRow = async (id) => {
    try {
      const req = await fetcher({
        url: `/v1/api/ecommerce/vendors/${id}`,
        method: "DELETE",
      });
      toast.success("موفق");
      refetchBrands();
    } catch (error) {
      toast.error(error.message);
    }
  };
  // const {
  //   data: brands,
  //   isLoading: brandsIsLoading,
  //   error: brandsError,
  //   refetch: refetchBrands,
  // } = useFetcher(
  //   `/v1/api/ecommerce/user/vendors?sortOrder=ASC&offset=0&limit=10`,
  //   "GET"
  // );

  // const columns: GridColDef[] = [
  //   {
  //     field: "id",
  //     headerName: "شناسه",
  //     width: 150,
  //   },
  //   {
  //     field: "name",
  //     headerName: "نام ",
  //     width: 150,
  //   },
  //   {
  //     field: "slug",
  //     headerName: "اسلاگ",
  //     width: 150,
  //   },
  //   {
  //     field: "list",
  //     headerName: "ویرایش",
  //     width: 150,
  //     renderCell: (row) => (
  //       <a href={`/admin/ecommerce/vendoraddresses/${row.id}/new`}>
  //         <button
  //           type="button"
  //           className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
  //         >
  //           آدرس ها
  //         </button>
  //       </a>
  //     ),
  //   },
  //   {
  //     field: "delete",
  //     headerName: "حذف",
  //     width: 150,
  //     renderCell: ({ row }) => (
  //       <a onClick={(e) => deleteGuarantee(row.id)}>
  //         <button
  //           type="button"
  //           className="focus:outline-none text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
  //         >
  //           حذف
  //         </button>
  //       </a>
  //     ),
  //   },
  // ];
  // if (brandsIsLoading) {
  //   return <Loading />;
  // }
  const columns = [
    {
      accessorKey: "id",
      header: "شناسه",
      size: 10,
      maxSize: 10,
    },
    {
      accessorKey: "name",
      header: "نام ",
      minSize: 100, //min size enforced during resizing
      maxSize: 400, //max size enforced during resizing
      size: 400, //medium column
    },
    {
      accessorKey: "slug",
      header: "اسلاگ ",
      minSize: 100, //min size enforced during resizing
      maxSize: 400, //max size enforced during resizing
      size: 400, //medium column
    },
    {
      accessorKey: "Actions",
      header: "عملیات",
      size: 200,
      muiTableHeadCellProps: {
        align: "right",
      },
      muiTableBodyCellProps: {
        align: "right",
      },
      Cell: ({ row }) => (
        <>
          <a href={`/admin/ecommerce/vendoraddresses/${row.id}/new`}>
            <IconButton aria-label="delete" color="primary">
              <ModeEditIcon />
            </IconButton>
          </a>
          <a onClick={(e) => deleteRow(row.id)}>
            <IconButton aria-label="delete" color="error">
              <DeleteIcon />
            </IconButton>
          </a>
        </>
      ),
    },
  ];

  return (
    <div>
      <LightDataGrid
        url={"/v1/api/ecommerce/user/vendors?sortOrder=ASC&offset=0&limit=10"}
        columns={columns}
      />
    </div>
  );
}
