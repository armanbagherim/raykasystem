"use client";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { toast } from "react-toastify";
import { fetcher, useFetcher } from "@/app/components/global/fetcher";
import Loading from "@/app/components/global/loading";
import { pageTitle } from "@/app/admin/layout";
import LightDataGrid from "@/app/components/global/LightDataGrid/LightDataGrid";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import SaveBar from "@/app/components/global/SaveBar";
import Swal from "sweetalert2";
export default function DiscountConditions({ params }) {
  const [title, setTitle] = useAtom(pageTitle);
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    setTitle({
      title: "شرط های تخفیف",
      buttonTitle: "افزودن شرط",
      link: `/admin/ecommerce/discounts/conditions/${+params.id}/new`,
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
          url: `/v1/api/ecommerce/admin/discountConditions/${id}`,
          method: "DELETE",
        });
        toast.success("موفق");
        setTriggered(!triggered);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const {
    data: conditions,
    isLoading: conditionsIsLoading,
    error: conditionsError,
    refetch: refetch,
  } = useFetcher(
    `/v1/api/ecommerce/admin/discountConditions?sortOrder=DESC&discountId=${params.id}&offset=0&limit=10&orderBy=id`,
    "GET"
  );

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
      minSize: 100, //min size enforced during resizing
      maxSize: 400, //max size enforced during resizing
      size: 400, //medium column
    },
    {
      accessorKey: "isDefault",
      header: "شرط پیش فرض ",
      minSize: 100, //min size enforced during resizing
      maxSize: 150, //max size enforced during resizing
      size: 150, //medium column
    },
    {
      accessorKey: "conditionType.name",
      header: "جنس شرط",
      minSize: 100, //min size enforced during resizing
      maxSize: 400, //max size enforced during resizing
      size: 400, //medium column
    },

    {
      accessorKey: "Actions",
      header: "عملیات",
      size: 200,

      Cell: ({ row }) => (
        <>
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
        url={`/v1/api/ecommerce/admin/discountConditions?sortOrder=DESC&discountId=${+params.id}&offset=0&limit=10&orderBy=id`}
        columns={columns}
        triggered={triggered}
      />
    </div>
  );
}
