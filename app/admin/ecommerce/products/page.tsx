"use client";
import React, { useEffect } from "react";
import { fetcher, useFetcher } from "../../../components/global/fetcher";
import Loading from "../../../components/global/loading";
import { useAtom } from "jotai";
import { pageTitle } from "../../layout";
import { toast } from "react-toastify";
import Image from "next/image";
import Uploader from "@/app/components/global/Uploader";
import LightDataGrid from "@/app/components/global/LightDataGrid/LightDataGrid";
import { Button, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
export default function Products() {
  const [title, setTitle] = useAtom(pageTitle);

  useEffect(() => {
    setTitle({
      title: "محصولات",
      buttonTitle: "افزودن محصول جدید",
      link: "/admin/ecommerce/products/new",
    });
  }, []);

  const deleteRow = async (id) => {
    try {
      const req = await fetcher({
        url: `/v1/api/ecommerce/admin/products/${id}`,
        method: "DELETE",
      });
      toast.success("موفق");
      refetchProducts();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const columns = [
    {
      accessorKey: "id",
      header: "شناسه",
      size: 10,
      maxSize: 10,
    },
    {
      accessorKey: "title",
      header: "نام ",
      minSize: 100, //min size enforced during resizing
      maxSize: 400, //max size enforced during resizing
      size: 400, //medium column
    },
    {
      accessorKey: "brand.name",
      header: "برند",
      minSize: 100, //min size enforced during resizing
      maxSize: 150, //max size enforced during resizing
      size: 150, //medium column
    },
    {
      accessorKey: "publishStatus.name",
      header: "وضعیت انتشار",
      minSize: 100, //min size enforced during resizing
      maxSize: 150, //max size enforced during resizing
      size: 150, //medium column
    },
    {
      accessorKey: "entityType.name",
      header: "دسته بندی",
      minSize: 100, //min size enforced during resizing
      maxSize: 400, //max size enforced during resizing
      size: 180, //medium column
    },

    {
      accessorKey: "slug",
      header: "لینک",
      size: 400,
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
          <a href={`/admin/eav/entityTypes/fields/${row.id}`}>
            <Button variant="outlined" color="success">
              فیلد ها
            </Button>
          </a>
          <a href={`/admin/ecommerce/products/${row.id}`}>
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
        url={"/v1/api/ecommerce/admin/products"}
        columns={columns}
      />
    </div>
  );
}
