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
import InventoriesDialouge from "../_components/inventories/InventoriesDialouge";

import Tab from "../_components/tabs/Tabs";
import Loading from "@/app/components/global/loading";

export default function page({ params }) {
  const { id } = params;
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const [activeSpace, setActiveSpace] = useState();
  const handleClickOpen = (id) => {
    setOpen(true);
    setActiveSpace(id);
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
  const [description, setDescription] = useState("");
  const [selectedEav, setSelectedEav] = useState();
  const [requestBody, setRequestBody] = useState({
    title: "",
    slug: "",
    entityTypeId: "",
    publishStatusId: "",
    brandId: "",
    description: description,
    colorBased: true,
    photos: photos,
    attributes: [],
    inventories: [],
  });
  const [inventories, setInventories] = useState([]);

  useEffect(() => {
    setTitle({
      title: "افزودن برند جدید",
      buttonTitle: "",
      link: "",
    });
  }, []);

  const {
    data: product,
    isLoading: productIsLoading,
    error: productError,
  } = useFetcher(`/v1/api/ecommerce/admin/products/${id}`, "GET");

  useEffect(() => {
    if (!productIsLoading) {
      setInventories(product.result.inventories);
      setEntityTypeId(product.result.entityTypeId);
      setSelectedEav(product.result.entityType.id);
      setRequestBody({
        ...requestBody,
        brandId: product.result.brandId,
        publishStatusId: product.result.publishStatus.id,
      });
      const attrs = product.result.productAttributeValues.map((attrValues) => {
        let id = attrValues.attributeId;
        let value = {
          id: attrValues.attributeValue
            ? attrValues.attributeValue.id
            : attrValues.val,
        };

        handleAttributeChange(id, value);
      });

      defaultInventories(product.result.inventories);
    }
  }, [product]);

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

  const {
    data: proviences,
    isLoading: proviencesIsLoading,
    error: proviencesError,
  } = useFetcher(`/v1/api/ecommerce/provinces`, "GET");

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
      url: `/v1/api/eav/admin/attributes?sortOrder=ASC&orderBy=id&ignorePaging=true&entityTypeId=${id}`,
      method: "GET",
    }).then((res) => {
      setAttributes(res.result);
    });
  };

  useEffect(() => {
    if (entityTypeId) fetchAttributes(entityTypeId);
  }, [entityTypeId]);

  const handleAttributeChange = (id, value) => {
    console.log(id, value.id);

    // Determine the type of value
    const actualValue = value.id !== undefined ? value.id : value;

    // Convert both id and attribute.id to strings for comparison
    const existingAttribute = requestBody.attributes.find(
      (attr) => Number(attr.id) === Number(id)
    );
    console.log(existingAttribute);

    if (existingAttribute) {
      setRequestBody((prevState) => ({
        ...prevState,
        attributes: prevState.attributes.map((attr) =>
          Number(attr.id) === Number(id) ? { ...attr, val: actualValue } : attr
        ),
      }));
    } else {
      setRequestBody((prevState) => ({
        ...prevState,
        attributes: [...prevState.attributes, { id: +id, val: actualValue }],
      }));
    }
  };

  const handleInventoryCreate = (data) => {
    console.log(data);
    setInventories((prevState) => [...prevState, data]);

    const {
      id,
      vendorName,
      VendorAddressName,
      colorName,
      guaranteeMonthName,
      guaranteeName,
      onlyProvinceName,
      ...cleanedTempInventory
    } = data;

    setRequestBody((prevState) => ({
      ...prevState,
      inventories: [...prevState.inventories, cleanedTempInventory],
    }));

    setOpen(false);
  };

  const removeInventory = (id) => {};

  const inventoryEdit = (id, data) => {};

  const defaultInventories = (data) => {
    if (data) {
      const dataArray = data.map((value) => ({
        id: value.id,
        vendorId: value.vendorId,
        colorId: value.colorId,
        guaranteeId: value.guaranteeId,
        guaranteeMonthId: value.guaranteeMonthId,
        weight: value.weight,
        buyPrice: value.buyPrice,
        onlyProvinceId: value.onlyProvinceId,
        qty: value.qty,
        vendorAddressId: value.vendorAddressId,
        description: value.description,
        firstPrice: value.firstPrice.price,
        secondaryPrice: value.secondaryPrice.price,
      }));
      console.log("dataArray: ", dataArray);
      // Assuming you want to add all items from dataArray to inventories
      setRequestBody((prevState) => ({
        ...prevState,
        inventories: [...prevState.inventories, ...dataArray],
      }));
    }
  };

  useEffect(() => {
    setRequestBody((prevState) => ({
      ...prevState,
      photos: photos,
    }));
  }, [photos]);

  useEffect(() => {
    setRequestBody((prevState) => ({
      ...prevState,
      description: description, // Update the description in requestBody
    }));
  }, [description]);

  const saveProduct = async () => {
    console.log(requestBody);
    try {
      const req = await fetcher({
        url: "/v1/api/ecommerce/admin/products",
        method: "POST",
        body: requestBody,
      });
      toast.success("موفق");
      setTimeout(() => {
        router.push("/admin/ecommerce/products");
      }, 2000);
    } catch (error) {
      toast.error(error.message);
    }
  };
  const defaultValueChecker = (value) => {
    let items = requestBody.attributes.filter((item) => item.id === +value.id);
    return items[0]?.val;
  };

  if (!attributes) {
    return <Loading />;
  }
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
          defaultValue={requestBody.brandId}
          onChange={(e) => setRequestBody({ ...requestBody, brandId: e.id })}
        />
        <SelectSearch
          loadingState={publishStatusesIsLoading}
          data={publishStatuses?.result}
          label="وضعیت انتشار"
          defaultValue={requestBody.publishStatusId}
          onChange={(e) =>
            setRequestBody({ ...requestBody, publishStatusId: e.id })
          }
        />
        <div className="flex-1">
          {parentEntityTypesIsLoading && !selectedEav ? (
            "در حال بارگزاری"
          ) : (
            <NestedSelect
              data={parentEntityTypes?.result}
              selected={selectedEav}
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
                  <Tab
                    activeTab={openTab}
                    tabName="ویژگی ها"
                    tabId={1}
                    setActiveTab={setOpenTab}
                  />
                  <Tab
                    activeTab={openTab}
                    tabName="موجودی ها"
                    tabId={2}
                    setActiveTab={setOpenTab}
                  />
                  <Tab
                    activeTab={openTab}
                    tabName="موتور های جست و جو"
                    tabId={3}
                    setActiveTab={setOpenTab}
                  />
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
                                    defaultValue={defaultValueChecker(value)}
                                    value={value.val}
                                    onChange={(e) => {
                                      handleAttributeChange(value.id, e);
                                      console.log(value.id, e);
                                    }}
                                    options={options}
                                    label={label}
                                  />
                                );
                              }
                            })
                          : "در حال بارگزاری"}
                      </div>
                      <div
                        className={openTab === 2 ? "block" : "hidden"}
                        id="link2"
                      >
                        <Button
                          className="!mb-6"
                          fullWidth
                          variant="contained"
                          onClick={(e) => {
                            handleClickOpen();
                          }}
                        >
                          افزودن موجودی جدید
                        </Button>
                        <DataGridLite
                          handleClickOpen={handleClickOpen}
                          data={inventories}
                          removeInventory={removeInventory}
                        />
                        <InventoriesDialouge
                          colors={colors}
                          colorsIsLoading={colorsIsLoading}
                          handleClose={handleClose}
                          setVendorId={setVendorId}
                          guaranteeMonthIsLoading={guaranteeMonthIsLoading}
                          vendorAddresses={vendorAddresses}
                          userVendors={userVendors}
                          userVendorsIsLoading={userVendorsIsLoading}
                          guarantees={guarantees}
                          guaranteesIsLoading={guaranteesIsLoading}
                          handleInventoryCreate={handleInventoryCreate}
                          proviences={proviences}
                          proviencesIsLoading={proviencesIsLoading}
                          setOpen={setOpen}
                          guaranteeMonth={guaranteeMonth}
                          open={open}
                          product={product.result}
                          activeSpace={activeSpace}
                        />
                      </div>
                      <div
                        className={openTab === 3 ? "block" : "hidden"}
                        id="link3"
                      >
                        <SeoBox
                          setDescription={setDescription}
                          description={description}
                        />
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
