import React, { useState } from "react";
import Interseptor from "@/app/components/global/Interseptor";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import AddressModule from "./AddressModule";
import { cookies } from "next/headers";

export default async function page() {
  const session = await getServerSession(authOptions);
  const cookieStore = cookies();

  return (
    <div>
      <div>
        <AddressModule
          session={session}
          cookies={cookieStore.get("SessionName")}
        />
      </div>
    </div>
  );
}
