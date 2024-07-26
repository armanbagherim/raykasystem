"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Megamenu = ({ items }) => {
  const [activeSubEntities, setActiveSubEntities] = useState([]);
  const [groupName, setGroupName] = useState();

  useEffect(() => {
    setActiveSubEntities(items[0].subEntityTypes);
    setGroupName(items[0].name);
  }, []);

  const subs = activeSubEntities.length ? activeSubEntities : [];

  const itemsWithSubEntities = subs.filter(
    (item) => item.subEntityTypes && item.subEntityTypes.length > 0
  );

  // Filter items without subEntities
  const itemsWithoutSubEntities = subs.filter(
    (item) => !item.subEntityTypes || item.subEntityTypes.length === 0
  );

  function renderGroup(items) {
    return items.map((item) => (
      <div className="col-span-1" key={item.id}>
        <Link
          href={`/category/${item.slug}`}
          key={item.id}
          className="block py-2 pr-2 hover:text-black text-sm pb-2"
        >
          <h3>
            <span className="w-2 h-2 ml-3 rounded-xl bg-primary inline-block"></span>
            <span className="text-primary text-md">{item.name}</span>
          </h3>
        </Link>

        {/* Render subEntities if present */}
        {item.subEntityTypes &&
          item.subEntityTypes.map((subEntity) => (
            <div key={subEntity.id}>
              <Link
                href={`/category/${subEntity.slug}`}
                key={subEntity.id}
                className="block py-2 pr-2 hover:text-black text-sm pb-2"
              >
                <h4>{subEntity.name}</h4>
              </Link>
              {/* Assuming subEntityTypes can have their own subEntities */}
              {subEntity.subEntityTypes &&
                subEntity.subEntityTypes.map((nestedSubEntity) => (
                  <div key={nestedSubEntity.id}> {nestedSubEntity.name}</div>
                ))}
            </div>
          ))}
      </div>
    ));
  }

  // Render the groups
  const renderedItemsWithSubEntities = renderGroup(itemsWithSubEntities);
  const renderedItemsWithoutSubEntities = renderGroup(itemsWithoutSubEntities);
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
              <Link key={key} href={`/category/${value.slug}`}>
                <p
                  onMouseEnter={(e) => {
                    setActiveSubEntities(
                      value.subEntityTypes.length ? value.subEntityTypes : value
                    );
                    setGroupName(value.name);
                  }}
                  className="px-3 py-2 text-md cursor-pointer border-l hover:border-l-primary hover:border-l-4 hover:bg-gray-200 rounded-r-xl hover:text-black"
                >
                  {value.name}
                </p>
              </Link>
            ))}
          </div>
          <div
            className="col-span-4 p-2 pb-0"
            onMouseEnter={(e) => e.stopPropagation()}
          >
            <div className="flex gap-8">
              {renderedItemsWithSubEntities.length ? (
                <div
                  className="flex justify-between gap-8 flex-wrap
              "
                >
                  {renderedItemsWithSubEntities}
                </div>
              ) : (
                ""
              )}

              {renderedItemsWithSubEntities.length ? (
                <div className="col-span-1">
                  {renderedItemsWithoutSubEntities}
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Megamenu;
