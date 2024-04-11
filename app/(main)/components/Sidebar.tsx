"use client";

import {
  Addsquare,
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
import React, { useState, useTransition } from "react";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";
import type { ChangeEvent } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
function valuetext(value) {
  return `${value}°C`;
}
const Sidebar = ({ brands, colors, attributes, guarantees }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const minDistance = 10;
  const [isPending, startTransition] = useTransition();

  const [value1, setValue1] = useState([20, 37]);

  const handleChange1 = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      setValue1([Math.min(newValue[0], value1[1] - minDistance), value1[1]]);
    } else {
      setValue1([value1[0], Math.max(newValue[1], value1[0] + minDistance)]);
    }
  };

  const [value2, setValue2] = useState([20, 37]);

  const handleChange2 = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (newValue[1] - newValue[0] < minDistance) {
      if (activeThumb === 0) {
        const clamped = Math.min(newValue[0], 100 - minDistance);
        setValue2([clamped, clamped + minDistance]);
      } else {
        const clamped = Math.max(newValue[1], minDistance);
        setValue2([clamped - minDistance, clamped]);
      }
    } else {
      setValue2(newValue);
    }
  };

  const onSelect = (
    event: ChangeEvent<HTMLSelectElement>,
    type: string,
    items: object // Assuming items is an object
  ) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    // const value = event.target.value.trim();

    // const currentBrands = current.getAll(type);
    // const brandIndex = currentBrands.indexOf(value);

    // if (brandIndex > -1) {
    //   currentBrands.splice(brandIndex, 1);
    //   current.delete(type);
    //   currentBrands.forEach((brand) => current.append(type, brand));
    // } else if (value) {
    //   current.append(type, value);
    // }

    // Define the object with attributes based on the items object
    const obj = [
      {
        attributeId: +items.attributeId,
        attributeValues: [+items.id],
      },
    ];

    // Convert the object to a JSON string and then encode it for URL
    const attributesQuery = encodeURIComponent(JSON.stringify(obj));
    console.log(attributesQuery);
    console.log(decodeURIComponent(JSON.stringify(obj)));
    // Append the encoded string to the URL query parameters
    current.append("attributes", attributesQuery);
    console.log(current.toString());

    const query = current.toString() ? `?${current.toString()}` : "";
    startTransition(() => {
      router.push(`${pathname}${query}`);
    });
  };

  return (
    <>
      {isPending && (
        <div className="bg-[#ffffffad] fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="rounded-md h-12 w-12 border-4 border-t-4 border-blue-500 animate-spin absolute"></div>
        </div>
      )}

      <div className="col-span-3 p-4">
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
                  <label htmlFor={value.name + value.id} className="col-span-1">
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
          <AccordionDetails>
            <Slider
              getAriaLabel={() => "Minimum distance"}
              value={value1}
              onChange={handleChange1}
              valueLabelDisplay="auto"
              getAriaValueText={valuetext}
              disableSwap
              color="success"
            />
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
                      {console.log(values)}
                      <span>{values.value}</span>
                    </label>
                    <div className="col-span-1 flex items-center my-auto justify-end">
                      <input
                        id={values.id + values.value}
                        className="flex justify-end mx-auto"
                        type="checkbox"
                        onChange={(e) => onSelect(e, attributes, values)}
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
            <Typography>Accordion 1</Typography>
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
        <Accordion className="bg-[#F8F8F8] border border-[#E7E7E7] mb-3 !rounded-2xl no-before py-2">
          <AccordionSummary
            expandIcon={<GridArrowDownwardIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <Typography>Accordion 1</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <>
              <div className="font-normal text-md">
                <div className="p-4 pt-0 mt-4 justify-center mx-auto">
                  <label className="grid grid-cols-3 inline-flex items-center cursor-pointer">
                    <span className="col-span-2 ms-3  text-gray-900 dark:text-gray-300">
                      فقط کالاهای موجود
                    </span>
                    <div className="col-span-1 justify-end mx-auto">
                      <input
                        type="checkbox"
                        value=""
                        className="sr-only peer"
                      />
                      <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    </div>
                  </label>
                </div>

                <div className="p-4 pt-0 mt-4 justify-center mx-auto">
                  <label className="grid grid-cols-3 inline-flex items-center cursor-pointer">
                    <span className="col-span-2 ms-3 text-gray-900 dark:text-gray-300">
                      آپشن تستی
                    </span>
                    <div className="col-span-1 justify-end mx-auto">
                      <input
                        type="checkbox"
                        value=""
                        className="sr-only peer"
                      />
                      <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    </div>
                  </label>
                </div>
              </div>
            </>
          </AccordionDetails>
        </Accordion>
      </div>
    </>
  );
};

export default Sidebar;
