"use client";

import {
  Addsquare,
  Close,
  Minussquare,
  PlusSmall,
  Searchicon,
  Sorticon,
} from "@/app/components/design/Icons";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Slider,
  Switch,
  Typography,
} from "@mui/material";
import { GridArrowDownwardIcon } from "@mui/x-data-grid";
import React, { useEffect, useState, useTransition } from "react";
import type { ChangeEvent } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { flatten } from "q-flat";
import ClientLoading from "@/app/components/global/ClientLoading";

function valuetext(value) {
  return `${value}`;
}

const Sidebar = ({
  brands,
  colors,
  attributes,
  guarantees,
  range,
  showAmazing = true,
}) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const minDistance = 10;
  const [isPending, startTransition] = useTransition();
  const [selectedAttributes, setSelectedAttributes] = useState([]);
  const [firstLoad, setfirstLoad] = useState(true);
  const [inStocks, setInStocks] = useState(false);
  const [amazings, setAmazings] = useState(false);
  const [value, setValue] = useState([
    searchParams.get("minPrice") === null || ""
      ? 0
      : searchParams.get("minPrice"),
    searchParams.get("maxPrice") === null || ""
      ? range.maxPrice
      : searchParams.get("maxPrice"),
  ]);

  const [isOpen, setIsOpen] = useState(false);

  const getQueryParamsAsObject = () => {
    const paramsObject = {};

    for (const [key, value] of searchParams.entries()) {
      if (key.startsWith("attributes")) {
        const parts = key.split(/$$|$$/);
        if (parts.length === 4) {
          const attributeIndex = parseInt(parts[1]);
          const attributeProperty = parts[2];

          if (!paramsObject.attributes) {
            paramsObject.attributes = [];
          }

          if (!paramsObject.attributes[attributeIndex]) {
            paramsObject.attributes[attributeIndex] = {};
          }

          paramsObject.attributes[attributeIndex][attributeProperty] = value;
        } else {
          paramsObject[key] = value;
        }
      } else {
        paramsObject[key] = value;
      }
    }

    return paramsObject;
  };

  const queryParamsObject = getQueryParamsAsObject();
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);

  useEffect(() => {
    const queryParamsObject = getQueryParamsAsObject(searchParams);

    // Handle colors
    const colorsFromParams = queryParamsObject.colors;
    if (colorsFromParams) {
      const colorsArray = Array.isArray(colorsFromParams)
        ? colorsFromParams
        : [colorsFromParams];
      const selectedColorObjects = colors.filter((color) =>
        colorsArray.includes(color.id.toString())
      );
      setSelectedColors(selectedColorObjects);
    }

    // Handle Amazings
    const discount = +queryParamsObject.discountTypeId;

    if (discount === 2) {
      setAmazings(true);
    }

    // Handle InStocks
    const stocks = +queryParamsObject.discountTypeId;

    if (stocks === 1) {
      setInStocks(true);
    }

    // Handle brands
    const brandsFromParams = queryParamsObject.brands;
    if (brandsFromParams) {
      const brandsArray = Array.isArray(brandsFromParams)
        ? brandsFromParams
        : [brandsFromParams];
      const selectedBrandObjects = brands.filter((brand) =>
        brandsArray.includes(brand.id.toString())
      );
      setSelectedBrands(selectedBrandObjects);
    }

    // Handle attributes
    const attributesFromParams = queryParamsObject.attributes;

    if (attributesFromParams) {
      const selectedAttributeObjects = attributesFromParams.map((attr) => ({
        attributeId: attr.attributeId,
        attributeValues: attr.attributeValues,
      }));
      setSelectedAttributes(selectedAttributeObjects);
    }
  }, [searchParams, colors, brands, attributes]);

  const onSelect = (
    event: ChangeEvent<HTMLSelectElement>,
    type: string,
    items: object // Assuming items is an object
  ) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    let value = event.target ? event.target.value.trim() : event;

    // Check if the type is related to price parameters
    if (type === "minMaxPrice") {
      // Directly set the value for the specified type
      current.set("minPrice", +value[0]);
      current.set("maxPrice", +value[1]);
    } else {
      if (type === "colors") {
        setSelectedColors(
          selectedColors.filter((color) => color.id.toString() !== value)
        );
      } else if (type === "brands") {
        setSelectedBrands(
          selectedBrands.filter((brand) => brand.id.toString() !== value)
        );
      }
      // Existing logic to handle brands and other types
      const currentItems = current.getAll(type);
      const itemIndex = currentItems.indexOf(value);
      if (itemIndex > -1) {
        currentItems.splice(itemIndex, 1);
        current.delete(type);
        currentItems.forEach((item) => current.append(type, item));
      } else if (value) {
        current.append(type, value);
      }
    }

    // Check if &attributes exists in the URL
    const attributesIndex = current.toString().indexOf("&attributes");
    current.set("offset", "0");
    let query = current.toString();

    query = query ? `?${query}` : "";

    startTransition(() => {
      router.push(`${pathname}${query}`);
    });
  };

  const handleChange = (event, newValue, activeThumb) => {
    if (activeThumb === 0) {
      // Adjusting the minimum price slider
      let min = [Math.max(newValue[0], 0), value[1]];
      setValue(min);
    } else {
      // Adjusting the maximum price slider
      let max = [value[0], Math.max(newValue[1], value[0] + minDistance)];
      setValue(max);
    }
  };

  const handleRequest = (event, newValue, activeThumb) => {
    setValue(newValue);
    onSelect(value, "minMaxPrice");
  };

  const updateAttrSlug = (obj) => {
    var objs = {
      attributes: obj,
    };

    const createQueryString = (data) => {
      return Object.keys(data)
        .map((key) => {
          let val = data[key];
          if (val !== null && typeof val === "object")
            val = createQueryString(val);
          return `${encodeURIComponent(key)}=${encodeURIComponent(val)}`;
        })
        .join("&");
    };

    // Get the current URL and its search parameters
    const currentUrl = new URL(window.location.href);
    const currentParams = new URLSearchParams(currentUrl.search);

    // Remove all existing attributes
    Array.from(currentParams.keys()).forEach((key) => {
      if (key.startsWith("attributes")) {
        currentParams.delete(key);
      }
    });

    // Create new parameters from the attributes object
    const newParams = new URLSearchParams(createQueryString(flatten(objs)));

    // Append new parameters to the current ones
    newParams.forEach((value, key) => {
      currentParams.append(key, value);
    });

    // Update the URL's search string with the new parameters
    const query = currentParams.toString()
      ? `?${currentParams.toString()}`
      : "";
    startTransition(() => {
      router.push(`${pathname}${query}`);
    });
  };

  // const isInitialMount = useRef(true);

  useEffect(() => {
    if (!firstLoad) {
      updateAttrSlug(selectedAttributes);
    }
  }, [selectedAttributes]); // Keep selectedAttributesVersion in the dependency array

  const attrChange = (event, attributes, values) => {
    setfirstLoad(false);
    const { checked } = event.target;
    const attributeId = attributes.id;
    const valueId = values.id;

    // Find the index of the existing attribute in the selectedAttributes array
    const existingIndex = selectedAttributes.findIndex(
      (attr) => attr.attributeId === attributeId
    );

    if (checked) {
      // If the attribute is not already in the array, add it
      if (existingIndex === -1) {
        setSelectedAttributes([
          ...selectedAttributes,
          { attributeId: attributeId, attributeValues: [valueId] },
        ]);
      } else {
        // If the attribute is already in the array, add the value to its values array
        const updatedAttributes = [...selectedAttributes];
        const existingAttribute = updatedAttributes[existingIndex];
        const existingValues = existingAttribute.attributeValues;

        // Check if the value is already in the array
        if (!existingValues.includes(valueId)) {
          updatedAttributes[existingIndex] = {
            ...existingAttribute,
            attributeValues: [...existingValues, valueId],
          };
          setSelectedAttributes(updatedAttributes);
        }
      }
    } else {
      // If the checkbox is unchecked, remove the value from the attribute's values array
      if (existingIndex !== -1) {
        const updatedAttributes = [...selectedAttributes];
        const existingAttribute = updatedAttributes[existingIndex];
        const existingValues = existingAttribute.attributeValues;

        // Remove the value from the array
        const newValues = existingValues.filter((val) => val !== valueId);

        if (newValues.length > 0) {
          // Update the attribute with the new values
          updatedAttributes[existingIndex] = {
            ...existingAttribute,
            attributeValues: newValues,
          };
          setSelectedAttributes(updatedAttributes);
        } else {
          // Remove the entire attribute from the array
          const newAttributes = updatedAttributes.filter(
            (_, index) => index !== existingIndex
          );
          setSelectedAttributes(newAttributes);
        }
      }
    }
  };

  return (
    <>
      <div className="flex md:hidden fixed bottom-28 right-5 bg-primary w-12 h-12 justify-center rounded-xl z-20">
        <button onClick={(e) => setIsOpen(true)} className="">
          <Sorticon stroke="white" />
        </button>
      </div>
      {isPending && (
        <div className="bg-[#fffffff0] fixed top-0 left-0 bottom-0 w-full h-full flex items-center justify-center z-50">
          <ClientLoading />
        </div>
      )}

      <div
        className={`md:block col-span-3 rounded-2xl p-4 fixed z-[30] top-0 left-0 w-full h-full md:w-auto md:h-auto md:static bg-white ${
          isOpen ? "block" : "hidden"
        }`}
      >
        <div className="relative h-[90%] md:h-full overflow-y-scroll px-4 md:px-0 mb-3 md:overflow-y-hidden">
          <div
            className="mb-6 flex justify-between items-center md:hidden"
            onClick={(e) => setIsOpen(false)}
          >
            <span>
              <Close />
            </span>
          </div>
          {brands?.length > 0 ? (
            <Accordion
              defaultExpanded
              className="bg-[#F8F8F8] border border-[#E7E7E7] !shadow-none mb-3 !rounded-2xl no-before py-0"
            >
              <AccordionSummary
                expandIcon={<PlusSmall />}
                aria-controls="panel1-content"
                id="panel1-header"
              >
                <Typography>برند</Typography>
              </AccordionSummary>
              <AccordionDetails className="bg-white border-0">
                <div className=" overflow-y-auto max-h-52 font-normal text-md custom-scroll">
                  {brands.map((value, key) => (
                    <div key={key} className="p-2 grid grid-cols-2">
                      <label
                        htmlFor={value.name + value.id}
                        className="col-span-1"
                      >
                        {value.name}
                      </label>
                      <span className="col-span-1 flex justify-end">
                        <input
                          onChange={(e) => onSelect(e, "brands")}
                          id={value.name + value.id}
                          value={value.id}
                          type="checkbox"
                          checked={selectedBrands.some(
                            (brand) => brand.id === value.id
                          )}
                        />
                      </span>
                    </div>
                  ))}
                </div>
              </AccordionDetails>
            </Accordion>
          ) : (
            ""
          )}

          <Accordion className="bg-[#F8F8F8] border border-[#E7E7E7] !shadow-none mb-3 !rounded-2xl no-before py-0">
            <AccordionSummary
              expandIcon={<GridArrowDownwardIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <Typography>قیمت</Typography>
            </AccordionSummary>
            <AccordionDetails className="px-8">
              <div className="rtl">
                <Slider
                  getAriaLabel={() => "Minimum distance"}
                  value={value}
                  min={0}
                  className="customSlider"
                  max={range.maxPrice}
                  onChange={handleChange}
                  onChangeCommitted={handleRequest}
                  valueLabelDisplay="auto"
                  getAriaValueText={valuetext}
                  disableSwap={true}
                  color="success"
                  step={Math.round(range.maxPrice / 10)}
                  mark={true}
                  valueLabelFormat={(value) => value.toLocaleString()}
                />
              </div>
              <div className="w-full flex justify-between">
                <span className="min">
                  {Number(value[0]).toLocaleString() ||
                    Number(range.minPrice).toLocaleString()}
                </span>
                <span className="max">
                  {Number(value[1]).toLocaleString() ||
                    Number(range.maxPrice).toLocaleString()}
                </span>
              </div>
            </AccordionDetails>
          </Accordion>
          {attributes
            ? attributes.map((value, key) => (
                <Accordion
                  key={key}
                  className="bg-[#F8F8F8] border border-[#E7E7E7] !shadow-none mb-3 !rounded-2xl no-before py-0"
                >
                  <AccordionSummary
                    expandIcon={<GridArrowDownwardIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                  >
                    <Typography>{value.name}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <>
                      {value.attributeValues.map((values, key) => (
                        <div
                          key={key}
                          className="grid grid-cols-4 pr-5 mt-3 font-normal text-md"
                        >
                          <label
                            htmlFor={values.id + values.value}
                            className="col-span-3 flex gap-2 items-center my-auto"
                          >
                            <span>{values.value}</span>
                          </label>
                          <div className="col-span-1 flex items-center my-auto justify-end">
                            <input
                              id={values.id + values.value}
                              className="flex justify-end mx-auto"
                              type="checkbox"
                              onChange={(e) => attrChange(e, value, values)}
                            />
                          </div>
                        </div>
                      ))}
                    </>
                  </AccordionDetails>
                </Accordion>
              ))
            : ""}
          {colors?.length > 0 ? (
            <Accordion className="bg-[#F8F8F8] border border-[#E7E7E7] !shadow-none mb-3 !rounded-2xl no-before py-0">
              <AccordionSummary
                expandIcon={<GridArrowDownwardIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
              >
                <Typography>رنگ</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <>
                  {colors.map((value, key) => (
                    <div
                      key={key}
                      className="grid grid-cols-4  mt-3 font-normal text-md"
                    >
                      <label
                        htmlFor={value.name + value.hexCode}
                        className="col-span-3 flex gap-2 items-center my-auto"
                      >
                        <span
                          style={{ background: value.hexCode }}
                          className="w-7 h-7 rounded-lg border border-gray-200"
                        ></span>
                        <span>{value.name}</span>
                      </label>
                      <div className="col-span-1 flex items-center my-auto justify-end">
                        <input
                          id={value.name + value.hexCode}
                          onChange={(e) => onSelect(e, "colors")}
                          className="flex justify-end mx-auto"
                          value={value.id}
                          type="checkbox"
                          checked={selectedColors.some(
                            (color) => color.id === value.id
                          )}
                        />
                      </div>
                    </div>
                  ))}
                </>
              </AccordionDetails>
            </Accordion>
          ) : (
            ""
          )}
          <Accordion
            defaultExpanded
            className="bg-[#F8F8F8] border border-[#E7E7E7] !shadow-none mb-3 !rounded-2xl no-before py-0"
          >
            <AccordionSummary
              expandIcon={<GridArrowDownwardIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <Typography>دیگر فیلتر ها</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <>
                {showAmazing ? (
                  <div className="flex items-center justify-between mb-4">
                    <span
                      onClick={(e) => {
                        setAmazings(!amazings);
                        onSelect("2", "discountTypeId");
                      }}
                      className="cursor-pointer"
                    >
                      فقط کالا های شگفت انگیز
                    </span>
                    <Switch
                      color="success"
                      checked={amazings}
                      onClick={(e) => {
                        setAmazings(!amazings);
                        onSelect("2", "discountTypeId");
                      }}
                    />
                  </div>
                ) : (
                  ""
                )}

                <div className="flex items-center justify-between">
                  <span
                    onClick={(e) => {
                      setInStocks(!inStocks);
                      onSelect("1", "inventoryStatusId");
                    }}
                    className="cursor-pointer"
                  >
                    فقط کالا های موجود
                  </span>
                  <Switch
                    color="success"
                    checked={inStocks}
                    onClick={(e) => {
                      setInStocks(!inStocks);
                      onSelect("1", "inventoryStatusId");
                    }}
                  />
                </div>
              </>
            </AccordionDetails>
          </Accordion>
        </div>
        <div className="px-4 block md:hidden">
          <button
            onClick={(e) => setIsOpen(false)}
            className="w-full bg-primary text-white p-5 rounded-2xl text-center"
          >
            اعمال تغییرات
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
