"use client";
import React, { useEffect, useState, useRef, useMemo } from "react";
import { CKEditor, useCKEditorCloud } from "@ckeditor/ckeditor5-react";
import "ckeditor5/ckeditor5.css";
import { useSession } from "next-auth/react";

const LICENSE_KEY =
  "eyJhbGciOiJFUzI1NiJ9.eyJleHAiOjE3NjU5Mjk1OTksImp0aSI6IjFlZGZmYzcwLTY0ZjItNGFiMi1hZGVlLTE3NGE4M2VkYzQ4ZiIsInVzYWdlRW5kcG9pbnQiOiJodHRwczovL3Byb3h5LWV2ZW50LmNrZWRpdG9yLmNvbSIsImRpc3RyaWJ1dGlvbkNoYW5uZWwiOlsiY2xvdWQiLCJkcnVwYWwiXSwiZmVhdHVyZXMiOlsiRFJVUCIsIkJPWCJdLCJ2YyI6Ijk1YjQ0NDNiIn0.3rpNHzilpIeSwbRT1Kt9jjSD41dTBEGcC7DVYHlogwA1BMnylgLjI3p4IfvNXc8IPpVH9_uumRQggP8qPBbiWg";

export default function SeoBox({
  setDescription,
  description,
  disabled = false,
}) {
  const { data: session } = useSession();
  const editorContainerRef = useRef(null);
  const editorRef = useRef(null);
  const editorWordCountRef = useRef(null);
  const [isLayoutReady, setIsLayoutReady] = useState(false);
  const cloud = useCKEditorCloud({ version: "44.1.0" });

  useEffect(() => {
    setIsLayoutReady(true);
    return () => setIsLayoutReady(false);
  }, []);

  const { ClassicEditor, editorConfig } = useMemo(() => {
    if (cloud.status !== "success" || !isLayoutReady) {
      return {};
    }

    const {
      ClassicEditor,
      Alignment,
      AutoLink,
      Autosave,
      BlockQuote,
      Bold,
      Bookmark,
      Code,
      CodeBlock,
      Essentials,
      FontBackgroundColor,
      FontColor,
      FontFamily,
      FontSize,
      GeneralHtmlSupport,
      Heading,
      Highlight,
      HorizontalLine,
      Indent,
      IndentBlock,
      Italic,
      Link,
      List,
      ListProperties,
      Paragraph,
      RemoveFormat,
      SpecialCharacters,
      Strikethrough,
      Style,
      Subscript,
      Superscript,
      Table,
      TableCaption,
      TableCellProperties,
      TableColumnResize,
      TableProperties,
      TableToolbar,
      TodoList,
      Underline,
    } = cloud.CKEditor;

    return {
      ClassicEditor,
      editorConfig: {
        toolbar: {
          items: [
            "|",
            "heading",
            "style",
            "|",
            "fontSize",
            "fontFamily",
            "fontColor",
            "fontBackgroundColor",
            "|",
            "bold",
            "italic",
            "underline",
            "strikethrough",
            "subscript",
            "superscript",
            "code",
            "removeFormat",
            "|",
            "specialCharacters",
            "horizontalLine",
            "link",
            "bookmark",
            "insertTable",
            "highlight",
            "blockQuote",
            "codeBlock",
            "|",
            "alignment",
            "|",
            "bulletedList",
            "numberedList",
            "todoList",
            "outdent",
            "indent",
          ],
          shouldNotGroupWhenFull: true,
        },
        plugins: [
          Alignment,
          AutoLink,
          Autosave,
          BlockQuote,
          Bold,
          Bookmark,
          Code,
          CodeBlock,
          Essentials,
          FontBackgroundColor,
          FontColor,
          FontFamily,
          FontSize,
          GeneralHtmlSupport,
          Heading,
          Highlight,
          HorizontalLine,
          Indent,
          IndentBlock,
          Italic,
          Link,
          List,
          ListProperties,
          Paragraph,
          RemoveFormat,
          SpecialCharacters,
          Strikethrough,
          Style,
          Subscript,
          Superscript,
          Table,
          TableCaption,
          TableCellProperties,
          TableColumnResize,
          TableProperties,
          TableToolbar,
          TodoList,
          Underline,
        ],
        language: {
          ui: "en",
          content: "ar",
        },
        licenseKey: LICENSE_KEY,
        placeholder: "Type or paste your content here!",
      },
    };
  }, [cloud, isLayoutReady]);

  const handleEditorChange = (event, editor) => {
    const content = editor.getData();
    setDescription(content);
  };

  return (
    <div className="main-container">
      <div className="editor-container" ref={editorContainerRef}>
        <div className="editor-container__editor">
          {ClassicEditor && editorConfig && (
            <CKEditor
              editor={ClassicEditor}
              config={editorConfig}
              data={description}
              onChange={handleEditorChange}
            />
          )}
        </div>
        <div
          className="editor_container__word-count"
          ref={editorWordCountRef}
        ></div>
      </div>
    </div>
  );
}
