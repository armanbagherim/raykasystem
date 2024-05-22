import { useSearchParams } from "next/navigation";
import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import Link from "next/link";
import { notFound } from "next/navigation";
async function getData(session, searchParams) {
  console.log(
    "this",
    `${process.env.NEXT_PUBLIC_BASE_URL}/v1/api/ecommerce/user/transactions/${searchParams}`
  );
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/v1/api/ecommerce/user/transactions/${searchParams}`,
    {
      headers: {
        Authorization: `Bearer ${session.token}`,
        "content-type": "application/json",
      },
    }
  );

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    return notFound();
  }

  return res.json();
}

export default async function page(params) {
  const session = await getServerSession(authOptions);
  const data = await getData(session, params?.searchParams?.transactionId);

  return (
    <div>
      <>
        <div className="container justify-center mx-auto text-center">
          <div className="mt-20">
            {data.result.paymentStatus.id === 1 ? (
              <img
                className="justify-center mx-auto"
                src="/images/wating.png"
                alt=""
              />
            ) : data.result.paymentStatus.id === 2 ? (
              <img
                className="justify-center mx-auto"
                src="/images/close-circle.png"
                alt=""
              />
            ) : data.result.paymentStatus.id === 3 ? (
              <img
                className="justify-center mx-auto"
                src="/images/tick-circle.png"
                alt=""
              />
            ) : data.result.paymentStatus.id === 4 ? (
              <img
                className="justify-center mx-auto"
                src="/images/cash-back.png"
                alt=""
              />
            ) : null}

            <div className="text-center font-bold sm:text-sm lg:text-3xl mt-7">
              پرداخت شما {data.result.paymentStatus.name} می باشد
            </div>
            <div className="text-center sm:text-xs text-sm mt-3 font-normal">
              <span>شماره پیگیری:</span>
              <span>&nbsp;</span>
              <span className="text-primary">{data.result.id}</span>
            </div>
            {data.result.paymentStatus.id === 3 && (
              <div className="text-center mt-8">
                <Link href={`/user/orders/${data.result.orderId}`}>
                  <button className="bg-primary hover:bg-green-700 text-customGray p-3 sm:w-56 md:w-60 lg:w-64 rounded-2xl">
                    پیگیری سفارش
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </>
    </div>
  );
}
