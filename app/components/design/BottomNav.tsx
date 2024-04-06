import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import Link from "next/link";
import BottomNavModule from "./BottomNavModule";

async function getEntity() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/v1/api/eav/admin/entityTypes?ignoreChilds=true`,
    {
      cache: "no-store",
    }
  );

  return res.json();
}

export default async function BottomNav() {
  const { result: entity } = await getEntity();

  const session = await getServerSession(authOptions);

  return <BottomNavModule entities={entity} />;
}
