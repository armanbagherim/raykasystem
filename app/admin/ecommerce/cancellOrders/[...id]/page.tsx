"use client";
import { fetcher, useFetcher } from "@/app/components/global/fetcher";
import Loading from "@/app/components/global/loading";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import OrderDataTable from "./Datatable";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import FactorGenerator from "./FactorGenerator";
import Swal from "sweetalert2";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import SearchSelect from "@/app/components/global/SearchSelect";

export default function TotalOrders({ params }) {
  const router = useRouter();
  const [openOrderStatus, setOpenOrderStatus] = useState(false);
  const [openOrderShipping, setOpenOrderShipping] = useState(false);

  const [orderStatusId, setOrderStatusId] = useState(null);
  const [orderShipmentId, setOrderShipmentId] = useState(null);

  const {
    data: orderStatuses,
    isLoading: orderStatusesIsLoading,
    error: orderStatusesError,
  } = useFetcher(
    `/v1/api/ecommerce/admin/orderStatuses?sortOrder=DESC&offset=0&limit=20&orderBy=id`,
    "GET"
  );

  const {
    data: orderShipmentWays,
    isLoading: orderShipmentWaysIsLoading,
    error: orderShipmentWaysError,
  } = useFetcher(
    `/v1/api/ecommerce/admin/orderShipmentWays?sortOrder=DESC&offset=0&limit=20&orderBy=id`,
    "GET"
  );

  const {
    data: orderDetail,
    isLoading: orderDetailIsLoading,
    error: orderDetailError,
    refetch: refetchData,
  } = useFetcher(
    `/v1/api/ecommerce/admin/totalOrders/${params.id[0]}?sortOrder=DESC`,
    "GET"
  );
  const handleChangeOrderStatus = async () => {
    try {
      const req = await fetcher({
        url: `/v1/api/ecommerce/admin/totalOrders/changeOrderStatus/${params.id[0]}`,
        body: {
          orderStatusId,
        },
        method: "PATCH",
      });
      toast.success("موفق");
      setOrderStatusId(null);
    } catch (errors) {
      toast.error("ناموفق");
    }
  };

  const handleChangeShipingMethod = async () => {
    try {
      const req = await fetcher({
        url: `/v1/api/ecommerce/admin/totalOrders/changeShipmentWay/${params.id[0]}`,
        body: {
          shipmentWayId: orderShipmentId,
        },
        method: "PATCH",
      });
      toast.success("موفق");
      setOrderShipmentId(null);
    } catch (errors) {
      toast.error("ناموفق");
    }
  };

  const decreaseDetail = async (id) => {
    try {
      const result = await Swal.fire({
        title: "مطمئن هستید؟",
        text: "با کم کردن تعداد دیگر قادر به بازگشت آن نیستید",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "بله کم کن",
        cancelButtonText: "لغو",
      });

      if (result.isConfirmed) {
        const req = await fetcher({
          url: `/v1/api/ecommerce/admin/totalOrders/decreaseDetail/${id}`,
          method: "DELETE",
        });
        toast.success("موفق");
        refetchData();
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const deleteDetail = async (id) => {
    try {
      const result = await Swal.fire({
        title: "مطمئن هستید؟",
        text: "با حذف کردن محصول دیگر قادر به بازگشت آن نیستید",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "بله حذف کن",
        cancelButtonText: "لغو",
      });

      if (result.isConfirmed) {
        const req = await fetcher({
          url: `/v1/api/ecommerce/admin/totalOrders/removeDetail/${id}`,
          method: "DELETE",
        });
        toast.success("موفق");
        refetchData();
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  if (orderDetailIsLoading) {
    return <Loading />;
  }

  const handleClickOpen = (type) => {
    if (type === "orderStatus") {
      setOpenOrderStatus(true);
    } else if (type === "orderShipping") {
      setOpenOrderShipping(true);
    }
  };

  const handleClose = (type) => {
    if (type === "orderStatus") {
      setOpenOrderStatus(false);
    } else if (type === "orderShipping") {
      setOpenOrderShipping(false);
    }
  };

  return (
    <div>
      <Dialog
        open={openOrderStatus}
        onClose={(e) => handleClose("orderStatus")}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{
          "& .MuiDialog-container": {
            "& .MuiPaper-root": {
              width: "100%",
              maxWidth: "500px", // Set your width here
              borderRadius: "15px",
            },
          },
        }}
      >
        <DialogTitle id="alert-dialog-title">تغییر وضعیت سفارش به</DialogTitle>
        <DialogContent>
          <SearchSelect
            onChange={(e) => {
              if (e !== null) {
                setOrderStatusId(e.id);
              }
            }}
            loadingState={orderStatusesIsLoading}
            data={orderStatuses?.result}
            value={orderStatusId}
            defaultValue={orderStatusId}
            // isDiff={true}
            // diffName="name"
            label="وضعیت سفارش"
            nullable
          />
        </DialogContent>
        <DialogActions className="!flex justify-between">
          <Button onClick={handleClose}>انصراف</Button>
          <Button onClick={handleChangeOrderStatus} autoFocus>
            تغییر وضعیت
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openOrderShipping}
        onClose={(e) => handleClose("orderShipping")}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{
          "& .MuiDialog-container": {
            "& .MuiPaper-root": {
              width: "100%",
              maxWidth: "500px", // Set your width here
              borderRadius: "15px",
            },
          },
        }}
      >
        <DialogTitle id="alert-dialog-title">تغییر نحوه ارسال به</DialogTitle>
        <DialogContent>
          <SearchSelect
            onChange={(e) => {
              if (e !== null) {
                setOrderShipmentId(e.id);
              }
            }}
            loadingState={orderShipmentWaysIsLoading}
            data={orderShipmentWays?.result}
            value={orderShipmentId}
            defaultValue={orderShipmentId}
            // isDiff={true}
            // diffName="name"
            label="روش ارسال"
            nullable
          />
        </DialogContent>
        <DialogActions className="!flex justify-between">
          <Button onClick={handleClose}>انصراف</Button>
          <Button onClick={handleChangeShipingMethod} autoFocus>
            تغییر وضعیت
          </Button>
        </DialogActions>
      </Dialog>
      <div
        style={{ width: "100%", margin: "0 auto" }}
        className="pdf flex gap-4 print bg-gray-200 p-2 rounded-lg !mb-8"
      >
        <FactorGenerator data={orderDetail?.result} />
        <Link
          target="_blank"
          href={`https://www.google.com/maps?q=${orderDetail?.result?.address?.latitude},${orderDetail?.result?.address.longitude}`}
        >
          <Button
            variant="contained"
            color="secondary"
            className={"no-print mb-8"}
          >
            لوکیشن در گوگل مپ
          </Button>
        </Link>
        <Button
          onClick={() => handleClickOpen("orderStatus")}
          variant="contained"
          color="primary"
          className={"no-print mb-8"}
        >
          تغییر وضعیت سفارش
        </Button>
        <Button
          onClick={() => handleClickOpen("orderShipping")}
          variant="contained"
          color="primary"
          className={"no-print mb-8"}
        >
          تغییر وضعیت ارسال
        </Button>
      </div>
      <span className="no-print bg-gray-100 border border-gray-200 rounded-lg mr-4 p-3 block mb-4">
        کد رهگیری پست: {orderDetail?.result?.postReceipt}
      </span>
      <section className="relative no-print mb-8">
        <div className="w-full px-4 md:px-5 lg-6 mx-auto">
          <div className="flex items-start flex-col ">
            <div className="w-full mb-8">
              <div className="grid grid-cols-1 gap-6">
                <h3>محصولات</h3>
                <OrderDataTable
                  data={orderDetail?.result?.details}
                  decreaseDetail={decreaseDetail}
                  deleteDetail={deleteDetail}
                />
              </div>
            </div>
            <div className="w-full flex items-start flex-wrap flex-row gap-8 max-xl:mx-auto mb-8">
              <div className="p-6 flex-1 border border-gray-200 rounded-3xl w-full group transition-all duration-500 hover:border-gray-400 ">
                <div className="flex justify-between border-b border-gray-200 items-center pb-6 ">
                  <h2 className="font-manrope font-bold text-lg leading-10 text-black ">
                    {`#${orderDetail.result.id}`}
                  </h2>
                  <span>
                    {new Date(
                      orderDetail?.result?.createdAt
                    ).toLocaleDateString("fa-IR")}
                  </span>
                </div>
                <div className="data py-6">
                  <div className="flex items-center justify-between gap-4">
                    <p className="font-normal text-sm leading-8 text-gray-400 transition-all duration-500 group-hover:text-gray-700">
                      قیمت محصولات
                    </p>
                    <p className="font-medium text-sm leading-8 text-gray-900">
                      {Number(
                        orderDetail?.result?.totalProductPrice
                      ).toLocaleString()}{" "}
                      ءتء
                    </p>
                  </div>
                  <div className="flex items-center justify-between gap-4 mb-2">
                    <p className="font-normal text-sm leading-8 text-gray-400 transition-all duration-500 group-hover:text-gray-700">
                      حمل و نقل
                    </p>
                    <p className="font-medium text-sm leading-8 text-gray-600">
                      {Number(
                        orderDetail?.result?.totalShipmentPrice
                      ).toLocaleString()}{" "}
                      ءتء
                    </p>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <p className="font-normal text-sm leading-8 text-gray-400 transition-all duration-500 group-hover:text-gray-700 ">
                      تخفیف
                    </p>
                    <p className="font-medium text-sm leading-8 text-emerald-500">
                      {Number(
                        orderDetail?.result?.totalDiscountFee
                      ).toLocaleString()}{" "}
                      ءتء
                    </p>
                  </div>
                </div>
                <div className="total flex items-center justify-between">
                  <p className="font-normal text-sm leading-8 text-black ">
                    جمع کل
                  </p>
                  <h5 className="font-manrope font-bold text-sm leading-9 text-primary">
                    {Number(orderDetail?.result?.totalPrice).toLocaleString()}{" "}
                    ءتء
                  </h5>
                </div>
              </div>
              <div className="p-6 border flex-1 border-gray-200 rounded-3xl w-full group transition-all duration-500 hover:border-gray-400 ">
                <div className="flex justify-between border-b border-gray-200 items-center pb-6 ">
                  <h2 className="font-manrope font-bold text-lg leading-10 text-black ">
                    اطلاعات کاربر
                  </h2>
                </div>
                <div className="data py-6">
                  <div className="flex items-center justify-between gap-4 mb-2">
                    <p className="font-normal text-sm leading-8 text-gray-400 transition-all duration-500 group-hover:text-gray-700">
                      نام
                    </p>
                    <p className="font-medium text-sm leading-8 text-gray-900">
                      {orderDetail?.result?.user.firstname}
                    </p>
                  </div>
                  <div className="flex items-center justify-between gap-4 mb-2">
                    <p className="font-normal text-sm leading-8 text-gray-400 transition-all duration-500 group-hover:text-gray-700">
                      نام خانوادگی
                    </p>
                    <p className="font-medium text-sm leading-8 text-gray-600">
                      {orderDetail?.result?.user.lastname}
                    </p>
                  </div>
                  <div className="flex items-center justify-between gap-4 ">
                    <p className="font-normal text-sm leading-8 text-gray-400 transition-all duration-500 group-hover:text-gray-700 ">
                      شماره تماس
                    </p>
                    <p className="font-medium text-sm leading-8 text-emerald-500">
                      {orderDetail?.result?.user.phoneNumber}
                    </p>
                  </div>
                  <div className="flex items-center justify-between gap-4 ">
                    <p className="font-bold text-md leading-8 text-gray-400 transition-all duration-500 group-hover:text-gray-700 ">
                      آدرس
                    </p>
                    <p className="text-md leading-8 font-bold">
                      <span>
                        استان: {orderDetail?.result?.address.province.name}{" "}
                      </span>
                      <span>
                        شهر: {orderDetail?.result?.address?.city?.name}{" "}
                      </span>
                      <span>
                        محله:
                        {orderDetail?.result?.address.neighborhood?.name}{" "}
                      </span>
                      <span>
                        خیابان: {orderDetail?.result?.address?.street}{" "}
                      </span>
                      <span>پلاک: {orderDetail?.result?.address?.plaque} </span>
                      <span>
                        طبقه: {orderDetail?.result?.address?.floorNumber}
                        {"  "}
                      </span>
                      <span>
                        کدپستی : {orderDetail?.result?.address?.postalCode}{" "}
                      </span>
                    </p>
                  </div>
                  <div className=" ">
                    <p className="font-normal text-sm leading-8 text-gray-400 transition-all duration-500 group-hover:text-gray-700 ">
                      یادداشت سفارش
                    </p>
                    <p className="font-medium text-sm leading-8 text-black">
                      {orderDetail?.result?.noteDescription}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
