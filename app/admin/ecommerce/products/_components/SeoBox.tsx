import React, { useEffect, useState, useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { useSession } from "next-auth/react";

export default function SeoBox({ setDescription, description }) {
  const { data: session } = useSession();
  const [sessionToken, setSessionToken] = useState(null);
  const editorRef = useRef(null); // Use ref to store editor instance

  const handleEditorInit = (evt, editor) => {
    editorRef.current = editor; // Store editor instance in ref
  };

  const updateDescription = () => {
    if (editorRef.current) {
      const content = editorRef.current.getContent();
      setDescription(content);
    }
  };

  const handleImageUpload = async (blobInfo, success, failure) => {
    const formData = new FormData();
    formData.append("file", blobInfo.blob(), blobInfo.filename());

    try {
      const response = await fetch(
        "https://nest-jahizan.chbk.run/v1/api/ecommerce/productphotos/image",
        {
          method: "POST",
          body: formData,
          headers: {
            "Content-Type": "multipart/form-data",
            // Include any additional headers required by your API
          },
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      const imageUrl = `https://your-image-server.com/${result.fileName}`; // Adjust the URL based on where your images are served

      success(imageUrl);
    } catch (error) {
      failure("Image upload failed: " + error.message);
    }
  };

  useEffect(() => {
    if (session) {
      setSessionToken(session.token);
    } else {
      setSessionToken(null);
    }
  }, [session]);

  return (
    <div>
      <Editor
        onInit={handleEditorInit}
        onEditorChange={(content, editor) => {
          // Update the description state every time the editor content changes
          setDescription(content);
        }}
        initialValue={description}
        apiKey="xd8f03g5flw9hewuembu8yofhsaq5ca5hkggdlg9qvmkmq64"
        init={{
          height: 500,
          menubar: true,
          plugins: [
            "advlist autolink lists link image charmap print preview anchor",
            "searchreplace visualblocks code fullscreen",
            "insertdatetime media table paste code help wordcount",
            "emoticons template textpattern imagetools",
          ],
          toolbar:
            "undo redo | styles | bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image",
          images_upload_url: "http://localhost:8000/server.php",
          automatic_uploads: true,
          images_reuse_filename: true,
          images_upload_handler: handleImageUpload,
        }}
      />
    </div>
  );
}
