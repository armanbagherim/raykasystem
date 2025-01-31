"use client";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { toast } from "react-toastify";
import LightDataGrid from "@/app/components/global/LightDataGrid/LightDataGrid";
import { Button, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import Image from "next/image";
import Uploader from "@/app/components/global/Uploader";
import Swal from "sweetalert2";
import { pageTitle } from "@/app/admin/layout";
import { useParams } from "next/navigation";

export default function Guarantees() {
  const params = useParams();
  const [title, setTitle] = useAtom(pageTitle);
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    setTitle({
      title: "گردش موجودی",
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
      accessorKey: "inventoryTrackStatus.name",
      header: "دلیل تغییر موجودی",
      size: 10,
      maxSize: 10,
    },
    {
      accessorKey: "product.title",
      header: "نام محصول",
      size: 10,
      maxSize: 10,
    },
    {
      accessorKey: "orderId",
      header: "شماره سفارش",
      size: 10,
      maxSize: 10,
    },
    {
      accessorKey: "createdAt",
      header: "تاریخ",
      size: 10,
      maxSize: 10,
      Cell: ({ row }) =>
        `${
          new Date(row.original?.createdAt).toLocaleDateString("fa-IR", {
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
          }) || ""
        } `,
    },
    {
      accessorKey: "inventoryId",
      header: "شناسه موجودی",
      size: 10,
      maxSize: 10,
    },
    {
      accessorKey: "qty",
      header: "تعداد",
      size: 10,
      maxSize: 10,
    },
  ];

  return (
    <div>
      <LightDataGrid
        url={`/v1/api/ecommerce/admin/inventoryHistories/${params.id}`}
        columns={columns}
        triggered={triggered}
      />
    </div>
  );
}
