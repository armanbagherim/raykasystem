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
import NestedSelect from "../_components/NestedSelect";
import GenericInput from "../_components/GenericInput";
import DataGridLite from "../_components/inventories/Datagrid";
import InventoriesDialouge from "../_components/inventories/InventoriesDialouge";

import Tab from "../_components/tabs/Tabs";
import SaveBar from "@/app/components/global/SaveBar";
import ChangeToNull from "@/app/components/global/ChangeToNull";
import dynamic from "next/dynamic";
const SeoBox = dynamic(() => import("../_components/SeoBox"), { ssr: false });

export default function Products() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const [activeSpace, setActiveSpace] = useState<null | number>();

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
  const [videos, setVideos] = useState([]);
  const [isColoBased, setIsColoBased] = useState(false);
  const [attributes, setAttributes] = useState();
  const [openTab, setOpenTab] = useState(1);
  const [description, setDescription] = useState("");
  const [requestBody, setRequestBody] = useState<RequestBody>({
    title: null,
    slug: null,
    entityTypeId: null,
    publishStatusId: null,
    brandId: null,
    description: description,
    colorBased: false,
    photos: photos,
    videos: videos,
    attributes: [],
    inventories: [],
    metaDescription: null,
    metaTitle: null,
    metaKeywords: null,
    weight: null,
  });
  const [inventories, setInventories] = useState([]);
  const [tempInventories, setTempInventories] = useState([]);

  useEffect(() => {
    setTitle({
      title: "افزودن محصول جدید",
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
      url: `/v1/api/eav/admin/attributes?sortOrder=ASC&orderBy=id&ignorePaging=true&entityTypeId=${id}`,
      method: "GET",
    }).then((res) => {
      setAttributes(res.result);
    });
  };

  const handleAttributeChange = (id, value) => {
    // Determine the type of value
    const actualValue = value.id !== undefined ? value.id : value;

    // Convert both id and attribute.id to strings for comparison
    const existingAttribute = requestBody.attributes.find(
      (attr) => Number(attr.id) === Number(id)
    );

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

  const handleInventoryCreate = (data: object) => {
    // Find the index of the inventory with the given id
    const inventoryIndex = inventories.findIndex(
      (inventory) => +inventory.id === +data.id
    );

    setTempInventories((prevState) => {
      if (inventoryIndex > -1) {
        return prevState.map((inventory, index) =>
          index === inventoryIndex ? { ...inventory, ...data } : inventory
        );
      } else {
        return [...prevState, data];
      }
    });

    setActiveSpace(null);
    setOpen(false);
  };

  const removeInventory = (id: number) => {
    setTempInventories((prevInventories) =>
      prevInventories.filter((inventory) => inventory.id !== id)
    );
  };

  const removePhoto = (id) => {
    setPhotos(photos.filter((photo) => photo.id !== id));
  };

  const removeVideo = (id) => {
    setVideos(videos.filter((video) => video.id !== id));
  };

  useEffect(() => {
    const updatedInventories = tempInventories.map((inventory) => {
      if (typeof inventory.id === "string") {
        if (inventory.id.startsWith("new_")) {
          const { id, ...rest } = inventory;
          return rest;
        }
      }
      return inventory;
    });

    // Update the  with the modified inventories
    setRequestBody((prevState) => ({
      ...prevState,
      inventories: updatedInventories, // Use the updated inventories
    }));
  }, [tempInventories]); // Depend on tempInventories to trigger the effect

  useEffect(() => {
    setRequestBody((prevState) => ({
      ...prevState,
      photos: photos,
    }));
  }, [photos]);

  useEffect(() => {
    setRequestBody((prevState) => ({
      ...prevState,
      videos: videos,
    }));
  }, [videos]);

  useEffect(() => {
    setRequestBody((prevState) => ({
      ...prevState,
      description: description, // Update the description in requestBody
    }));
  }, [description]);

  const saveProduct = async () => {
    try {
      const req = await fetcher({
        url: "/v1/api/ecommerce/admin/products",
        method: "POST",
        body: requestBody,
      });
      toast.success("موفق");
      setTimeout(() => {
        router.push("/admin/ecommerce/products");
      }, 500);
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div className=" gap-4">
      <aside className="w-full mb-4 rounded-xl gap-4 pt-0 flex items-center justify-start flex-row">
        <ProductUploader
          location="v1/api/ecommerce/productphotos/image"
          removePhoto={(e) => removePhoto(e)}
          setPhotos={setPhotos}
          photos={photos}
          text="آپلود تصویر"
          type="image"
          isFull
        />
        <ProductUploader
          location="v1/api/ecommerce/productVideos/upload"
          setPhotos={setVideos}
          removePhoto={(e) => removeVideo(e)}
          photos={videos}
          type="video"
          text="آپلود ویدیو"
          isFull
        />
      </aside>
      <hr className="mb-8" />
      <div className=" flex gap-4 flex-col">
        <div className="flex gap-4 flex-wrap">
          <div className="flex-1">
            <TextField
              onChange={(e) =>
                setRequestBody({
                  ...requestBody,
                  title: ChangeToNull(e.target.value),
                })
              }
              required
              id="standard-basic"
              label="نام محصول"
              fullWidth
              variant="outlined"
            />
          </div>
          <div className="flex-1">
            <TextField
              onChange={(e) =>
                setRequestBody({
                  ...requestBody,
                  slug: ChangeToNull(e.target.value),
                })
              }
              fullWidth
              required
              id="standard-basic"
              label="لینک محصول"
              variant="outlined"
            />
          </div>
        </div>
        <div className="flex gap-4 col-span-3 flex-wrap">
          <SelectSearch
            loadingState={brandsIsLoading}
            data={brands?.result}
            label="برند"
            onChange={(e) => setRequestBody({ ...requestBody, brandId: e.id })}
          />
          <SelectSearch
            loadingState={publishStatusesIsLoading}
            data={publishStatuses?.result}
            label="وضعیت انتشار"
            onChange={(e) =>
              setRequestBody({ ...requestBody, publishStatusId: e.id })
            }
          />
          <TextField
            value={requestBody.weight}
            label="وزن"
            onChange={(e) =>
              setRequestBody({ ...requestBody, weight: +e.target.value })
            }
          />
          <div className="flex w-full items-center gap-4">
            <div className="flex-1">
              <NestedSelect
                selected={entityTypeId}
                parentEntityTypesIsLoading={parentEntityTypesIsLoading}
                data={parentEntityTypes?.result}
                onChange={(e) => {
                  setEntityTypeId(ChangeToNull(e.target.value));
                  setRequestBody({
                    ...requestBody,
                    entityTypeId: +ChangeToNull(e.target.value),
                  });
                }}
              />
            </div>
            <div className="flex-1 border border-[#c4c4c4] p-2 rounded-xl">
              <label className="inline-flex items-center cursor-pointer">
                <span className="ml-3 text-sm font-medium text-gray-900 ">
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
          <hr className="my-6 w-full" />
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
                  <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 border border-gray-200 rounded-2xl">
                    <div className="px-4 py-5 flex-auto">
                      <div className="tab-content tab-space">
                        <div
                          className={openTab === 1 ? "block" : "hidden"}
                          id="link1"
                        >
                          {entityTypeId ? (
                            attributes?.length === 0 ? (
                              <div className="text-center">
                                <h4 className="text-center font-bold text-red-400">
                                  برای این دسته بندی، هیچ ویژگی تعریف نشده است
                                </h4>
                              </div>
                            ) : (
                              attributes?.map((value, index) => {
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
                                      required={value?.required}
                                    />
                                  );
                                }
                              })
                            )
                          ) : (
                            "در حال بارگزاری"
                          )}
                        </div>
                        <div
                          className={openTab === 2 ? "block" : "hidden"}
                          id="link2"
                        >
                          <button
                            className="!mb-6 text-sm uppercase px-5 py-3 border border-gray-200 rounded-lg block leading-normal text-white bg-[#5C1891] w-full block"
                            onClick={(e) => {
                              handleClickOpen(null);
                            }}
                          >
                            افزودن موجودی جدید
                          </button>
                          <DataGridLite
                            handleClickOpen={handleClickOpen}
                            data={tempInventories}
                            removeInventory={removeInventory}
                            key={tempInventories}
                          />
                          <InventoriesDialouge
                            vendorId={vendorId}
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
                            product={tempInventories}
                            activeSpace={activeSpace}
                            setActiveSpace={setActiveSpace}
                          />
                        </div>
                        <div
                          className={openTab === 3 ? "block" : "hidden"}
                          id="link3"
                        >
                          <div className="mb-8">
                            <TextField
                              onChange={(e) =>
                                setRequestBody({
                                  ...requestBody,
                                  metaKeywords: ChangeToNull(e.target.value),
                                })
                              }
                              fullWidth
                              required
                              id="standard-basic"
                              label="کلمات کلیدی"
                              variant="outlined"
                            />
                          </div>
                          <div className="mb-8">
                            <TextField
                              onChange={(e) =>
                                setRequestBody({
                                  ...requestBody,
                                  metaDescription: ChangeToNull(e.target.value),
                                })
                              }
                              fullWidth
                              required
                              id="standard-basic"
                              label="توضیحات متا"
                              variant="outlined"
                            />
                          </div>
                          <div className="mb-8">
                            <TextField
                              onChange={(e) =>
                                setRequestBody({
                                  ...requestBody,
                                  metaTitle: ChangeToNull(e.target.value),
                                })
                              }
                              fullWidth
                              required
                              id="standard-basic"
                              label="عنوان سئو"
                              variant="outlined"
                            />
                          </div>
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
      </div>

      <SaveBar
        action={saveProduct}
        backUrl="/admin/ecommerce/products"
      ></SaveBar>
    </div>
  );
}
