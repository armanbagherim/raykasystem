import { Tooltip, IconButton } from "@mui/material";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import Image from "next/image";
import Link from "next/link";
import SubjectIcon from "@mui/icons-material/Subject";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import Uploader from "@/app/components/global/Uploader";
import { fetcher } from "@/app/components/global/fetcher";

export function columns(
  isOpen,
  setIsOpen,
  triggered,
  setTriggered,
  eavData,
  setIsEdit,
  setFieldsProperties
) {
  const getData = async (id: string) => {
    const res = await fetcher({
      url: `/v1/api/ecommerce/admin/linkedEntityTypeBrands/${id}`,
      method: "GET",
    });
    return res.result;
  };

  const deleteBrand = async (id) => {
    try {
      const result = await Swal.fire({
        title: "مطمئن هستید؟",
        text: "با حذف این برند امکان بازگشت وجود ندارد",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "بله حذف شود",
        cancelButtonText: "لغو",
      });

      if (result.isConfirmed) {
        await fetcher({
          url: `/v1/api/ecommerce/admin/linkedEntityTypeBrands/${id}`,
          method: "DELETE",
        });
        toast.success("با موفقیت حذف شد");
        setTriggered(!triggered);
      }
    } catch (error) {
      toast.error(error.message || "خطا در حذف");
    }
  };

  return [

    {
      accessorKey: "metaTitle",
      header: "عنوان سئو",
    },
    {
      accessorKey: "metaDescription",
      header: "توضیحات سئو",
    },

    {
      accessorKey: "Actions",
      header: "عملیات",
      Cell: ({ row }) => (
        <div className="flex items-center space-x-1">

          <IconButton
            onClick={async () => {
              const data = await getData(row.original.id);
              setIsOpen(true);
              setIsEdit({ active: true, id: row.original.id });
              eavData.setValues({
                ...eavData.values,
                title: data.title,
                description: data.description,
                metaTitle: data.metaTitle,
                metaDescription: data.metaDescription,
                metaKeywords: data.metaKeywords,
                brandId: data.brandId,
                entityTypeId: data.entityTypeId,
              });
            }}
            color="primary"
          >
            <ModeEditIcon />
          </IconButton>

          <IconButton
            onClick={() => deleteBrand(row.id)}
            color="error"
          >
            <DeleteIcon />
          </IconButton>
        </div>
      ),
    },
  ];
}
