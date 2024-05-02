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
      accessorKey: "id",
      header: "شناسه",
      size: 10,
      maxSize: 10,
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
      header: "شناسه سفارش",
      minSize: 100,
      maxSize: 100,
      size: 100,
    },
    {
      accessorKey: "paymentStatus.name",
      header: "وضعیت",
      minSize: 100,
      maxSize: 400,
      size: 180,
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
      accessorKey: "paymentType.name",
      header: "نوع پرداخت",
      minSize: 100,
      maxSize: 400,
      size: 180,
    },
    {
      accessorKey: "totalprice",
      header: "جمع مبلغ",
      minSize: 100,
      maxSize: 400,
      size: 180,
      Cell({ row }) {
        return Number(row.original.totalprice).toLocaleString();
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
      Cell: ({ row }) => <></>,
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
