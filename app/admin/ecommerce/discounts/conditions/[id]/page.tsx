"use client";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import React, { useEffect } from "react";
import { useAtom } from "jotai";
import { toast } from "react-toastify";
import { fetcher, useFetcher } from "@/app/components/global/fetcher";
import Loading from "@/app/components/global/loading";
import { pageTitle } from "@/app/admin/layout";
import LightDataGrid from "@/app/components/global/LightDataGrid/LightDataGrid";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";

export default function DiscountConditions({ params }) {
  const [title, setTitle] = useAtom(pageTitle);

  useEffect(() => {
    setTitle({
      title: "شرط ها",
      buttonTitle: "افزودن شرط",
      link: "/admin/ecommerce/discounts/conditions/new",
    });
  }, []);

  const deleteRow = async (id) => {
    try {
      const req = await fetcher({
        url: `/v1/api/ecommerce/admin/discountConditions/${id}`,
        method: "DELETE",
      });
      toast.success("موفق");
      refetch();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const {
    data: conditions,
    isLoading: conditionsIsLoading,
    error: conditionsError,
    refetch: refetch,
  } = useFetcher(
    `/v1/api/ecommerce/admin/discountConditions?sortOrder=DESC&discountId=${params.id}&offset=0&limit=10&orderBy=id`,
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
  //         <a onClick={(e) => deleteItem(row.id)}>
  //           <button
  //             type="button"
  //             className="focus:outline-none mx-4 text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
  //           >
  //             حذف
  //           </button>
  //         </a>
  //       </>
  //     ),
  //   },
  // ];
  // if (conditionsIsLoading) {
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
    // {
    //   accessorKey: "hexCode",
    //   header: "کد رنگ ",
    //   size: 20,
    //   Cell: ({ row }) => (
    //     <div className="flex items-center">
    //       <span
    //         style={{ background: row.original.hexCode }}
    //         className={`w-5 h-5 ml-2 rounded-sm`}
    //       ></span>
    //       {row.original.hexCode}
    //     </div>
    //   ),
    // },
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
          {/* <a href={`/admin/ecommerce/discounts/${row.id}`}>
            <IconButton aria-label="delete" color="primary">
              <ModeEditIcon />
            </IconButton>
          </a> */}
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
