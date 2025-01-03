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

  const formik = useFormik({
    initialValues: {
      name: "",
      slug: "",
      metaDescription: "",
      metaTitle: "",
      parentEntityTypeId: null,
      description: "",
      priority: "",
    },
    // validationSchema: formSchema,
    onSubmit: async (values, { resetForm }) => {
      const dataBody = ConvertToNull(values);

      console.log(dataBody);

      try {
        let result = await fetcher({
          url: "/v1/api/eav/admin/entityTypes",
          method: "POST",
          body: dataBody,
        });
        console.log(dataBody);
        console.log(result);

        toast.success("موفق");
        setLoading(false);
        setIsOpen(false);
        setTriggered(!triggered);
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
        formik={formik}
        parentEntityTypes={parentEntityTypes}
        parentEntityTypesIsLoading={parentEntityTypesIsLoading}
      />
      <LightDataGrid
        triggered={triggered}
        url={"/v1/api/eav/admin/entityTypes"}
        columns={columns(isOpen, setIsOpen, triggered, setTriggered)}
      />
    </div>
  );
}
