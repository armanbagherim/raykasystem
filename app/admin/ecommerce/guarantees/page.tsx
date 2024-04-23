"use client";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { fetcher, useFetcher } from "../../../components/global/fetcher";
import Loading from "../../../components/global/loading";
import { useAtom } from "jotai";
import { pageTitle } from "../../layout";
import { toast } from "react-toastify";
import LightDataGrid from "@/app/components/global/LightDataGrid/LightDataGrid";
import { Button, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import Image from "next/image";
import Uploader from "@/app/components/global/Uploader";

export default function Guarantees() {
  const [title, setTitle] = useAtom(pageTitle);
  const [triggered, setTriggered] = useState(false);
  // setTriggered(!triggered);
  // triggered = { triggered };
  useEffect(() => {
    setTitle({
      title: "گارانتی ها",
      buttonTitle: "افزودن گارانتی جدید",
      link: "/admin/ecommerce/guarantees/new",
    });
  }, []);

  const deleteGuarantee = async (id) => {
    try {
      const req = await fetcher({
        url: `/v1/api/ecommerce/guarantees/${id}`,
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
      accessorKey: "name",
      header: "نام ",
      minSize: 100, //min size enforced during resizing
      maxSize: 100, //max size enforced during resizing
      size: 100, //medium column
    },
    {
      accessorKey: "slug",
      header: "لینک",
      minSize: 100, //min size enforced during resizing
      maxSize: 400, //max size enforced during resizing
      size: 180, //medium column
    },
    {
      accessorKey: "image",
      header: "تصویر ",
      size: 20,
      Cell({ row }) {
        return row ? (
          <Image
            loading="eager"
            src={`${
              process.env.NEXT_PUBLIC_BASE_URL
            }/v1/api/ecommerce/guarantees/image/${
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
          <Uploader
            location={`v1/api/ecommerce/guarantees/image`}
            id={row.id}
          />

          <a href={`/admin/ecommerce/guarantees/${row.id}`}>
            <IconButton aria-label="delete" color="primary">
              <ModeEditIcon />
            </IconButton>
          </a>
          <a onClick={(e) => deleteGuarantee(row.id)}>
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
          "/v1/api/ecommerce/guarantees?sortOrder=DESC&offset=0&limit=10&orderBy=id&ignorePaging=false"
        }
        columns={columns}
        triggered={triggered}
      />
    </div>
  );
}
