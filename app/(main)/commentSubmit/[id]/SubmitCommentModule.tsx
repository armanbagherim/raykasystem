"use client";
import React, { useState } from "react";
import MainCard from "@/app/components/design/Cards/ProductCard/MainCard";
import { Leftarrow } from "@/app/components/design/Icons";
import { useEffect } from "react";
import { Slider } from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
export default function SubmitCommentModule({
  possibleFactors,
  product,
  session,
  cookies,
}) {
  const [entityTypeFactors, setEntityTypeFactors] = useState([]);
  const [description, setDescription] = useState(null);
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  console.log(product);
  useEffect(() => {
    const defaultValues = possibleFactors.map((factor) => ({
      id: factor.id,
      score: 5,
    }));
    setEntityTypeFactors(defaultValues);
  }, [possibleFactors]);

  const handleSliderChange = (index, event, newValue) => {
    const newEntityTypes = [...entityTypeFactors];
    newEntityTypes[index].score = newValue;
    setEntityTypeFactors(newEntityTypes);
  };

  const submit = async () => {
    setShowModal(true);
    setIsLoading(true);
    try {
      await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/v1/api/ecommerce/productComments`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${session?.token}`,
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            productId: +product.result.id,
            description,
            entityTypeFactors,
          }),
        }
      )
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setIsLoading(false);
        });
    } catch (error) {}
  };

  return (
    <>
      {showModal && (
        <div className="flex bg-black/30 fixed top-0 left-0 bottom-0 right-0 items-center justify-center">
          <div className="bg-white p-12 rounded-2xl">
            {isLoading ? (
              <div class="text-left rtl:text-right">
                <div role="status">
                  <svg
                    aria-hidden="true"
                    class="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-primary"
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
                  <span class="sr-only">Loading...</span>
                </div>
              </div>
            ) : (
              <div className="">
                <h4 className="peyda text-center text-lg">
                  نظر شما ثبت شد و پس از تایید مدیر نمایش داده می شود
                </h4>
                <Link
                  className="bg-primary mt-4 p-3 rounded-xl mb-0 w-full block text-center text-white"
                  href={`/product/${product.result.sku}/${product.result.slug}`}
                >
                  فهمیدم
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
      <div className="container justify-center mx-auto mt-20 mb-64 ">
        <div className="grid grid-cols-3 px-4 md:px-0">
          <div className="flex gap-3 col-span-2">
            <div>
              <Image
                src={`${process.env.NEXT_PUBLIC_BASE_URL}/v1/api/ecommerce/productphotos/image/${product?.result?.attachments[0]?.fileName}`}
                width={80}
                height={80}
              />
            </div>
            <div className="items-center my-auto text-slate-500 text-lg">
              <span>ثبت نظر و امتیاز برای محصول</span>{" "}
              <span>{product.result.title}</span>
            </div>
          </div>
          <Link
            href={`/product/${product.result.sku}/${product.result.slug}`}
            className="flex col-span-1 justify-end"
          >
            <span className="items-center my-auto text-slate-500 text-sm">
              انصراف
            </span>
            <span className="items-center my-auto">
              <Leftarrow />
            </span>
          </Link>
        </div>

        <div
          className={`flex md:grid flex-col px-4 md:px-0 ${
            possibleFactors.length > 0
              ? "grid-cols-1 md:grid-cols-7"
              : "md:grid-cols-1"
          }  mt-7 gap-8`}
        >
          {possibleFactors.length > 0 && (
            <div className="col-span-1 md:col-span-2 border rounded-3xl p-6">
              {possibleFactors.map((factor) => (
                <div key={factor.id} className="grid grid-cols-1 mb-9">
                  <div className="col-span-1 text-sm font-bold">
                    {factor.name}
                  </div>
                  <div className="col-span-1" dir="ltr">
                    <Slider
                      color="success"
                      defaultValue={5}
                      valueLabelDisplay="auto"
                      step={1}
                      marks
                      min={1}
                      max={5}
                      onChange={(event, newValue, index) =>
                        handleSliderChange(index, event, newValue)
                      }
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
          <div className="col-span-5">
            <div className="grid grid-cols-2">
              <div className="col-span-1 text-sm mb-4">
                {session?.result?.firstname} {session?.result?.lastname}
              </div>

              <div className="col-span-2 mb-5">
                <textarea
                  className="bg-customGray w-full text-xs p-4 rounded rounded-3xl outline-none"
                  placeholder="دیدگاه خود را بنویسید"
                  rows="12"
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>
              <div className="col-span-2 justify-end flex">
                <button
                  onClick={submit}
                  className="border border-primary text-primary w-40 rounded rounded-2xl pt-3 pb-3 pr-7 pl-7"
                >
                  ثبت نظر
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
