"use client";

import React from "react";
import { totalCartItemsSelector } from "@/store/features/cartSlice";
import { useAppSelector } from "@/store/store";
export default function CartCount() {
  const totalItems = useAppSelector(totalCartItemsSelector);
  return totalItems;
}
