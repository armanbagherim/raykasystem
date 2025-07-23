"use client";
import React, { useEffect, useState } from "react";
import { fetcher, useFetcher } from "../../../components/global/fetcher";
import Loading from "../../../components/global/loading";
import { useAtom } from "jotai";
import { pageTitle } from "../../layout";
import { toast } from "react-toastify";
import Image from "next/image";
import Uploader from "@/app/components/global/Uploader";
import LightDataGrid from "@/app/components/global/LightDataGrid/LightDataGrid";
import { Button, IconButton, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import Swal from "sweetalert2";

export default function Products() {
  const [title, setTitle] = useAtom(pageTitle);
  const [triggered, setTriggered] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [baseUrl, setBaseUrl] = useState("/v1/api/ecommerce/admin/products");

  const {
    data: parentEntityTypes,
    isLoading: parentEntityTypesIsLoading,
    error: parentEntityTypesError,
  } = useFetcher(
    `/v1/api/eav/admin/entityTypes?sortOrder=ASC&entityModelId=1&ignoreChilds=false&ignorePaging=true`,
    "GET"
  );
  const {
    data: brands,
    isLoading: brandsIsLoading,
    error: brandsError,
  } = useFetcher(
    `/v1/api/ecommerce/brands?sortOrder=ASC&offset=0&limit=0&orderBy=id&ignorePaging=true`,
    "GET"
  );

  useEffect(() => {
    setTitle({
      title: "محصولات",
      buttonTitle: "افزودن محصول جدید",
      link: "/admin/ecommerce/products/new",
    });
  }, []);

  const deleteRow = async (id) => {
    try {
      const result = await Swal.fire({
        title: "مطمئن هستید؟",
        text: "با حذف این گزینه امکان بازگشت آن وجود ندارد",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "بله حذفش کن",
        cancelButtonText: "لغو",
      });

      if (result.isConfirmed) {
        const req = await fetcher({
          url: `/v1/api/ecommerce/admin/products/${id}`,
          method: "DELETE",
        });
        toast.success("موفق");
        setTriggered(!triggered);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleApplyFilter = () => {
    let queryParams = [];
    if (selectedCategory) {
      queryParams.push(`entityTypeId=${selectedCategory}`);
    }
    if (selectedBrand) {
      queryParams.push(`brandId=${selectedBrand}`);
    }
    const newUrl = queryParams.length > 0
      ? `/v1/api/ecommerce/admin/products?${queryParams.join("&")}`
      : "/v1/api/ecommerce/admin/products";
    setBaseUrl(newUrl);
    setTriggered(!triggered); // Trigger data refetch
  };

  const columns = [
    {
      accessorKey: "id",
      header: "شناسه",
      size: 10,
      maxSize: 10,
    },
    {
      accessorKey: "pPhoto",
      header: "تصویر",
      minSize: 100,
      maxSize: 100,
      size: 100,
      Cell: ({ row }) => {
        return row?.original?.attachments?.length ? (
          <img
            key={row.id}
            loading="eager"
            src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/products/${row?.original?.attachments[0]?.fileName || ""}`}
            width={30}
            height={30}
            alt=""
          />
        ) : (
          <img width={30} height={30} src="/images/no-photo.png" alt="" />
        );
      },
    },
    {
      accessorKey: "title",
      header: "نام ",
      minSize: 100,
      maxSize: 400,
      size: 400,
    },
    {
      accessorKey: "brand.name",
      header: "برند",
      minSize: 100,
      maxSize: 150,
      size: 150,
    },
    {
      accessorKey: "publishStatus.name",
      header: "وضعیت انتشار",
      minSize: 100,
      maxSize: 150,
      size: 150,
    },
    {
      accessorKey: "entityType.name",
      header: "دسته بندی",
      minSize: 100,
      maxSize: 400,
      size: 180,
    },
    {
      accessorKey: "slug",
      header: "لینک",
      size: 400,
    },
    {
      accessorKey: "Actions",
      header: "عملیات",
      size: 200,
      Cell: ({ row }) => (
        <>
          <a href={`/admin/ecommerce/products/${row.id}`}>
            <IconButton aria-label="delete" color="primary">
              <ModeEditIcon />
            </IconButton>
          </a>
          <a onClick={(e) => deleteRow(row.id)}>
            <IconButton aria-label="delete" color="error">
              <DeleteIcon />
            </IconButton>
          </a>
        </>
      ),
    },
  ];

  return (
    <div>
      <div className="flex gap-4 mb-4">
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>دسته‌بندی</InputLabel>
          <Select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            label="دسته‌بندی"
          >
            <MenuItem value="">
              <em>همه دسته‌بندی‌ها</em>
            </MenuItem>
            {parentEntityTypes?.result?.map((category) => (
              <MenuItem key={category.id} value={category.id}>
                {category.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>برند</InputLabel>
          <Select
            value={selectedBrand}
            onChange={(e) => setSelectedBrand(e.target.value)}
            label="برند"
          >
            <MenuItem value="">
              <em>همه برندها</em>
            </MenuItem>
            {brands?.result?.map((brand) => (
              <MenuItem key={brand.id} value={brand.id}>
                {brand.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button
          variant="contained"
          color="primary"
          onClick={handleApplyFilter}
        >
          اعمال فیلتر
        </Button>
      </div>
      <LightDataGrid
        url={baseUrl}
        columns={columns}
        triggered={triggered}
      />
    </div>
  );
}