"use client";
import { fetcher, useFetcher } from "@/app/components/global/fetcher";
import Loading from "@/app/components/global/loading";
import Link from "next/link";
import React, { useEffect } from "react";
import OrderDataTable from "./Datatable";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import FactorGenerator from "./FactorGenerator";

export default function TotalOrders({ params }) {
  const router = useRouter();

  const {
    data: orderDetail,
    isLoading: orderDetailIsLoading,
    error: orderDetailError,
    refetch: refetchData,
  } = useFetcher(
    `/v1/api/ecommerce/admin/totalOrders/${params.id[0]}?sortOrder=DESC`,
    "GET"
  );

  const handleProccess = async (id) => {
    try {
      const req = await fetcher({
        url: `/v1/api/ecommerce/admin/pendingOrders/processDetail/${id}`,
        method: "PATCH",
      });
      toast.success("موفق");
      refetchData();
    } catch (error) {
      toast.error(error.message);
    }
  };
  useEffect(() => {
    if (!orderDetailIsLoading) {
      if (orderDetail?.result?.result === null) {
        router.push("/admin/ecommerce/pendingOrders");
      }
    }
  }, [orderDetail]);

  if (orderDetailIsLoading) {
    return <Loading />;
  }
  return (
    <div>
      <FactorGenerator data={orderDetail?.result} />
      <section className=" relative">
        <div className="w-full px-4 md:px-5 lg-6 mx-auto">
          <div className="flex items-start flex-col gap-6 xl:flex-row ">
            <div className="w-full max-w-sm md:max-w-3xl xl:max-w-sm flex items-start flex-col gap-8 max-xl:mx-auto">
              <div className="p-6 border border-gray-200 rounded-3xl w-full group transition-all duration-500 hover:border-gray-400 ">
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
                <div className="data py-6 border-b border-gray-200">
                  <div className="flex items-center justify-between gap-4 mb-2">
                    <p className="font-normal text-sm leading-8 text-gray-400 transition-all duration-500 group-hover:text-gray-700">
                      قیمت محصولات
                    </p>
                    <p className="font-medium text-sm leading-8 text-gray-900">
                      {Number(
                        orderDetail?.result?.totalProductPrice
                      ).toLocaleString()}{" "}
                      تومان
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
                      تومان
                    </p>
                  </div>
                  <div className="flex items-center justify-between gap-4 ">
                    <p className="font-normal text-sm leading-8 text-gray-400 transition-all duration-500 group-hover:text-gray-700 ">
                      تخفیف
                    </p>
                    <p className="font-medium text-sm leading-8 text-emerald-500">
                      {Number(
                        orderDetail?.result?.totalDiscountFee
                      ).toLocaleString()}{" "}
                      تومان
                    </p>
                  </div>
                </div>
                <div className="total flex items-center justify-between pt-6">
                  <p className="font-normal text-xl leading-8 text-black ">
                    جمع کل
                  </p>
                  <h5 className="font-manrope font-bold text-2xl leading-9 text-primary">
                    {Number(orderDetail?.result?.totalPrice).toLocaleString()}{" "}
                    تومان
                  </h5>
                </div>
              </div>
              <div className="p-6 border border-gray-200 rounded-3xl w-full group transition-all duration-500 hover:border-gray-400 ">
                <div className="flex justify-between border-b border-gray-200 items-center pb-6 ">
                  <h2 className="font-manrope font-bold text-lg leading-10 text-black ">
                    اطلاعات کاربر
                  </h2>
                  <span>
                    {new Date(
                      orderDetail?.result?.createdAt
                    ).toLocaleDateString("fa-IR")}
                  </span>
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
                </div>
              </div>
            </div>
            <div className="w-full">
              <div className="grid grid-cols-1 gap-6">
                <h3>محصولات</h3>
                <OrderDataTable
                  data={orderDetail?.result?.details}
                  handleProccess={handleProccess}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
