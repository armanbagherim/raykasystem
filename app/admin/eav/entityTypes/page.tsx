"use client";
import { fetcher, useFetcher } from "@/app/components/global/fetcher";
import Loading from "@/app/components/global/loading";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import React, { useEffect } from "react";
import { pageTitle } from "../../layout";
import { useAtom } from "jotai";
import { toast } from "react-toastify";
import Image from "next/image";

export default function page() {
  const [title, setTitle] = useAtom(pageTitle);

  useEffect(() => {
    setTitle({
      title: "دسته بندی ها",
      buttonTitle: "افزودن دسته بندی",
      link: "/admin/eav/entityTypes/new",
    });
  }, []);
  const {
    data: categories,
    isLoading: categoriesIsLoading,
    error: categoriesError,
    refetch: categoriesRefetch,
  } = useFetcher(`/v1/api/eav/admin/entityTypes?sortOrder=ASC`, "GET");

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
      field: "name",
      headerName: "نام ",
      width: 150,
    },
    {
      field: "image",
      headerName: "تصویر ",
      width: 50,
      renderCell({ row }) {
        return row.attachment ? (
          <Image
            loading="eager"
            src={`${
              process.env.NEXT_PUBLIC_BASE_URL
            }/v1/api/eav/admin/entityTypes/image/${
              row.attachment?.fileName || ""
            }`}
            width={50}
            height={50}
            alt=""
          />
        ) : (
          <img width={30} height={30} src="/images/no-photos.png" alt="" />
        );
      },
    },
    {
      field: "slug",
      headerName: "آدرس",
      width: 150,
    },

    {
      field: "Actions",
      headerName: "عملیات",
      width: 300,
      renderCell: (row) => (
        <>
          <a href={`/admin/eav/entityTypes/fields/${row.id}`}>
            <button
              type="button"
              className="ml-4 focus:outline-none text-white bg-primary hover:bg-primary focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
            >
              فیلد ها
            </button>
          </a>
          <a href={`/admin/eav/entityTypes/edit/${row.id}`}>
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
