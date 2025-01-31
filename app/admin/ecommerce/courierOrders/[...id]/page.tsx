"use client";
import { fetcher, useFetcher } from "@/app/components/global/fetcher";
import Loading from "@/app/components/global/loading";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import OrderDataTable from "./Datatable";
import { toast } from "react-toastify";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@mui/material";
import SweetAlert2 from "react-sweetalert2";
import SearchSelect from "@/app/components/global/SearchSelect";
import FactorGenerator from "../../totalOrders/[...id]/FactorGenerator";

export default function PostageOrders() {
  const params = useParams();
  const router = useRouter();
  const [swalProps, setSwalProps] = useState({});
  const [couriersSelect, setCouriersSelect] = useState(null);
  const {
    data: orderDetail,
    isLoading: orderDetailIsLoading,
    error: orderDetailError,
    refetch: refetchData,
  } = useFetcher(`/v1/api/ecommerce/admin/courierOrders/${params.id}`, "GET");

  const {
    data: couriers,
    isLoading: couriersIsLoading,
    error: couriersError,
  } = useFetcher(
    `/v1/api/ecommerce/admin/couriers?sortOrder=DESC&offset=0&limit=10&orderBy=id&ignorePaging=true`,
    "GET"
  );

  const handleProccess = async () => {
    try {
      setSwalProps({
        show: true,
        title: "کد رهگیری پستی",
        input: "text",
        inputLabel: "کد رهگیری پستی",
        inputPlaceholder: "کد رهگیری پستی",
        showCancelButton: true,
      });
    } catch (error) {
      toast.error(error.message);
    }
  };

  const assignCouriers = async (postReceipt) => {
    try {
      const req = await fetcher({
        url: `/v1/api/ecommerce/admin/courierOrders/processCourier/${params.id[0]}`,
        method: "PATCH",
        body: {
          userId: +couriersSelect,
        },
      });
      toast.success("موفق");
      refetchData();
      router.push("/admin/ecommerce/courierOrders");
      setSwalProps({ show: false });
    } catch (error) {
      toast.error(error.message);
    }
  };
  useEffect(() => {
    if (!orderDetailIsLoading) {
      if (orderDetail?.result?.result === null) {
        router.push("/admin/ecommerce/courierOrders");
      }
    }
  }, [orderDetail]);

  useEffect(() => {
    if (!couriersIsLoading) {
      setCouriersSelect(couriers?.result[0].userId);
    }
  }, [couriersIsLoading]);

  if (orderDetailIsLoading && couriersIsLoading) {
    return <Loading />;
  }
  return (
    <div>
      <div
        style={{ width: "100%", margin: "0 auto" }}
        className="pdf flex gap-4 print bg-gray-200 p-2 rounded-lg !mb-8"
      >
        <FactorGenerator data={orderDetail?.result} />
      </div>
      <div className="flex mb-6 gap-4 no-print">
        {!couriersIsLoading ? (
          <SearchSelect
            diffKey="userId"
            onChange={(e) => setCouriersSelect(e.userId)}
            data={couriers?.result}
            value={couriersSelect}
            defaultValue={couriersSelect}
            isDiff={true}
            diffName="user.fullName"
            label="پیک"
          />
        ) : (
          "در حال بارگزاری"
        )}

        <Button variant="outlined" onClick={assignCouriers}>
          اختصاص به پیک
        </Button>
      </div>
      <section className=" relative">
        <div className="mb-8">
          <SweetAlert2
            {...swalProps}
            onConfirm={(postReceipt) => handleSwalConfirm(postReceipt)}
            onCancel={() => setSwalProps({ show: false })}
          />
        </div>

        <div className="w-full px-4 md:px-5 lg-6 mx-auto no-print">
          <div className="flex items-start flex-col ">
            <div className="w-full  flex items-start flex-row gap-8 max-xl:mx-auto mb-8 flex-wrap">
              <div className="p-6 flex-1 border border-gray-200 rounded-3xl w-full group transition-all duration-500 hover:border-gray-400 ">
                <div className="flex justify-between border-b border-gray-200 items-center pb-6 ">
                  <h2 className="font-manrope font-bold text-lg leading-10 text-black ">
                    {`#${orderDetail?.result?.id}`}
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
                        طبقه: {orderDetail?.result?.address?.floorNumber}
                      </span>
                      <span>
                        کدپستی : {orderDetail?.result?.address?.postalCode}{" "}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full">
              <div className="grid grid-cols-1 gap-6">
                <h3>محصولات</h3>
                <OrderDataTable data={orderDetail?.result?.details} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
