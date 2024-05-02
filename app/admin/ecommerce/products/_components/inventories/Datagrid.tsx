import { useMemo } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { IconButton } from "@mui/material";
interface InventoryItem {
  id: string;
  vendorName: string;
  vendor: { name: string };
  vendorAddressName: string;
  vendorAddress: { address: { name: string } };
  colorName: string;
  color: { name: string };
  guaranteeName: string;
  guarantee: { name: string };
  guaranteeMonthName: string;
  guaranteeMonth: { name: string };
  onlyProvinceName: string;
  onlyProvince: { name: string };
  qty: number;
  weight: number;
  firstPrice: { price: number } | number;
  secondaryPrice: { price: number } | number;
  buyPrice: number;
}

export default function DataGridLite({
  data,
  handleClickOpen,
  removeInventory,
  key,
}) {
  const columns = useMemo<MRT_ColumnDef<InventoryItem>[]>(
    () => [
      {
        accessorKey: "id",
        header: "ID",
        maxSize: 30,
      },
      {
        accessorKey: "vendorName",
        header: "نام فروشگاه",
        maxSize: 50,
        Cell: ({ row }) =>
          !row.original.vendorName
            ? row.original.vendor.name
            : row.original.vendorName,
      },
      {
        accessorKey: "vendorAddressName",
        header: "نام آدرس",
        Cell: ({ row }) =>
          !row.original.vendorAddressName
            ? row.original.vendorAddress?.address?.name
            : row.original.vendorAddressName,
      },
      {
        accessorKey: "colorName",
        header: "رنگ",
        Cell: ({ row }) =>
          !row.original.colorName
            ? row.original.color?.name
            : row.original.colorName,
      },
      {
        accessorKey: "guaranteeName",
        header: "نام گارانتی",
        Cell: ({ row }) =>
          !row.original.guaranteeName
            ? row.original.guarantee?.name
            : row.original.guaranteeName,
      },
      {
        accessorKey: "guaranteeMonthName",
        header: "تعداد ماه گارانتی",
        Cell: ({ row }) =>
          !row.original.guaranteeMonthName
            ? row.original.guaranteeMonth?.name
            : row.original.guaranteeMonthName,
      },
      {
        accessorKey: "onlyProvinceName",
        header: "استان فروش",
        Cell: ({ row }) =>
          !row.original.onlyProvinceName
            ? row.original.onlyProvince?.name || "-"
            : row.original.onlyProvinceName || "-",
      },
      {
        accessorKey: "qty",
        header: "تعداد",
      },
      {
        accessorKey: "weight",
        header: "وزن",
      },
      {
        accessorKey: "firstPrice",
        header: "قیمت اقساطی",
        Cell: ({ row }) =>
          row.original.firstPrice.price
            ? row.original.firstPrice.price
            : row.original.firstPrice,
      },
      {
        accessorKey: "secondaryPrice",
        header: "قیمت نقدی",
        Cell: ({ row }) =>
          row.original.secondaryPrice.price
            ? row.original.secondaryPrice.price || "-"
            : row.original.secondaryPrice || "-",
      },
      {
        accessorKey: "buyPrice",
        header: "قیمت خرید",
        Cell: ({ row }) =>
          !row.original.buyPrice
            ? row.original.buyPrice
            : row.original.buyPrice,
      },
      {
        header: "عملیات",
        size: 90,
        accessorKey: "Actions",
        muiTableHeadCellProps: {
          align: "right",
        },
        muiTableBodyCellProps: {
          align: "right",
        },
        Cell: ({ row }) => (
          <>
            <IconButton
              onClick={(e) => {
                handleClickOpen(row.original.id);
              }}
              aria-label="delete"
              color="primary"
            >
              <ModeEditIcon />
            </IconButton>
            <IconButton
              onClick={(e) => removeInventory(row.original.id)}
              aria-label="delete"
              color="error"
            >
              <DeleteIcon />
            </IconButton>
          </>
        ),
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data,
    enableColumnOrdering: true,
    enableGlobalFilter: false,
    enableColumnPinning: true,
    initialState: {
      expanded: true,
      showColumnFilters: false,
      columnPinning: { right: ["Actions"] },
      density: "compact",
    },
  });

  return <MaterialReactTable table={table} />;
}
