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
  Typography,
} from "@mui/material";
import { GridArrowDownwardIcon } from "@mui/x-data-grid";
import React, { useEffect, useState, useTransition } from "react";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";
import type { ChangeEvent } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { flatten } from "q-flat";
import ClientLoading from "@/app/components/global/ClientLoading";

function valuetext(value) {
  return `${value}`;
}

const Sidebar = ({ brands, colors, attributes, guarantees, range }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const minDistance = 10;
  const [isPending, startTransition] = useTransition();
  const [selectedAttributes, setSelectedAttributes] = useState([]);
  const [firstLoad, setfirstLoad] = useState(true);
  const [value, setValue] = useState([0, range.maxPrice]);
  const [isOpen, setIsOpen] = useState(false);
  const onSelect = (
    event: ChangeEvent<HTMLSelectElement>,
    type: string,
    items: object // Assuming items is an object
  ) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    let value = event.target ? event.target.value.trim() : event;

    // Check if the type is related to price parameters
    if (type === "minPrice" || type === "maxPrice") {
      // Directly set the value for the specified type
      current.set(type, value);
    } else {
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
    let query = current.toString();
    console.log(attributesIndex);
    // if (attributesIndex !== -1) {
    //   // Insert the new parameters before &attributes
    //   query =
    //     query.slice(0, attributesIndex) +
    //     `&${type}=${value}` +
    //     query.slice(attributesIndex);
    // } else {
    //   // Append the new parameters to the end of the URL
    //   query += `&${type}=${value}`;
    // }

    query = query ? `?${query}` : "";

    startTransition(() => {
      router.push(`${pathname}${query}`);
    });
  };
  const updateAttrSlug = (obj) => {
    console.log(obj);
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

    console.log(createQueryString(flatten(objs)));
  };

  // const isInitialMount = useRef(true);

  useEffect(() => {
    if (!firstLoad) {
      console.log(selectedAttributes);
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
        updatedAttributes[existingIndex] = {
          ...updatedAttributes[existingIndex],
          attributeValues: [
            ...updatedAttributes[existingIndex].attributeValues,
            valueId,
          ],
        };
        setSelectedAttributes(updatedAttributes);
      }
    } else {
      // If the checkbox is unchecked, remove the value from the attribute's values array
      if (existingIndex !== -1) {
        const updatedAttributes = [...selectedAttributes];
        updatedAttributes[existingIndex] = {
          ...updatedAttributes[existingIndex],
          attributeValues: updatedAttributes[
            existingIndex
          ].attributeValues.filter((val) => val !== valueId),
        };

        // Check if the attributeValues array is now empty
        if (updatedAttributes[existingIndex].attributeValues.length === 0) {
          // Remove the entire object from the selectedAttributes array
          // Create a new array without the item to be removed
          const newAttributes = updatedAttributes.filter(
            (_, index) => index !== existingIndex
          );
          setSelectedAttributes(newAttributes);
        } else {
          setSelectedAttributes([]);
        }
      }
    }
  };

  const debounce = (func, timeout = 1000) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(this, args);
      }, timeout);
    };
  };
  const debouncedOnSelect = debounce(onSelect, 1000);

  const handleChange = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      let min = [Math.min(newValue[0], value[1] - minDistance), value[1]];
      setValue(min);
      debouncedOnSelect(min[0], "minPrice");
      console.log(min);
    } else {
      let max = [value[0], Math.max(newValue[1], value[0] + minDistance)];
      setValue(max);
      debouncedOnSelect(max[1], "maxPrice");
    }
  };

  return (
    <>
      <div className="flex  md:hidden fixed bottom-28 right-5 bg-primary w-12 h-12 justify-center rounded-xl">
        <button onClick={(e) => setIsOpen(true)} className="">
          <Sorticon stroke="white" />
        </button>
      </div>
      {isPending && (
        <div className="bg-[#fffffff0] fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
          <ClientLoading />
        </div>
      )}

      <div
        className={`md:block col-span-3 p-4 fixed top-0 left-0 w-full h-full md:w-auto md:h-auto md:static  bg-white ${
          isOpen ? "block" : "hidden"
        }`}
      >
        <div className="relative h-4/5 overflow-y-scroll px-4 md:px-0 mb-3 md:overflow-y-hidden">
          <div
            className="mb-6 flex justify-between items-center md:hidden"
            onClick={(e) => setIsOpen(false)}
          >
            <span>
              <Close />
            </span>
          </div>
          <Accordion
            defaultExpanded
            className="bg-[#F8F8F8] border border-[#E7E7E7] mb-3 !rounded-2xl no-before py-2"
          >
            <AccordionSummary
              expandIcon={<PlusSmall />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <Typography>برند</Typography>
            </AccordionSummary>
            <AccordionDetails className="bg-white border-0">
              <div className=" overflow-y-scroll max-h-52 font-normal text-md">
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
                      />
                    </span>
                  </div>
                ))}
              </div>
            </AccordionDetails>
          </Accordion>

          <Accordion className="bg-[#F8F8F8] border border-[#E7E7E7] mb-3 !rounded-2xl no-before py-2">
            <AccordionSummary
              expandIcon={<GridArrowDownwardIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <Typography>گارانتی</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {guarantees.map((value, key) => (
                <div key={key} className="p-2 grid grid-cols-2">
                  <label htmlFor={value.name + value.id} className="col-span-1">
                    {value.name}
                  </label>
                  <span className="col-span-1 flex justify-end">
                    <input id={value.name + value.id} type="checkbox" />
                  </span>
                </div>
              ))}
            </AccordionDetails>
          </Accordion>

          <Accordion className="bg-[#F8F8F8] border border-[#E7E7E7] mb-3 !rounded-2xl no-before py-2">
            <AccordionSummary
              expandIcon={<GridArrowDownwardIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <Typography>قیمت</Typography>
            </AccordionSummary>
            <AccordionDetails className="px-8">
              <Slider
                getAriaLabel={() => "Minimum distance"}
                value={value}
                min={0}
                max={range.maxPrice}
                onChange={handleChange}
                valueLabelDisplay="auto"
                getAriaValueText={valuetext}
                disableSwap={true}
                color="success"
                step={Math.round(range.maxPrice / 10)}
                mark={true}
                valueLabelFormat={(value) => value.toLocaleString()}
              />
              <div className="w-full flex justify-between">
                <span className="max">
                  {Number(value[1]).toLocaleString() ||
                    Number(range.maxPrice).toLocaleString()}
                </span>
                <span className="min">0</span>
              </div>
            </AccordionDetails>
          </Accordion>
          {attributes.map((value, key) => (
            <Accordion
              key={key}
              className="bg-[#F8F8F8] border border-[#E7E7E7] mb-3 !rounded-2xl no-before py-2"
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
          ))}

          <Accordion className="bg-[#F8F8F8] border border-[#E7E7E7] mb-3 !rounded-2xl no-before py-2">
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
                    className="grid grid-cols-4 pr-5 mt-3 font-normal text-md"
                  >
                    <label
                      htmlFor={value.name + value.hexCode}
                      className="col-span-3 flex gap-2 items-center my-auto"
                    >
                      <span
                        style={{ background: value.hexCode }}
                        className="w-7 h-7 rounded-lg"
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
                      />
                    </div>
                  </div>
                ))}
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
