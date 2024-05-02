"use client";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import React, { useEffect } from "react";
import { fetcher, useFetcher } from "../../../../components/global/fetcher";
import Loading from "../../../../../components/global/loading";
import { useAtom } from "jotai";
import { pageTitle } from "../../../layout";
import { toast } from "react-toastify";
import LightDataGrid from "@/app/components/global/LightDataGrid/LightDataGrid";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
export default function VendorAddress({ params }) {
  const [title, setTitle] = useAtom(pageTitle);

  useEffect(() => {
    setTitle({
      title: "آدرس های فروشگاه",
      buttonTitle: "افزودن آدرس جدید",
      link: `/admin/ecommerce/vendorAddresses/${params.id}/new`,
    });
  }, []);

  const deleteGuarantee = async (id) => {
    try {
      const req = await fetcher({
        url: `/v1/api/ecommerce/vendorAddresses/${id}`,
        method: "DELETE",
      });
      toast.success("موفق");
      refetchAddresses();
    } catch (error) {
      toast.error(error.message);
    }
  };
  const columns = [
    {
      accessorKey: "id",
      header: "شناسه",
      size: 20,
    },
    {
      accessorKey: "address.name",
      header: "نام آدرس ",
      minSize: 100, //min size enforced during resizing
      maxSize: 400, //max size enforced during resizing
      size: 180, //medium column
    },
    {
      accessorKey: "vendor.name",
      header: "نام فروشگاه ",
      minSize: 100, //min size enforced during resizing
      maxSize: 400, //max size enforced during resizing
      size: 180, //medium column
    },

    {
      accessorKey: "address.street",
      header: "خیابان ",
      minSize: 100, //min size enforced during resizing
      maxSize: 400, //max size enforced during resizing
      size: 180, //medium column
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

          <a
            href={`/admin/ecommerce/vendoraddresses/${params.id}/edit/${row.id}`}
          >
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
        url={`/v1/api/ecommerce/vendorAddresses?sortOrder=DESC&offset=0&limit=10&orderBy=id&vendorId=${params.id}`}
        columns={columns}
      />
    </div>
  );
}
