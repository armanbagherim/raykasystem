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


export default function EavTypesModule() {
  const [title, setTitle] = useAtom(pageTitle);
  const [triggered, setTriggered] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isEdit, setIsEdit] = useState({ id: null, active: false });


  const { data: parentEntityTypes, isLoading: parentEntityTypesIsLoading } =
    useFetcher(
      `/v1/api/eav/admin/entityTypes?sortOrder=ASC&entityModelId=1&ignoreChilds=false&ignorePaging=true`,
      "GET"
    );

  const { data: brands, isLoading: brandsIsLoading } =
    useFetcher(
      `/v1/api/ecommerce/brands?sortOrder=ASC&entityModelId=1&ignoreChilds=true&ignorePaging=true`,
      "GET"
    );

  useEffect(() => {
    setTitle({
      title: "دسته بندی ها",
      buttonTitle: "افزودن",
      link: null,
      onClick: (e) => setIsOpen(true),
    });
  }, []);

  const eavData = useFormik({
    initialValues: {
      title: "",
      metaDescription: "",
      metaTitle: "",
      entityTypeId: null,
      description: "",
      brandId: "",
    },
    // validationSchema: formSchema,
    onSubmit: async (values, { resetForm }) => {
      const dataBody = ConvertToNull(values);

      try {
        let result = await fetcher({
          url: `/v1/api/ecommerce/admin/linkedEntityTypeBrands${isEdit.active ? `/${isEdit.id}` : ""
            }`,
          method: isEdit.active ? "PUT" : "POST",
          body: dataBody,
        });

        toast.success("موفق");
        setLoading(false);
        setIsOpen(false);
        setTriggered(!triggered);
        setIsEdit({ active: false, id: null });
        resetForm();
      } catch (error) {
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
        setIsEdit={setIsEdit}
        brands={brands}
        brandsIsLoading={brandsIsLoading}
      />

      <LightDataGrid
        triggered={triggered}
        url={"/v1/api/ecommerce/admin/linkedEntityTypeBrands"}
        columns={columns(
          isOpen,
          setIsOpen,
          triggered,
          setTriggered,
          eavData,
          setIsEdit,
        )}
      />
    </div>
  );
}
