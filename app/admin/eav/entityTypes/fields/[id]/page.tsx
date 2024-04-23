"use client";
import { fetcher, useFetcher } from "@/app/components/global/fetcher";
import Loading from "@/app/components/global/loading";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { pageTitle } from "@/app/admin/layout";
import LightDataGrid from "@/app/components/global/LightDataGrid/LightDataGrid";
import { Button, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { toast } from "react-toastify";

export default function Eav({ params }) {
  const [title, setTitle] = useAtom(pageTitle);
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    setTitle({
      title: "فیلد ها",
      buttonTitle: "افزودن فیلد",
      link: `/admin/eav/entityTypes/fields/${params.id}/new`,
    });
  }, []);

  const deleteGuarantee = async (id) => {
    try {
      const req = await fetcher({
        url: `/v1/api/eav/admin/attributes/${id}`,
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
      accessorKey: "name",
      header: "نام ",
      minSize: 100, //min size enforced during resizing
      maxSize: 200, //max size enforced during resizing
      size: 200, //medium column
    },
    {
      accessorKey: "minLength",
      header: "حداقل طول کاراکتر ",
      minSize: 100, //min size enforced during resizing
      maxSize: 200, //max size enforced during resizing
      size: 200, //medium column
    },
    {
      accessorKey: "maxLength",
      header: "حداکثر طول کاراکتر ",
      minSize: 100, //min size enforced during resizing
      maxSize: 200, //max size enforced during resizing
      size: 200, //medium column
    },
    {
      accessorKey: "required",
      header: "نوع",
      minSize: 100, //min size enforced during resizing
      maxSize: 200, //max size enforced during resizing
      size: 200, //medium column
      Cell({ row }) {
        return !row.required ? "غیراجباری" : "اجباری";
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
      Cell: ({ row }) => (
        <>
          {row?.original?.attributeType?.valueBased == true ? (
            <a href={`/admin/eav/entityTypes/fields/${row.id}/values`}>
              <Button type="button" variant="outlined">
                مقادیر
              </Button>
            </a>
          ) : (
            ""
          )}
          <a onClick={(e) => deleteGuarantee(row.id)}>
            <IconButton aria-label="delete" color="error">
              <DeleteIcon />
            </IconButton>
          </a>
          <a href={`/admin/eav/entityTypes/fields/${params.id}/edit/${row.id}`}>
            <IconButton aria-label="delete" color="primary">
              <ModeEditIcon />
            </IconButton>
          </a>
        </>
      ),
    },
  ];

  return (
    <div>
      <LightDataGrid
        url={`/v1/api/eav/admin/attributes?sortOrder=DESC&offset=0&limit=10&orderBy=id&ignorePaging=false&entityTypeId=${+params.id}`}
        columns={columns}
        triggered={triggered}
      />
    </div>
  );
}
