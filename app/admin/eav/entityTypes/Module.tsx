"use client";

import React, { useEffect, useState } from "react";
import { pageTitle } from "../../layout";
import { useAtom } from "jotai";
import LightDataGrid from "@/app/components/global/LightDataGrid/LightDataGrid";
import { columns } from "./columns";
import DataHandler from "./DataHandler";
import { fetcher, useFetcher } from "@/app/components/global/fetcher";
import { useFormik } from "formik";
import { ConvertToNull } from "@/app/components/utils/ConvertToNull";
import { toast } from "react-toastify";
import FieldsHandler from "./FieldsHandler";
import EditFields from "./EditFields";
import { cleanDigitSectionValue } from "@mui/x-date-pickers/internals/hooks/useField/useField.utils";

export default function EavTypesModule() {
  const [title, setTitle] = useAtom(pageTitle);
  const [triggered, setTriggered] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isEdit, setIsEdit] = useState({ id: null, active: false });
  const [isEditEav, setIsEditEav] = useState({
    open: false,
    id: null,
    active: false,
  });
  const [fieldsProperties, setFieldsProperties] = useState({
    active: false,
    loading: false,
    id: null,
  });
  const { data: parentEntityTypes, isLoading: parentEntityTypesIsLoading } =
    useFetcher(
      `/v1/api/eav/admin/entityTypes?sortOrder=ASC&entityModelId=1&ignoreChilds=true&ignorePaging=true`,
      "GET"
    );

  useEffect(() => {
    setTitle({
      title: "دسته بندی ها",
      buttonTitle: "افزودن",
      link: () => setIsOpen(true),
    });
  }, []);

  const eavData = useFormik({
    initialValues: {
      name: "",
      slug: "",
      metaDescription: "",
      metaTitle: "",
      parentEntityTypeId: null,
      description: "",
      priority: "",
      entityModelId: 1,
    },
    // validationSchema: formSchema,
    onSubmit: async (values, { resetForm }) => {
      const dataBody = ConvertToNull(values);

      console.log(dataBody);

      try {
        let result = await fetcher({
          url: `/v1/api/eav/admin/entityTypes${
            isEdit ? `/${isEdit.id}` : null
          }`,
          method: isEdit ? "PUT" : "POST",
          body: dataBody,
        });
        console.log(dataBody);
        console.log(result);

        toast.success("موفق");
        setLoading(false);
        setIsOpen(false);
        setTriggered(!triggered);
        setIsEdit({ active: false, id: null });
        resetForm();
      } catch (error) {
        console.log(error.message);
        setLoading(false);
        toast.error(error.message);
      }
    },
  });

  const fieldData = useFormik({
    initialValues: {
      required: false,
      attributeTypeId: "",
      entityTypeId: "",
      name: "",
      minLength: "",
      maxLength: "",
    },
    // validationSchema: formSchema,
    onSubmit: async (values, { resetForm }) => {
      const dataBody = ConvertToNull(values);

      console.log(values);
      // console.log(finalData);
      console.log(isEditEav);
      try {
        let result = await fetcher({
          url: `/v1/api/eav/admin/attributes${
            isEditEav && isEditEav.id ? `/${isEditEav.id}` : ""
          }`,
          method: isEditEav && isEditEav.id ? "PUT" : "POST",
          body: dataBody,
        });
        console.log(dataBody);
        console.log(result);

        toast.success("موفق");
        setLoading(false);
        setIsOpen(false);
        setTriggered(!triggered);
        setIsEditEav({ active: false, id: null, open: false });
        resetForm();
      } catch (error) {
        console.log(error.message);
        setLoading(false);
        toast.error(error.message);
      }
    },
  });

  return (
    <div>
      <DataHandler
        isOpen={isOpen}
        loading={loading}
        setIsOpen={setIsOpen}
        formik={eavData}
        parentEntityTypes={parentEntityTypes}
        parentEntityTypesIsLoading={parentEntityTypesIsLoading}
      />

      <FieldsHandler
        isOpen={fieldsProperties}
        loading={fieldsProperties.loading}
        setIsOpen={setFieldsProperties}
        formik={fieldData}
        parentEntityTypes={parentEntityTypes}
        parentEntityTypesIsLoading={parentEntityTypesIsLoading}
        isEditEav={isEditEav}
        eavEditData={isEditEav}
        setIsEditEav={setIsEditEav}
        isEdit={fieldsProperties}
        triggered={triggered}
        setTriggered={setTriggered}
      />

      <EditFields
        eavEditData={isEditEav}
        loading={loading}
        setIsOpen={setIsEditEav}
        formik={fieldData}
        parentEntityTypes={parentEntityTypes}
        parentEntityTypesIsLoading={parentEntityTypesIsLoading}
      />

      <LightDataGrid
        triggered={triggered}
        url={"/v1/api/eav/admin/entityTypes"}
        columns={columns(
          isOpen,
          setIsOpen,
          triggered,
          setTriggered,
          eavData,
          setIsEdit,
          setFieldsProperties
        )}
      />
    </div>
  );
}
