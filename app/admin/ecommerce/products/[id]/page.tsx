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
import SaveBar from "@/app/components/global/SaveBar";

interface ProductProps {
  params: {
    id: string;
  };
}

interface Inventory {
  id: number;
  vendorId: number;
  vendorName: string;
  // Add other properties as needed
}

interface RequestBody {
  title: string;
  slug: string;
  entityTypeId: string;
  publishStatusId: string;
  brandId: string;
  description: string;
  colorBased: boolean;
  photos: string[];
  attributes: { id: number; val: any }[];
  inventories: Inventory[];
}

export default function Products({ params }) {
  const { id } = params;
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const [activeSpace, setActiveSpace] = useState<null | number>();
  const handleClickOpen = (id) => {
    setOpen(true);
    setActiveSpace(id ? id : null);
  };
  const [loading, setLoading] = useState(false);
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
  const [requestBody, setRequestBody] = useState<RequestBody>({
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
    metaDescription: "",
    metaTitle: "",
    metaKeywords: "",
  });
  const [inventories, setInventories] = useState([]);
  const [tempInventories, setTempInventories] = useState([]);

  useEffect(() => {
    setTitle({
      title: "ویرایش محصول",
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
      const inventory = product.result.inventories.map((value) => {
        return {
          id: value ? +value?.id : Math.random(),
          vendorId: value?.vendor?.id,
          vendorName: value?.vendor?.name,
          colorId: value?.color?.id,
          colorName: value?.color?.name,
          guaranteeId: value?.guarantee?.id,
          guaranteeName: value?.guarantee?.name,
          guaranteeMonthId: value?.guaranteeMonth?.id,
          guaranteeMonthName: value?.guaranteeMonth?.name,
          weight: value?.weight,
          buyPrice: value?.buyPrice,
          onlyProvinceId: value?.onlyProvince?.id,
          onlyProvinceName: value?.onlyProvince?.name,
          qty: value?.qty,
          vendorAddressId: value?.vendorAddress?.id,
          vendorAddressName: value?.vendorAddress?.address?.name,
          description: value?.description,
          firstPrice: +value?.firstPrice?.price,
          secondaryPrice: +value?.secondaryPrice?.price,
        };
      });

      setTempInventories(inventory);
      setInventories(inventory);
      //

      setEntityTypeId(product.result.entityTypeId);
      setSelectedEav(product.result.entityType.id);
      setPhotos(product.result.attachments);
      setRequestBody({
        ...requestBody,
        brandId: product.result.brandId,
        publishStatusId: product.result.publishStatus.id,
        title: product.result.title,
        slug: product.result.slug,
        entityTypeId: product.result.entityTypeId,
        metaDescription: product.result?.metaDescription,
        metaKeywords: product.result?.metaKeywords,
        metaTitle: product.result?.metaTitle,
      });
      setDescription(product.result.description);
      const attrs = product.result.productAttributeValues.map((attrValues) => {
        let id = attrValues.attributeId;
        let value = {
          id: attrValues.attributeValue
            ? attrValues.attributeValue.id
            : attrValues.val,
        };

        handleAttributeChange(id, value);
      });
    }
  }, [product]);

  useEffect(() => {
    // Map over tempInventories to conditionally modify each object
    const updatedInventories = tempInventories.map((inventory) => {
      // Ensure inventory.id is a string before calling .startsWith()
      if (typeof inventory.id === "string") {
        // Check if the inventory has an id with the 'new_' prefix
        if (inventory.id.startsWith("new_")) {
          // Remove the id key from the object
          const { id, ...rest } = inventory;
          return rest; // Return the object without the id key
        }
      }
      // If the inventory does not have an id with the 'new_' prefix, or if id is not a string, return it as is
      return inventory;
    });

    // Update the state with the modified inventories
    setRequestBody((prevState) => ({
      ...prevState,
      inventories: updatedInventories, // Use the updated inventories
    }));
  }, [tempInventories]); // Depend on tempInventories to trigger the effect

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

  const fetchAttributes = async (id: Number) => {
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

  const handleAttributeChange = (id: number, value: object) => {
    const actualValue = value.id !== undefined ? value.id : value;

    setRequestBody((prevState) => {
      const existingAttributeIndex = prevState.attributes.findIndex(
        (attr) => Number(attr.id) === Number(id)
      );

      if (existingAttributeIndex > -1) {
        const updatedAttributes = [...prevState.attributes];
        updatedAttributes[existingAttributeIndex] = {
          ...updatedAttributes[existingAttributeIndex],
          val: actualValue,
        };
        return { ...prevState, attributes: updatedAttributes };
      }

      return {
        ...prevState,
        attributes: [...prevState.attributes, { id: +id, val: actualValue }],
      };
    });
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

  const removePhoto = (id) => {
    setPhotos(photos.filter((photo) => photo.id !== id));
  };

  const removeInventory = (id: number) => {
    setTempInventories((prevInventories) =>
      prevInventories.filter((inventory) => inventory.id !== id)
    );
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
    setLoading(true);
    try {
      const req = await fetcher({
        url: `/v1/api/ecommerce/admin/products/${id}`,
        method: "PUT",
        body: requestBody,
      });
      setLoading(false);

      toast.success("موفق");
      setTimeout(() => {
        router.push("/admin/ecommerce/products");
      }, 500);
    } catch (error) {
      setLoading(false);

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
    <div className="grid grid-cols-4 gap-4 relative">
      <div
        className={`w-full h-screen bg-gray-200/20 backdrop-blur-sm rounded-lg z-50 flex items-center justify-center absolute right-0 top-0 ${
          loading ? "visible" : "hidden"
        }`}
      >
        <div role="status">
          <svg
            aria-hidden="true"
            className="w-8 h-8 text-gray-200 animate-spin  fill-blue-700"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>{" "}
      </div>
      <div className="flex gap-4 p-6 col-span-3 flex-wrap">
        <div className="flex w-full gap-4">
          <div className="flex-1 w-full">
            <TextField
              onChange={(e) =>
                setRequestBody({ ...requestBody, title: e.target.value })
              }
              fullWidth
              required
              id="standard-basic"
              label="نام محصول"
              defaultValue={requestBody.title}
              variant="standard"
            />
          </div>
          <div className="flex-1 w-full">
            <TextField
              onChange={(e) =>
                setRequestBody({ ...requestBody, slug: e.target.value })
              }
              fullWidth
              required
              id="standard-basic"
              label="لینک محصول"
              defaultValue={requestBody.slug}
              variant="standard"
            />
          </div>
        </div>
        <div className="flex w-full gap-4">
          <div className="flex-1 w-full">
            <SelectSearch
              loadingState={brandsIsLoading}
              data={brands?.result}
              label="برند"
              defaultValue={requestBody.brandId}
              onChange={(e) =>
                setRequestBody({ ...requestBody, brandId: e.id })
              }
            />
          </div>
          <div className="flex-1 w-full ">
            <SelectSearch
              loadingState={publishStatusesIsLoading}
              data={publishStatuses?.result}
              label="وضعیت انتشار"
              defaultValue={requestBody.publishStatusId}
              onChange={(e) =>
                setRequestBody({ ...requestBody, publishStatusId: e.id })
              }
            />
          </div>
        </div>
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
                  attributes: [],
                });
              }}
            />
          )}
        </div>

        <div className="flex w-full">
          <div className="flex-1">
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
                            handleClickOpen(null);
                          }}
                        >
                          افزودن موجودی جدید
                        </Button>
                        <DataGridLite
                          data={tempInventories}
                          removeInventory={removeInventory}
                          key={tempInventories}
                          handleClickOpen={handleClickOpen}
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
                                metaKeywords: e.target.value,
                              })
                            }
                            fullWidth
                            required
                            id="standard-basic"
                            label="کلمات کلیدی"
                            defaultValue={requestBody.metaKeywords}
                            variant="standard"
                          />
                        </div>
                        <div className="mb-8">
                          <TextField
                            onChange={(e) =>
                              setRequestBody({
                                ...requestBody,
                                metaDescription: e.target.value,
                              })
                            }
                            fullWidth
                            required
                            id="standard-basic"
                            label="توضیحات متا"
                            variant="standard"
                            defaultValue={requestBody.metaDescription}
                          />
                        </div>
                        <div className="mb-8">
                          <TextField
                            onChange={(e) =>
                              setRequestBody({
                                ...requestBody,
                                metaTitle: e.target.value,
                              })
                            }
                            defaultValue={requestBody.metaTitle}
                            fullWidth
                            required
                            id="standard-basic"
                            label="عنوان سئو"
                            variant="standard"
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

      <aside className="w-full bg-slate-100 rounded-xl p-4 col-span-1 flex items-center justify-start flex-col">
        <ProductUploader
          removePhoto={removePhoto}
          setPhotos={setPhotos}
          photos={photos}
        />

        {/* <button
          onClick={saveProduct}
          className="bg-blue-700 w-full mt-6 text-white px-6 hover:bg-transparent hover:border hover:border-blue-700 hover:text-blue-700 transition-all py-3 border border-transparent rounded-xl"
        >
          ساخت محصول
        </button> */}
      </aside>
      <SaveBar
        action={saveProduct}
        backUrl="/admin/ecommerce/products"
      ></SaveBar>
    </div>
  );
}
