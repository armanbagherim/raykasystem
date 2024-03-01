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
import GenericInput from "../_components/GenericInput";
import DataGridLite from "../_components/inventories/Datagrid";

export default function page() {
  const [open, setOpen] = useState(false);

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
  const [attributes, setAttributes] = useState();
  const [openTab, setOpenTab] = useState(1);
  const [requestBody, setRequestBody] = useState({
    title: "",
    slug: "",
    entityTypeId: "",
    publishStatusId: "",
    brandId: "",
    description: "",
    colorBased: true,
    photos: [
      {
        id: "",
      },
    ],
    attributes: [],
    inventories: [
      // {
      //   id: "",
      //   vendorId: "",
      //   colorId: "",
      //   guaranteeId: "",
      //   guaranteeMonthId: "",
      //   buyPrice: "",
      //   onlyProvinceId: "",
      //   qty: "",
      //   vendorAddressId: "",
      //   weight: "",
      //   description: "",
      //   firstPrice: "",
      //   secondaryPrice: "",
      // },
    ],
  });

  const [tempInventory, setTempInventory] = useState({
    id: 0,
    vendorId: 0,
    colorId: 0,
    guaranteeId: 0,
    guaranteeMonthId: 0,
    buyPrice: 0,
    onlyProvinceId: 0,
    qty: 0,
    vendorAddressId: 0,
    weight: 0,
    description: "string",
    firstPrice: 0,
    secondaryPrice: 0,
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
      setRequestBody({
        ...requestBody,
        entityTypeId: parentEntityTypes.result[0].id,
      });
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

  const handleAttributeChange = (id, value) => {
    console.log(id, value);

    // Convert both id and attribute.id to strings for comparison
    const existingAttribute = requestBody.attributes.find(
      (attr) => String(attr.id) === String(id)
    );
    console.log(existingAttribute);

    if (existingAttribute) {
      setRequestBody((prevState) => ({
        ...prevState,
        attributes: prevState.attributes.map((attr) =>
          String(attr.id) === String(id) ? { ...attr, val: value } : attr
        ),
      }));
    } else {
      setRequestBody((prevState) => ({
        ...prevState,
        attributes: [...prevState.attributes, { id, val: value }],
      }));
    }
  };

  const handleInventoryCreate = () => {
    setRequestBody((prevState) => ({
      ...prevState,
      inventories: [...prevState.inventories, tempInventory],
    }));
    setTempInventory({});
    setOpen(false);
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
            onChange={(e) =>
              setRequestBody({ ...requestBody, title: e.target.value })
            }
            required
            id="standard-basic"
            label="نام محصول"
            variant="standard"
          />
        </div>
        <div className="flex-1">
          <TextField
            onChange={(e) =>
              setRequestBody({ ...requestBody, slug: e.target.value })
            }
            required
            id="standard-basic"
            label="لینک محصول"
            variant="standard"
          />
        </div>
        <SelectSearch
          loadingState={brandsIsLoading}
          data={brands?.result}
          label="برند"
          onChange={(e) => setRequestBody({ ...requestBody, brandId: e })}
        />
        <SelectSearch
          loadingState={publishStatusesIsLoading}
          data={publishStatuses?.result}
          label="وضعیت انتشار"
          onChange={(e) =>
            setRequestBody({ ...requestBody, publishStatusId: e })
          }
        />
        <div className="flex-1">
          {parentEntityTypesIsLoading ? (
            "loading"
          ) : (
            <NestedSelect
              data={parentEntityTypes?.result}
              onChange={(e) => {
                setEntityTypeId(e.target.value);
                setRequestBody({
                  ...requestBody,
                  entityTypeId: +e.target.value,
                });
              }}
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
                checked={requestBody.colorBased}
                onChange={(e) =>
                  setRequestBody({
                    ...requestBody,
                    colorBased: !requestBody.colorBased,
                  })
                }
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
                              const isValueBased =
                                value.attributeType.valueBased;
                              const label = value.name;
                              const options = isValueBased
                                ? value.attributeValues
                                : [];
                              const valueType = isValueBased
                                ? "select"
                                : "text";

                              {
                                return (
                                  <GenericInput
                                    key={index}
                                    type={valueType}
                                    value={value.val}
                                    onChange={(e) =>
                                      handleAttributeChange(value.id, e)
                                    }
                                    options={options}
                                    label={label}
                                  />
                                );
                              }
                            })
                          : "loading"}
                      </div>
                      <div
                        className={openTab === 2 ? "block" : "hidden"}
                        id="link2"
                      >
                        <Button
                          className="!mb-6"
                          fullWidth
                          variant="contained"
                          onClick={handleClickOpen}
                        >
                          افزودن موجودی جدید
                        </Button>
                        <DataGridLite data={requestBody.inventories} />
                        <Dialog open={open} onClose={handleClose}>
                          <DialogTitle>ساخت موجودی</DialogTitle>
                          <DialogContent className="w-full">
                            <SelectSearch
                              loadingState={userVendorsIsLoading}
                              data={userVendors?.result}
                              onChange={(e) =>
                                setTempInventory({
                                  ...tempInventory,
                                  vendorId: e,
                                })
                              }
                            />
                            <SelectSearch
                              loadingState={false}
                              data={vendorAddresses}
                              isDiff={true}
                              diffName={"address.name"}
                              onChange={(e) =>
                                setTempInventory({
                                  ...tempInventory,
                                  vendorAddressId: e,
                                })
                              }
                            />

                            <SelectSearch
                              loadingState={colorsIsLoading}
                              data={colors?.result}
                              onChange={(e) =>
                                setTempInventory({
                                  ...tempInventory,
                                  colorId: e,
                                })
                              }
                            />

                            <SelectSearch
                              loadingState={guaranteesIsLoading}
                              data={guarantees?.result}
                              onChange={(e) =>
                                setTempInventory({
                                  ...tempInventory,
                                  guaranteeId: e,
                                })
                              }
                            />
                            <SelectSearch
                              loadingState={guaranteeMonthIsLoading}
                              data={guaranteeMonth?.result}
                              onChange={(e) =>
                                setTempInventory({
                                  ...tempInventory,
                                  guaranteeMonthId: e,
                                })
                              }
                            />

                            <div className="flex gap-4">
                              <div className="flex-1">
                                <TextField
                                  required
                                  id="standard-basic"
                                  label="تعداد"
                                  variant="standard"
                                  onChange={(e) =>
                                    setTempInventory({
                                      ...tempInventory,
                                      qty: e.target.value,
                                    })
                                  }
                                />
                              </div>
                              <div className="flex-1">
                                <TextField
                                  required
                                  id="standard-basic"
                                  label="قیمت خرید"
                                  variant="standard"
                                  onChange={(e) =>
                                    setTempInventory({
                                      ...tempInventory,
                                      buyPrice: e.target.value,
                                    })
                                  }
                                />
                              </div>
                            </div>
                            <div className="flex gap-4" dir="rtl">
                              <div className="flex-1">
                                <TextField
                                  required
                                  id="standard-basic"
                                  label="قیمت اول"
                                  variant="standard"
                                  onChange={(e) =>
                                    setTempInventory({
                                      ...tempInventory,
                                      firstPrice: e.target.value,
                                    })
                                  }
                                />
                              </div>
                              <div className="flex-1">
                                <TextField
                                  required
                                  id="standard-basic"
                                  label="قیمت دوم"
                                  variant="standard"
                                  onChange={(e) =>
                                    setTempInventory({
                                      ...tempInventory,
                                      secondaryPrice: e.target.value,
                                    })
                                  }
                                />
                              </div>
                            </div>
                          </DialogContent>
                          <DialogActions className="flex w-full justify-between">
                            <Button
                              variant="standard"
                              color="error"
                              onClick={() => setOpen(false)}
                            >
                              لغو
                            </Button>
                            <Button
                              variant="standard"
                              color="success"
                              autoFocus
                              onClick={(e) => handleInventoryCreate()}
                            >
                              ثبت
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
          onClick={(e) => console.log(requestBody)}
          className="bg-blue-700 w-full mt-6 text-white px-6 hover:bg-transparent hover:border hover:border-blue-700 hover:text-blue-700 transition-all py-3 border border-transparent rounded-xl"
        >
          ساخت محصول
        </button>
      </aside>
    </div>
  );
}
