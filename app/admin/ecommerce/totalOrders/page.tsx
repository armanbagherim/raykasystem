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
import Swal from "sweetalert2";

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
          new Date(row.original?.createdAt).toLocaleDateString({
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
    },

    {
      accessorKey: "totalDiscountFee",
      header: "مجموع تخفیف",
      size: 10,
      maxSize: 10,
    },
    {
      accessorKey: "totalShipmentPrice",
      header: "هزینه ارسال",
      size: 10,
      maxSize: 10,
    },
    {
      accessorKey: "totalPrice",
      header: "جمع کل",
      size: 10,
      maxSize: 10,
    },
    // {
    //   accessorKey: "orderShipmentWay.name",
    //   header: "نحوه ارسال",
    //   size: 10,
    //   maxSize: 10,
    // },

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
          <IconButton onClick={(e) => deleteOrder(row.id)}>
            <DeleteIcon color="error" />
          </IconButton>

          <IconButton>
            <Link href={`/admin/ecommerce/totalOrders/${row.id}`}>
              <RemoveRedEyeIcon />
            </Link>
          </IconButton>
        </>
      ),
    },
  ];

  return (
    <>
      <LightDataGrid
        url={`${process.env.NEXT_PUBLIC_BASE_URL}/v1/api/ecommerce/admin/totalOrders`}
        columns={columns}
        triggered={triggered}
      />
    </>
  );
}
