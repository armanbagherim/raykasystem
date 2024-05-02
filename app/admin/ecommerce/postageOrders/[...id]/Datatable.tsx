import { useMemo } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";
import { Button } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

//nested data is ok, see accessorKeys in ColumnDef below

const OrderDataTable = ({ data = [], handleProccess }) => {
  console.log(data);
  //should be memoized or stable
  const columns = [
    {
      accessorKey: "image",
      header: "تصویر ",
      size: 30,
      Cell({ row }) {
        return row.original.product.attachments[0]?.fileName ? (
          <Image
            key={row.id}
            loading="eager"
            src={`${
              process.env.NEXT_PUBLIC_BASE_URL
            }/v1/api/ecommerce/productphotos/image/${
              row.original.product.attachments[0]?.fileName || ""
            }`}
            width={65}
            height={65}
            alt=""
          />
        ) : (
          <img width={65} height={65} src="/images/no-photo.png" alt="" />
        );
      },
    },
    {
      accessorKey: "product.title",
      header: "نام محصول",
      size: 30,
      Cell: ({ row }) => {
        {
          return (
            <Link
              href={`/product/${row.original.product.sku}/${row.original.product.title}`}
              variant="outlined"
            >
              {row.original.product.title}
            </Link>
          );
        }
      },
    },
    {
      accessorKey: "color",
      header: "رنگ",
      size: 30,
      Cell: ({ row }) => {
        {
          return (
            <Link
              href={`/product/${row.original.product.sku}/${row.original.product.title}`}
              variant="outlined"
            >
              {row.original.product.inventories[0].color.name}
            </Link>
          );
        }
      },
    },
    {
      accessorKey: "color",
      header: "گارانتی",
      size: 30,
      Cell: ({ row }) => {
        {
          return (
            <Link
              href={`/product/${row.original.product.sku}/${row.original.product.title}`}
              variant="outlined"
            >
              {row.original.product.inventories[0].guarantee.name}{" "}
              {row.original.product.inventories[0].guaranteeMonth.name}
            </Link>
          );
        }
      },
    },
    {
      accessorKey: "qty",
      header: "تعداد",
      size: 30,
    },
    {
      accessorKey: "vendor.name",
      header: "فروشنده",
      size: 30,
    },
    {
      accessorKey: "id",
      header: "شناسه",
      size: 30,
    },
    {
      accessorKey: "productPrice",
      header: "مجموع قیمت محصولات",
      size: 10,
      maxSize: 10,
    },

    {
      accessorKey: "discountFee",
      header: "مجموع تخفیف",
      size: 10,
      maxSize: 10,
    },

    {
      accessorKey: "totalPrice",
      header: "جمع کل",
      size: 10,
      maxSize: 10,
    },
    {
      accessorKey: "orderDetailStatus.name",
      header: "وضعیت پردازش",
      size: 30,
    },
  ];

  const table = useMaterialReactTable({
    columns,
    data, //data must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
    enableColumnPinning: true,
    initialState: {
      expanded: true,
      showColumnFilters: false,
      columnPinning: { right: ["Actions"] },
      density: "compact",
    },
  });

  return <MaterialReactTable table={table} />;
};

export default OrderDataTable;
