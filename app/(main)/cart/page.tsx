import React from "react";
import CartModule from "./CartModule";
import { cookies } from "next/headers";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `جهیزان | سبد خرید`,
  };
}

export default function page() {
  const coo = cookies();
  return <CartModule cook={coo.get("SessionName")} />;
}
