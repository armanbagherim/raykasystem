import React from "react";
import SettingModule from "./SettingModule";
import { cookies } from "next/headers";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { fetcher } from "@/app/components/global/fetcher";

const getEntityTypes = async (session) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/v1/api/eav/admin/entityTypes?ignorePaging=true`,
    {
      headers: {
        Authorization: `Bearer ${session.token}`,
      },
      cache: "no-store",
    }
  );
  const data = res.json();

  return data;
};
const getEntityTypeSorts = async (session) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/v1/api/ecommerce/admin/entityTypeSorts?ignorePaging=true`,
    {
      headers: {
        Authorization: `Bearer ${session.token}`,
      },
      cache: "no-store",
    }
  );
  const data = res.json();

  return data;
};

const getHomePageData = async (session) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/v1/api/ecommerce/admin/homePages`,
    {
      headers: {
        Authorization: `Bearer ${session.token}`,
      },
      cache: "no-store",
    }
  );
  const data = res.json();

  return data;
};

const getBrands = async (session) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/v1/api/ecommerce/brands?ignorePaging=true`,
    {
      headers: {
        Authorization: `Bearer ${session.token}`,
      },
      cache: "no-store",
    }
  );
  const data = res.json();

  return data;
};

export default async function SettingPage() {
  const coo = cookies();
  const session = await getServerSession(authOptions);
  const EntityTypes = await getEntityTypes(session);
  const TypeSorts = await getEntityTypeSorts(session);
  const brands = await getBrands(session);

  const { result: HomePageData } = await getHomePageData(session);

  return (
    <SettingModule
      TypeSorts={TypeSorts}
      EntityTypes={EntityTypes}
      HomePageData={HomePageData}
      brands={brands}
    />
  );
}
