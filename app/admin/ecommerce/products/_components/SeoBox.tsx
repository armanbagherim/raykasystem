"use client";
import React, { useEffect, useState, useRef } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import "ckeditor5/ckeditor5.css";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import { useSession } from "next-auth/react";

export default function SeoBox({
  setDescription,
  description,
  disabled = false,
}) {
  const { data: session } = useSession();
  const [sessionToken, setSessionToken] = useState(null);
  const editorRef = useRef(null); // Use ref to store editor instance

  useEffect(() => {
    if (session) {
      setSessionToken(session.token);
    } else {
      setSessionToken(null);
    }
  }, [session]);

  const handleEditorChange = (event, editor) => {
    const content = editor.getData(); // Get the editor content
    setDescription(content); // Update the description state
  };

  return (
    <div className="mt-4 mb-6">
      <CKEditor
        disabled={disabled}
        editor={ClassicEditor}
        data={description}
        onInit={(editor) => {
          editorRef.current = editor; // Store editor instance in ref
        }}
        onChange={handleEditorChange}
        config={{
          toolbar: {
            items: [
              "heading",
              "|",
              "alignment",
              "|",
              "bold",
              "italic",
              "strikethrough",
              "underline",
              "subscript",
              "superscript",
              "|",
              "link",
              "|",
              "bulletedList",
              "numberedList",
              "todoList",
              "-", // break point
              "fontfamily",
              "fontsize",
              "fontColor",
              "fontBackgroundColor",
              "|",
              "code",
              "codeBlock",
              "|",
              "insertTable",
              "|",
              "outdent",
              "indent",
              "|",
              "uploadImage",
              "blockQuote",
              "|",
              "undo",
              "redo",
            ],
            shouldNotGroupWhenFull: false,
          },

          language: "fa",
          initialData: null,
        }}
      />
    </div>
  );
}
