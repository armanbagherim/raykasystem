"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Megamenu = ({ items }) => {
  const [activeSubEntities, setActiveSubEntities] = useState([]);
  const [groupName, setGroupName] = useState();
  console.log();
  useEffect(() => {
    console.log("syb", items[0].subEntityTypes);
    setActiveSubEntities(items[0].subEntityTypes);
    setGroupName(items[0].name);
  }, []);
  console.log(items);

  function compareNumbers(a, b) {
    return b.subEntityTypes.length - a.subEntityTypes.length;
  }
  return (
    <>
      <div
        onMouseEnter={(e) => e.stopPropagation()}
        className={`absolute z-40 top-10   bg-customGray rounded rounded-3xl text-md w-full hidden group-hover:lg:block group-hover:md:block group-hover:xl:block group-hover:2xl:block`}
      >
        <div
          className="grid grid-cols-5 p-2"
          onMouseEnter={(e) => e.stopPropagation()}
        >
          <div className="col-span-1 p-4 pb-0 text-slate-500">
            {items.map((value, key) => (
              <p
                key={key}
                onMouseEnter={(e) => {
                  setActiveSubEntities(value.subEntityTypes);
                  setGroupName(value.name);
                }}
                className="p-4 border-l hover:border-l-primary hover:border-l-4 hover:text-black"
              >
                {value.name}
              </p>
            ))}
          </div>
          <div
            className="col-span-4 p-2 pb-0"
            onMouseEnter={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b text-primary">همه {groupName} </div>
            <div className="grid grid-cols-3 text-slate-700">
              <div className="col-span-3 grid grid-cols-4">
                {activeSubEntities.sort(compareNumbers).map((value, key) => {
                  let columnCounter = 0; // متغیر برای شمارش ستون‌ها
                  return (
                    <div key={key} className="p-4 col-span-1 hover:text-black ">
                      <Link href={value.slug}>
                        <span className="w-2 h-2 ml-3 rounded-xl bg-primary inline-block"></span>
                        <span className="text-primary text-md">
                          {value.name}
                        </span>
                      </Link>

                      {value.subEntityTypes.map((values, keys) => {
                        // برای هر 8 آیتم، ستون را تغییر می‌دهیم
                        if (keys % 8 === 0) {
                          columnCounter++; // شمارش ستون را افزایش می‌دهیم
                        }
                        return (
                          <Link
                            href={values.slug}
                            key={keys}
                            className={`block py-4 pr-2 hover:text-black text-md pb-2 ${
                              columnCounter > 0
                                ? "col-span-" + (columnCounter + 1)
                                : ""
                            }`}
                          >
                            {values.name}
                          </Link>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Megamenu;
