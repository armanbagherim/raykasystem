"use client";
import { fetcher, useFetcher } from "@/app/components/global/fetcher";
import Loading from "@/app/components/global/loading";
import { DataGrid, GridColDef, GridRowsProp, faIR } from "@mui/x-data-grid";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { pageTitle } from "../../layout";
import LightDataGrid from "@/app/components/global/LightDataGrid/LightDataGrid";
import { IconButton } from "@mui/material";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { toast } from "react-toastify";
import DeleteIcon from "@mui/icons-material/Delete";
import ChangeFormatDate from "@/app/components/global/ChangeFormatDate";

export default function Roles() {
  const [title, setTitle] = useAtom(pageTitle);

  useEffect(() => {
    setTitle({
      title: "نقش های کاربری",
      buttonTitle: "افزودن نقش",
      link: "/admin/core/roles/new",
    });
  }, []);


  const deleteRow = async (id) => {
    try {
      const req = await fetcher({
        url: `/v1/api/core/admin/roles/${id}`,
        method: "DELETE",
      });
      toast.success("موفق");
      refetch();
    } catch (error) {
      toast.error(error.message);
    }
  };

  // const {
  //   data: roles,
  //   isLoading: rolesIsLoading,
  //   error: rolesError,
  // } = useFetcher(`/v1/api/core/admin/roles?igonePaging=true`, "GET");

  // const columns: GridColDef[] = [
  //   {
  //     field: "id",
  //     headerName: "شناسه نقش",
  //     width: 150,
  //   },
  //   {
  //     field: "roleName",
  //     headerName: "نام نقش",
  //     width: 150,
  //   },
  //   {
  //     field: "createdAt",
  //     headerName: "تاریخ ایجاد",
  //     width: 150,
  //     valueFormatter: ({ value }) =>
  //       new Date(value).toLocaleDateString("fa-IR"),
  //   },
  //   {
  //     field: "list",
  //     headerName: "ویرایش",
  //     width: 150,
  //     renderCell: (row) => (
  //       <a href={`/admin/core/roles/${row.id}`}>
  //         <button
  //           type="button"
  //           className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
  //         >
  //           ویرایش
  //         </button>
  //       </a>
  //     ),
  //   },
  // ];
  // if (rolesIsLoading) {
  //   return <Loading />;
  // }

  const columns = [
    {
      accessorKey: "id",
      header: "شناسه نقش",
      size: 10,
      maxSize: 10,
    },
    {
      accessorKey: "roleName",
      header: "نام نقش",
      minSize: 100, //min size enforced during resizing
      maxSize: 100, //max size enforced during resizing
      size: 100, //medium column
    },
    {
      accessorKey: "createdAt",
      header: "تاریخ ایجاد",
      minSize: 100, //min size enforced during resizing
      maxSize: 400, //max size enforced during resizing
      size: 180, //medium column
      Cell({row}){
        return row.original.createdAt && ChangeFormatDate(row.original.createdAt); 
      }
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
          <a href={`/admin/core/roles/${row.id}`}>
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

  return <LightDataGrid url={"/v1/api/core/admin/roles?igonePaging=true"} columns={columns} />;
}
