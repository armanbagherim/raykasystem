import React, { useEffect, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { useSession } from "next-auth/react";

export default function SeoBox({ setDescription, description }) {
  const { data: session } = useSession();
  const [sessionToken, setSessionToken] = useState(null);
  const [editorContent, setEditorContent] = useState("");

  // Debounce function
  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
  };

  // Debounced function to update description
  const debouncedUpdateDescription = debounce((content) => {
    setDescription(content);
  }, 1000); // 3 seconds delay

  const handleEditorInit = (evt, editor) => {
    setEditorContent(editor);
    // Set the initial description
    setDescription(editor);
  };

  const handleImageUpload = async (blobInfo, success, failure, editor) => {
    const formData = new FormData();
    formData.append("file", blobInfo.blob(), blobInfo.filename());

    try {
      const response = await fetch(
        "https://nest-jahizan.chbk.run/v1/api/ecommerce/productphotos/image",
        {
          method: "POST",
          body: formData,
          headers: {
            Authorization: `Bearer ${sessionToken}`,
          },
        }
      );

      if (response.ok) {
        const jsonResponse = await response.json();
        console.log(jsonResponse);
        // Construct the image URL using the fileName from the response
        const imageUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/v1/api/ecommerce/productphotos/image/${jsonResponse.result.fileName}`;
        // Call the success callback with the image URL
        success(imageUrl);
        // Optionally, insert the image into the editor
        // Assuming `editor` is accessible here, you can insert the image like so:
        editor.insertContent(`<img src="${imageUrl}" alt="Uploaded Image"/>`);
      } else {
        failure("Image upload failed");
      }
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
        apiKey="xd8f03g5flw9hewuembu8yofhsaq5ca5hkggdlg9qvmkmq64"
        onEditorChange={(editor) => {
          const content = editor;
          setEditorContent(content);
          debouncedUpdateDescription(content);
        }}
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
