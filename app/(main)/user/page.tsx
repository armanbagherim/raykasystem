import React from "react";

export default function page() {
  return (
    <div className="md:col-span-3 p-4">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-7">
        <div className="col-span-2 bg-gray-300 rounded-3xl text-center p-4">
          <h4 className="text-base mb-4">تعداد سفارش های شما</h4>
          <p className="text-2xl mb-4">24 سفارش</p>
          <button className="border text-white px-8 py-3 rounded-2xl">
            سفارشات
          </button>
        </div>
        <div className="col-span-2 bg-gray-300 rounded-3xl text-center p-4">
          <h4 className="text-base mb-4">سفارش های در انتظار پرداخت</h4>
          <p className="text-2xl mb-4">1 سفارش</p>
          <button className="border text-white px-8 py-3 rounded-2xl">
            پرداخت
          </button>
        </div>
        <div className="col-span-2 md:col-span-2 lg:col-span-2 xl:col-span-1 bg-green-custom rounded-3xl text-center p-4">
          <h4 className="text-base mb-4">سفارش لغو شده</h4>
          <p className="text-2xl mb-4">24 سفارش</p>
          <button className="border text-white px-8 py-3 rounded-2xl">
            سفارشات
          </button>
        </div>
      </div>
    </div>
  );
}
