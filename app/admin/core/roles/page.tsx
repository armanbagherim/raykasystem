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
      title: "نقش های کاربری",
      buttonTitle: "افزودن نقش",
      link: "/admin/core/roles/new",
    });
  }, []);

  const {
    data: roles,
    isLoading: rolesIsLoading,
    error: rolesError,
  } = useFetcher(`/v1/api/core/admin/roles?igonePaging=true`, "GET");

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "شناسه نقش",
      width: 150,
    },
    {
      field: "roleName",
      headerName: "نام نقش",
      width: 150,
    },
    {
      field: "createdAt",
      headerName: "تاریخ ایجاد",
      width: 150,
      valueFormatter: ({ value }) =>
        new Date(value).toLocaleDateString("fa-IR"),
    },
    {
      field: "list",
      headerName: "ویرایش",
      width: 150,
      renderCell: (row) => (
        <a href={`/admin/core/roles/${row.id}`}>
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
  if (rolesIsLoading) {
    return <Loading />;
  }
  return (
    <div>
      <DataGrid rows={roles.result} columns={columns} />
    </div>
  );
}
