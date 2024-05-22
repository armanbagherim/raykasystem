"use client";
import { fetcher, useFetcher } from "@/app/components/global/fetcher";
import Loading from "@/app/components/global/loading";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { pageTitle } from "../../layout";
import { useAtom } from "jotai";
import { toast } from "react-toastify";
import Image from "next/image";
import LightDataGrid from "@/app/components/global/LightDataGrid/LightDataGrid";
import { Button, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import Uploader from "@/app/components/global/Uploader";
import Swal from "sweetalert2";

export default function Eav() {
  const [title, setTitle] = useAtom(pageTitle);
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    setTitle({
      title: "دسته بندی ها",
      buttonTitle: "افزودن دسته بندی",
      link: "/admin/eav/entityTypes/new",
    });
  }, []);

  const deleteEavType = async (id) => {
    try {
      const result = await Swal.fire({
        title: "مطمئن هستید؟",
        text: "با حذف این گزینه امکان بازگشت آن وجود ندارد",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "بله حذفش کن",
        cancelButtonText: "لغو",
      });

      if (result.isConfirmed) {
        const req = await fetcher({
          url: `/v1/api/eav/admin/entityTypes/${id}`,
          method: "DELETE",
        });
        toast.success("موفق");
        setTriggered(!triggered);
      }
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
        return row.original.attachment ? (
          <Image
            loading="eager"
            src={`${
              process.env.NEXT_PUBLIC_BASE_URL
            }/v1/api/eav/admin/entityTypes/image/${
              row.original.attachment?.fileName || ""
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
      header: "لینک",
    },

    {
      accessorKey: "Actions",
      header: "عملیات",
      size: 200,

      Cell: ({ row }) => (
        <>
          <a href={`#`}>
            <Uploader
              location={`v1/api/eav/admin/entityTypes/image`}
              id={row.id}
            />
          </a>
          <a
            className="ml-1 mr-1"
            href={`/admin/eav/entityTypes/fields/${row.id}`}
          >
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
      <LightDataGrid
        triggered={triggered}
        url={"/v1/api/eav/admin/entityTypes"}
        columns={columns}
      />
    </div>
  );
}
