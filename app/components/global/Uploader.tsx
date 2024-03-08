import React, { useCallback, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";

// Define the type for the file object in the selectedFiles state
interface FileObject {
  name: string;
  size: number;
  type: string;
}

// Define the type for the photo object in the setPhotos function
interface Photo {
  fileName: string;
  id: string;
}

// Define the props for the Uploader component
interface UploaderProps {
  id?: string;
  location: string;
  refetch?: () => void;
  setPhotos: React.Dispatch<React.SetStateAction<Photo[]>>;
}

const Uploader: React.FC<UploaderProps> = ({
  id,
  location,
  refetch,
  setPhotos,
}) => {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<FileObject[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false); // State for uploading status
  const [progress, setProgress] = useState(0); // State for upload progress

  const onDrop = useCallback((acceptedFiles) => {
    setSelectedFiles(acceptedFiles);
    const urls = acceptedFiles.map((file) => URL.createObjectURL(file));
    setPreviewUrls(urls);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
    multiple: true,
    minSize: 0,
    maxSize: 5242880,
  });

  const uploadFilesSequentially = async () => {
    setUploading(true); // Start uploading
    for (const file of selectedFiles) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/${location}${
            id ? `/${id}` : ""
          }`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${session.token}`,
            },
            body: formData,
          }
        );
        let result = await response.json();
        if (response.ok) {
          toast.success("موفق");
          if (refetch) refetch();
          setPhotos((prev) => [
            ...prev,
            {
              fileName: result.result.fileName,
              id: +result.result.id,
            },
          ]);
        } else {
          throw new Error("Upload failed");
        }
      } catch (error) {
        toast.error(error.message);
      }
    }
    setSelectedFiles([]);
    setPreviewUrls([]);
    setUploading(false); // Finish uploading
    setOpen(false); // Close the dialog after all files have been uploaded
  };

  useEffect(() => {
    return () => {
      previewUrls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [previewUrls]);

  return (
    <>
      <button
        type="button"
        className="focus:outline-none w-full text-white bg-green-600 hover:bg-green-800 focus:ring-4 focus:ring-green-100 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
        onClick={() => setOpen(true)}
      >
        آپلود تصویر
      </button>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <div {...getRootProps()} className="dropzone">
            <input {...getInputProps()} />
            <p className="p-8 border-2 border-dashed border-gray-400 rounded-3xl divide-dashed">
              یا فایل هاتونو درگ کنید یا کلیک کنید
            </p>
          </div>
          <div className="flex">
            {previewUrls.map((url, index) => (
              <div key={index} className="mt-4">
                <img
                  src={url}
                  alt={`Selected ${index}`}
                  className=" h-auto"
                  height={100}
                  width={100}
                />
              </div>
            ))}
          </div>
        </DialogContent>
        <DialogActions className="flex w-full justify-between">
          <Button
            variant="outlined"
            color="error"
            onClick={() => setOpen(false)}
          >
            لغو
          </Button>
          <Button
            variant="outlined"
            color="success"
            onClick={uploadFilesSequentially}
            autoFocus
            disabled={uploading} // Disable button while uploading
          >
            {uploading ? <CircularProgress size={24} /> : "آپلود"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Uploader;
