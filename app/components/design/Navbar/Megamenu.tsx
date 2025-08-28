"use client";
import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const Megamenu = ({ items }) => {
  const [activeSubEntities, setActiveSubEntities] = useState([]);
  const [groupName, setGroupName] = useState();

  useEffect(() => {
    if (items && items.length > 0) {
      setActiveSubEntities(items[0].subEntityTypes || []);
      setGroupName(items[0].name);
    }
  }, [items]);

  // Sort subEntities by number of subEntityTypes (descending)
  const sortedSubEntities = [...activeSubEntities].sort(
    (a, b) => (b.subEntityTypes?.length || 0) - (a.subEntityTypes?.length || 0)
  );

  // Separate items with and without subEntityTypes
  const itemsWithSubEntities = sortedSubEntities.filter(
    (item) => item.subEntityTypes && item.subEntityTypes.length > 0
  );
  const itemsWithoutSubEntities = sortedSubEntities.filter(
    (item) => !item.subEntityTypes || item.subEntityTypes.length === 0
  );

  const renderSubEntities = (subEntities, isGrid = false) => {
    return subEntities.map((item) => (
      <div
        key={item.id}
        className={`mb-4 ${isGrid ? "" : "flex-1 min-w-[140px] max-w-[200px]"
          } break-inside-avoid`}
      >
        <Link
          href={`/category/${item.slug}`}
          className="flex items-start gap-2 py-2 px-3rounded-lg transition-colors duration-200"
        >
          {item.attachment?.fileName ? (
            <Image
              alt={item.name}
              width={32}
              height={32}
              className="w-8 h-8 p-1 border border-primary rounded-full object-contain"
              src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/entitytypes/${item.attachment.fileName}`}
            />
          ) : (
            <div className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full border border-primary p-1">
              <svg
                className="w-6 h-6 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 3h18M3 9h18M3 15h18M3 21h18"
                />
              </svg>
            </div>
          )}
          <div className="flex-1 relative">
            <h4 className="text-sm font-semibold text-gray-800 hover:text-primary mb-4 transition-colors">
              {item.name}
            </h4>
            {item.subEntityTypes && item.subEntityTypes.length > 0 ? (
              <div className="mt-2 space-y-1">
                {item.subEntityTypes.map((nestedSubEntity) => (
                  <Link
                    key={nestedSubEntity.id}
                    href={`/category/${nestedSubEntity.slug}`}
                    className="block text-[15px] text-gray-600 hover:text-primary pl-4 relative"
                  >
                    <span className="w-2 h-2 rounded-full absolute -right-[25px] top-2 bg-primary"></span>
                    {nestedSubEntity.name}
                  </Link>
                ))}
              </div>
            ) : null}
          </div>
        </Link>
      </div>
    ));
  };

  return (
    <div
      onMouseEnter={(e) => e.stopPropagation()}
      className="absolute z-50 top-12 right-0 bg-white/75 backdrop-blur-xl rounded-3xl shadow-2xl w-[90vw] max-w-5xl hidden group-hover:md:block"
    >
      <div className="flex p-6">
        {/* Sidebar: Top-level categories */}
        <div className="w-1/4  border-l border-gray-200">
          <h3 className="text-lg font-bold text-gray-900 mb-4 text-right">
            دسته‌بندی‌ها
          </h3>
          <div className="space-y-1">
            {items.map((value) => (
              <div key={value.id} className="py-2 px-0">
                <Link
                  href={`/category/${value.slug}`}
                  onMouseEnter={() => {
                    setActiveSubEntities(value.subEntityTypes || []);
                    setGroupName(value.name);
                  }}
                  className={`block text-sm font-medium rounded-lg transition-all duration-200 text-right ${groupName === value.name
                    ? "bg-primary/10 text-primary border-r-4 border-primary"
                    : "text-gray-700 hover:bg-gray-100 hover:text-primary"
                    }`}
                >
                  <div className="flex items-center gap-2 py-3 px-4">
                    {value.attachment?.fileName ? (
                      <Image
                        alt={value.name}
                        width={24}
                        height={24}
                        className="w-6 h-6 rounded-full border border-primary"
                        src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/entitytypes/${value.attachment.fileName}`}
                      />
                    ) : (
                      <div className="w-6 h-6 flex items-center justify-center bg-gray-100 rounded-full border border-primary p-1">
                        <svg
                          className="w-4 h-4 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M3 3h18M3 9h18M3 15h18M3 21h18"
                          />
                        </svg>
                      </div>
                    )}
                    <span>{value.name}</span>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Main content: Subcategories */}
        <div className="w-3/4 pl-4">
          <h3 className="text-lg font-bold text-gray-900 mb-4 text-right pr-4">
            {groupName}
          </h3>
          {activeSubEntities.length > 0 ? (
            <div className="space-y-4 px-4">
              {/* Flex layout for items with subEntityTypes */}
              {itemsWithSubEntities.length > 0 && (
                <div className="flex flex-wrap gap-4">
                  {renderSubEntities(itemsWithSubEntities)}
                </div>
              )}
              {/* Grid layout for items without subEntityTypes */}
              {itemsWithoutSubEntities.length > 0 && (
                <div
                  className={`${itemsWithoutSubEntities.length > 6
                    ? "columns-4"
                    : "columns-3"
                    } gap-4`}
                >
                  {renderSubEntities(itemsWithoutSubEntities, true)}
                </div>
              )}
            </div>
          ) : (
            <p className="text-sm text-gray-500 text-right pr-4">
              هیچ زیرمجموعه‌ای موجود نیست
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Megamenu;
