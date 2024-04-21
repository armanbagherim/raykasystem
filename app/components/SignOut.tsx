"use client";
import { signOut } from "next-auth/react";
import { ChevronLeft } from "./design/Icons";

const SignOutButton = () => {
  return (
    <>
      <li
        className="mb-2 text-sm flex justify-between cursor-pointer"
        onClick={() => signOut()}
      >
        <span>خروج</span>
        <span>
          <ChevronLeft />
        </span>
      </li>
    </>
  );
};

export default SignOutButton;
