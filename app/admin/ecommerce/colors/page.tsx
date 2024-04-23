"use client";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import React, { useEffect } from "react";
import { fetcher, useFetcher } from "../../../components/global/fetcher";
import Loading from "../../../components/global/loading";
import { useAtom } from "jotai";
import { pageTitle } from "../../layout";
import LightDataGrid from "@/app/components/global/LightDataGrid/LightDataGrid";
import { Button, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { toast } from "react-toastify";

export default function Colors() {
  const [title, setTitle] = useAtom(pageTitle);

  useEffect(() => {
    setTitle({
      title: "رنگ ها",
      buttonTitle: "افزودن رنگ",
      link: "/admin/ecommerce/colors/new",
    });
  }, []);

  const deleteRow = async (id) => {
    try {
      const req = await fetcher({
        url: `/v1/api/ecommerce/colors/${id}`,
        method: "DELETE",
      });
      toast.success("موفق");
      refetchProducts();
    } catch (error) {
      toast.error(error.message);
    }
  };

  // const {
  //   data: colors,
  //   isLoading: colorsIsLoading,
  //   error: colorsError,
  // } = useFetcher(
  //   `/v1/api/ecommerce/colors?sortOrder=DESC&offset=0&limit=10&orderBy=id&ignorePaging=false`,
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
  //     field: "hexCode",
  //     headerName: "کد رنگ ",
  //     width: 150,
  //     renderCell: ({ row }) => (
  //       <div className="flex items-center">
  //         <span
  //           style={{ background: row.hexCode }}
  //           className={`w-5 h-5 ml-2 rounded-sm`}
  //         ></span>
  //         {row.hexCode}
  //       </div>
  //     ),
  //   },
  //   {
  //     field: "list",
  //     headerName: "ویرایش",
  //     width: 150,
  //     renderCell: (row) => (
  //       <a href={`/admin/ecommerce/colors/${row.id}`}>
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
  // if (colorsIsLoading) {
  //   return <Loading />;
  // }

  const columns = [
    {
      accessorKey: "id",
      header: "شناسه",
      size: 20,
    },
    {
      accessorKey: "name",
      header: "نام ",
      minSize: 100, //min size enforced during resizing
      maxSize: 400, //max size enforced during resizing
      size: 180, //medium column
    },
    {
      accessorKey: "hexCode",
      header: "کد رنگ ",
      size: 20,
      Cell: ({ row }) => (
        <div className="flex items-center">
          <span
            style={{ background: row.original.hexCode }}
            className={`w-5 h-5 ml-2 rounded-sm`}
          ></span>
          {row.original.hexCode}
        </div>
      ),
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
          {}

          <a href={`/admin/ecommerce/colors/${row.id}`}>
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
        url={
          "/v1/api/ecommerce/colors?sortOrder=DESC&offset=0&limit=10&orderBy=id&ignorePaging=false"
        }
        columns={columns}
      />
    </div>
  );
}
