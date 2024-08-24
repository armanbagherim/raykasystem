"use client";
import { fetcher, useFetcher } from "@/app/components/global/fetcher";
import Loading from "@/app/components/global/loading";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { pageTitle } from "@/app/admin/layout";
import LightDataGrid from "@/app/components/global/LightDataGrid/LightDataGrid";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import ServerSelect from "@/app/components/global/ServerSelect";

export default function Eav({ params }) {
  const [title, setTitle] = useAtom(pageTitle);
  const [triggered, setTriggered] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const { data: eav, isLoading: eavIsLoading } = useFetcher(
    `/v1/api/ecommerce/admin/selectedProductItems?selectedProductId=${+params.id}`,
    "GET"
  );

  useEffect(() => {
    setTitle({
      title: `دستچین`,
      buttonTitle: "",
      link: ``,
    });
  }, [eavIsLoading]);

  const deleteItem = async (id) => {
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
          url: `/v1/api/ecommerce/admin/selectedProductItems`,
          body: {
            productId: +id,
            selectedProductId: +params.id,
          },
          method: "DELETE",
        });
        toast.success("موفق");
        setTriggered(!triggered);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const columns = [
    {
      accessorKey: "product.id",
      header: "شناسه",
      size: 10,
      maxSize: 10,
    },
    {
      accessorKey: "product.title",
      header: "نام ",
      minSize: 100, //min size enforced during resizing
      maxSize: 200, //max size enforced during resizing
      size: 200, //medium column
    },

    {
      accessorKey: "Actions",
      header: "عملیات",
      size: 200,

      Cell: ({ row }) => (
        <>
          {row?.original?.attributeType?.valueBased == true ? (
            <a href={`/admin/eav/entityTypes/fields/${row.id}/values`}>
              <Button type="button" variant="outlined">
                مقادیر
              </Button>
            </a>
          ) : (
            ""
          )}
          <a onClick={(e) => deleteItem(row.original.productId)}>
            <IconButton aria-label="delete" color="error">
              <DeleteIcon />
            </IconButton>
          </a>
        </>
      ),
    },
  ];

  const [requestBody, setRequestBody] = useState({
    conditionValue: null,
  });

  const handleClickOpen = () => {
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  const handleSave = async () => {
    console.log(requestBody);
    const req = await fetcher({
      url: `/v1/api/ecommerce/admin/selectedProductItems`,
      body: {
        productId: requestBody.conditionValue,
        selectedProductId: +params.id,
      },
      method: "POST",
    });
    toast.success("موفق");
    setOpenModal(false);
    setTriggered(!triggered);
  };

  const {
    data: conditions,
    isLoading: conditionsIsLoading,
    error: conditionsError,
  } = useFetcher(`/v1/api/ecommerce/admin/products?limit=10&orderBy=id`, "GET");

  return (
    <div>
      <div className="mb-4">
        <Button
          variant="contained"
          onClick={(e) => setOpenModal(true)}
          color="primary"
        >
          افزودن محصول به دستچین
        </Button>
      </div>
      <Dialog
        fullWidth
        maxWidth="sm"
        open={openModal}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"افزودن محصول به دستچین"}
        </DialogTitle>
        <DialogContent>
          <div className="h-[300px]">
            <ServerSelect
              isServer={true}
              init={conditions}
              type={1}
              loadingState={conditionsIsLoading}
              setRequestBody={setRequestBody}
              requestBody={requestBody}
              fetchUrl={`${process.env.NEXT_PUBLIC_BASE_URL}/v1/api/ecommerce/admin/discountConditionValues`}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>لغو</Button>
          <Button onClick={handleSave} autoFocus>
            تایید
          </Button>
        </DialogActions>
      </Dialog>
      <LightDataGrid
        url={`/v1/api/ecommerce/admin/selectedProductItems?selectedProductId=${+params.id}`}
        columns={columns}
        triggered={triggered}
      />
    </div>
  );
}
