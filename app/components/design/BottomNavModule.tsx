"use client";
import React, { useState } from "react";
import {
  BackButton,
  CartBottom,
  ChevronLeft,
  Close,
  Home,
  Menu,
  Pofile,
} from "./Icons";
import Link from "next/link";
import CartCount from "./CartCount";

export default function BottomNavModule({ entities }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [subMenuData, setSubMenuData] = useState([]);
  const [level, setLevel] = useState(1);
  const [depthSubMenuData, setDepthSubMenuData] = useState([]);

  const handleClick = (menuId) => {
    const activeMenu = entities.find((value) => value.id === menuId);
    setLevel(2);
    setSubMenuData(activeMenu.subEntityTypes);
  };
  const handleSubMenuClick = (menuId) => {
    const activeSubMenu = subMenuData.find((value) => value.id === menuId);
    setLevel(3);
    setDepthSubMenuData(activeSubMenu.subEntityTypes);
  };
  return (
    <>
      <div
        className={`w-full h-full bg-white fixed top-0 left-0 z-10 pt-5 px-6 pb-40 overflow-y-auto ${
          isMenuOpen ? "block animate-open-menu" : "hidden animate-close-menu"
        }`}
      >
        <div className="mb-10 flex justify-between items-center">
          <span onClick={(e) => setIsMenuOpen(false)}>
            <Close />
          </span>

          {level !== 1 ? (
            <span onClick={(e) => setLevel(level - 1)}>
              <BackButton />
            </span>
          ) : (
            ""
          )}
        </div>
        <ul>
          {level === 1
            ? entities.map((value, key) => {
                return value.subEntityTypes.length > 0 ? (
                  <li
                    key={key}
                    onClick={(e) => handleClick(value.id)}
                    className="flex justify-between items-center border-b pb-3 mb-6"
                  >
                    <span>{value.name}</span>
                    <ChevronLeft />
                  </li>
                ) : (
                  <a key={key} href={`/category/${value.slug}`}>
                    <li
                      onClick={(e) => handleClick(value.id)}
                      className="flex justify-between items-center border-b pb-3 mb-6"
                    >
                      <span>{value.name}</span>
                      <ChevronLeft />
                    </li>
                  </a>
                );
              })
            : level === 2
            ? subMenuData.map((value, key) =>
                value.subEntityTypes.length === 0 ? (
                  <a key={key} href={`/category/${value.slug}`}>
                    <li
                      onClick={(e) => handleSubMenuClick(value.id)}
                      className="flex justify-between items-center border-b pb-3 mb-6"
                    >
                      <span>{value.name}</span>
                      <ChevronLeft />
                    </li>
                  </a>
                ) : (
                  <li
                    key={key}
                    onClick={(e) => handleSubMenuClick(value.id)}
                    className="flex justify-between items-center border-b pb-3 mb-6"
                  >
                    <span>{value.name}</span>
                    <ChevronLeft />
                  </li>
                )
              )
            : depthSubMenuData.map((value, key) => (
                <a key={key} href={`/category/${value.slug}`}>
                  <li
                    onClick={(e) => handleSubMenuClick(value.id)}
                    className="flex justify-between items-center border-b pb-3 mb-6"
                  >
                    <span>{value.name}</span>
                    <ChevronLeft />
                  </li>
                </a>
              ))}
        </ul>
      </div>
      <div className="fixed z-50 bottom-0 left-0 right-0 bg-[#FAFAFA] w-full h-20 px-8 block md:hidden lg:hidden xl:hidden border-t">
        <div className="flex items-center justify-between h-full">
          <a href="/" className="flex flex-col text-center items-center">
            <Home />
            <span className="text-xs mt-2">صفحه اصلی</span>
          </a>
          <div
            className="flex flex-col text-center items-center"
            onClick={(e) => setIsMenuOpen(true)}
          >
            <Menu />
            <span className="text-xs mt-2">منو</span>
          </div>
          <Link href="/cart">
            <div className="flex flex-col text-center items-center relative">
              <div className="absolute w-6 h-6 rounded-lg bg-primary text-white -right-2 -top-2 flex justify-center items-center">
                <CartCount />
              </div>
              <CartBottom />
              <span className="text-xs mt-2">سبد خرید</span>
            </div>
          </Link>
          <a href="/user" className="flex flex-col text-center items-center">
            <Pofile />
            <span className="text-xs mt-2">پروفایل</span>
          </a>
        </div>
      </div>
    </>
  );
}
