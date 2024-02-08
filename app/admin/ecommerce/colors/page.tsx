"use client";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import React, { useEffect } from "react";
import { useFetcher } from "../../../components/global/fetcher";
import Loading from "../../../components/global/loading";
import { useAtom } from "jotai";
import { pageTitle } from "../../layout";

export default function page() {
  const [title, setTitle] = useAtom(pageTitle);

  useEffect(() => {
    setTitle({
      title: "رنگ ها",
      buttonTitle: "افزودن رنگ",
      link: "/admin/ecommerce/colors/new",
    });
  }, []);

  const {
    data: colors,
    isLoading: colorsIsLoading,
    error: colorsError,
  } = useFetcher(
    `/v1/api/ecommerce/colors?sortOrder=DESC&offset=0&limit=10&orderBy=id&ignorePaging=false`,
    "GET"
  );

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
      field: "hexCode",
      headerName: "کد رنگ ",
      width: 150,
      renderCell: ({ row }) => (
        <div className="flex items-center">
          <span
            style={{ background: row.hexCode }}
            className={`w-5 h-5 ml-2 rounded-sm`}
          ></span>
          {row.hexCode}
        </div>
      ),
    },
    {
      field: "list",
      headerName: "ویرایش",
      width: 150,
      renderCell: (row) => (
        <a href={`/admin/ecommerce/colors/${row.id}`}>
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
  if (colorsIsLoading) {
    return <Loading />;
  }
  return (
    <div>
      <DataGrid rows={colors.result} columns={columns} />
    </div>
  );
}
