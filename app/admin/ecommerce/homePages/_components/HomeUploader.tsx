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

interface FileObject {
  name: string;
  size: number;
  type: string;
}

interface Photo {
  fileName: string;
  id: string;
}

interface UploaderProps {
  id?: string;
  location: string;
  refetch?: () => void;
  setPhotos: React.Dispatch<React.SetStateAction<Photo[]>>;
}

const HomeUploader: React.FC<UploaderProps> = ({
  id,
  location,
  refetch,
  setPhotos,
  onUploadSuccess, // Destructure the callback prop
  buttonText = "آپلود تصویر",
}) => {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<FileObject | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const onDrop = useCallback((acceptedFiles) => {
    setSelectedFile(acceptedFiles[0]);
    const url = URL.createObjectURL(acceptedFiles[0]);
    setPreviewUrl(url);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
    maxFiles: 1, // Accept only one file
    minSize: 0,
    maxSize: 5242880,
  });

  const uploadFile = async () => {
    setUploading(true);
    if (!session || !selectedFile) {
      return;
    }
    const formData = new FormData();
    formData.append("file", selectedFile);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/${location}`,
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
        setPhotos({
          fileName: result.result.fileName,
          id: +result.result.id,
        });
        onUploadSuccess(result.result.id);
        toast.success("موفق");
      } else {
        throw new Error("Upload failed");
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setSelectedFile(null);
      setPreviewUrl(null);
      setUploading(false);
      setOpen(false);
    }
  };

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="bg-primary text-white px-6 py-3 rounded-lg"
      >
        {buttonText}
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
          {previewUrl && (
            <div className="mt-4">
              <img
                src={previewUrl}
                alt="Selected"
                className="h-auto"
                height={100}
                width={100}
              />
            </div>
          )}
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
            onClick={uploadFile}
            autoFocus
            disabled={!selectedFile || uploading}
          >
            {uploading ? <CircularProgress size={24} /> : "آپلود"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default HomeUploader;
