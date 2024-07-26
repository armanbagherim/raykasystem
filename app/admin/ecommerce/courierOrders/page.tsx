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
import SearchSelect from "@/app/components/global/SearchSelect";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Link from "next/link";
export default function Orders() {
  const [title, setTitle] = useAtom(pageTitle);
  const [triggered, setTriggered] = useState(false);
  const [vendorId, setVendorId] = useState();
  useEffect(() => {
    setTitle({
      title: "سفارشات",
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
      accessorKey: "transactionId",
      header: "شماره تراکنش",
      size: 10,
      maxSize: 10,
    },
    {
      accessorKey: "paymentGateway.name",
      header: "کاربر",
      minSize: 100,
      maxSize: 100,
      size: 100,
      Cell: ({ row }) =>
        `${row.original?.user?.firstname || ""} ${
          row.original?.user?.lastname || ""
        }`,
    },

    {
      accessorKey: "user.phoneNumber",
      header: "شماره موبایل",
      size: 10,
      maxSize: 10,
    },
    {
      accessorKey: "paymentGateway.name",
      header: "تاریخ ثبت سفارش",
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
      accessorKey: "totalProductPrice",
      header: "مجموع قیمت محصولات",
      size: 10,
      maxSize: 10,
      Cell: ({ row }) =>
        Number(row.original.totalProductPrice).toLocaleString(),
    },

    {
      accessorKey: "totalDiscountFee",
      header: "مجموع تخفیف",
      size: 10,
      maxSize: 10,
      Cell: ({ row }) => Number(row.original.totalDiscountFee).toLocaleString(),
    },
    {
      accessorKey: "totalShipmentPrice",
      header: "هزینه ارسال",
      size: 10,
      maxSize: 10,
      Cell: ({ row }) =>
        Number(row.original.totalShipmentPrice).toLocaleString(),
    },
    {
      accessorKey: "totalPrice",
      header: "جمع کل",
      size: 10,
      maxSize: 10,
      Cell: ({ row }) => Number(row.original.totalPrice).toLocaleString(),
    },
    {
      accessorKey: "Actions",
      header: "عملیات",
      size: 200,

      Cell: ({ row }) => (
        <>
          <IconButton>
            <Link href={`/admin/ecommerce/courierOrders/${row.id}`}>
              <RemoveRedEyeIcon />
            </Link>
          </IconButton>
          <a
            href={`/admin/ecommerce/totalOrders?phoneNumber=${row.original?.user?.phoneNumber}`}
          >
            <Button variant="outlined">سفارشات این کاربر</Button>
          </a>
        </>
      ),
    },
  ];

  return (
    <>
      <LightDataGrid
        url={`${process.env.NEXT_PUBLIC_BASE_URL}/v1/api/ecommerce/admin/courierOrders`}
        columns={columns}
        triggered={triggered}
      />
    </>
  );
}
