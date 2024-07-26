"use client";
import { SessionProvider } from "next-auth/react";
import React from "react";
import UserProfileModule from "./UserProfileModule";

export default function ProfileGuard({ user }) {
  return (
    <div>
      <SessionProvider>
        <UserProfileModule user={user} />
      </SessionProvider>
    </div>
  );
}
