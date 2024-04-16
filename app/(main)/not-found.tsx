"use client";
import Link from "next/link";
import { headers } from "next/headers";

export default function NotFound() {
  return (
    <div className="flex justify-center flex-col items-center">
      <h1 className="text-[80px] font-bold text-primary">404</h1>
      <h2 className="text-2xl font-bold mb-4">محصول پیدا نشد!</h2>
      <Link
        className="inline-block border border-primary text-primary rounded-2xl py-4 px-8 hover:text-white hover:bg-primary transition-all"
        href="/"
      >
        همه محصولات
      </Link>
    </div>
  );
}
