"use client";
import { fetcher, useFetcher } from "@/app/components/global/fetcher";
import Loading from "@/app/components/global/loading";
import { DataGrid, GridColDef, GridRowsProp, faIR } from "@mui/x-data-grid";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { pageTitle } from "../../layout";
import LightDataGrid from "@/app/components/global/LightDataGrid/LightDataGrid";
import { IconButton } from "@mui/material";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { toast } from "react-toastify";
import DeleteIcon from "@mui/icons-material/Delete";

export default function Roles() {
  const [title, setTitle] = useAtom(pageTitle);
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    setTitle({
      title: "نقش های کاربری",
      buttonTitle: "افزودن نقش",
      link: "/admin/core/roles/new",
    });
  }, []);

  const deleteRow = async (id) => {
    try {
      const req = await fetcher({
        url: `/v1/api/core/admin/roles/${id}`,
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
      header: "شناسه نقش",
      size: 10,
      maxSize: 10,
    },
    {
      accessorKey: "roleName",
      header: "نام نقش",
      minSize: 100, //min size enforced during resizing
      maxSize: 100, //max size enforced during resizing
      size: 100, //medium column
    },
    {
      accessorKey: "createdAt",
      header: "تاریخ ایجاد",
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
          <a href={`/admin/core/roles/${row.id}`}>
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
    <LightDataGrid
      url={"/v1/api/core/admin/roles?igonePaging=true"}
      columns={columns}
      triggered={triggered}
    />
  );
}
