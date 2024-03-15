"use client";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import React, { useEffect } from "react";
import { fetcher, useFetcher } from "../../../components/global/fetcher";
import Loading from "../../../components/global/loading";
import { useAtom } from "jotai";
import { pageTitle } from "../../layout";
import { toast } from "react-toastify";
import Image from "next/image";
import Uploader from "@/app/components/global/Uploader";

export default function page() {
  const [title, setTitle] = useAtom(pageTitle);

  useEffect(() => {
    setTitle({
      title: "محصولات",
      buttonTitle: "محصول جدید",
      link: "/admin/ecommerce/products/new",
    });
  }, []);

  const deleteBrand = async (id) => {
    try {
      const req = await fetcher({
        url: `/v1/api/ecommerce/brands/${id}`,
        method: "DELETE",
      });
      toast.success("موفق");
      refetchBrands();
    } catch (error) {
      toast.error(error.message);
    }
  };
  const {
    data: brands,
    isLoading: brandsIsLoading,
    error: brandsError,
    refetch: refetchBrands,
  } = useFetcher(
    `/v1/api/ecommerce/admin/products?sortOrder=DESC&offset=0&limit=10&orderBy=id`,
    "GET"
  );

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "شناسه",
      width: 150,
    },
    {
      field: "title",
      headerName: "نام ",
      width: 150,
    },
    {
      field: "slug",
      headerName: "اسلاگ",
      width: 150,
    },
    {
      field: "list",
      headerName: "ویرایش",
      width: 400,
      renderCell: (row) => (
        <>
          <a className="ml-4" href={`/admin/ecommerce/products/${row.id}`}>
            <button
              type="button"
              className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
            >
              ویرایش
            </button>
          </a>
          <a className="ml-4" onClick={(e) => deleteBrand(row.id)}>
            <button
              type="button"
              className="focus:outline-none text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
            >
              حذف
            </button>
          </a>
        </>
      ),
    },
  ];
  if (brandsIsLoading) {
    return <Loading />;
  }
  return (
    <div>
      <DataGrid rows={brands.result} columns={columns} />
    </div>
  );
}
