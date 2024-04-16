"use client";
import React, { useEffect, useState } from "react";
import {
  Cart,
  Backtitle,
  Zoomin,
  Heartadd,
  Play,
  Goldstart,
  Category2,
  Smallcat,
  Toogle,
  Infocircle,
  Tickcircle,
  Tickstarwhite,
  Exclamationreport,
  Like,
  Unlike,
} from "@/app/components/design/Icons";

import ProductCard from "@/app/components/design/Cards/ProductCard/ProductCard";
import Slider from "@/app/components/design/Slider";

import Variants from "./variants";
import Inventories from "./inventories";
import LeftSide from "./LeftSide";
import Breadcrumb from "@/app/components/design/Breadcrumb";
import Link from "next/link";
import Image from "next/image";
import { toast } from "react-toastify";
import {
  decrement,
  increment,
  productQtyInCartSelector,
  setQty,
} from "@/store/features/cartSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";

export default function SingleProductModule({ product, related, cook }) {
  console.log(product.inventories[0]);
  const [localInventories, setLocalInventories] = useState(product.inventories);
  // const qty = useAppSelector((state) =>
  //   productQtyInCartSelector(state, inventory.id)
  // );
  const dispatch = useAppDispatch();

  const handleVariantChange = (colorId: number) => {
    const filtered = product.inventories.filter(
      (inventory) => inventory.colorId === colorId
    );

    setLocalInventories([...filtered]); // Ensure immutability
  };

  useEffect(() => {}, [localInventories]);

  useEffect(() => {
    setLocalInventories([product.inventories[0] || ""]); // Ensure immutability
  }, [product.inventories]);

  const addToCart = (inventoryId) => {
    console.log(inventoryId);
    const id = toast.loading("در حال افزودن");
    //do something else
    try {
      fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/v1/api/ecommerce/user/stocks`,
        {
          method: "POST",
          headers: {
            "x-session-id": cook.value,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            inventoryId: +inventoryId,
            qty: 1,
          }),
        }
      ).then((res) => {
        fetch(
          "https://nest-jahizan.chbk.run/v1/api/ecommerce/user/stocks/count",
          {
            method: "GET",
            headers: {
              "x-session-id": cook.value,
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
          });
      });
    } catch (error) {
      throw Error("bye");
    }
  };
  return (
    <>
      <Breadcrumb product={product} />
      <div className="container justify-center mx-auto mt-3 grid grid-cols-12 gap-8 p-8 lg:p-0">
        <div className="col-span-12 lg:col-span-4 border-0 rounded-lg relative">
          <div className="w-10 h-32 absolute opacity-0 lg:opacity-100 r-0 t-0 mt-4 mr-3 rounded-3xl bg-customGray z-20">
            <div className="pt-3.5 mr-3">
              <Link href="#">
                <Zoomin />
              </Link>
            </div>
            <div className="pt-5 mr-3">
              <Link href="#">
                <Heartadd />
              </Link>
            </div>
            <div className="pt-5 mr-3">
              <Link href="#">
                <Play />
              </Link>
            </div>
          </div>
          <div className="p-3  pt-0 mr-0 pb-6">
            <Slider slidesPerView={1}>
              {product?.attachments.map((value, key) => (
                <Image
                  key={key}
                  className="w-full"
                  height={"500"}
                  src={`${process.env.NEXT_PUBLIC_BASE_URL}/v1/api/ecommerce/productphotos/image/${value.fileName}`}
                  width="500"
                />
              ))}
            </Slider>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-5 rounded-lg">
          <div className="text-right font-normal text-2xl text-slate-500">
            {product.title}
          </div>
          <div className="text-right font-normal text-sm mt-2 text-slate-400">
            {product.slug.replace(/-/g, " ")}
          </div>

          <div>
            <div className="flex gap-4 justify-center mx-auto">
              <div className="mt-5 w-60 h-10 bg-customGray rounded-2xl">
                <div className="pt-2.5 mr-3 flex gap-2 text-slate-500">
                  <div className="pt-0.5">
                    <Goldstart />
                  </div>
                  <div>4.75 از 4240 نظر</div>
                </div>
              </div>
              <div className="mt-5 w-2/3 h-10 bg-customGray rounded-2xl">
                <div className="pt-2.5 mr-3 flex gap-2 text-slate-500">
                  <div className="pt-1">
                    <Category2 />
                  </div>
                  <div className="flex gap-1">
                    <div className="font-bold">برند: </div>
                    <div>{product.brand.name}</div>
                  </div>
                  <div className="justify-start mx-auto ml-2">
                    <div className="pt-0.5 justify-center flex mx-auto w-12 bg-slate-50 rounded-xl">
                      <Smallcat />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-5 w-auto h-10 bg-customGray rounded-2xl">
              <div className="pt-2.5 mr-3 flex gap-2 text-slate-500">
                <div className="pt-0.5">
                  <Category2 />
                </div>
                <div className="flex gap-1">
                  <div className="font-bold">دسته: </div>
                  <div>
                    <Link href={`/category/${product.entityType.slug}`}>
                      {product.entityType.name}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Variants
            handleVariantChange={handleVariantChange}
            product={product}
          />

          {/* <div className="mt-10 justify-center mx-auto p-5 flex gap-72">
            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
            استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در
            ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و
            کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد. کتابهای زیادی
            در شصت و سه درصد گذشته، حال و آینده شناخت فراوان جامعه و متخصصان را
            می طلبد تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی
            الخصوص طراحان خلاقی و فرهنگ پیشرو در زبان فارسی ایجاد کرد. در این
            صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها و
            شرایط سخت تایپ به پایان رسد وزمان مورد نیاز شامل حروفچینی دستاوردهای
            اصلی و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد
            استفاده قرار گیرد.
          </div>
          <div className="flex justify-center mx-auto gap-4">
            <div>مشاهده بیشتر</div>
            <div className="flex my-auto">
              <Toogle />
            </div>
          </div> */}
        </div>
        <LeftSide
          product={localInventories}
          status={product.inventoryStatus.id}
          addToCart={addToCart}
        />
      </div>

      <Inventories addToCart={addToCart} product={localInventories} />

      <div className="container mx-auto mt-5 gap-10 border-[#F4F4F4] shadow-[0_3px_8px+1px_#F8F8F8] rounded-3xl p-5 flex">
        <div className="mr-3 text-green-700">نقد و بررسی محصول</div>
        <div>مشخصات محصول</div>
        <div>نظرات</div>
      </div>

      <div className="container mx-auto mt-5 border-[#F4F4F4] shadow-[0_3px_8px+1px_#F8F8F8] rounded-3xl p-8 w-auto">
        <div className="flex gap-7">
          <div dangerouslySetInnerHTML={{ __html: product.description }}></div>
        </div>
      </div>

      <div className="container mx-auto mt-8 gap-10 border-[#F4F4F4] shadow-[0_3px_8px+1px_#F8F8F8] rounded-3xl p-8">
        <div>مشخصات کامل محصول</div>
        <div className="mt-8 text-sm">
          {product.productAttributeValues.map((value, key) => {
            return (
              <div className="flex gap-48 pt-3 pb-3 border-b" key={key}>
                <div className="text-green-500 w-28">
                  {value.attribute.name}
                </div>
                <div className="mr-10 text-slate-600">{value.val}</div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="container mx-auto mt-8 gap-10 border-[#F4F4F4] shadow-[0_3px_8px+1px_#F8F8F8] rounded-3xl p-8">
        <div className="w-full">امتیاز و دیدگاه کاربران</div>
        <div className="mt-8 grid grid-cols-12">
          <div className="border-0 rounded-xl p-3 w-full col-span-12 lg:col-span-3">
            <div className="flex gap-6">
              <div className="p-4  bg-slate-100 rounded-xl">
                <div className="flex gap-1">
                  <div className="items-center my-auto">
                    <Goldstart />
                  </div>
                  <div className="text-slate-600 items-center my-auto font-bold">
                    4.75
                  </div>
                </div>
                <div className="text-xs text-slate-400 mt-1 ml-0">
                  از 4240 نظر
                </div>
              </div>
              <div>
                <div className="text-sm text-slate-400">
                  شما هم در مورد این کالا دیدگاه ثبت کنید
                </div>
                <div className="flex mt-2 justify-center mx-auto">
                  <button className="border-2 border-green-700 text-green-700 p-3 text-sm rounded-2xl items-center my-auto w-full">
                    <div className="items-center my-auto justify-start ml-0 mx-auto">
                      <div>ثبت دیدگاه جدید</div>
                    </div>
                  </button>
                </div>
              </div>
            </div>
            <div className="mt-10">
              <div className="mt-6">
                <div className="flex">
                  <div className="text-sm font-bold">قیمت و ارزش خرید</div>
                  <div className="text-sm text-slate-600 justify-start mx-auto ml-0">
                    840 دیدگاه
                  </div>
                </div>
                <div className="relative w-full h-3 bg-customGray rounded-xl mt-3">
                  <div
                    className="h-3 bg-red-500 rounded-xl mx-auto ml-0"
                    style={{ width: "80%" }}
                  >
                    <div
                      className="h-3 bg-green-500 rounded-xl mx-auto ml-0"
                      style={{ width: "40%" }}
                    />
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <div className="flex">
                  <div className="text-sm font-bold">ترکیبات رنگی</div>
                  <div className="text-sm text-slate-600 justify-start mx-auto ml-0">
                    840 دیدگاه
                  </div>
                </div>
                <div className="relative w-full h-3 bg-customGray rounded-xl mt-3">
                  <div
                    className="h-3 bg-red-500 rounded-xl mx-auto ml-0"
                    style={{ width: "70%" }}
                  >
                    <div
                      className="h-3 bg-green-500 rounded-xl mx-auto ml-0"
                      style={{ width: "40%" }}
                    />
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <div className="flex">
                  <div className="text-sm font-bold">حجم و کیفیت</div>
                  <div className="text-sm text-slate-600 justify-start mx-auto ml-0">
                    840 دیدگاه
                  </div>
                </div>
                <div className="relative w-full h-3 bg-customGray rounded-xl mt-3">
                  <div
                    className="h-3 bg-red-500 rounded-xl mx-auto ml-0"
                    style={{ width: "60%" }}
                  >
                    <div
                      className="h-3 bg-green-500 rounded-xl mx-auto ml-0"
                      style={{ width: "60%" }}
                    />
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <div className="flex">
                  <div className="text-sm font-bold">شباهت یا مغایرت</div>
                  <div className="text-sm text-slate-600 justify-start mx-auto ml-0">
                    840 دیدگاه
                  </div>
                </div>
                <div className="relative w-full h-3 bg-customGray rounded-xl mt-3">
                  <div
                    className="h-3 bg-red-500 rounded-xl mx-auto ml-0"
                    style={{ width: "40%" }}
                  >
                    <div
                      className="h-3 bg-green-500 rounded-xl mx-auto ml-0"
                      style={{ width: "90%" }}
                    />
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <div className="flex">
                  <div className="text-sm font-bold">قیمت و ارزش خرید</div>
                  <div className="text-sm text-slate-600 justify-start mx-auto ml-0">
                    840 دیدگاه
                  </div>
                </div>
                <div className="relative w-full h-3 bg-customGray rounded-xl mt-3">
                  <div
                    className="h-3 bg-red-500 rounded-xl mx-auto ml-0"
                    style={{ width: "80%" }}
                  >
                    <div
                      className="h-3 bg-green-500 rounded-xl mx-auto ml-0"
                      style={{ width: "40%" }}
                    />
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <div className="flex">
                  <div className="text-sm font-bold">قیمت و ارزش خرید</div>
                  <div className="text-sm text-slate-600 justify-start mx-auto ml-0">
                    840 دیدگاه
                  </div>
                </div>
                <div className="relative w-full h-3 bg-customGray rounded-xl mt-3">
                  <div
                    className="h-3 bg-red-500 rounded-xl mx-auto ml-0"
                    style={{ width: "90%" }}
                  >
                    <div
                      className="h-3 bg-green-500 rounded-xl mx-auto ml-0"
                      style={{ width: "90%" }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-12 lg:col-span-9">
            <div className="border-0 w-full rounded-xl mt-5">
              <div className="border w-full rounded-3xl m-2 p-3">
                <div className="flex gap-4">
                  <div className="text-md items-center my-auto">
                    آرمان باقری
                  </div>
                  <span className="items-center my-auto">|</span>
                  <div className="text-md items-center my-auto">
                    22 بهمن 1402{" "}
                  </div>
                  <div className="flex gap-3 bg-primary w-fit p-3 rounded-xl text-slate-100">
                    <div>
                      <Tickstarwhite />
                    </div>
                    <div>خریدار رنگ کرمی قرمز</div>
                  </div>
                  <div className="flex gap-1 items-center my-auto justify-start mx-auto ml-2">
                    <div>
                      <Exclamationreport />
                    </div>
                    <div className="text-xs text-green-500 mt-1">گزارش</div>
                  </div>
                </div>
                <div className="mt-8 mb-10 text-sm text-slate-500">
                  من این ریمیل رو چون قیمتش نسبت به بازار که فیک بود گرونتر
                  گرفتم چون فکر میکردم کیفیت بالاتر و اصل هست حداقل ۱۰۰ الی ۱۵۰
                  تومن گرونتر خریدم و دیگه هیچ وقت خرید ریمل آرایشی نخواهم داشت
                </div>
                <div className="flex gap-3 justify-end mx-auto">
                  <div className="flex gap-1">
                    <div className="text-xs items-center my-auto">42</div>
                    <div className="text-xs items-center my-auto">
                      <Like />
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <div className="text-xs items-center my-auto">12</div>
                    <div className="text-xs items-center my-auto">
                      <Unlike />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-0 w-full rounded-xl mt-5">
              <div className="border w-full rounded-3xl m-2 p-3">
                <div className="flex gap-4">
                  <div className="text-md items-center my-auto">
                    آرمان باقری
                  </div>
                  <span className="items-center my-auto">|</span>
                  <div className="text-md items-center my-auto">
                    22 بهمن 1402{" "}
                  </div>
                  <div className="flex gap-3 bg-primary w-fit p-3 rounded-xl text-slate-100">
                    <div>
                      <Tickstarwhite />
                    </div>
                    <div>خریدار رنگ کرمی قرمز</div>
                  </div>
                  <div className="flex gap-1 items-center my-auto justify-start mx-auto ml-2">
                    <div>
                      <Exclamationreport />
                    </div>
                    <div className="text-xs text-green-500 mt-1">گزارش</div>
                  </div>
                </div>
                <div className="mt-8 mb-10 text-sm text-slate-500">
                  من این ریمیل رو چون قیمتش نسبت به بازار که فیک بود گرونتر
                  گرفتم چون فکر میکردم کیفیت بالاتر و اصل هست حداقل ۱۰۰ الی ۱۵۰
                  تومن گرونتر خریدم و دیگه هیچ وقت خرید ریمل آرایشی نخواهم داشت
                </div>
                <div className="flex gap-3 justify-end mx-auto">
                  <div className="flex gap-1">
                    <div className="text-xs items-center my-auto">42</div>
                    <div className="text-xs items-center my-auto">
                      <Like />
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <div className="text-xs items-center my-auto">12</div>
                    <div className="text-xs items-center my-auto">
                      <Unlike />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-0 w-full rounded-xl mt-5">
              <div className="border w-full rounded-3xl m-2 p-3">
                <div className="flex gap-4">
                  <div className="text-md items-center my-auto">
                    آرمان باقری
                  </div>
                  <span className="items-center my-auto">|</span>
                  <div className="text-md items-center my-auto">
                    22 بهمن 1402{" "}
                  </div>
                  <div className="flex gap-3 bg-primary w-fit p-3 rounded-xl text-slate-100">
                    <div>
                      <Tickstarwhite />
                    </div>
                    <div>خریدار رنگ کرمی قرمز</div>
                  </div>
                  <div className="flex gap-1 items-center my-auto justify-start mx-auto ml-2">
                    <div>
                      <Exclamationreport />
                    </div>
                    <div className="text-xs text-green-500 mt-1">گزارش</div>
                  </div>
                </div>
                <div className="mt-8 mb-10 text-sm text-slate-500">
                  من این ریمیل رو چون قیمتش نسبت به بازار که فیک بود گرونتر
                  گرفتم چون فکر میکردم کیفیت بالاتر و اصل هست حداقل ۱۰۰ الی ۱۵۰
                  تومن گرونتر خریدم و دیگه هیچ وقت خرید ریمل آرایشی نخواهم داشت
                </div>
                <div className="flex gap-3 justify-end mx-auto">
                  <div className="flex gap-1">
                    <div className="text-xs items-center my-auto">42</div>
                    <div className="text-xs items-center my-auto">
                      <Like />
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <div className="text-xs items-center my-auto">12</div>
                    <div className="text-xs items-center my-auto">
                      <Unlike />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex mt-3 justify-start mx-auto gap-2" dir="ltr">
          <div>
            <button className="bg-[#B8B8B8] outline-none w-[37px] h-[37px] flex items-center justify-center rounded-[15px] mx-2 text-white bg-primary outline-none">
              1
            </button>
          </div>
          <div>
            <button className="bg-[#B8B8B8] outline-none w-[37px] h-[37px] flex items-center justify-center rounded-[15px] mx-2 text-white bg-primary outline-none">
              2
            </button>
          </div>
          <div>
            <button className="bg-[#B8B8B8] outline-none w-[37px] h-[37px] flex items-center justify-center rounded-[15px] mx-2 text-white bg-primary outline-none">
              3
            </button>
          </div>
        </div>
      </div>
      <div className="relative container mx-auto mt-8 gap-10 border-[#F4F4F4] shadow-[0_3px_8px+1px_#F8F8F8] rounded-3xl p-8">
        <div className="flex pb-5 relative">
          <div className="absolute">
            <Backtitle />
          </div>
          <div className="font-bold text-2xl items-center p-3 text-primary">
            محصولات مرتبط
          </div>
        </div>

        <Slider>
          {related.map((value, key) => (
            <ProductCard
              key={key}
              data={value}
              type="main"
              className="w-full sm:w-1/2 lg:w-1/3"
            />
          ))}
        </Slider>
      </div>
    </>
  );
}
