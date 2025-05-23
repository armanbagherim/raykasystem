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
} from "../Icons";
import Link from "next/link";
import dynamic from "next/dynamic";

export default function BottomNavModule({ entities }) {
  const CartCount = dynamic(() => import("../CartCount"), {
    ssr: false,
  });
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [subMenuData, setSubMenuData] = useState([]);
  const [level, setLevel] = useState(1);
  const [depthSubMenuData, setDepthSubMenuData] = useState([]);
  const [currentParentCategory, setCurrentParentCategory] = useState(""); // new state
  const handleClick = (menuId) => {
    const activeMenu = entities.find((value) => value.id === menuId);
    setLevel(2);
    const submenuData = [
      ...activeMenu.subEntityTypes,
      { ...activeMenu, link: `/category/${activeMenu.slug}` },
    ];
    setSubMenuData(submenuData);
    setCurrentParentCategory(activeMenu.name); // update current parent category
  };

  const handleSubMenuClick = (menuId) => {
    const activeSubMenu = subMenuData.find((value) => value.id === menuId);
    setLevel(3);
    const submenuData = [
      ...activeSubMenu.subEntityTypes,
      { ...activeSubMenu, link: `/category/${activeSubMenu.slug}` },
    ];
    setDepthSubMenuData(submenuData);
    setCurrentParentCategory(activeSubMenu.name); // update current parent category
  };
  return (
    <>
      <div
        className={`w-full h-full bg-white fixed top-0 left-0 z-[90] pt-5 px-6 pb-40 overflow-y-auto ${
          isMenuOpen ? "block animate-open-menu" : "hidden animate-close-menu"
        }`}
      >
        <div className="mb-10 flex justify-between items-center">
          <span
            className="flex items-center gap-4"
            onClick={(e) => setIsMenuOpen(false)}
          >
            <Close />
            {level !== 1 ? <span>{currentParentCategory}</span> : ""}
          </span>

          {level !== 1 ? (
            <span onClick={(e) => setLevel(level - 1)}>
              <BackButton />
            </span>
          ) : (
            ""
          )}
        </div>
        <ul className="flex flex-col-reverse">
          {level === 1
            ? entities.map((value, key) => {
                return value.subEntityTypes &&
                  value.subEntityTypes.length > 0 ? (
                  <li
                    key={key}
                    onClick={(e) => handleClick(value.id)}
                    className="flex justify-between items-center border-b pb-3 mb-6"
                  >
                    <span>{value.name}</span>
                    <ChevronLeft />
                  </li>
                ) : (
                  <Link key={key} href={`/category/${value.slug}`}>
                    <li className="flex justify-between items-center border-b pb-3 mb-6">
                      <span>{value.name}</span>
                    </li>
                  </Link>
                );
              })
            : level === 2
            ? subMenuData.map((value, key) =>
                value.link ? (
                  <Link
                    key={key}
                    onClick={(e) => setIsMenuOpen(false)}
                    href={value.link}
                  >
                    <li className="flex justify-between items-center border-b pb-3 mb-6">
                      <span>{value.name}</span>
                    </li>
                  </Link>
                ) : value.subEntityTypes &&
                  value.subEntityTypes.length === 0 ? (
                  <Link
                    onClick={(e) => setIsMenuOpen(false)}
                    key={key}
                    href={`/category/${value.slug}`}
                  >
                    <li className="flex justify-between items-center border-b pb-3 mb-6">
                      <span>{value.name}</span>
                    </li>
                  </Link>
                ) : (
                  <div
                    key={key}
                    onClick={(e) => handleSubMenuClick(value.id)}
                    className="flex justify-between items-center border-b pb-3 mb-6 cursor-pointer"
                  >
                    <span>{value.name}</span>
                    <ChevronLeft />
                  </div>
                )
              )
            : depthSubMenuData.map((value, key) =>
                value.link ? (
                  <Link
                    onClick={(e) => setIsMenuOpen(false)}
                    key={key}
                    href={value.link}
                  >
                    <li className="flex justify-between items-center border-b pb-3 mb-6">
                      <span>{value.name}</span>
                    </li>
                  </Link>
                ) : value.subEntityTypes &&
                  value.subEntityTypes.length === 0 ? (
                  <Link key={key} href={`/category/${value.slug}`}>
                    <li className="flex justify-between items-center border-b pb-3 mb-6">
                      <span>{value.name}</span>
                    </li>
                  </Link>
                ) : (
                  <Link
                    key={key}
                    href={`/category/${value.slug}`}
                    onClick={(e) => setIsMenuOpen(false)}
                    className="flex justify-between items-center border-b pb-3 mb-6 cursor-pointer"
                  >
                    <span>{value.name}</span>
                    <ChevronLeft />
                  </Link>
                )
              )}
        </ul>
      </div>
      <div className="fixed z-[10] bottom-0 left-0 right-0 bg-[#FAFAFA] w-full h-20 px-8 block md:hidden lg:hidden xl:hidden border-t">
        <div className="flex items-center justify-between h-full">
          <Link href="/" className="flex flex-col text-center items-center">
            <Home />
            <span className="text-xs mt-2">صفحه اصلی</span>
          </Link>
          <div
            className="flex flex-col text-center items-center"
            onClick={(e) => setIsMenuOpen(true)}
          >
            <Menu />
            <span className="text-xs mt-2">منو</span>
          </div>
          <Link href="/cart">
            <div className="flex flex-col text-center items-center relative">
              <div
                suppressHydrationWarning={true}
                className="absolute w-6 h-6 rounded-lg bg-primary text-white -right-2 -top-2 flex justify-center items-center"
              >
                <CartCount />
              </div>
              <CartBottom />
              <span className="text-xs mt-2">سبد خرید</span>
            </div>
          </Link>
          <Link href="/user" className="flex flex-col text-center items-center">
            <Pofile />
            <span className="text-xs mt-2">پروفایل</span>
          </Link>
        </div>
      </div>
    </>
  );
}
