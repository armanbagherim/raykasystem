"use client";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import React, { useEffect } from "react";
import { fetcher, useFetcher } from "../../../components/global/fetcher";
import Loading from "../../../components/global/loading";
import { useAtom } from "jotai";
import { pageTitle } from "../../layout";
import { toast } from "react-toastify";
import LightDataGrid from "@/app/components/global/LightDataGrid/LightDataGrid";
import { Button, IconButton } from "@mui/material";

export default function VendorAddress() {
  const [title, setTitle] = useAtom(pageTitle);

  useEffect(() => {
    setTitle({
      title: "آدرس فروشنده ها",
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
      accessorKey: "name",
      header: "نام ",
      minSize: 100,
      maxSize: 400,
      size: 400,
    },
    {
      accessorKey: "slug",
      header: "لینک ",
      minSize: 100,
      maxSize: 400,
      size: 400,
    },
    {
      accessorKey: "Actions",
      header: "عملیات",
      size: 200,

      Cell: ({ row }) => (
        <>
          <a href={`/admin/ecommerce/vendoraddresses/${row.id}`}>
            <Button variant="outlined">آدرس ها</Button>
          </a>
        </>
      ),
    },
  ];

  return (
    <div>
      <LightDataGrid
        url={"/v1/api/ecommerce/user/vendors?sortOrder=ASC&offset=0&limit=10"}
        columns={columns}
      />
    </div>
  );
}
