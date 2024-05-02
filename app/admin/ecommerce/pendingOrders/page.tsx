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
  const [vendorId, setVendorId] = useState(null);
  useEffect(() => {
    setTitle({
      title: "سفارشات",
      buttonTitle: "",
      link: "",
    });
  }, []);

  const {
    data: vendors,
    isLoading: vendorsIsLoading,
    error: vendorsError,
  } = useFetcher(
    `/v1/api/ecommerce/user/vendors?sortOrder=DESC&offset=0&orderBy=id`,
    "GET"
  );

  useEffect(() => {
    if (!vendorsIsLoading && vendors !== "undefined") {
      setVendorId(vendors.result[0]?.id || null);
    }
  }, [vendorsIsLoading]);

  useEffect(() => {
    if (vendorId !== null) {
      setTriggered(!triggered);
    }
  }, [vendorId]);

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
          <IconButton>
            <Link href={`/admin/ecommerce/pendingOrders/${vendorId}/${row.id}`}>
              <RemoveRedEyeIcon />
            </Link>
          </IconButton>
        </>
      ),
    },
  ];

  return (
    <>
      <div className="mb-8">
        <SearchSelect
          loadingState={vendorsIsLoading}
          data={vendors?.result}
          label="فروشگاه"
          defaultValue={vendorId}
          onChange={(e) => setVendorId(e.id)}
        />
      </div>
      {vendorsIsLoading && vendorId === null ? (
        "Loading"
      ) : (
        <LightDataGrid
          url={`${process.env.NEXT_PUBLIC_BASE_URL}/v1/api/ecommerce/admin/pendingOrders?vendorId=${vendorId}`}
          columns={columns}
          triggered={triggered}
        />
      )}
    </>
  );
}
