import React, { useEffect, useState, useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { useSession } from "next-auth/react";

export default function SeoBox({ setDescription, description }) {
  const { data: session } = useSession();
  const [sessionToken, setSessionToken] = useState(null);
  const [editorContent, setEditorContent] = useState("");
  const lastContentRef = useRef(description); // اضافه کردن ref برای نگهداری مقدار قبلی

  // Debounced function to update description
  const debouncedUpdateDescription = (content) => {
    setDescription(content);
  };

  const handleEditorInit = (evt, editor) => {
    setEditorContent(editor);
    // Set the initial description
    setDescription(editor);
  };

  const handleImageUpload = async (blobInfo, success, failure, editor) => {
    // Your existing image upload logic
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
        initialValue={description}
        apiKey="xd8f03g5flw9hewuembu8yofhsaq5ca5hkggdlg9qvmkmq64"
        onEditorChange={(content) => {
          if (content !== lastContentRef.current) {
            setEditorContent(content);
            debouncedUpdateDescription(content);
            lastContentRef.current = content;
          }
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
