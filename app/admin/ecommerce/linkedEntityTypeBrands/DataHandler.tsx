import React, { useState } from "react";
import ModalSelect from "@/app/components/global/ModalSelect";
import { Autocomplete, Chip, CircularProgress, TextField } from "@mui/material";
import Map from "@/app/components/global/Map";
import Modal from "@/app/components/global/Modal";
import Input from "@/app/components/global/Input";
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import dynamic from "next/dynamic";
import { convertValue } from "@/app/components/utils/ConvertType";

const SeoBox = dynamic(
  () => import("@/app/admin/ecommerce/products/_components/SeoBox"),
  { ssr: false }
);

const DataHandler = ({
  isOpen,
  setIsOpen,
  loading,
  formik,
  parentEntityTypes,
  parentEntityTypesIsLoading,
  setIsEdit,
  brands,
  brandsIsLoading,
}) => {
  const [value, setValue] = React.useState("1");
  const [operatorsOpen, setOperatorsOpen] = useState(false);
  const [citiesOpen, setCitiesOpen] = useState(false);
  const [mapOpen, setMapOpen] = useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const brandOptions = brands?.result.map((brand) => ({
    id: brand.id,
    name: brand.name,
  })) || [];

  const selectedBrand =
    brandOptions.find((option) => option.id === formik.values.brandId) || null;
  return (
    <Modal
      loading={loading}
      title="افزودن / ویراش دسته بندی"
      handleClose={() => {
        formik.resetForm();
        setIsOpen(false);
        setIsEdit({ active: false, id: null });
      }}
      maxSize="sm"
      isOpen={isOpen}
      handleAccept={formik.handleSubmit}
    >
      <form className="pt-4" onSubmit={formik.handleSubmit}>
        <div className="flex gap-4 mb-4">
          <Input
            onChange={formik.handleChange}
            variant="outlined"
            value={formik.values.title}
            label="عنوان"
            name="title"
            error={
              formik?.errors?.title && formik?.touched?.title
                ? formik?.errors?.title
                : null
            }
            helperText={formik?.touched?.title && formik?.errors?.title}
          />

        </div>

        <div className="flex gap-4 mb-4">
          <Input
            onChange={formik.handleChange}
            variant="outlined"
            value={formik.values.metaTitle}
            label="عنوان سئو"
            name="metaTitle"
            error={
              formik?.errors?.metaTitle && formik?.touched?.metaTitle
                ? formik?.errors?.metaTitle
                : null
            }
            helperText={formik?.touched?.metaTitle && formik?.errors?.metaTitle}
          />
          <Input
            onChange={formik.handleChange}
            variant="outlined"
            value={formik.values.metaDescription}
            label="توضیحات سئو"
            name="metaDescription"
            error={
              formik?.errors?.metaDescription &&
                formik?.touched?.metaDescription
                ? formik?.errors?.metaDescription
                : null
            }
            helperText={
              formik?.touched?.metaDescription &&
              formik?.errors?.metaDescription
            }
          />
        </div>
        <div className="flex gap-4 mb-4">
          <Input
            onChange={formik.handleChange}
            variant="outlined"
            value={formik.values.metaKeywords}
            label="کلمات کلیدی"
            name="metaKeywords"
            error={
              formik?.errors?.metaKeywords && formik?.touched?.metaKeywords
                ? formik?.errors?.metaKeywords
                : null
            }
            helperText={
              formik?.touched?.metaKeywords && formik?.errors?.metaKeywords
            }
          />

        </div>
        <div>
          <FormControl
            fullWidth
            variant="outlined"
            className="!mt-0 !pt-0 !mb-4"
          >
            <Autocomplete
              options={parentEntityTypes?.result.flatMap((value) => [
                { id: value.id, name: value.name, isParent: true },
                ...value.subEntityTypes.map((sub) => ({
                  id: sub.id,
                  name: `${sub.name}`,
                  isParent: false,
                })),
              ])}
              getOptionLabel={(option) => option.name}
              onChange={(event, newValue) => {
                formik.setFieldValue(
                  "entityTypeId",
                  newValue ? newValue.id : null
                );
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="دسته پدر"
                  variant="outlined"
                  margin="normal"
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <>
                        {parentEntityTypesIsLoading ? (
                          <CircularProgress size={24} />
                        ) : null}
                        {params.InputProps.endAdornment}
                      </>
                    ),
                  }}
                />
              )}
              value={
                parentEntityTypes?.result
                  .flatMap((value) => [
                    { id: value.id, name: value.name, isParent: true },
                    ...value.subEntityTypes.map((sub) => ({
                      id: sub.id,
                      name: `${sub.name}`,
                      isParent: false,
                    })),
                  ])
                  .find(
                    (option) => option.id === formik.values.entityTypeId
                  ) || null
              } // اصلاح شده
              renderOption={(props, option) => (
                <li {...props} key={option.id}>
                  {option.name}
                  {option.isParent && (
                    <span className="bg-blue-700 mx-2 text-white px-3 py-2 rounded-lg text-sm font-bold">
                      دسته پدر
                    </span>
                  )}
                </li>
              )}
              style={{ marginTop: 8 }}
            />
          </FormControl>
        </div>
        <div>
          <FormControl fullWidth variant="outlined" className="!mt-0 !pt-0 !mb-4">
            <Autocomplete
              options={brandOptions}
              getOptionLabel={(option) => option.name}
              onChange={(event, newValue) => {
                formik.setFieldValue("brandId", newValue ? newValue.id : null);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="برند"
                  variant="outlined"
                  margin="normal"
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <>
                        {brandsIsLoading && <CircularProgress size={24} />}
                        {params.InputProps.endAdornment}
                      </>
                    ),
                  }}
                />
              )}
              value={selectedBrand}
              renderOption={(props, option) => (
                <li {...props} key={option.id}>
                  {option.name}
                </li>
              )}
              style={{ marginTop: 8 }}
            />
          </FormControl>
        </div>
        {console.log(formik.values)}
        <div>
          <SeoBox
            setDescription={(value) =>
              formik.setFieldValue("description", value)
            }
            description={formik.values.description}
            disabled={false}
          />{" "}
        </div>
      </form>
    </Modal>
  );
};

export default DataHandler;
