"use client";
import { useFetcher } from "@/app/components/global/fetcher";
import Loading from "@/app/components/global/loading";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import React from "react";

export default function page() {
  const {
    data: categories,
    isLoading: categoriesIsLoading,
    error: categoriesError,
  } = useFetcher(`/v1/api/eav/admin/entityTypes`, "GET");

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "شناسه",
      width: 150,
    },
    {
      field: "name",
      headerName: "نام ",
      width: 150,
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
  if (categoriesIsLoading) {
    return <Loading />;
  }
  return (
    <div>
      <DataGrid rows={categories.result} columns={columns} />
    </div>
  );
}
