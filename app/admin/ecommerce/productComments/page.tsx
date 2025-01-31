"use client";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { useAtom } from "jotai";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import LightDataGrid from "@/app/components/global/LightDataGrid/LightDataGrid";
import {
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import Image from "next/image";
import Uploader from "@/app/components/global/Uploader";
import SearchSelect from "@/app/components/global/SearchSelect";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Link from "next/link";
import { pageTitle } from "@/app/admin/layout";
import { fetcher, useFetcher } from "@/app/components/global/fetcher";
import { maxHeaderSize } from "http";

export default function Orders() {
  const [title, setTitle] = useAtom(pageTitle);
  const [triggered, setTriggered] = useState(false);
  const [vendorId, setVendorId] = useState(null);
  const [reportProps, setReportProps] = useState({
    vendorId: null,
    startDate: null,
    endDate: null,
  });
  const [firstDates, setFirstDates] = useState(null);
  const [lastDates, setLastDates] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [total, setTotal] = useState(null);
  const [firstInit, setFirstInit] = useState(true);
  const [loadingReports, setLoadingReports] = useState(false);

  useEffect(() => {
    setTitle({
      title: "نظرات",
      buttonTitle: "",
      link: "",
    });
  }, []);

  const {
    data: vendors,
    isLoading: vendorsIsLoading,
    error: vendorsError,
  } = useFetcher(
    `/v1/api/ecommerce/admin/productCommentStatuses?sortOrder=DESC&offset=0&limit=10&orderBy=id`,
    "GET"
  );

  const confirmComment = async (commentId) => {
    try {
      const result = await Swal.fire({
        title: "تایید نظر",
        input: "text",
        inputPlaceholder: "پاسخ نظر",
        showCancelButton: true,
        confirmButtonText: "ارسال",
        cancelButtonText: "بستن",
      });

      if (result.isConfirmed) {
        const reply = result.value;
        const url = `/v1/api/ecommerce/admin/productComments/confirmComment/${commentId}`;

        await fetcher({
          url,
          body: {
            description: reply,
          },
          method: "PATCH",
        }).then((res) => {
          setTriggered(!triggered);
        });
      }
    } catch (error) {
      console.error("Failed to confirm comment:", error);
    }
  };

  const rejectComment = async (commentId) => {
    try {
      const result = await Swal.fire({
        title: "در حال رد نظر هستید آیا مطمئن هستید؟",
        showCancelButton: true,
        confirmButtonText: "حذف",
        cancelButtonText: "بستن",
      });

      if (result.isConfirmed) {
        const url = `/v1/api/ecommerce/admin/productComments/rejectComment/${commentId}`;

        await fetcher({
          url,
          method: "PATCH",
        }).then((res) => {
          setTriggered(!triggered);
        });
      }
    } catch (error) {
      console.error("Failed to confirm comment:", error);
    }
  };

  const handleGetResult = () => {
    setFirstInit(false);
    setTriggered(!triggered);
  };

  const showFullDescription = (description) => {
    Swal.fire({
      title: "متن کامل نظر",
      text: description,
      confirmButtonText: "بستن",
    });
  };

  const columns = [
    {
      accessorKey: "product.title",
      header: "محصول",
      minSize: 5,
      size: 5,
      maxSize: 5,
    },
    {
      accessorKey: "status.name",
      header: "وضعیت",
      minSize: 5,
      size: 5,
      maxSize: 5,
    },
    {
      accessorKey: "description",
      header: "متن نظر",
      minSize: 5,
      size: 5,
      maxSize: 5,
      Cell: ({ row }) => {
        const description = row.original.description;
        const truncatedDescription =
          description?.length > 50
            ? `${description.slice(0, 50)}...`
            : description;

        return (
          <div className="flex items-center">
            {description?.length > 50 && (
              <IconButton
                onClick={() => showFullDescription(description)}
                size="small"
              >
                <RemoveRedEyeIcon fontSize="small" />
              </IconButton>
            )}
            <span>{truncatedDescription}</span>
          </div>
        );
      },
    },
    {
      accessorKey: "id",
      header: "کاربر",
      minSize: 5,
      size: 5,
      maxSize: 5,
      Cell: ({ row }) => {
        return `${row?.original?.user?.firstname} ${row?.original?.user?.lastname}`;
      },
    },
    {
      accessorKey: "Actions",
      header: "عملیات",
      size: 200,
      Cell: ({ row }) =>
        reportProps.vendorId == 2 ? (
          <>
            <a onClick={() => confirmComment(row.id)}>
              <IconButton aria-label="delete" color="success" size="small">
                <Button variant="contained" color="success">
                  تایید نظر
                </Button>
              </IconButton>
            </a>
            <a onClick={(e) => rejectComment(row.id)}>
              <IconButton aria-label="delete" color="error" size="small">
                <Button variant="contained" color="error">
                  رد نظر
                </Button>
              </IconButton>
            </a>
          </>
        ) : (
          ""
        ),
    },
  ];

  let url = `/v1/api/ecommerce/admin/productComments`;
  if (reportProps.vendorId !== null) {
    url += `?commentStatusId=${reportProps.vendorId}`;
  }

  return (
    <>
      <div className="flex gap-4 flex-col md:flex-row mb-8">
        <div className="flex-1">
          <SearchSelect
            loadingState={vendorsIsLoading}
            data={vendors?.result}
            label="وضعیت"
            nullable={true}
            defaultValue={reportProps.vendorId}
            onChange={(e) => {
              setReportProps({ ...reportProps, vendorId: e.id });
              setTriggered(!triggered);
            }}
          />
        </div>
        <button
          onClick={handleGetResult}
          className="h-full bg-primary p-4 rounded-xl text-white"
        >
          دریافت گزارش
        </button>
      </div>
      {firstInit === true ? (
        ""
      ) : (
        <>
          {loadingReports ? (
            <div role="status" className="w-full text-center">
              <svg
                aria-hidden="true"
                className="inline w-8 h-8 text-gray-200 animate-spin  fill-green-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="sr-only"></span>
            </div>
          ) : (
            <>
              <div className="mb-8">
                <LightDataGrid
                  url={url}
                  columns={columns}
                  triggered={triggered}
                />
              </div>
            </>
          )}
        </>
      )}
    </>
  );
}
