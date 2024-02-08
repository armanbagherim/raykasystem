"use client";
import { useFetcher } from "@/app/components/global/fetcher";
import Loading from "@/app/components/global/loading";
import { DataGrid, GridColDef, GridRowsProp, faIR } from "@mui/x-data-grid";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { pageTitle } from "../../layout";

export default function page() {
  const [title, setTitle] = useAtom(pageTitle);

  useEffect(() => {
    setTitle({
      title: "کاربران",
      buttonTitle: "افزودن کاربر",
      link: "/admin/core/users/new",
    });
  }, []);

  const {
    data: users,
    isLoading: userIsLoading,
    error: userError,
  } = useFetcher(`/v1/api/core/admin/users`, "GET");

  const columns = [
    {
      field: "id",
      headerName: "شناسه",
      width: 80,
    },
    {
      field: "firstname",
      headerName: "نام",
      width: 100,
      editable: true,
    },
    {
      field: "lastname",
      headerName: "نام خانوادگی",
      width: 100,
    },
    {
      field: "username",
      headerName: "نام کاربری",
      width: 150,
    },
    {
      field: "phoneNumber",
      headerName: "شماره موبایل",
      width: 150,
    },
    {
      field: "createdAt",
      headerName: "تاریخ ایجاد کاربر",
      width: 200,
      renderCell: ({ row }) => {
        return new Date(row.createdAt).toLocaleDateString("fa-IR");
      },
    },
    {
      field: "actions",
      headerName: "عملیات",
      width: 200,
      renderCell: (row) => (
        <a href={`/admin/core/users/${row.id}`}>
          <button
            type="button"
            className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
          >
            ویرایش
          </button>
        </a>
      ),
    },
  ];
  if (userIsLoading) {
    return <Loading />;
  }
  return <DataGrid rows={users.result} columns={columns} />;
}
