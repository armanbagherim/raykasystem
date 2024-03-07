"use client";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import React, { useEffect } from "react";
import { fetcher, useFetcher } from "../../../../components/global/fetcher";
import Loading from "../../../../components/global/loading";
import { useAtom } from "jotai";
import { pageTitle } from "../../../layout";
import { toast } from "react-toastify";

export default function page({ params }) {
  const [title, setTitle] = useAtom(pageTitle);

  useEffect(() => {
    setTitle({
      title: "آدرس های فروشگاه",
      buttonTitle: "افزودن فروشگاه جدید",
      link: `/admin/ecommerce/vendorAddresses/${params.id}/new`,
    });
  }, []);

  const deleteGuarantee = async (id) => {
    try {
      const req = await fetcher({
        url: `/v1/api/ecommerce/vendorAddresses/${id}`,
        method: "DELETE",
      });
      toast.success("موفق");
      refetchAddresses();
    } catch (error) {
      toast.error(error.message);
    }
  };
  const {
    data: addresses,
    isLoading: addressesIsLoading,
    error: addressesError,
    refetch: refetchAddresses,
  } = useFetcher(
    `/v1/api/ecommerce/vendorAddresses?sortOrder=DESC&offset=0&limit=10&orderBy=id&vendorId=${params.id}`,
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
      valueGetter: ({ row }) => {
        return row.address.name;
      },
    },
    {
      field: "slug",
      headerName: "اسلاگ",
      width: 150,
    },
    {
      field: "list",
      headerName: "ویرایش",
      width: 150,
      renderCell: (row) => (
        <a href={`/admin/ecommerce/vendoraddresses/${row.id}/new`}>
          <button
            type="button"
            className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
          >
            آدرس ها
          </button>
        </a>
      ),
    },
    {
      field: "delete",
      headerName: "حذف",
      width: 150,
      renderCell: ({ row }) => (
        <a onClick={(e) => deleteGuarantee(row.id)}>
          <button
            type="button"
            className="focus:outline-none text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
          >
            حذف
          </button>
        </a>
      ),
    },
  ];
  if (addressesIsLoading) {
    return <Loading />;
  }
  return (
    <div>
      <DataGrid rows={addresses.result} columns={columns} />
    </div>
  );
}
