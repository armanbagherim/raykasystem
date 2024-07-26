"use client";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { fetcher, useFetcher } from "../../../components/global/fetcher";
import Loading from "../../../components/global/loading";
import { useAtom } from "jotai";
import { pageTitle } from "../../layout";
import { toast } from "react-toastify";
import LightDataGrid from "@/app/components/global/LightDataGrid/LightDataGrid";
import {
  Button,
  FormControl,
  IconButton,
  InputLabel,
  Select,
  TextField,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Link from "next/link";
import Swal from "sweetalert2";
import StatusLabelChips from "@/app/components/global/StatusLabelChips";
import ChangeToNull from "@/app/components/global/ChangeToNull";

export default function TotalOrdersModule({ searchParams }) {
  console.log(searchParams);
  const [title, setTitle] = useAtom(pageTitle);
  const [triggered, setTriggered] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState(searchParams.phoneNumber);
  const [orderId, setOrderId] = useState(
    searchParams.orderId ? searchParams.orderId : null
  );
  console.log(phoneNumber);
  let url = `${process.env.NEXT_PUBLIC_BASE_URL}/v1/api/ecommerce/admin/totalOrders?`;
  if (phoneNumber !== null && phoneNumber !== undefined) {
    url += `phoneNumber=${phoneNumber}`;
  }
  if (orderId !== null && orderId !== undefined) {
    url += `&orderId=${orderId}`;
  }

  useEffect(() => {
    setTitle({
      title: "سفارشات",
      buttonTitle: "",
      link: "",
    });
  }, []);

  const handleGetResult = () => {
    setTriggered(!triggered);
  };

  const deleteOrder = async (id) => {
    try {
      const result = await Swal.fire({
        title: "مطمئن هستید؟",
        text: "با حذف این سفارش امکان بازگشت آن وجود ندارد",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "بله حذفش کن",
        cancelButtonText: "لغو",
      });

      if (result.isConfirmed) {
        const req = await fetcher({
          url: `/v1/api/ecommerce/admin/totalOrders/${id}`,
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
      accessorKey: "orderStatus.name",
      header: "وضعیت سفارش",
      size: 10,
      maxSize: 10,
      Cell: ({ row }) => (
        <StatusLabelChips
          text={row?.original?.orderStatus?.name}
          statusId={row?.original?.orderStatus?.id}
        />
      ),
    },

    {
      accessorKey: "Actions",
      header: "عملیات",
      size: 200,

      Cell: ({ row }) => (
        <>
          <IconButton onClick={(e) => deleteOrder(row.id)}>
            <DeleteIcon color="error" />
          </IconButton>

          <IconButton>
            <Link href={`/admin/ecommerce/totalOrders/${row.id}`}>
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
      <div className="flex gap-4 flex-col md:flex-row mb-8">
        <>
          {" "}
          <div className="flex-1">
            <FormControl fullWidth>
              <TextField
                label="بر اساس شماره موبایل"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(ChangeToNull(e.target.value))}
                variant="outlined"
              />
            </FormControl>
          </div>
          <div className="flex-1">
            <FormControl fullWidth>
              <TextField
                label="بر اساس شماره سفارش"
                value={orderId}
                onChange={(e) => setOrderId(ChangeToNull(e.target.value))}
                variant="outlined"
              />
            </FormControl>
          </div>
          <button
            onClick={handleGetResult}
            className="h-full bg-primary p-4 rounded-xl text-white"
          >
            دریافت گزارش
          </button>
        </>
      </div>
      <LightDataGrid url={url} columns={columns} triggered={triggered} />
    </>
  );
}
