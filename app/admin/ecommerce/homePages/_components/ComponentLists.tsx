import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import React from "react";

export default function ComponentLists({
  ELEMENT_TYPES,
  handleClose,
  open,
  handleElementTypeSelect,
  bannerColumnsOpen,
  handleBannerColumnsSelect,
}) {
  return (
    <>
      <Dialog
        sx={{
          "& .MuiDialog-container": {
            "& .MuiPaper-root": {
              width: "100%",
              maxWidth: "800px", // Set your width here
              borderRadius: "15px",
            },
          },
        }}
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>انتخاب نوع المان</DialogTitle>
        <DialogContent className="grid grid-cols-3 gap-2 items-center justify-center">
          {ELEMENT_TYPES.map((type) => (
            <div
              key={type.id}
              onClick={() => handleElementTypeSelect(type.id)}
              className="mb-2 py-6 px-1 bg-[#1D1D35] rounded-xl w-full text-center cursor-pointer"
            >
              <div className="mb-2 text-center mx-auto flex justify-center">
                {type.icon}
              </div>
              <span className="text-sm text-white">{type.name}</span>
            </div>
          ))}
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            size="medium"
            color="inherit"
            fullWidth
            className="!py-3 !mx-4 !mb-2 !shadow-none !rounded-lg"
            onClick={handleClose}
          >
            بستن
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        sx={{
          "& .MuiDialog-container": {
            "& .MuiPaper-root": {
              width: "100%",
              maxWidth: "500px", // Set your width here
            },
          },
        }}
        open={bannerColumnsOpen}
        onClose={handleClose}
      >
        <DialogTitle>تعداد ستون های بنر</DialogTitle>
        <DialogContent className="flex items-center justify-center">
          <Button
            variant="outlined"
            onClick={() => handleBannerColumnsSelect(3)}
            className="mr-2 mb-2"
          >
            3 ستون
          </Button>
          <Button
            variant="outlined"
            onClick={() => handleBannerColumnsSelect(1)}
            className="mr-2 mb-2"
          >
            1 ستون
          </Button>
          <Button
            variant="outlined"
            onClick={() => handleBannerColumnsSelect(4)}
            className="mr-2 mb-2"
          >
            4 ستون
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
}
