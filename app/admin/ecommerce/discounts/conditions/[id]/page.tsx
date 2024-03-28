"use client";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import React, { useEffect } from "react";
import { useAtom } from "jotai";
import { toast } from "react-toastify";
import { fetcher, useFetcher } from "@/app/components/global/fetcher";
import Loading from "@/app/components/global/loading";
import { pageTitle } from "@/app/admin/layout";

export default function DiscountConditions({ params }) {
  const [title, setTitle] = useAtom(pageTitle);

  useEffect(() => {
    setTitle({
      title: "تخفیف ها",
      buttonTitle: "افزودن تخفیف",
      link: "/admin/ecommerce/discounts/new",
    });
  }, []);

  const deleteItem = async (id) => {
    try {
      const req = await fetcher({
        url: `/v1/api/ecommerce/admin/discountConditions/${id}`,
        method: "DELETE",
      });
      toast.success("موفق");
      refetch();
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
      field: "hexCode",
      headerName: "کد رنگ ",
      width: 150,
      renderCell: ({ row }) => (
        <div className="flex items-center">
          <span
            style={{ background: row.hexCode }}
            className={`w-5 h-5 ml-2 rounded-sm`}
          ></span>
          {row.hexCode}
        </div>
      ),
    },
    {
      field: "list",
      headerName: "ویرایش",
      width: 450,
      renderCell: (row) => (
        <>
          <a onClick={(e) => deleteItem(row.id)}>
            <button
              type="button"
              className="focus:outline-none mx-4 text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
            >
              حذف
            </button>
          </a>
        </>
      ),
    },
  ];
  if (conditionsIsLoading) {
    return <Loading />;
  }
  return (
    <div>
      <DataGrid rows={conditions.result} columns={columns} />
    </div>
  );
}
