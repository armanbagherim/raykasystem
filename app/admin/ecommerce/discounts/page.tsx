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
import ChangeFormatDate from "@/app/components/global/ChangeFormatDate";
import Swal from "sweetalert2";

export default function Discount() {
  const [title, setTitle] = useAtom(pageTitle);
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    setTitle({
      title: "تخفیف ها",
      buttonTitle: "افزودن تخفیف",
      link: "/admin/ecommerce/discounts/new",
    });
  }, []);

  const deleteRow = async (id) => {
    try {
      const result = await Swal.fire({
        title: "مطمئن هستید؟",
        text: "با حذف این گزینه امکان بازگشت آن وجود ندارد",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "بله حذفش کن",
        cancelButtonText: "لغو",
      });

      if (result.isConfirmed) {
        const req = await fetcher({
          url: `/v1/api/ecommerce/admin/discounts/${id}`,
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
      size: 5,
      maxSize: 5,
    },
    {
      accessorKey: "name",
      header: "نام ",
      minSize: 100,
      maxSize: 150,
      size: 150,
    },
    {
      accessorKey: "startDate",
      header: "تاریخ شروع",
      minSize: 100,
      maxSize: 100,
      size: 100,
      Cell({ row }) {
        return (
          new Date(row.original?.startDate).toLocaleDateString("fa-IR", {
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
          }) || ""
        );
      },
    },
    {
      accessorKey: "endDate",
      header: "تاریخ پایان",
      minSize: 100,
      maxSize: 100,
      size: 100,
      Cell({ row }) {
        return (
          new Date(row.original?.endDate).toLocaleDateString("fa-IR", {
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
          }) || ""
        );
      },
    },
    {
      accessorKey: "used",
      header: "تعداد استفاده ",
      minSize: 30,
      maxSize: 30,
      size: 30,
    },
    {
      accessorKey: "actionRule.name",
      header: "نوع شرط ",
      minSize: 100,
      maxSize: 250,
      size: 250,
    },
    {
      accessorKey: "actionType.name",
      header: "نوع اعمال",
      minSize: 100,
      maxSize: 200,
      size: 200,
    },
    {
      accessorKey: "discountType.name",
      header: "نوع تخفیف",
      minSize: 100,
      maxSize: 150,
      size: 150,
    },
    {
      accessorKey: "priority",
      header: "اولویت",
      minSize: 100,
      maxSize: 150,
      size: 150,
    },
    {
      accessorKey: "isActive",
      header: "وضعیت ",
      minSize: 100,
      maxSize: 400,
      size: 400,
      Cell({ row }) {
        return row.original.isActive ? "فعال" : "غیرفعال";
      },
    },
    {
      accessorKey: "Actions",
      header: "عملیات",
      size: 200,

      Cell: ({ row }) => (
        <>
          <a href={`/admin/ecommerce/discounts/conditions/${row.id}`}>
            <Button variant="outlined"> شرط ها</Button>
          </a>
          <a href={`/admin/ecommerce/discounts/${row.id}`}>
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
    <div>
      <LightDataGrid
        url={"/v1/api/ecommerce/admin/discounts"}
        columns={columns}
        triggered={triggered}
      />
    </div>
  );
}
