import { Tooltip } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import Link from "next/link";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Uploader from "@/app/components/global/Uploader";
import { fetcher } from "@/app/components/global/fetcher";
import Loading from "@/app/components/global/loading";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Image from "next/image";
import { Button, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import Swal from "sweetalert2";
import SubjectIcon from "@mui/icons-material/Subject";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";

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
      url: `/v1/api/eav/admin/entityTypes/${id}`,
      method: "GET",
    });

    return res.result;
  };

  const deleteEavType = async (id) => {
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
          url: `/v1/api/eav/admin/entityTypes/${id}`,
          method: "DELETE",
        });
        toast.success("موفق");
        setTriggered(!triggered);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  return [
    {
      accessorKey: "name",
      header: "نام ",
      Cell: ({ row }) => {
        return (
          <>
            {row.original.attachment ? (
              <Image
                loading="eager"
                src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/entitytypes/${
                  row.original.attachment?.fileName || ""
                }`}
                width={50}
                height={50}
                alt=""
              />
            ) : (
              <img width={30} height={30} src="/images/no-photos.png" alt="" />
            )}
            <span className="mr-4">{row?.original?.name}</span>
          </>
        );
      },
    },

    {
      accessorKey: "slug",
      header: "لینک",
    },

    {
      accessorKey: "Actions",
      header: "عملیات",

      Cell: ({ row }) => (
        <>
          <Uploader
            location={`v1/api/eav/admin/entityTypes/image`}
            id={row.id}
            triggered={triggered}
            setTriggered={setTriggered}
          />

          <Tooltip
            onClick={(e) => {
              setFieldsProperties({
                active: true,
                loading: false,
                id: row.original.id,
              });
            }}
            className="IranSans"
            arrow
            placement="top"
            title="فیلد ها"
          >
            <IconButton>
              {/* <Link
                className="ml-1 mr-1"
                href={`/admin/eav/entityTypes/fields/${row.id}`}
              >                
              </Link> */}
              <SubjectIcon />
            </IconButton>
          </Tooltip>

          <Tooltip
            className="IranSans"
            arrow
            placement="top"
            title=" فاکتور های کامنت"
          >
            <IconButton>
              <Link
                className="ml-1 mr-1"
                href={`/admin/eav/entityTypes/factors/${row.id}`}
              >
                <ChatBubbleOutlineIcon />
              </Link>
            </IconButton>
          </Tooltip>

          <IconButton
            onClick={async (e) => {
              const datas = await getData(row.original.id);
              console.log(datas);
              setIsOpen(true);
              setIsEdit({ active: true, id: row.original.id });
              eavData.setValues({
                ...eavData.values,
                name: datas.name,
                priority: datas.priority,
                metaDescription: datas.metaDescription,
                description: datas.description,
                slug: datas.slug,
                metaKeywords: datas.metaKeywords,
                parentEntityTypeId: datas.parentEntityTypeId,
              });
            }}
            aria-label="delete"
            color="primary"
          >
            <ModeEditIcon />
          </IconButton>

          <IconButton
            onClick={(e) => deleteEavType(row.id)}
            aria-label="delete"
            color="error"
          >
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];
}
