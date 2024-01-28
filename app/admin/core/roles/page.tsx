"use client";
import { DataGrid, GridColDef, GridRowsProp, faIR } from "@mui/x-data-grid";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function page() {
  const [roles, setRoles] = useState();
  const getPermissions = () => {
    fetch(
      "https://nest-jahizan.chbk.run/v1/api/core/admin/roles?sortOrder=DESC&offset=0&limit=10&orderBy=id&ignorePaging=false",
      {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwiaWF0IjoxNzA2MTQzMzE4fQ.p7S_aJ1DoRgCISsQMgmm0LLkxq7bD1N7FZr3poQNV7c",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => setRoles(data.result));
  };

  useEffect(() => {
    getPermissions();
  }, []);

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
        <Link href={`/admin/core/roles/${row.id}`}>
          <button
            type="button"
            className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
          >
            ویرایش
          </button>
        </Link>
      ),
    },
  ];
  return roles ? (
    <div>
      <DataGrid rows={roles} columns={columns} />
    </div>
  ) : (
    "loading"
  );
}
