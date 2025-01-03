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

export default function Vendors() {
  const [title, setTitle] = useAtom(pageTitle);
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    setTitle({
      title: "فروشگاه ها",
      buttonTitle: "افزودن فروشگاه جدید",
      link: "/admin/ecommerce/vendors/new",
    });
  }, []);

  const deleteRow = async (id) => {
    try {
      const req = await fetcher({
        url: `/v1/api/ecommerce/vendors/${id}`,
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
      accessorKey: "name",
      header: "نام ",
      minSize: 100,
      maxSize: 100,
      size: 100,
    },
    {
      accessorKey: "slug",
      header: "لینک",
      minSize: 100,
      maxSize: 400,
      size: 180,
    },
    {
      accessorKey: "Actions",
      header: "عملیات",
      size: 200,

      Cell: ({ row }) => (
        <>
          <a href={`/admin/ecommerce/vendors/${row.id}`}>
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
        url={
          "/v1/api/ecommerce/vendors?sortOrder=DESC&offset=0&limit=10&orderBy=id&ignorePaging=false"
        }
        columns={columns}
        triggered={triggered}
      />
    </div>
  );
}
