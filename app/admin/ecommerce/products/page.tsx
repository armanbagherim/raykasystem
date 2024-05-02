"use client";
import React, { useEffect, useState } from "react";
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
  const [triggered, setTriggered] = useState(false);

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
      setTriggered(!triggered);
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
      accessorKey: "pPhoto",
      header: "تصویر",
      minSize: 100,
      maxSize: 100,
      size: 100,
      Cell: ({ row }) => {
        return row?.original?.attachments?.length ? (
          <Image
            key={row.id}
            loading="eager"
            src={`${
              process.env.NEXT_PUBLIC_BASE_URL
            }/v1/api/ecommerce/productphotos/image/${
              row.original.attachments[0]?.fileName || ""
            }`}
            width={30}
            height={30}
            alt=""
          />
        ) : (
          <img width={30} height={30} src="/images/no-photo.png" alt="" />
        );
      },
    },
    {
      accessorKey: "title",
      header: "نام ",
      minSize: 100,
      maxSize: 400,
      size: 400,
    },
    {
      accessorKey: "brand.name",
      header: "برند",
      minSize: 100,
      maxSize: 150,
      size: 150,
    },
    {
      accessorKey: "publishStatus.name",
      header: "وضعیت انتشار",
      minSize: 100,
      maxSize: 150,
      size: 150,
    },
    {
      accessorKey: "entityType.name",
      header: "دسته بندی",
      minSize: 100,
      maxSize: 400,
      size: 180,
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
          <a target="_blank" href={`/admin/ecommerce/products/${row.id}`}>
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
        triggered={triggered}
      />
    </div>
  );
}
