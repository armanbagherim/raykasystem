import React from "react";
import WalletModule from "./WalletModule";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";

async function getData(session) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/v1/api/ecommerce/user/chargingWalletPayments`,
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

export default async function page() {
  const session = await getServerSession(authOptions);

  const { result: chargingWalletPayments } = await getData(session);
  return <WalletModule chargingWalletPayments={chargingWalletPayments} />;
}
