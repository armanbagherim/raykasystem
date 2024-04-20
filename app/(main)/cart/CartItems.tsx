"use client";
import { Minus, PlusBig, Trash } from "@/app/components/design/Icons";
import { setQty } from "@/store/features/cartSlice";
import { useAppDispatch } from "@/store/store";
import { count } from "console";
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
  const addToCart = (inventoryId) => {
    const id = toast.loading("در حال افزودن");
    //do something else
    try {
      fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/v1/api/ecommerce/user/stocks`,
        {
          method: "PUT",
          headers: {
            "x-session-id": cook,
            Authorization: `  Bearer ${session?.token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            inventoryId: +inventoryId,
            qty: itemCount + 1,
          }),
        }
      ).then((res) => {
        if (!res.ok) {
          toast.update(id, {
            render: "این محصول موجودی ندارد",
            type: "error",
            isLoading: false,
            autoClose: 3000,
            closeButton: true,
          });
          //   throw Error(res.errors);
        } else {
          fetch(
            "https://nest-jahizan.chbk.run/v1/api/ecommerce/user/stocks/count",
            {
              method: "GET",
              headers: {
                "x-session-id": cook,
              },
            }
          )
            .then((res) => res.json())
            .then((data) => {
              dispatch(
                setQty({
                  qty: data.result,
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
            });
        }
      });
    } catch (error) {
      throw Error(error);
    }
  };
  const decreaseCart = (inventoryId) => {
    const id = toast.loading("در حال افزودن");
    //do something else
    try {
      fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/v1/api/ecommerce/user/stocks`,
        {
          method: "PUT",
          headers: {
            "x-session-id": cook,
            "Content-Type": "application/json",
            Authorization: `  Bearer ${session?.token}`,
          },
          body: JSON.stringify({
            inventoryId: +inventoryId,
            qty: itemCount - 1,
          }),
        }
      ).then((res) => {
        if (!res.ok) {
          toast.update(id, {
            render: "این محصول موجودی ندارد",
            type: "error",
            isLoading: false,
            autoClose: 3000,
            closeButton: true,
          });
          //   throw Error(res.errors);
        } else {
          fetch(
            "https://nest-jahizan.chbk.run/v1/api/ecommerce/user/stocks/count",
            {
              method: "GET",
              headers: {
                "x-session-id": cook,
              },
            }
          )
            .then((res) => res.json())
            .then((data) => {
              dispatch(
                setQty({
                  qty: data.result,
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
            });
        }
      });
    } catch (error) {
      throw Error(error);
    }
  };
  const deleteItem = (inventoryId) => {
    const id = toast.loading("در حال حذف");
    //do something else
    try {
      fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/v1/api/ecommerce/user/stocks/${inventoryId}`,
        {
          method: "DELETE",
          Authorization: `  Bearer ${session?.token}`,
          headers: {
            "x-session-id": cook,
            "Content-Type": "application/json",
          },
        }
      ).then((res) => {
        if (!res.ok) {
          console.log(res.json);
          toast.update(id, {
            render: "این محصول موجودی ندارد",
            type: "error",
            isLoading: false,
            autoClose: 3000,
            closeButton: true,
          });
          //   throw Error(res.errors);
        } else {
          fetch(
            "https://nest-jahizan.chbk.run/v1/api/ecommerce/user/stocks/count",
            {
              method: "GET",
              headers: {
                "x-session-id": cook,
              },
            }
          )
            .then((res) => res.json())
            .then((data) => {
              dispatch(
                setQty({
                  qty: data.result,
                })
              );
              toast.update(id, {
                render: "محصول با موفقیت از سبد حذف شد",
                type: "success",
                isLoading: false,
                autoClose: 3000,
                closeButton: true,
              });
              const newData = localCart.result.filter(
                (item) => item.inventoryId !== inventoryId
              );
              setLocalCart((prevState) => ({
                ...prevState,
                result: newData,
              }));
              priceCalculate();
            });
        }
      });
    } catch (error) {
      throw Error(error);
    }
  };
  return (
    <div
      key={item.productId}
      className="grid grid-cols-5 shadow-md bg-white text-xs rounded-3xl mt-2 p-4 items-center"
    >
      {/* {console.log()} */}
      <div className="flex">
        <div>
          <img src="/images/product-2.png" />
        </div>
        <div className="p-1 gap-1">
          <span></span>
          <span>{item.product.title}</span>
          <span>&nbsp;</span>
          {item.product.colorBased ? (
            <Link className="text-primary" href="#">
              {item.product.inventories[0].color.name}
            </Link>
          ) : (
            ""
          )}
        </div>
      </div>

      <div className="p-1 flex gap-1">
        <div>
          <button onClick={(e) => addToCart(item.inventoryId)}>
            <PlusBig />
          </button>
        </div>
        <div className="font-bold items-center my-auto">{itemCount}</div>
        <div>
          {itemCount > 1 ? (
            <button onClick={(e) => decreaseCart(item.inventoryId)}>
              <Minus />
            </button>
          ) : (
            <button onClick={(e) => deleteItem(item.id)}>
              <Trash />
            </button>
          )}
        </div>
      </div>
      <div className="p-1">
        <p suppressHydrationWarning className="text-sm">
          {Number(
            item.product.inventories[0].firstPrice.price
          ).toLocaleString()}{" "}
          تومان
        </p>
      </div>
      <div className="p-1">
        <Link className="text-primary" href="#">
          {item.product.inventories[0].vendor.name}
        </Link>
      </div>
      <div suppressHydrationWarning className="p-1 text-sm">
        {Number(
          item.product.inventories[0].firstPrice.price * itemCount
        ).toLocaleString()}{" "}
        تومان
      </div>
    </div>
  );
}
