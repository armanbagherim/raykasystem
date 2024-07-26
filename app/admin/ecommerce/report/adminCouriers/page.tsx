"use client";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { toast } from "react-toastify";
import LightDataGrid from "@/app/components/global/LightDataGrid/LightDataGrid";
import {
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
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
import ChangeToNull from "@/app/components/global/ChangeToNull";
export default function Orders() {
  const [title, setTitle] = useAtom(pageTitle);
  const [triggered, setTriggered] = useState(false);
  const [courierId, setcourierId] = useState(null);
  const [reportProps, setReportProps] = useState({
    courierId: null,
    startDate: null,
    endDate: null,
    orderId: null,
  });
  const [firstDates, setFirstDates] = useState(null);
  const [lastDates, setLastDates] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [total, setTotal] = useState(null);
  const [firstInit, setFirstInit] = useState(true);
  const [loadingReports, setLoadingReports] = useState(false);

  useEffect(() => {
    setTitle({
      title: "سفارشات",
      buttonTitle: "",
      link: "",
    });
  }, []);

  const {
    data: couriers,
    isLoading: couriersIsLoading,
    error: couriersError,
  } = useFetcher(
    `/v1/api/ecommerce/admin/couriers?sortOrder=DESC&offset=0&orderBy=id`,
    "GET"
  );

  const fetchFirstDates = async () => {
    await fetcher({
      url: `/v1/api/ecommerce/persiandate/month/firstDays`,
      method: "GET",
    }).then((res) => {
      setFirstDates(res?.result);
      setReportProps((prevProps) => ({
        ...prevProps,
        startDate: res?.result[0]?.gregorianDate,
      }));
    });
  };

  const fetchLastDates = async () => {
    await fetcher({
      url: `/v1/api/ecommerce/persiandate/month/lastDays`,
      method: "GET",
    }).then((res) => {
      setLastDates(res.result);
      setReportProps((prevProps) => ({
        ...prevProps,
        endDate: res?.result[0]?.gregorianDate,
      }));
      setIsLoading(false);
    });
  };

  const fetchTotal = async () => {
    setLoadingReports(true);
    let url = `/v1/api/ecommerce/report/adminCouriers/total?beginDate=${reportProps.startDate}&endDate=${reportProps.endDate}`;

    if (reportProps.courierId !== null) {
      url += `&courierId=${reportProps.courierId}`;
    }
    if (reportProps.orderId !== null) {
      url += `&orderId=${reportProps.orderId}`;
    }

    await fetcher({
      url: url,
      method: "GET",
    }).then((res) => {
      setTotal(res.result);
      setLoadingReports(false);
    });
  };

  useEffect(() => {
    fetchFirstDates();
    fetchLastDates();
  }, []);

  //   useEffect(() => {
  //     if (courierId !== null) {
  //       setTriggered(!triggered);
  //     }
  //   }, [courierId]);

  const handleGetResult = () => {
    fetchTotal();
    setFirstInit(false);
    setTriggered(!triggered);
  };

  const columns = [
    {
      accessorKey: "id",
      header: "شناسه ",
      minSize: 5,
      size: 5,
      maxSize: 5,
    },

    {
      accessorKey: "orderStatus.name",
      header: "وضعیت سفارش",
      size: 10,
      maxSize: 10,
    },
    {
      accessorKey: "courier",
      header: "پیک",
      size: 10,
      maxSize: 10,
      Cell: ({ row }) =>
        `${row?.original?.courierUser?.firstname} ${row?.original?.courierUser?.lastname}`,
    },
    {
      accessorKey: "deliveryDate",
      header: "تاریخ ارسال",
      size: 10,
      maxSize: 10,
      Cell: ({ row }) =>
        new Date(row?.original?.deliveryDate).toLocaleDateString("fa-IR", {
          hour: "numeric",
          minute: "numeric",
          second: "numeric",
        }),
    },
    {
      accessorKey: "customerDelivery",
      header: "تاریخ تحویل به مشتری",
      size: 10,
      maxSize: 10,
      Cell: ({ row }) =>
        new Date(row?.original?.sendToCustomerDate).toLocaleDateString(
          "fa-IR",
          {
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
          }
        ),
    },
    {
      accessorKey: "realShipmentPrice",
      header: "سهم پیک",
      size: 10,
      maxSize: 10,
      Cell: ({ row }) =>
        Number(row.original.realShipmentPrice).toLocaleString(),
    },
    {
      accessorKey: "totalShipmentPrice",
      header: "هزینه ارسال",
      size: 10,
      maxSize: 10,
      Cell: ({ row }) =>
        Number(row.original.totalShipmentPrice).toLocaleString(),
    },
  ];
  let url = `${process.env.NEXT_PUBLIC_BASE_URL}/v1/api/ecommerce/report/adminCouriers?beginDate=${reportProps.startDate}&endDate=${reportProps.endDate}`;
  if (reportProps.courierId !== null) {
    url += `&courierId=${reportProps.courierId}`;
  }
  if (reportProps.orderId !== null) {
    url += `&orderId=${reportProps.orderId}`;
  }
  return (
    <>
      <div className="flex gap-4 flex-col md:flex-row mb-8">
        {!isLoading && (
          <>
            {" "}
            <div className="flex-1">
              <FormControl fullWidth>
                <InputLabel id="demo-peyk-select">پیک</InputLabel>
                <Select
                  labelId="demo-peyk-select-label"
                  id="demo-peyk-select"
                  label="پیک"
                  value={reportProps.courierId}
                  fullWidth
                  onChange={(e) => {
                    const newValue =
                      e.target.value === null ? null : e.target.value;
                    setReportProps({
                      ...reportProps,
                      courierId: newValue,
                    });
                  }}
                >
                  <MenuItem value={null}>بدون انتخاب</MenuItem>
                  {couriers?.result?.map((value, index) => {
                    return (
                      <MenuItem key={index} value={value.userId}>
                        {value.user.fullName}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </div>
            <div className="flex-1">
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  تاریخ شروع
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="تاریخ شروع"
                  value={reportProps.startDate}
                  onChange={(e) =>
                    setReportProps({
                      ...reportProps,
                      startDate: e.target.value,
                    })
                  }
                >
                  {firstDates?.map((value, index) => {
                    return (
                      <MenuItem key={index} value={value.gregorianDate}>
                        {value.yearMonth}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </div>
            <div className="flex-1">
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  تاریخ پایان
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="تاریخ شروع"
                  value={reportProps.endDate}
                  onChange={(e) =>
                    setReportProps({
                      ...reportProps,
                      endDate: e.target.value,
                    })
                  }
                >
                  {lastDates?.map((value, index) => {
                    return (
                      <MenuItem key={index} value={value.gregorianDate}>
                        {value.yearMonth}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </div>
            <div className="flex-1">
              <TextField
                fullWidth
                value={reportProps.orderId}
                label="شماره سفاش"
                onChange={(e) =>
                  setReportProps({
                    ...reportProps,
                    orderId: ChangeToNull(e.target.value),
                  })
                }
                variant="outlined"
              />
            </div>
          </>
        )}
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
              {total && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  <div className="flex flex-row flex-wrap bg-gray-100 items-center px-3 py-4 justify-between text-center rounded-xl border border-primary">
                    <span>تعداد سفارش </span> <span>{total?.cntOrder}</span>
                  </div>
                  <div className="flex flex-row flex-wrap bg-gray-100 items-center px-3 py-4 justify-between text-center rounded-xl border border-primary">
                    <span>مقدار سود و ضرر ارسال </span>{" "}
                    <span>{Number(total?.profitAmount).toLocaleString()}</span>
                  </div>
                  <div className="flex flex-row flex-wrap bg-gray-100 items-center px-3 py-4 justify-between text-center rounded-xl border border-primary">
                    <span>سهم پیک </span>{" "}
                    <span>
                      {Number(total?.realShipmentPrice).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex flex-row flex-wrap bg-gray-100 items-center px-3 py-4 justify-between text-center rounded-xl border border-primary">
                    <span>جمع هزینه ارسال </span>{" "}
                    <span>
                      {Number(total?.totalShipmentPrice).toLocaleString()}
                    </span>
                  </div>
                </div>
              )}
            </>
          )}
        </>
      )}
    </>
  );
}
