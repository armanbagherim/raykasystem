import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import UserOrderModule from "./orders/UserOrderModule";

async function getData(session) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/v1/api/ecommerce/user/orders?ingorePaging=true&limit=1&sortOrder=DESC`,
    {
      headers: {
        Authorization: `Bearer ${session.token}`,
      },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

// Function to fetch total orders
async function getTotalOrders(session) {
  const res = await fetch(
    `${BASE_URL}/v1/api/ecommerce/user/dashboards/totalOrders`,
    {
      headers: {
        Authorization: `Bearer ${session.token}`,
      },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch total orders");
  }

  return res.json();
}

// Function to fetch total wallet amounts
async function getTotalWalletAmounts(session) {
  const res = await fetch(
    `${BASE_URL}/v1/api/ecommerce/user/dashboards/totalWalletAmounts`,
    {
      headers: {
        Authorization: `Bearer ${session.token}`,
      },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch total wallet amounts");
  }

  return res.json();
}

// Function to fetch total comments
async function getTotalComments(session) {
  const res = await fetch(
    `${BASE_URL}/v1/api/ecommerce/user/dashboards/totalComments`,
    {
      headers: {
        Authorization: `Bearer ${session.token}`,
      },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch total comments");
  }

  return res.json();
}

// Main function to fetch all dashboard details concurrently
async function getAllDashboardDetails(session) {
  try {
    // Fetch data concurrently using Promise.all
    const [ordersData, walletAmountsData, commentsData] = await Promise.all([
      getTotalOrders(session),
      getTotalWalletAmounts(session),
      getTotalComments(session),
    ]);

    // Map results to an object
    const dashboardDetails = {
      totalOrders: ordersData,
      totalWalletAmounts: walletAmountsData,
      totalComments: commentsData,
    };

    return dashboardDetails;
  } catch (error) {
    console.error("Error fetching dashboard details:", error);
    throw error; // Rethrow the error to handle it outside this function if needed
  }
}

export default async function page() {
  const session = await getServerSession(authOptions);
  const { totalOrders, totalWalletAmounts, totalComments } =
    await getAllDashboardDetails(session);
  const data = await getData(session);
  return (
    <div className="md:col-span-3 py-4">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-7">
        <div className="bg-primary rounded-3xl text-center py-6 px-4 relative overflow-hidden">
          <svg
            width="80"
            height="80"
            viewBox="0 0 24 24"
            fill="none"
            className="absolute -right-8 top-4"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3.17004 7.43994L12 12.5499L20.77 7.46994"
              stroke="#fff"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M12 21.61V12.54"
              stroke="#fff"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M9.93001 2.48004L4.59001 5.44004C3.38001 6.11004 2.39001 7.79004 2.39001 9.17004V14.82C2.39001 16.2 3.38001 17.88 4.59001 18.55L9.93001 21.52C11.07 22.15 12.94 22.15 14.08 21.52L19.42 18.55C20.63 17.88 21.62 16.2 21.62 14.82V9.17004C21.62 7.79004 20.63 6.11004 19.42 5.44004L14.08 2.47004C12.93 1.84004 11.07 1.84004 9.93001 2.48004Z"
              stroke="#fff"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>

          <h4 className="mb-4 text-white peyda font-bold text-lg">
            تعداد سفارش های شما
          </h4>
          <p className="text-lg mb-4 text-white font-bold">
            {totalOrders?.result} سفارش
          </p>
        </div>
        <div className="bg-primary rounded-3xl text-center py-6 px-4 relative overflow-hidden">
          <svg
            width="80"
            height="80"
            viewBox="0 0 24 24"
            fill="none"
            className="absolute -right-8 top-4"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18.47 16.83L18.86 19.99C18.96 20.82 18.07 21.4 17.36 20.97L13.17 18.48C12.71 18.48 12.26 18.45 11.82 18.39C12.56 17.52 13 16.42 13 15.23C13 12.39 10.54 10.09 7.49997 10.09C6.33997 10.09 5.26997 10.42 4.37997 11C4.34997 10.75 4.33997 10.5 4.33997 10.24C4.33997 5.68999 8.28997 2 13.17 2C18.05 2 22 5.68999 22 10.24C22 12.94 20.61 15.33 18.47 16.83Z"
              stroke="#fff"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M13 15.23C13 16.42 12.56 17.5201 11.82 18.3901C10.83 19.5901 9.26 20.36 7.5 20.36L4.89 21.91C4.45 22.18 3.89 21.81 3.95 21.3L4.2 19.3301C2.86 18.4001 2 16.91 2 15.23C2 13.47 2.94 11.9201 4.38 11.0001C5.27 10.4201 6.34 10.0901 7.5 10.0901C10.54 10.0901 13 12.39 13 15.23Z"
              stroke="#fff"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>

          <h4 className="mb-4 text-white peyda font-bold text-lg">
            تعداد نظرات شما
          </h4>
          <p className="text-lg mb-4 text-white font-bold">
            {totalComments?.result} نظر
          </p>
        </div>
        <div className="bg-primary rounded-3xl text-center py-6 px-4 relative overflow-hidden">
          <svg
            width="80"
            height="80"
            viewBox="0 0 24 24"
            fill="none"
            className="absolute -right-8 top-4"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18.04 13.55C17.62 13.96 17.38 14.55 17.44 15.18C17.53 16.26 18.52 17.05 19.6 17.05H21.5V18.24C21.5 20.31 19.81 22 17.74 22H6.26C4.19 22 2.5 20.31 2.5 18.24V11.51C2.5 9.44001 4.19 7.75 6.26 7.75H17.74C19.81 7.75 21.5 9.44001 21.5 11.51V12.95H19.48C18.92 12.95 18.41 13.17 18.04 13.55Z"
              stroke="#fff"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M2.5 12.4101V7.8401C2.5 6.6501 3.23 5.59006 4.34 5.17006L12.28 2.17006C13.52 1.70006 14.85 2.62009 14.85 3.95009V7.75008"
              stroke="#fff"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M22.5588 13.9702V16.0302C22.5588 16.5802 22.1188 17.0302 21.5588 17.0502H19.5988C18.5188 17.0502 17.5288 16.2602 17.4388 15.1802C17.3788 14.5502 17.6188 13.9602 18.0388 13.5502C18.4088 13.1702 18.9188 12.9502 19.4788 12.9502H21.5588C22.1188 12.9702 22.5588 13.4202 22.5588 13.9702Z"
              stroke="#fff"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M7 12H14"
              stroke="#fff"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <h4 className="mb-4 text-white peyda font-bold text-lg">
            میزان شارژ کیف پول
          </h4>
          <p className="text-lg mb-4 text-white font-bold">
            {" "}
            {Number(totalWalletAmounts?.result).toLocaleString()} تومان
          </p>
        </div>
      </div>
      <UserOrderModule title="آخرین سفارش" data={data} />
    </div>
  );
}
