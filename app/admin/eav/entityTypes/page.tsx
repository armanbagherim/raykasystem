"use client";
import { fetcher, useFetcher } from "@/app/components/global/fetcher";
import Loading from "@/app/components/global/loading";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import React, { useEffect } from "react";
import { pageTitle } from "../../layout";
import { useAtom } from "jotai";
import { toast } from "react-toastify";
import Image from "next/image";
import LightDataGrid from "@/app/components/global/LightDataGrid/LightDataGrid";
import { Button, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";

export default function Eav() {
  const [title, setTitle] = useAtom(pageTitle);

  useEffect(() => {
    setTitle({
      title: "دسته بندی ها",
      buttonTitle: "افزودن دسته بندی",
      link: "/admin/eav/entityTypes/new",
    });
  }, []);

  const deleteEavType = async (id) => {
    try {
      const req = await fetcher({
        url: `/v1/api/eav/admin/entityTypes/${id}`,
        method: "DELETE",
      });
      toast.success("موفق");
      categoriesRefetch();
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
      accessorKey: "name",
      header: "نام ",
      minSize: 100, //min size enforced during resizing
      maxSize: 400, //max size enforced during resizing
      size: 180, //medium column
    },

    {
      accessorKey: "image",
      header: "تصویر ",
      size: 20,
      Cell({ row }) {
        return row.attachment ? (
          <Image
            loading="eager"
            src={`${
              process.env.NEXT_PUBLIC_BASE_URL
            }/v1/api/eav/admin/entityTypes/image/${
              row.attachment?.fileName || ""
            }`}
            width={50}
            height={50}
            alt=""
          />
        ) : (
          <img width={30} height={30} src="/images/no-photos.png" alt="" />
        );
      },
    },
    {
      accessorKey: "slug",
      header: "آدرس",
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
          <a href={`/admin/eav/entityTypes/edit/${row.id}`}>
            <IconButton aria-label="delete" color="primary">
              <ModeEditIcon />
            </IconButton>
          </a>
          <a onClick={(e) => deleteEavType(row.id)}>
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
      <LightDataGrid url={"/v1/api/eav/admin/entityTypes"} columns={columns} />
    </div>
  );
}
