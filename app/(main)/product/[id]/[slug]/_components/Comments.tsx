"use client";

import {
  EmptyComment,
  Exclamationreport,
  Goldstart,
  Like,
  Tickstarwhite,
  Unlike,
} from "@/app/components/design/Icons";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import ReactPaginate from "react-paginate";
import CommentsSkeleton from "./CommentsSkeleton";

export default function Comments({ comments, product, total, session }) {
  const [localComments, setLocalComments] = useState(comments);
  const [page, setPage] = useState(1);
  const limit = 4;
  const [isLoading, setIsLoading] = useState(false);
  const mounted = useRef(true);

  const getComments = async () => {
    setIsLoading(true);
    const offset = (page - 1) * limit;

    try {
      await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/v1/api/ecommerce/productComments/product/${product?.id}?sortOrder=DESC&offset=${offset}&limit=${limit}`,
        {
          method: "GET",
          cache: "no-store",
        }
      )
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setLocalComments(data.result);
          setIsLoading(false);
          document.getElementById("commentSection").scrollIntoView();
        });
    } catch (error) {}
  };

  useEffect(() => {
    if (!mounted.current) {
      getComments();
    }
    mounted.current = false;
  }, [page]);

  const handlePageClick = (selected) => {
    setPage(selected);
  };
  return (
    <div>
      <div id="commentSection" className=" mt-4 gap-10 rounded-3xl bg-white">
        <div className="p-8">
          <div className="w-full">امتیاز و دیدگاه کاربران</div>
          <div className="mt-8 grid grid-cols-12">
            <div className="border-0 rounded-xl p-3 w-full col-span-12 lg:col-span-3">
              <div className="flex gap-6 flex-wrap sticky top-6">
                <div className="p-6 flex-1 bg-gray-100 rounded-xl">
                  <div className="flex gap-1 justify-center">
                    <div className="items-center my-auto">
                      <Goldstart />
                    </div>
                    <div className="text-slate-600 items-center my-auto font-bold">
                      {Number(product?.score ?? 0).toFixed(1)}
                    </div>
                  </div>
                  <div className="text-xs text-center text-slate-400 mt-1 ml-0">
                    از {product?.cntComment ?? 0} نظر
                  </div>
                </div>
                <div className="w-full">
                  <div className="text-sm text-slate-400 text-center mb-4">
                    شما هم در مورد این کالا دیدگاه ثبت کنید
                  </div>
                  <div className="flex mt-2 justify-center mx-auto">
                    <a
                      href={
                        session !== null
                          ? `/commentSubmit/${product.id}`
                          : `/login?redirect_back_url=/commentSubmit/${product.id}`
                      }
                      className="border border-green-700 text-green-700 p-4 text-sm rounded-2xl items-center my-auto w-full"
                    >
                      <div className="items-center my-auto justify-start ml-0 mx-auto text-center">
                        <div>ثبت دیدگاه جدید</div>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-12 lg:col-span-9">
              {isLoading ? (
                <CommentsSkeleton count={3} />
              ) : localComments.length == 0 ? (
                <div className="flex flex-col mt-10 md:mt-0 text-center items-center">
                  <EmptyComment />
                  <h4 className="peyda mb-2 text-lg font-bold text-primary">
                    نظری جهت نمایش وجود ندارد
                  </h4>
                  <p className="mb-4 text-gray-600 text-md">
                    اولین نفری باشید که درباره این محصول نظر میدهید
                  </p>
                  <a
                    href={
                      session !== null
                        ? `/commentSubmit/${product.id}`
                        : `/login?redirect_back_url=/commentSubmit/${product.id}`
                    }
                    className="border border-green-700 text-green-700 p-4 px-10 text-sm rounded-2xl items-center my-auto"
                  >
                    <div className="items-center my-auto justify-start ml-0 mx-auto text-center">
                      <div>ثبت دیدگاه جدید</div>
                    </div>
                  </a>
                </div>
              ) : (
                <div className="border-0 w-full rounded-xl mt-5">
                  {localComments?.map((value) => (
                    <>
                      <div
                        key={value.id}
                        className="border w-full rounded-xl m-2 p-6"
                      >
                        <div className="flex gap-4 flex-wrap">
                          <div className="text-md items-center my-auto">
                            {value?.user?.firstname} {value?.user?.lastname}
                          </div>
                          <span className="items-center my-auto">|</span>
                          <div className="text-md items-center my-auto">
                            {new Date(value.updatedAt).toLocaleDateString(
                              "fa-ir"
                            )}
                          </div>
                        </div>
                        <div className="grid grid-cols-1">
                          <div className="mt-6 mb-2 text-md text-slate-500 leading-6 border-b border-b-gray-200 pb-4">
                            {value.description}
                          </div>
                          <div className="w-full sm:w-1/2 md:w-1/3" dir="ltr">
                            {value.commentFactors.map((factor) => (
                              <div key={factor.id}>
                                <p className="my-4 text-right ">
                                  {factor.factor.name}
                                </p>
                                <div className="score w-full flex rounded">
                                  {Array.from(Array(factor.score), (_, i) => {
                                    let colorClass;
                                    if (i < 2) {
                                      colorClass = "bg-primary";
                                    } else if (i === 2) {
                                      colorClass = "bg-primary";
                                    } else {
                                      colorClass = "bg-primary";
                                    }
                                    return (
                                      <div
                                        key={i}
                                        className={`${colorClass} rounded-full h-[10px] w-[20%] mr-2 inline-block`}
                                      ></div>
                                    );
                                  })}
                                  {Array.from(
                                    Array(5 - factor.score),
                                    (_, i) => (
                                      <div
                                        key={i}
                                        className="bg-gray-100 rounded-full h-[10px] w-[20%] mr-2 inline-block"
                                      ></div>
                                    )
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                      {value.replies.map((reply) => (
                        <div key={reply.id} className="pr-10">
                          <div className="border w-full rounded-xl m-2 p-6 bg-gray-100">
                            <div className="flex gap-4 flex-wrap">
                              <div className="text-md items-center my-auto font-bold text-primary">
                                مدیر سایت
                              </div>
                              <span className="items-center my-auto">|</span>
                              <div className="text-md items-center my-auto">
                                {new Date(reply.updatedAt).toLocaleDateString(
                                  "fa-ir"
                                )}
                              </div>
                            </div>
                            <div className="mt-6 mb-6 text-md text-slate-500 leading-6">
                              {reply.description}
                            </div>
                          </div>
                        </div>
                      ))}
                    </>
                  ))}
                </div>
              )}
              <div className="flex mt-3 justify-center mx-auto gap-2" dir="ltr">
                <ReactPaginate
                  breakLabel="..."
                  className="flex items-center justify-start direction-ltr mt-8 whitespace-nowrap overflow-x-auto"
                  nextLabel="بعدی"
                  activeLinkClassName="bg-primary outline-none"
                  pageLinkClassName="bg-[#B8B8B8] outline-none w-[37px] h-[37px] flex items-center justify-center rounded-[15px] mx-2 text-white"
                  onPageChange={(e) => handlePageClick(e.selected + 1)}
                  pageRangeDisplayed={2}
                  pageCount={Math.ceil(total / limit)}
                  previousLabel="قبلی"
                  renderOnZeroPageCount={null}
                  disabledClassName="hidden" // Add this prop
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
