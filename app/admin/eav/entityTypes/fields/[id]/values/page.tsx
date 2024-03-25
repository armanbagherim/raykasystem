"use client";
import { fetcher, useFetcher } from "@/app/components/global/fetcher";
import Loading from "@/app/components/global/loading";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import React, { useEffect } from "react";
import { useAtom } from "jotai";
import { toast } from "react-toastify";
import Image from "next/image";
import { pageTitle } from "@/app/admin/layout";

export default function Eav({ params }) {
  const [title, setTitle] = useAtom(pageTitle);

  useEffect(() => {
    setTitle({
      title: "دسته بندی ها",
      buttonTitle: "افزودن دسته بندی",
      link: `/admin/eav/entityTypes/fields/${params.id}/values/new`,
    });
  }, []);
  console.log(params);
  const {
    data: categories,
    isLoading: categoriesIsLoading,
    error: categoriesError,
    refetch: categoriesRefetch,
  } = useFetcher(
    `/v1/api/eav/admin/attributeValues?sortOrder=ASC&orderBy=id&ignorePaging=false&attributeId=${params.id}`,
    "GET"
  );

  const deleteEavType = async (id) => {
    try {
      const req = await fetcher({
        url: `/v1/api/eav/admin/entityTypes/${id}`,
        method: "DELETE",
      });
      toast.success("موفق");
      categoriesRefetch();
    } catch (error) {
      toast.error(error.message);
    }
  };
  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "شناسه",
      width: 150,
    },
    {
      field: "value",
      headerName: "نام ",
      width: 150,
    },
    {
      field: "Actions",
      headerName: "عملیات",
      width: 300,
      renderCell: (row) => (
        <>
          <a
            href={`/admin/eav/entityTypes/fields/${params.id}/values/edit/${row.id}`}
          >
            <button
              type="button"
              className="ml-4 focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
            >
              ویرایش
            </button>
          </a>
          <a onClick={(e) => deleteEavType(row.id)}>
            <button
              type="button"
              className="ml-4 focus:outline-none text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
            >
              حذف
            </button>
          </a>
        </>
      ),
    },
  ];
  if (categoriesIsLoading) {
    return <Loading />;
  }
  return (
    <div>
      <DataGrid rows={categories.result} columns={columns} />
    </div>
  );
}
