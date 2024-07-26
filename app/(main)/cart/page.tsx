import React from "react";
import CartModule from "./CartModule";
import { cookies } from "next/headers";
import { Metadata } from "next";
import Interseptor from "@/app/components/global/Interseptor";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `سبد خرید | جهیزان`,
  };
}

// async function calculate() {
//   const res = await Interseptor("/v1/api/ecommerce/user/stocks/price");
//   return res.json();
// }

async function getCart(session) {
  const res = await Interseptor("/v1/api/ecommerce/user/stocks", session);
  return res.json();
}

export default async function page() {
  const session = await getServerSession(authOptions);
  const cookieStore = cookies();

  const cart = await getCart(session);
  // const prices = await calculate();
  return (
    <CartModule
      cartItems={cart}
      session={session}
      cookies={cookieStore.get("SessionName")}
    />
  );
}
