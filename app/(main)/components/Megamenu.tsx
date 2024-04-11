"use client";
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
            className="col-span-2 p-2 pb-0"
            onMouseEnter={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b text-primary">همه {groupName} </div>
            <div className="grid grid-cols-2 text-slate-700">
              <div className="col-span-1">
                {activeSubEntities.map((value, key) => {
                  console.log(value, key);
                  return (
                    <p key={key} className="p-4 hover:text-black">
                      {value.name}
                    </p>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="col-span-1"></div>
          <div className="col-span-1 p-2 pb-0 items-center my-auto rounded rounded-3xl">
            <img src="/images/ghahvesaz.png" alt="" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Megamenu;
