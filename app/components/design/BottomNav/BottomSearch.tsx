"use client";
import React, { useEffect, useRef, useState } from "react";
import { debounce } from "lodash"; // Import debounce from Lodash
import { ChevronLeft, Close, Menu } from "../Icons";
import Link from "next/link";

export default function BottomSearch() {
  const [searchTerm, setSearchTerm] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const searchContainerRef = useRef(null); // Step 1: Create a ref for the search container
  const [products, setProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [subMenuData, setSubMenuData] = useState([]);
  const [level, setLevel] = useState(1);
  const handleClick = (menuId) => {
    const activeMenu = entities.find((value) => value.id === menuId);
    setLevel(2);
    setSubMenuData(activeMenu.subEntityTypes);
  };
  const debouncedUpdateSearchTerm = debounce((value) => {
    setSearchTerm(value);
  }, 1000); // 1000ms = 1 second

  const getProduct = () => {
    const res = fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/v1/api/ecommerce/products?search=${searchTerm}&limit=5`
    )
      .then((response) => response.json())
      .then((data) => {
        setProducts(data.result);
        setIsLoading(false);
      });
  };
  const getBrands = () => {
    const res = fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/v1/api/ecommerce/brands?search=${searchTerm}&limit=5`
    )
      .then((response) => response.json())
      .then((data) => {
        setBrands(data.result);
        setIsLoading(false);
      });
  };
  const getCategories = () => {
    const res = fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/v1/api/eav/admin/entityTypes?search=${searchTerm}&limit=5`
    )
      .then((response) => response.json())
      .then((data) => setCategories(data.result));
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target)
      ) {
        setIsOpen(false); // Close the search box if the click is outside
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (searchTerm) {
      getProduct();
      getBrands();
      getCategories();
    }
  }, [searchTerm]);
  return (
    <>
      <img
        onClick={(e) => setIsMenuOpen(true)}
        className="relative md:absolute md:right-3 md:top-4"
        src="/icons/search.svg"
        alt=""
      />
      <div
        className={`w-full overflow-x-scroll h-full bg-white fixed top-0 left-0 z-10 pt-5 px-6 pb-48 overflow-y-auto ${
          isMenuOpen ? "block animate-open-menu" : "hidden animate-close-menu"
        }`}
      >
        <div className="mb-2 flex justify-between items-center">
          <span onClick={(e) => setIsMenuOpen(false)}>
            <Close />
          </span>
        </div>
        <input
          onFocus={(e) => setIsOpen(true)}
          onChange={(e) => {
            setIsLoading(true);
            debouncedUpdateSearchTerm(e.target.value);
          }}
          placeholder="جستجو کنید"
          type="text"
          className="border rounded-2xl mb-8 p-4 pr-12 outline-none w-full bg-[#FBFBFB]"
        />
        <div className={`w-full  rounded-3xl `}>
          <div className="flex justify-between border-b border-b-gray-300 pb-4 mb-4">
            <p className="peyda">در محصولات</p>
            <span className="font-bold text-primary">
              <Link
                onClick={(e) => setIsMenuOpen(false)}
                href={`/search?search=${searchTerm}`}
              >
                <span href="">همه {searchTerm || "محصولات"} </span>
              </Link>
            </span>
          </div>
          <div className="mb-4">
            {searchTerm ? (
              isLoading ? (
                <div className="h-2.5 bg-gray-300  w-24 mb-2.5 rounded-2xl animate-pulse h-[58px] w-full"></div>
              ) : products.length < 1 ? (
                <div className="flex mb-8 justify-center px-8 py-4 bg-red-100 text-red-600 text-center justify-center rounded-2xl border border-red-200 font-bold mb-4">
                  چیزی پیدا نشد !
                </div>
              ) : (
                products.map((value, key) => (
                  <div
                    key={key}
                    className="flex justify-between px-8 py-4 bg-white rounded-2xl border border-gray-300 mb-4"
                  >
                    <Link
                      onClick={(e) => setIsMenuOpen(false)}
                      href={`/product/${value.sku}/${value.slug}`}
                    >
                      <p>{value.title}</p>
                    </Link>
                  </div>
                ))
              )
            ) : (
              <div className="flex mb-8 justify-center px-8 py-4 bg-white text-primary text-center justify-center rounded-2xl border border-gray-300 mb-4">
                برای جست و جو چیزی تایپ کنید
              </div>
            )}
          </div>
          <div className="flex justify-between border-b border-b-gray-300 pb-4 mb-4">
            <p className="peyda">در برند ها</p>
            <span className="font-bold text-primary">
              <a href="">همه برند ها</a>
            </span>
          </div>
          <div className="mb-4 flex gap-2 flex-wrap">
            {searchTerm ? (
              isLoading ? (
                <div className="h-2.5 bg-gray-300  w-24 mb-2.5 rounded-2xl animate-pulse h-[58px] w-full"></div>
              ) : brands.length < 1 ? (
                <div className="flex flex-1 mb-8 justify-center px-8 py-4 bg-red-100 text-red-600 text-center justify-center rounded-2xl border border-red-200 font-bold mb-4">
                  چیزی پیدا نشد !
                </div>
              ) : (
                brands?.map((value, key) => (
                  <div
                    key={key}
                    className="flex justify-between px-8 py-4 bg-white rounded-2xl border border-gray-300 mb-4"
                  >
                    <Link
                      onClick={(e) => setIsMenuOpen(false)}
                      href={`/brand/${value.slug}`}
                    >
                      <p>{value.name}</p>
                    </Link>
                  </div>
                ))
              )
            ) : (
              <div className="flex-1 justify-center px-8 py-4 bg-white text-primary text-center justify-center rounded-2xl border border-gray-300 mb-4">
                برای جست و جو چیزی تایپ کنید
              </div>
            )}
          </div>
          <div className="flex justify-between border-b border-b-gray-300 pb-4 mb-4">
            <p className="peyda">در دسته بندی ها</p>
            <span className="font-bold text-primary">
              <a href="">همه دسته بندی ها</a>
            </span>
          </div>
          <div className="mb-4 flex gap-2">
            {searchTerm ? (
              isLoading ? (
                <div className="h-2.5 bg-gray-300  w-24 mb-2.5 rounded-2xl animate-pulse h-[58px] w-full"></div>
              ) : categories.length < 1 ? (
                <div className="flex flex-1 mb-8 justify-center px-8 py-4 bg-red-100 text-red-600 text-center justify-center rounded-2xl border border-red-200 font-bold mb-4">
                  چیزی پیدا نشد !
                </div>
              ) : (
                categories?.map((value, key) => (
                  <div
                    key={key}
                    className="flex justify-between px-8 py-4 bg-white rounded-2xl border border-gray-300 mb-4"
                  >
                    <Link
                      onClick={(e) => setIsMenuOpen(false)}
                      href={`/category/${value.slug}`}
                    >
                      <p>{value.name}</p>
                    </Link>
                  </div>
                ))
              )
            ) : (
              <div className="flex-1 justify-center px-8 py-4 bg-white text-primary text-center justify-center rounded-2xl border border-gray-300 mb-4">
                برای جست و جو چیزی تایپ کنید
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
