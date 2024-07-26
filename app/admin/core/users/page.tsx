"use client";
import { useFetcher } from "@/app/components/global/fetcher";
import Loading from "@/app/components/global/loading";
import { DataGrid, GridColDef, GridRowsProp, faIR } from "@mui/x-data-grid";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { pageTitle } from "../../layout";
import LightDataGrid from "@/app/components/global/LightDataGrid/LightDataGrid";
import { Button, IconButton } from "@mui/material";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import ChangeFormatDate from "@/app/components/global/ChangeFormatDate";

export default function Users() {
  const [title, setTitle] = useAtom(pageTitle);

  useEffect(() => {
    setTitle({
      title: "کاربران",
      buttonTitle: "",
      link: "",
    });
  }, []);

  const columns = [
    {
      accessorKey: "id",
      header: "شناسه",
      size: 10,
      maxSize: 10,
    },
    {
      accessorKey: "firstname",
      header: "نام ",
      minSize: 100, //min size enforced during resizing
      maxSize: 100, //max size enforced during resizing
      size: 100, //medium column
    },
    {
      accessorKey: "lastname",
      header: "نام خانوادگی",
      minSize: 100, //min size enforced during resizing
      maxSize: 400, //max size enforced during resizing
      size: 180, //medium column
    },
    {
      accessorKey: "phoneNumber",
      header: "شماره موبایل",
      minSize: 100, //min size enforced during resizing
      maxSize: 400, //max size enforced during resizing
      size: 180, //medium column
    },
    {
      accessorKey: "createdAt",
      header: "تاریخ ایجاد کاربر",
      minSize: 100, //min size enforced during resizing
      maxSize: 400, //max size enforced during resizing
      size: 180, //medium column
      Cell({ row }) {
        return ChangeFormatDate(row.original.updatedAt);
      },
    },
    {
      accessorKey: "Actions",
      header: "عملیات",
      size: 200,

      Cell: ({ row }) => (
        <>
          <a href={`/admin/core/users/${row.id}`}>
            <IconButton aria-label="delete" color="primary">
              <ModeEditIcon />
            </IconButton>
          </a>
          <Link
            href={`/admin/ecommerce/totalOrders?phoneNumber=${row.original.phoneNumber}`}
          >
            <Button variant="outlined">سفارشات این کاربر</Button>
          </Link>
        </>
      ),
    },
  ];

  return <LightDataGrid url={"/v1/api/core/admin/users"} columns={columns} />;
}
