"use client";

import React, { useState } from "react";
import { fetcher } from "@/app/components/global/fetcher";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function WalletModule({ chargingWalletPayments }) {
  const router = useRouter();
  const [walletAmount, setWalletAmount] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState(
    chargingWalletPayments[0].id
  );
  const [isLoading, setIsLoading] = useState(false);

  const changeValue = (e) => {
    setWalletAmount(e.target.attributes.getNamedItem("data-value").value);
  };

  const save = async () => {
    setIsLoading(true);
    try {
      const req = await fetcher({
        url: "/v1/api/ecommerce/user/payments/walletCharging",
        method: "POST",
        body: {
          amount: +walletAmount,
          paymentId: paymentMethod,
        },
      }).then((res) => {
        router.push(res.result.redirectUrl);
      });
    } catch (error) {
      toast.error(error.message);
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="container mx-auto">
        <div className="w-full md:w-1/2 mx-auto">
          <h4 className="text-right mb-6 peyda text-xl text-gray-600 font-bold">
            شارژ کیف پول
          </h4>
          <div className="flex gap-4 items-center flex-wrap md:flex-nowrap">
            <input
              type="text"
              onChange={(e) => setWalletAmount(+e.target.value)}
              value={walletAmount}
              className="border border-gray-200 rounded-2xl text-md py-3 text-center w-full mb-4 outline-none"
              placeholder="مقدار شارژ مورد نیاز"
            />
            <span className="w-full text-center">
              {Number(walletAmount).toLocaleString()} تومان
            </span>
          </div>
          <h4 className="mb-4">مبالغ پیشنهادی</h4>
          <div className="flex gap-2 mb-4 justify-between flex-wrap">
            <div
              data-value="100000"
              onClick={(e) => changeValue(e)}
              className="bg-[#f8f8f8] border border-gray-200 hover:bg-primary hover:text-white cursor-pointer py-2 px-3 rounded-lg transition-all"
            >
              100,000 تومان
            </div>
            <div
              data-value="1000000"
              onClick={(e) => changeValue(e)}
              className="bg-[#f8f8f8] border border-gray-200 hover:bg-primary hover:text-white cursor-pointer py-2 px-3 rounded-lg transition-all"
            >
              1,000,000 تومان
            </div>
            <div
              data-value="2000000"
              onClick={(e) => changeValue(e)}
              className="bg-[#f8f8f8] border border-gray-200 hover:bg-primary hover:text-white cursor-pointer py-2 px-3 rounded-lg transition-all"
            >
              2,000,000 تومان
            </div>
            <div
              data-value="3000000"
              onClick={(e) => changeValue(e)}
              className="bg-[#f8f8f8] border border-gray-200 hover:bg-primary hover:text-white cursor-pointer py-2 px-3 rounded-lg transition-all"
            >
              10,000,000 تومان
            </div>
          </div>
          <hr className="mb-4 mt-8" />
          <div>
            <h4 className="mb-4">پرداخت از طریق</h4>
            <div className="flex mb-4">
              {chargingWalletPayments.map((chargingWalletPayment: any) => (
                <div
                  onClick={() => setPaymentMethod(chargingWalletPayment.id)}
                  className={`flex border px-6 py-3  rounded-xl cursor-pointer ${
                    chargingWalletPayment.id === paymentMethod
                      ? "border-primary"
                      : "border-gray-200"
                  }`}
                  key={chargingWalletPayment.id}
                >
                  {chargingWalletPayment.name}
                </div>
              ))}
            </div>
          </div>
          <button
            disabled={isLoading}
            onClick={save}
            className=" border bg-primary text-white rounded-2xl py-3 px-8 w-full text-center block"
          >
            {isLoading ? (
              <svg
                aria-hidden="true"
                className="w-6 h-6 text-transparent animate-spin dark:text-gray-600 fill-white mx-auto"
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
            ) : (
              "شارژ کیف پول"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
