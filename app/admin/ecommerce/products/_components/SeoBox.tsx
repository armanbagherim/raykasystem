"use client";
import React, { useEffect, useState, useRef } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import "ckeditor5/ckeditor5.css";

import {
  ClassicEditor,
  Bold,
  Essentials,
  Italic,
  Mention,
  Paragraph,
  Undo,
  Alignment,
  RemoveFormat,
  Link,
  Underline,
  Subscript,
  Superscript,
  BlockQuote,
  FontColor,
  FontFamily,
  FontSize,
  FontBackgroundColor,
  Heading,
  FontSizeUI,
  CodeEditing,
  LanguageDirection,
} from "ckeditor5";
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
              "undo",
              "redo",
              "|",
              "bold",
              "italic",
              "underline",
              "subscript",
              "superscript",
              "removeFormat",
              "formatBlock",
              "fontFamily",
              "fontSize",
              "fontColor",
              "backgroundColor",
              "borderColor",
              "alignment",
              "numberedList",
              "bulletedList",
              "imageTextAlternative",
              "imageStyle:alignLeft",
              "imageStyle:alignCenter",
              "imageStyle:alignRight",
              "imageStyle:resizeHorizontallyOnly",
              "link",
              "blockQuote",
              "embedAnsweredQuestion",
              "specialChar",
              "pageBreak",
              "print",
              "mediaEmbed",
              "findReplace",
              "languageSelection",
              "heading",
              "codeEditing",
            ],
          },
          plugins: [
            Bold,
            Essentials,
            Italic,
            Mention,
            Paragraph,
            Undo,
            Alignment,
            RemoveFormat,
            Link,
            Underline,
            Subscript,
            Superscript,
            BlockQuote,
            FontColor,
            FontFamily,
            FontSize,
            FontBackgroundColor,
            Heading,
            FontSizeUI,
            CodeEditing,
          ],
          language: "fa",
          initialData: null,
        }}
      />
    </div>
  );
}
