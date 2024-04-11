"use client";
import React, { useEffect, useRef, useState } from "react";
import { debounce } from "lodash"; // Import debounce from Lodash

export default function Search() {
  const [searchTerm, setSearchTerm] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const searchContainerRef = useRef(null); // Step 1: Create a ref for the search container
  const [products, setProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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
      console.log(searchTerm);
    }
  }, [searchTerm]);

  // const getData = () => {
  //   console.log(cookies.value);
  //   const res = fetch(
  //     `${process.env.NEXT_PUBLIC_BASE_URL}/v1/api/ecommerce/user/stocks/price`,
  //     {
  //       headers: {
  //         "x-session-id": cookies.value,
  //       },
  //     }
  //   )
  //     .then((response) => response.json())
  //     .then((data) => console.log("ARE SHAYAD", data));
  // };
  // useEffect(() => {
  //   getData();
  // }, []);

  // useEffect(() => {
  //   // This code runs after `calculates` state has been updated
  //   console.log(calculates);
  // }, [calculates]); // Depend on `calculates` to run this effect

  return (
    <div className="relative" ref={searchContainerRef}>
      {" "}
      {/* Attach the ref to the search container */}
      <input
        onFocus={(e) => setIsOpen(true)}
        onChange={(e) => {
          setIsLoading(true);
          debouncedUpdateSearchTerm(e.target.value);
        }}
        placeholder="جستجو کنید"
        type="text"
        className="border rounded-2xl hidden md:block p-4 pr-12 outline-none w-full bg-[#FBFBFB]"
      />
      <div
        className={`${
          isOpen ? "block" : "hidden"
        } bg-gray-100 border border-gray-400 absolute top-16 w-full z-[99999999999999] rounded-3xl p-8`}
      >
        <div className="flex justify-between border-b border-b-gray-300 pb-4 mb-4">
          <p className="peyda">در محصولات</p>
          <span className="font-bold text-primary">
            <a href="">همه محصولات</a>
          </span>
        </div>
        <div className="mb-4">
          {searchTerm ? (
            isLoading ? (
              <div className="h-2.5 bg-gray-300 dark:bg-gray-600 w-24 mb-2.5 rounded-2xl animate-pulse h-[58px] w-full"></div>
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
                  <p>{value.title}</p>
                  <p className="font-bold ">
                    {Number(12000000).toLocaleString()}
                  </p>
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
        <div className="mb-4 flex gap-2">
          {searchTerm ? (
            isLoading ? (
              <div className="h-2.5 bg-gray-300 dark:bg-gray-600 w-24 mb-2.5 rounded-2xl animate-pulse h-[58px] w-full"></div>
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
                  <p>{value.name}</p>
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
              <div className="h-2.5 bg-gray-300 dark:bg-gray-600 w-24 mb-2.5 rounded-2xl animate-pulse h-[58px] w-full"></div>
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
                  <p>{value?.name}</p>
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
  );
}
