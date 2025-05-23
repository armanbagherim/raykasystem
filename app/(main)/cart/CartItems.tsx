"use client";
import { Minus, PlusBig, Trash } from "@/app/components/design/Icons";
import { setQty } from "@/store/features/cartSlice";
import { useAppDispatch } from "@/store/store";
import { count } from "console";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "react-toastify";

export default function CartItems({
  item,
  cook,
  localCart,
  setLocalCart,
  priceCalculate,
  session,
}) {
  const dispatch = useAppDispatch();

  const [itemCount, setItemCount] = useState(item.qty);
  const addToCart = async (inventoryId) => {
    const id = toast.loading("در حال افزودن");

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/v1/api/ecommerce/user/stocks`,
        {
          method: "PUT",
          headers: {
            "x-session-id": cook,
            Authorization: `Bearer ${session?.token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            inventoryId: +inventoryId,
            qty: itemCount + 1,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json(); // Parse error message
        toast.update(id, {
          render: errorData?.message || "این محصول موجودی ندارد",
          type: "error",
          isLoading: false,
          autoClose: 3000,
          closeButton: true,
        });
        return;
      }

      const countResponse = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/v1/api/ecommerce/user/stocks/count`,
        {
          method: "GET",
          headers: {
            "x-session-id": cook,
          },
        }
      );

      const countData = await countResponse.json();
      dispatch(
        setQty({
          qty: countData.result,
        })
      );

      toast.update(id, {
        render: "اضافه شد",
        type: "success",
        isLoading: false,
        autoClose: 3000,
        closeButton: true,
      });

      setItemCount(itemCount + 1);
      priceCalculate();
    } catch (error) {
      toast.update(id, {
        render: `خطا: ${error.message}`,
        type: "error",
        isLoading: false,
        autoClose: 3000,
        closeButton: true,
      });
    }
  };

  const decreaseCart = async (inventoryId) => {
    const id = toast.loading("در حال کاهش موجودی");

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/v1/api/ecommerce/user/stocks`,
        {
          method: "PUT",
          headers: {
            "x-session-id": cook,
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.token}`,
          },
          body: JSON.stringify({
            inventoryId: +inventoryId,
            qty: itemCount - 1,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json(); // Get error response
        toast.update(id, {
          render: errorData?.message || "این محصول موجودی ندارد",
          type: "error",
          isLoading: false,
          autoClose: 3000,
          closeButton: true,
        });
        return;
      }

      const countResponse = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/v1/api/ecommerce/user/stocks/count`,
        {
          method: "GET",
          headers: {
            "x-session-id": cook,
          },
        }
      );

      const countData = await countResponse.json();
      dispatch(
        setQty({
          qty: countData.result,
        })
      );

      toast.update(id, {
        render: "1 موجودی کم شد",
        type: "success",
        isLoading: false,
        autoClose: 3000,
        closeButton: true,
      });

      setItemCount(itemCount - 1);
      priceCalculate();
    } catch (error) {
      toast.update(id, {
        render: `خطا: ${error.message}`,
        type: "error",
        isLoading: false,
        autoClose: 3000,
        closeButton: true,
      });
    }
  };

  const deleteItem = async (inventoryId) => {
    const id = toast.loading("در حال حذف");

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/v1/api/ecommerce/user/stocks/${inventoryId}`,
        {
          method: "DELETE",
          headers: {
            "x-session-id": cook,
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.token}`,
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json(); // Get actual error response
        toast.update(id, {
          render: errorData?.message || "خطا در حذف محصول",
          type: "error",
          isLoading: false,
          autoClose: 3000,
          closeButton: true,
        });
        return;
      }

      // Fetch updated cart count
      const countResponse = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/v1/api/ecommerce/user/stocks/count`,
        {
          method: "GET",
          headers: {
            "x-session-id": cook,
          },
        }
      );

      const countData = await countResponse.json();
      dispatch(
        setQty({
          qty: countData.result,
        })
      );

      // Remove item from local cart state
      const newData = localCart.result.filter(
        (item) => +item.id !== +inventoryId
      );
      setLocalCart((prevState) => ({
        ...prevState,
        result: newData,
      }));

      toast.update(id, {
        render: "محصول با موفقیت از سبد حذف شد",
        type: "success",
        isLoading: false,
        autoClose: 3000,
        closeButton: true,
      });

      priceCalculate();
    } catch (error) {
      toast.update(id, {
        render: `خطا: ${error.message}`,
        type: "error",
        isLoading: false,
        autoClose: 3000,
        closeButton: true,
      });
    }
  };

  return (
    <>
      {item.product.inventoryStatusId === 2 ? (
        <div className="flex">
          <div
            colSpan={6}
            className="px-6 py-4 text-sm text-red-800 bg-red-50 rounded-xl"
          >
            <span className="font-medium">
              محصول {item.product.title} به دلیل اتمام موجودی از سبد شما حذف می
              گردد
            </span>
          </div>
        </div>
      ) : (
        <div className="flex items-start flex-col justify-start border rounded-2xl px-3 relative mb-4 bg-white py-2">
          <div className="flex items-center md:w-full md:flex-1">
            <div className="text-right px-2 py-2 ">
              <div>
                <Link
                  className="flex items-center gap-4"
                  href={`/product/${item?.product?.sku}/${item?.product?.slug}`}
                >
                  {item?.product?.attachments[0]?.fileName ? (
                    <Image
                      width={115}
                      height={115}
                      className="w-16 h-16 rounded-xl"
                      src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/products/${item?.product?.attachments[0]?.fileName}`}
                      alt=""
                    />
                  ) : (
                    <Image
                      width={115}
                      height={115}
                      className="w-16 h-16 rounded-xl"
                      src="/images/no-photo.png"
                      alt=""
                    />
                  )}

                  <div className="ml-4">
                    <div className="text-md font-normal text-gray-700">
                      {item.product.title}
                    </div>
                    {item.product.colorBased && (
                      <div className="text-sm text-gray-500">
                        {item?.product?.inventories[0]?.color?.name}
                      </div>
                    )}
                  </div>
                </Link>
              </div>
            </div>

            <div className="text-right px-2 py-2  absolute left-0 bottom-0">
              <div className="flex items-center">
                <button
                  onClick={(e) => addToCart(item.inventoryId)}
                  className="px-2 py-1 text-sm font-medium text-white"
                >
                  <PlusBig />
                </button>
                <span className="">{itemCount}</span>
                {itemCount > 1 && (
                  <button
                    onClick={(e) => decreaseCart(item.inventoryId)}
                    className="px-2 py-1 text-sm font-medium "
                  >
                    <Minus />
                  </button>
                )}
                {itemCount === 1 && (
                  <button
                    onClick={(e) => deleteItem(item.id)}
                    className="px-2 py-1 text-sm font-medium "
                  >
                    <Trash />
                  </button>
                )}
              </div>
            </div>
          </div>
          {/* <div className="text-right px-2 py-2 ">
              <span className="text-md text-gray-700">
                {Number(
                  item?.product?.inventories[0]?.firstPrice?.appliedDiscount
                    .newPrice || 0
                ).toLocaleString()}{" "}
                ءتء
              </span>
            </div> */}

          <div className="text-right px-2 py-2  flex gap-2 items-center">
            <span className="text-primary text-md font-bold">قیمت محصول</span>
            <span className="text-md text-gray-700">
              {item?.product?.inventories[0]?.firstPrice?.appliedDiscount ? (
                <>
                  <div className="text-md text-gray-700 line-through">
                    {Number(
                      item?.product?.inventories[0]?.firstPrice?.price || 0
                    ).toLocaleString()}{" "}
                    ءتء
                  </div>
                  <div className="text-md text-gray-700">
                    {Number(
                      item?.product?.inventories[0]?.firstPrice?.appliedDiscount
                        ?.newPrice || 0
                    ).toLocaleString()}{" "}
                    ءتء
                  </div>
                </>
              ) : (
                <span className="text-md text-gray-700">
                  {Number(
                    item?.product?.inventories[0]?.firstPrice?.price || 0
                  ).toLocaleString()}{" "}
                  ءتء
                </span>
              )}
            </span>
          </div>
          <div className="text-right px-2 py-2  flex gap-2 items-center">
            <span className="text-primary text-md font-bold">فروشنده</span>
            <Link className="text-blue-600" href="#">
              {item?.product?.inventories[0]?.vendor?.name || ""}
            </Link>
          </div>
          <div className="text-right px-2 py-2  flex gap-2 items-center">
            <span className="text-primary text-md font-bold">جمع کل</span>
            <span className="text-md text-gray-700">
              {item?.product?.inventories[0]?.firstPrice?.appliedDiscount
                ? Number(
                    item?.product?.inventories[0]?.firstPrice?.appliedDiscount
                      .newPrice * itemCount
                  ).toLocaleString()
                : Number(
                    (item?.product?.inventories[0]?.firstPrice?.price || 0) *
                      itemCount
                  ).toLocaleString()}{" "}
              ءتء
            </span>
          </div>
        </div>
      )}
    </>
  );
}
