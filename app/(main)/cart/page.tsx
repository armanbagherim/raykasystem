import React from "react";
import CartModule from "./CartModule";
import { cookies } from "next/headers";
import { Metadata } from "next";
import Interseptor from "@/app/components/global/Interseptor";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `جهیزان | سبد خرید`,
  };
}

// async function calculate() {
//   const res = await Interseptor("/v1/api/ecommerce/user/stocks/price");
//   return res.json();
// }

async function getCart() {
  const res = await Interseptor("/v1/api/ecommerce/user/stocks");
  return res.json();
}

async function getAddress() {
  const session = await getServerSession(authOptions);
  console.log(session);
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/v1/api/ecommerce/user/vendors?sortOrder=DESC&offset=0&limit=10&orderBy=id`,
    {
      cache: "force-cache",
      headers: {
        Authorization: `Bearer ${session?.token}`,
      },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function page() {
  const session = await getServerSession(authOptions);
  const cookieStore = cookies();

  const cart = await getCart();
  const addresses = await getAddress();
  // const prices = await calculate();
  console.log("cartsssssssssssssss", cart);

  return (
    <CartModule
      addresses={addresses}
      cartItems={cart}
      session={session}
      cookies={cookieStore.get("SessionName")}
    />
  );
}
