"use client";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import React, { useEffect } from "react";
import { fetcher, useFetcher } from "../../../components/global/fetcher";
import Loading from "../../../components/global/loading";
import { useAtom } from "jotai";
import { pageTitle } from "../../layout";
import { toast } from "react-toastify";
import LightDataGrid from "@/app/components/global/LightDataGrid/LightDataGrid";
import { Button, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";

export default function Discount() {
  const [title, setTitle] = useAtom(pageTitle);

  useEffect(() => {
    setTitle({
      title: "تخفیف ها",
      buttonTitle: "افزودن تخفیف",
      link: "/admin/ecommerce/discounts/new",
    });
  }, []);

  const deleteRow = async (id) => {
    try {
      const req = await fetcher({
        url: `/v1/api/ecommerce/admin/discounts/${id}`,
        method: "DELETE",
      });
      toast.success("موفق");
      refetch();
    } catch (error) {
      toast.error(error.message);
    }
  };

  // const {
  //   data: discounts,
  //   isLoading: discountsIsLoading,
  //   error: discountsError,
  //   refetch: refetch,
  // } = useFetcher(`/v1/api/ecommerce/admin/discounts`, "GET");

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
  //     width: 450,
  //     renderCell: (row) => (
  //       <>
  //         <a href={`/admin/ecommerce/discounts/${row.id}`}>
  //           <button
  //             type="button"
  //             className="focus:outline-none mx-4 text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
  //           >
  //             ویرایش
  //           </button>
  //         </a>
  //         <a onClick={(e) => deleteItem(row.id)}>
  //           <button
  //             type="button"
  //             className="focus:outline-none mx-4 text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
  //           >
  //             حذف
  //           </button>
  //         </a>
  //         <a href={`/admin/ecommerce/discounts/conditions/${row.id}`}>
  //           <button
  //             type="button"
  //             className="focus:outline-none mx-4 text-white bg-emerald-700 hover:bg-emerald-900 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
  //           >
  //             شرط ها
  //           </button>
  //         </a>
  //       </>
  //     ),
  //   },
  // ];
  // if (discountsIsLoading) {
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
          <a href={`/admin/ecommerce/discounts/conditions/${row.id}`}>
            <button
              type="button"
              className="focus:outline-none mx-4 text-white bg-emerald-700 hover:bg-emerald-900 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
            >
              شرط ها
            </button>
          </a>
          <a href={`/admin/ecommerce/discounts/${row.id}`}>
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
        url={"/v1/api/ecommerce/admin/discounts"}
        columns={columns}
      />
    </div>
  );
}
