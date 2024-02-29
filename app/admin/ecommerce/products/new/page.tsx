"use client";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { fetcher, useFetcher } from "@/app/components/global/fetcher";
import SelectSearch from "@/app/components/global/SearchSelect";
import { toast } from "react-toastify";
import { useAtom } from "jotai";
import { pageTitle } from "../../../layout";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Switch,
  TextField,
} from "@mui/material";
import ProductUploader from "../_components/ProductUploader";
import SeoBox from "../_components/SeoBox";
import NestedSelect from "../_components/NestedSelect";

export default function page() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [title, setTitle] = useAtom(pageTitle);

  const [entityTypeId, setEntityTypeId] = useState();
  const [vendorId, setVendorId] = useState();
  const [vendorAddresses, setVendorAddresses] = useState();
  const [photos, setPhotos] = useState([]);
  const [isColoBased, setIsColoBased] = useState(false);
  const [name, setName] = useState();
  const [slug, setSlug] = useState();
  const [attributes, setAttributes] = useState();
  const router = useRouter();
  const [openTab, setOpenTab] = useState(1);

  const [seoAnalysis, setSeoAnalysis] = useState({
    charCount: 0,
    keywordCount: 0,
    keywordDensity: 0,
  });

  useEffect(() => {
    setTitle({
      title: "افزودن برند جدید",
      buttonTitle: "",
      link: "",
    });
  }, []);

  // Fetch Requests
  const {
    data: parentEntityTypes,
    isLoading: parentEntityTypesIsLoading,
    error: parentEntityTypesError,
  } = useFetcher(
    `/v1/api/eav/admin/entityTypes?sortOrder=ASC&entityModelId=1&ignoreChilds=true&ignorePaging=true`,
    "GET"
  );

  // VENDORS -------------------------------------------------------------------
  const {
    data: userVendors,
    isLoading: userVendorsIsLoading,
    error: userVendorsError,
  } = useFetcher(
    `/v1/api/ecommerce/user/vendors?sortOrder=ASC&offset=0&limit=10&orderBy=id`,
    "GET"
  );

  const fetchVendorAddresses = async (id) => {
    await fetcher({
      url: `/v1/api/ecommerce/vendorAddresses?sortOrder=ASC&offset=0&limit=10&orderBy=id&vendorId=${id}`,
      method: "GET",
    }).then((res) => {
      setVendorAddresses(res.result);
    });
  };

  useEffect(() => {
    if (!userVendorsIsLoading) {
      setVendorId(userVendors.result[0].id);
      fetchVendorAddresses(userVendors.result[0].id);
    }
  }, [userVendorsIsLoading]);

  useEffect(() => {
    if (vendorId) fetchVendorAddresses(vendorId);
  }, [vendorId]);

  // VENDORS -------------------------------------------------------------------

  const {
    data: colors,
    isLoading: colorsIsLoading,
    error: colorsError,
  } = useFetcher(
    `/v1/api/ecommerce/colors?sortOrder=ASC&offset=0&limit=10&orderBy=id&ignorePaging=true`,
    "GET"
  );

  const {
    data: guarantees,
    isLoading: guaranteesIsLoading,
    error: guaranteesError,
  } = useFetcher(
    `/v1/api/ecommerce/guarantees?sortOrder=ASC&offset=0&limit=10&orderBy=id&ignorePaging=true`,
    "GET"
  );

  const {
    data: guaranteeMonth,
    isLoading: guaranteeMonthIsLoading,
    error: guaranteeMonthError,
  } = useFetcher(`/v1/api/ecommerce/guaranteeMonths`, "GET");

  useEffect(() => {
    if (!parentEntityTypesIsLoading) {
      setEntityTypeId(parentEntityTypes.result[0].id);
      fetchAttributes(parentEntityTypes.result[0].id);
    }
  }, [parentEntityTypesIsLoading]);

  useEffect(() => {
    if (entityTypeId) fetchAttributes(entityTypeId);
  }, [entityTypeId]);

  const {
    data: publishStatuses,
    isLoading: publishStatusesIsLoading,
    error: publishStatusesError,
  } = useFetcher(`/v1/api/ecommerce/publishStatuses`, "GET");

  const {
    data: brands,
    isLoading: brandsIsLoading,
    error: brandsError,
  } = useFetcher(
    `/v1/api/ecommerce/brands?sortOrder=ASC&offset=0&limit=0&orderBy=id&ignorePaging=true`,
    "GET"
  );

  const fetchAttributes = async (id) => {
    await fetcher({
      url: `/v1/api/eav/admin/attributes?sortOrder=ASC&offset=0&limit=10&orderBy=id&ignorePaging=false&entityTypeId=${id}`,
      method: "GET",
    }).then((res) => {
      setAttributes(res.result);
    });
  };

  // const saveBrand = async () => {
  //   try {
  //     const req = await fetcher({
  //       url: "/v1/api/ecommerce/brands",
  //       method: "POST",
  //       body: {
  //         name,
  //         slug,
  //       },
  //     });
  //     toast.success("موفق");
  //     setTimeout(() => {
  //       router.push("/admin/ecommerce/brands");
  //     }, 2000);
  //   } catch (error) {
  //     toast.error(error.message);
  //   }
  // };
  return (
    <div className="grid grid-cols-4 gap-4">
      <div className="flex gap-4 col-span-3 flex-wrap">
        <div className="flex-1">
          <TextField
            onChange={(e) => setName(e.target.value)}
            required
            id="outlined-basic"
            label="نام محصول"
            variant="outlined"
          />
        </div>
        <div className="flex-1">
          <TextField
            onChange={(e) => setSlug(e.target.value)}
            required
            id="outlined-basic"
            label="لینک محصول"
            variant="outlined"
          />
        </div>
        <SelectSearch loadingState={brandsIsLoading} data={brands?.result} />
        <SelectSearch
          loadingState={publishStatusesIsLoading}
          data={publishStatuses?.result}
        />
        <div className="flex-1">
          {parentEntityTypesIsLoading ? (
            "loading"
          ) : (
            <NestedSelect
              data={parentEntityTypes?.result}
              onChange={(e) => setEntityTypeId(e.target.value)}
            />
          )}
        </div>

        <div className="flex w-full">
          <div className="flex-1">
            <label className="inline-flex items-center cursor-pointer">
              <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                فروش بر اساس رنگ؟
              </span>
              <Switch
                checked={isColoBased}
                onChange={(e) => setIsColoBased(!isColoBased)}
                inputProps={{ "aria-label": "controlled" }}
              />
            </label>
          </div>
        </div>

        <div className="flex-shrink-0 flex-grow-0 mb-6 w-full">
          <>
            <div className="flex flex-wrap">
              <div className="w-full">
                <ul
                  className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row"
                  role="tablist"
                >
                  <li className="-mb-px mr-2 first:mr-0 flex-auto text-center">
                    <a
                      className={
                        "text-sm uppercase px-5 py-3 border border-gray-200 rounded-lg block leading-normal " +
                        (openTab === 1
                          ? "text-white bg-blue-600"
                          : "text-blue-600 bg-white")
                      }
                      onClick={(e) => {
                        e.preventDefault();
                        setOpenTab(1);
                      }}
                      data-toggle="tab"
                      href="#link1"
                      role="tablist"
                    >
                      ویژگی ها
                    </a>
                  </li>
                  <li className="-mb-px mr-2 first:mr-0 flex-auto text-center">
                    <a
                      className={
                        "text-sm uppercase px-5 py-3 border border-gray-200 rounded-lg block leading-normal " +
                        (openTab === 2
                          ? "text-white bg-blue-600"
                          : "text-blue-600 bg-white")
                      }
                      onClick={(e) => {
                        e.preventDefault();
                        setOpenTab(2);
                      }}
                      data-toggle="tab"
                      href="#link2"
                      role="tablist"
                    >
                      موجودی ها
                    </a>
                  </li>
                  <li className="-mb-px mr-2 first:mr-0 flex-auto text-center">
                    <a
                      className={
                        "text-sm uppercase px-5 py-3 border border-gray-200 rounded-lg block leading-normal " +
                        (openTab === 3
                          ? "text-white bg-blue-600"
                          : "text-blue-600 bg-white")
                      }
                      onClick={(e) => {
                        e.preventDefault();
                        setOpenTab(3);
                      }}
                      data-toggle="tab"
                      href="#link3"
                      role="tablist"
                    >
                      موتور های جست و جو
                    </a>
                  </li>
                </ul>
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 border border-gray-200 rounded">
                  <div className="px-4 py-5 flex-auto">
                    <div className="tab-content tab-space">
                      <div
                        className={openTab === 1 ? "block" : "hidden"}
                        id="link1"
                      >
                        {entityTypeId
                          ? attributes?.map((value, index) => {
                              return value.attributeType.valueBased ? (
                                <div className="flex-1">
                                  <label
                                    htmlFor="first_name"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                  >
                                    {value.name}
                                  </label>
                                  <select
                                    className="bg-gray-50 border mb-6 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    key={index}
                                    name=""
                                    id=""
                                  >
                                    {value.attributeValues.map(
                                      (values, idx) => (
                                        <option key={idx} value="">
                                          {values.value}
                                        </option>
                                      )
                                    )}
                                  </select>
                                </div>
                              ) : (
                                <div className="flex-1">
                                  <TextField
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                    id="outlined-basic"
                                    label={value.name}
                                    variant="outlined"
                                    fullWidth
                                  />
                                </div>
                              );
                            })
                          : "loading"}
                      </div>
                      <div
                        className={openTab === 2 ? "block" : "hidden"}
                        id="link2"
                      >
                        <Button variant="outlined" onClick={handleClickOpen}>
                          افزودن موجودی جدید
                        </Button>
                        <Dialog open={open} onClose={handleClose}>
                          <DialogTitle>ساخت موجودی</DialogTitle>
                          <DialogContent className="w-full">
                            <SelectSearch
                              loadingState={userVendorsIsLoading}
                              data={userVendors?.result}
                            />
                            <SelectSearch
                              loadingState={false}
                              data={vendorAddresses}
                              isDiff={true}
                            />

                            <SelectSearch
                              loadingState={colorsIsLoading}
                              data={colors?.result}
                            />

                            <SelectSearch
                              loadingState={guaranteesIsLoading}
                              data={guarantees?.result}
                            />
                            <SelectSearch
                              loadingState={guaranteeMonthIsLoading}
                              data={guaranteeMonth?.result}
                            />

                            <div className="flex gap-4">
                              <div className="flex-1">
                                <TextField
                                  onChange={(e) => setSlug(e.target.value)}
                                  required
                                  id="outlined-basic"
                                  label="تعداد"
                                  variant="outlined"
                                />
                              </div>
                              <div className="flex-1">
                                <TextField
                                  onChange={(e) => setSlug(e.target.value)}
                                  required
                                  id="outlined-basic"
                                  label="قیمت خرید"
                                  variant="outlined"
                                />
                              </div>
                            </div>
                            <div className="flex gap-4" dir="rtl">
                              <div className="flex-1">
                                <TextField
                                  onChange={(e) => setSlug(e.target.value)}
                                  required
                                  id="outlined-basic"
                                  label="قیمت اول"
                                  variant="outlined"
                                />
                              </div>
                              <div className="flex-1">
                                <TextField
                                  onChange={(e) => setSlug(e.target.value)}
                                  required
                                  id="outlined-basic"
                                  label="قیمت دوم"
                                  variant="outlined"
                                  onChange={(e) => setSlug(e.target.value)}
                                />
                              </div>
                            </div>
                          </DialogContent>
                          <DialogActions className="flex w-full justify-between">
                            <Button
                              variant="outlined"
                              color="error"
                              onClick={() => setOpen(false)}
                            >
                              لغو
                            </Button>
                            <Button
                              variant="outlined"
                              color="success"
                              autoFocus
                            >
                              آپلود
                            </Button>
                          </DialogActions>
                        </Dialog>
                      </div>
                      <div
                        className={openTab === 3 ? "block" : "hidden"}
                        id="link3"
                      >
                        <SeoBox />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        </div>
      </div>

      <aside className="w-full bg-slate-100 rounded-xl p-4 col-span-1 flex items-center justify-start flex-col">
        <ProductUploader setPhotos={setPhotos} photos={photos} />

        <button
          onClick={(e) => console.log(entityTypeId)}
          className="bg-blue-700 w-full mt-6 text-white px-6 hover:bg-transparent hover:border hover:border-blue-700 hover:text-blue-700 transition-all py-3 border border-transparent rounded-xl"
        >
          ساخت محصول
        </button>
      </aside>
    </div>
  );
}
