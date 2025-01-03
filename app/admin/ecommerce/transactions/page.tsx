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
import StatusLabelChips from "@/app/components/global/StatusLabelChips";

export default function Transactions() {
  const [title, setTitle] = useAtom(pageTitle);
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    setTitle({
      title: "تراکنش ها",
      buttonTitle: "",
      link: "",
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
      accessorKey: "CAt",
      header: "تاریخ ثبت ",
      minSize: 100,
      maxSize: 100,
      size: 100,
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
      accessorKey: "UAt",
      header: "به روز رسانی",
      minSize: 100,
      maxSize: 100,
      size: 100,
      Cell: ({ row }) =>
        `${
          new Date(row.original?.updatedAt).toLocaleDateString("fa-IR", {
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
          }) || ""
        } `,
    },
    {
      accessorKey: "paymentGateway.name",
      header: "درگاه پرداخت ",
      minSize: 100,
      maxSize: 100,
      size: 100,
    },
    {
      accessorKey: "orderId",
      header: "شماره سفارش",
      minSize: 100,
      maxSize: 100,
      size: 100,
    },

    {
      accessorKey: "orderStatus.name",
      header: "وضعیت سفارش",
      size: 10,
      maxSize: 10,
      Cell: ({ row }) => (
        <StatusLabelChips
          text={row?.original?.paymentStatus?.name}
          statusId={row?.original?.paymentStatus?.id}
          isTransaction
        />
      ),
    },
    {
      accessorKey: "paymentType.name",
      header: "کاربر",
      minSize: 100,
      maxSize: 400,
      size: 180,
      Cell({ row }) {
        return `${row.original?.user?.firstname} ${row.original?.user?.lastname}`;
      },
    },
    {
      accessorKey: "user.phoneNumber",
      header: "شماره موبایل",
      minSize: 100,
      maxSize: 400,
      size: 180,
    },
    {
      accessorKey: "paymentType.name",
      header: "نوع پرداخت",
      minSize: 100,
      maxSize: 200,
      size: 180,
    },
    {
      accessorKey: "totalprice",
      header: "جمع مبلغ",
      minSize: 100,
      maxSize: 150,
      size: 150,
      Cell({ row }) {
        return Number(row.original.totalprice).toLocaleString();
      },
    },
  ];

  return (
    <div>
      <LightDataGrid
        url={"/v1/api/ecommerce/admin/transactions"}
        columns={columns}
        triggered={triggered}
      />
    </div>
  );
}
