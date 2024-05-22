"use client";
import Image from "next/image";
import React from "react";

export default function OrderDetailModule({ data }) {
  return (
    <>
      {console.log(data.result)}
      <h1 className="text-2xl peyda mb-8">سفارش شماره #{data?.result?.id}</h1>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mb-4">
        <div>
          <div className="border-complete-b-200 mb-2 lg:mb-0">
            <div className="bg-neutral-000 flex items-center border-complete-b-200 px-3 py-4 lg:px-6 mb-2 lg:mb-0">
              <div className="cursor-pointer">
                <div className="flex"></div>
              </div>
              <div className="grow text-h5 text-neutral-900 mr-2">
                جزئیات سفارش
              </div>
              {data?.result?.orderShipmentWayId === 1 ? (
                <a
                  className="flex items-center gap-1 text-button-2 text-secondary-500 cursor-pointer"
                  data-cro-id="profile-see-factor"
                  target="_blank"
                  href={`https://tracking.post.ir/?id=${data.result.postReceipt}`}
                >
                  <div className="flex"></div>
                  پیگیری پستی سفارش
                </a>
              ) : (
                ""
              )}
            </div>
            <div className="bg-neutral-000 px-5 py-4 lg:px-6">
              <div className=" flex flex-col lg:flex-row items-stretch lg:items-center gap-3 gap-y-2 border-b border-b-gray-200 pb-4">
                <div className="flex items-center justify-between lg:justify-start gap-1">
                  <div className="text-body-1 text-neutral-500 ml-1">
                    کد پیگیری سفارش
                  </div>
                  <div className="text-body1-strong text-primary">
                    {data?.result?.id}
                  </div>
                </div>
                <div className="flex hidden lg:flex">
                  <span className="w-1 h-1 bg-gray-300 rounded-full inline"></span>
                </div>
                <div className="flex items-center justify-between lg:justify-start gap-1">
                  <div className="text-body-1 text-neutral-500 ml-1">
                    تاریخ ثبت سفارش
                  </div>
                  <div className="text-body1-strong text-primary">
                    {new Date(data?.result?.createdAt).toLocaleDateString(
                      "fa-IR"
                    )}
                  </div>
                </div>
              </div>
              <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-3 gap-y-2 pt-4 pb-2">
                <div className="flex items-center justify-between lg:justify-start gap-1">
                  <div className="text-body-1 text-neutral-500 ml-1">
                    تحویل گیرنده
                  </div>
                  <div className="text-body1-strong text-primary">
                    {data.result.user.firstname} {data.result.user.lastname}
                  </div>
                </div>
                <div className="flex hidden lg:flex">
                  <span className="w-1 h-1 bg-gray-300 rounded-full inline"></span>
                </div>
                <div className="flex items-center justify-between lg:justify-start gap-1">
                  <div className="text-body-1 text-neutral-500 ml-1">
                    شماره موبایل
                  </div>
                  <div className="text-body1-strong text-primary">
                    {data.result.user.phoneNumber}
                  </div>
                </div>
              </div>
              <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-2 border-b border-b-gray-200 pb-4">
                <div className="flex items-center justify-between lg:justify-start gap-1 grow flex-col lg:flex-row items-start">
                  <div className="text-body-1 text-neutral-500 ml-1 self-start whitespace-nowrap">
                    آدرس
                  </div>
                  <div className="text-body1-strong text-primary text-body1-strong self-start">
                    <span>استان: {data?.result?.address?.province?.name}</span>
                    {" - "}
                    <span>شهر: {data?.result?.address?.city?.name}</span>
                    {" - "}
                    <span>محله: {data?.result?.neighborhood?.name}</span>
                    {" - "}
                    <span>خیابان: {data?.result?.address?.street}</span>
                    {" - "}
                    <span>طبقه: {data?.result?.address?.floorNumber}</span>
                    {" - "}
                    <span>پلاک: {data?.result?.address?.plaque}</span>
                    {" - "}
                  </div>
                </div>
              </div>
              <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-3 gap-y-2 pt-4 pb-2">
                <div className="flex items-center justify-between lg:justify-start gap-1">
                  <div className="text-body-1 text-neutral-500 ml-1">
                    جمع محصولات
                  </div>
                  <div className="text-body1-strong text-primary">
                    {Number(data.result.totalProductPrice).toLocaleString()}
                  </div>
                </div>
                <div className="flex hidden lg:flex">
                  <span className="w-1 h-1 bg-gray-300 rounded-full inline"></span>
                </div>
                <div className="flex items-center justify-between lg:justify-start gap-1">
                  <div className="text-body-1 text-neutral-500 ml-1">
                    جمع تخفیف
                  </div>
                  <div className="text-body1-strong text-primary">
                    {data.result.totalDiscountFee == 0
                      ? "بدون تخفیف"
                      : Number(data.result.totalDiscountFee).toLocaleString()}
                  </div>
                </div>
                <div className="flex hidden lg:flex">
                  <span className="w-1 h-1 bg-gray-300 rounded-full inline"></span>
                </div>
                <div className="flex items-center justify-between lg:justify-start gap-1">
                  <div className="text-body-1 text-neutral-500 ml-1">
                    هزینه ارسال
                  </div>
                  <div className="text-body1-strong text-primary">
                    {Number(data.result.totalShipmentPrice).toLocaleString()}
                  </div>
                </div>
                <div className="flex hidden lg:flex">
                  <span className="w-1 h-1 bg-gray-300 rounded-full inline"></span>
                </div>
                <div className="flex items-center justify-between lg:justify-start gap-1">
                  <div className="text-body-1 text-neutral-500 ml-1">
                    جمع کل
                  </div>
                  <div className="text-body1-strong text-primary">
                    {Number(data.result.totalPrice).toLocaleString()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="shadow-lg rounded-2xl">
        <div className=" bg-neutral-000 px-5 py-4 lg:px-6">
          {data?.result?.details.map((value) => (
            <div
              className="flex justify-between items-center mb-6 border-b border-b-gray-200 pb-6"
              key={value.id}
            >
              <div className="flex gap-4">
                {value.product.attachments[0] ? (
                  <Image
                    width={80}
                    height={80}
                    alt="asd"
                    className="rounded-2xl"
                    src={`${
                      process.env.NEXT_PUBLIC_BASE_URL
                    }/v1/api/ecommerce/productphotos/image/${
                      value.product.attachments[0]?.fileName || ""
                    }`}
                  />
                ) : (
                  <Image
                    width={80}
                    height={80}
                    alt="asd"
                    className="rounded-2xl"
                    src={`/images/no-photo.png`}
                  />
                )}

                <div className="">
                  <h4 className="font-medium text-primary">
                    {value.product.title}
                  </h4>
                  {value?.product?.inventories[0]?.color && (
                    <span className="flex items-center">
                      <span className="ml-2 font-bold text-gray-800">
                        رنگ:{" "}
                      </span>

                      <span
                        className="w-4 h-4 rounded-md inline-block ml-2"
                        style={{
                          background:
                            value?.product?.inventories[0]?.color.hexCode,
                        }}
                      ></span>
                      {value?.product?.inventories[0]?.color.name}
                    </span>
                  )}

                  {value?.product?.inventories[0]?.guarantee && (
                    <span className="flex items-center">
                      <span className="ml-2 font-bold text-gray-800">
                        گارانتی:{" "}
                      </span>
                      <span className="ml-2">
                        {value?.product?.inventories[0]?.guarantee.name}
                      </span>
                    </span>
                  )}
                  <span className="flex items-center">
                    <span className="ml-2 font-bold text-gray-800">
                      تعداد:{" "}
                    </span>
                    <span className="ml-2">{value?.qty}</span>
                  </span>
                </div>
              </div>
              <div className="flex">
                {Number(value?.productPrice).toLocaleString()} تومانءء
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
