"use client";

import React from "react";
import {
  totalCartItemsSelector,
  TotalPriceSelector,
} from "@/store/features/cartSlice";
import { useAppSelector } from "@/store/store";
export default function CartCount() {
  const totalItems = useAppSelector(totalCartItemsSelector);
  console.log(totalItems);
  return totalItems;
}
