"use client";
import { useFetcher } from "@/app/components/global/fetcher";
import Loading from "@/app/components/global/loading";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import React, { useEffect } from "react";
import { useAtom } from "jotai";
import { pageTitle } from "@/app/admin/layout";
import LightDataGrid from "@/app/components/global/LightDataGrid/LightDataGrid";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";

export default function Eav({ params }) {
  const [title, setTitle] = useAtom(pageTitle);

  useEffect(() => {
    setTitle({
      title: "فیلد ها",
      buttonTitle: "افزودن فیلد",
      link: `/admin/eav/entityTypes/fields/${params.id}/new`,
    });
  }, []);

  const {
    data: categories,
    isLoading: categoriesIsLoading,
    error: categoriesError,
  } = useFetcher(
    `/v1/api/eav/admin/attributes?sortOrder=DESC&offset=0&limit=10&orderBy=id&ignorePaging=false&entityTypeId=${+params.id}`,
    "GET"
  );

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
  //     field: "list",
  //     headerName: "ویرایش",
  //     width: 400,
  //     renderCell: ({ row }) => (
  //       <>
  //         <a href={`/admin/eav/entityTypes/fields/${params.id}/edit/${row.id}`}>
  //           <button
  //             type="button"
  //             className="focus:outline-none ml-4 text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
  //           >
  //             ویرایش
  //           </button>
  //         </a>
  //         {row.attributeType.valueBased == true ? (
  //           <a href={`/admin/eav/entityTypes/fields/${row.id}/values`}>
  //             <button
  //               type="button"
  //               className="focus:outline-none ml-4 text-white bg-cyan-700 hover:bg-cyan-700 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
  //             >
  //               مقادیر
  //             </button>
  //           </a>
  //         ) : (
  //           ""
  //         )}
  //       </>
  //     ),
  //   },
  // ];
  // if (categoriesIsLoading) {
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
      maxSize: 200, //max size enforced during resizing
      size: 200, //medium column
    },
    {
      accessorKey: "minLength",
      header: "حداقل طول کاراکتر ",
      minSize: 100, //min size enforced during resizing
      maxSize: 200, //max size enforced during resizing
      size: 200, //medium column
    },
    {
      accessorKey: "maxLength",
      header: "حداکثر طول کاراکتر ",
      minSize: 100, //min size enforced during resizing
      maxSize: 200, //max size enforced during resizing
      size: 200, //medium column
    },
    {
      accessorKey: "required",
      header: "نوع",
      minSize: 100, //min size enforced during resizing
      maxSize: 200, //max size enforced during resizing
      size: 200, //medium column
      Cell({ row }) {
        return !row.required ? 'غیراجباری' : 'اجباری'
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
          <a href={`/admin/eav/entityTypes/fields/${params.id}/edit/${row.id}`}>
            <IconButton aria-label="delete" color="primary">
              <ModeEditIcon />
            </IconButton>
          </a>
        </>
      ),
    },
  ];

  return (
    <div>
      <LightDataGrid
        url={`/v1/api/eav/admin/attributes?sortOrder=DESC&offset=0&limit=10&orderBy=id&ignorePaging=false&entityTypeId=${+params.id}`}
        columns={columns}
      />
    </div>
  );
}
