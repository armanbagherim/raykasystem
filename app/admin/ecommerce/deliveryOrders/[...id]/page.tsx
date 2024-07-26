"use client";
import { fetcher, useFetcher } from "@/app/components/global/fetcher";
import Loading from "@/app/components/global/loading";
import Link from "next/link";
import React, { useEffect } from "react";
import OrderDataTable from "./Datatable";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { Button } from "@mui/material";
import FactorGenerator from "../../totalOrders/[...id]/FactorGenerator";

export default function TotalOrders({ params }) {
  const router = useRouter();

  const deliverOrder = async (id) => {
    try {
      const result = await Swal.fire({
        title: "مطمئن هستید؟",
        text: "با تحویل به مشتری دیگر قادر به بازگشت آن نیستید",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "بله",
        cancelButtonText: "لغو",
      });

      if (result.isConfirmed) {
        const req = await fetcher({
          url: `/v1/api/ecommerce/admin/deliveryOrders/processDelivery/${params.id[0]}`,
          method: "PATCH",
        });
        toast.success("موفق");
        router.push("/admin/ecommerce/deliveryOrders/");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const {
    data: orderDetail,
    isLoading: orderDetailIsLoading,
    error: orderDetailError,
    refetch: refetchData,
  } = useFetcher(
    `/v1/api/ecommerce/admin/deliveryOrders/${params.id[0]}?sortOrder=DESC`,
    "GET"
  );

  if (orderDetailIsLoading) {
    return <Loading />;
  }
  return (
    <div>
      <div
        style={{ width: "100%", margin: "0 auto" }}
        className="pdf flex gap-4 print bg-gray-200 p-2 rounded-lg !mb-8"
      >
        <FactorGenerator data={orderDetail?.result} />

        <Link
          target="_blank"
          href={`https://www.google.com/maps?q=${orderDetail?.result?.address?.latitude},${orderDetail?.result?.address.longitude}`}
          className="no-print"
        >
          <Button variant="contained" fullWidth color="secondary">
            لوکیشن در گوگل مپ
          </Button>
        </Link>
      </div>
      <div className="mb-8 no-print">
        <Button fullWidth variant="contained" onClick={deliverOrder}>
          تحویل به مشتری
        </Button>
      </div>

      <section className="relative no-print">
        <div className="w-full px-4 md:px-5 lg-6 mx-auto">
          <div className="flex items-start flex-col">
            <div className="w-full mb-8">
              <div className="grid grid-cols-1 gap-6">
                <h3>محصولات</h3>
                <OrderDataTable data={orderDetail?.result?.details} />
              </div>
            </div>
            <div className="w-full flex-col flex items-start md:flex-row gap-8 max-xl:mx-auto mb-8 flex-wrap">
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
                    <a href={`tel:${orderDetail?.result?.user.phoneNumber}`}>
                      <p className="font-medium text-sm leading-8 text-emerald-500">
                        {orderDetail?.result?.user.phoneNumber}
                      </p>
                    </a>
                  </div>
                  <div className="flex items-center justify-between gap-4 ">
                    <p className="font-bold text-md leading-8 text-gray-400 transition-all duration-500 group-hover:text-gray-700 ">
                      آدرس
                    </p>
                    <p className="text-md leading-8 font-bold">
                      <span>
                        استان: {orderDetail?.result?.address?.province?.name}{" "}
                      </span>
                      <span>
                        شهر: {orderDetail?.result?.address?.city?.name}{" "}
                      </span>
                      <span>
                        محله:
                        {orderDetail?.result?.address?.neighborhood?.name}{" "}
                      </span>
                      <span>
                        خیابان: {orderDetail?.result?.address?.street}{" "}
                      </span>
                      <span>پلاک: {orderDetail?.result?.address?.plaque} </span>
                      <span>
                        طبقه: {orderDetail?.result?.address?.floorNumber}{" "}
                      </span>
                      <span>
                        کدپستی : {orderDetail?.result?.address?.postalCode}{" "}
                      </span>
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
