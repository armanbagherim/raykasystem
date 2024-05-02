"use client";
import {
  MRT_EditingMode,
  MRT_ColumnDef,
  MRT_Row,
  MRT_TableInstance,
  MRT_TableOptions,
  useMaterialReactTable,
  MaterialReactTable,
} from "material-react-table";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Tooltip,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import { fetcher, useFetcher } from "@/app/components/global/fetcher";
import { toast } from "react-toastify";
import { MRT_Localization_FA } from "material-react-table/locales/fa";

const PostageFeeTable = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [editingRow, setEditingRow] = useState<MRT_Row<PostageFee> | null>(
    null
  );
  const { data, isLoading } = useFetcher(
    "/v1/api/ecommerce/admin/postageFees?sortOrder=ASC&offset=0&limit=50&orderBy=id",
    "GET"
  );
  const handleSaveRow: MRT_TableOptions<PostageFee>["onEditingRowSave"] =
    async ({ values, table, row }) => {
      try {
        await fetcher({
          url: `/v1/api/ecommerce/admin/postageFees/allProvincePrice/${row.original.id}`,
          method: "PATCH",
          body: {
            price: +values.allProvincePrice,
          },
        });
        toast.success("قیمت با موفقیت به روز شد");
        setIsEditing(false);
        setEditingRow(null);
        table.setEditingRow(null);
      } catch (error) {
        toast.error("خطا در به روز رسانی قیمت");
      }
    };

  const handleCreateRow: MRT_TableOptions<PostageFee>["onCreatingRowSave"] =
    async ({ values, table }) => {
      try {
        await fetcher({
          url: "/v1/api/ecommerce/admin/postageFees",
          method: "POST",
          body: values,
        });
        toast.success("هزینه پستی جدید با موفقیت ایجاد شد");
        setIsEditing(false);
        table.setCreatingRow(null);
      } catch (error) {
        toast.error("خطا در ایجاد هزینه پستی جدید");
      }
    };
  const columns: MRT_ColumnDef<PostageFee>[] = [
    {
      accessorKey: "id",
      header: "شناسه",
      enableEditing: false,
    },
    {
      accessorKey: "fromWeight",
      header: "از وزن",
      enableEditing: false,
    },
    {
      accessorKey: "toWeight",
      header: "تا وزن",
      enableEditing: false,
    },
    {
      accessorKey: "allProvincePrice",
      header: "قیمت برای همه شهر ها",
      muiTableBodyCellEditTextFieldProps: {
        type: "number",
      },
      enableEditing: true,
      Cell: ({ cell }) => cell.getValue(),
    },
  ];

  const table = useMaterialReactTable<PostageFee>({
    columns,
    data: data?.result ? data?.result : [],
    getRowId: (row) => row.id,
    enableEditing: true,
    editingMode: isEditing ? "modal" : "cell",
    onEditingRowSave: handleSaveRow,
    onCreatingRowSave: handleCreateRow,
    renderRowActions: ({ row, table }) => (
      <Box sx={{ display: "flex", gap: "1rem", justifyContent: "flex-start" }}>
        <Tooltip title="ویرایش">
          <IconButton
            onClick={() => {
              setIsEditing(true);
              setEditingRow(row);
              table.setEditingRow(row);
            }}
          >
            <EditIcon />
          </IconButton>
        </Tooltip>
      </Box>
    ),

    localization: MRT_Localization_FA,
  });
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <MaterialReactTable key={data?.result?.length} table={table} />;
};

export default PostageFeeTable;
