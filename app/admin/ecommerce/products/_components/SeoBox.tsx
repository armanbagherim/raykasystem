"use client";
import React, { useRef, useMemo } from "react";
import JoditEditor from "jodit-react";
import { useSession } from "next-auth/react";

export default function SeoBox({
  setDescription,
  description,
  disabled = false,
}) {
  const { data: session } = useSession();
  const editor = useRef(null);

  // Jodit configuration
  const config = useMemo(
    () => ({
      readonly: disabled,
      placeholder: "متن خود را اینجا تایپ یا جایگذاری کنید!",
      toolbarAdaptive: false,
      toolbarButtonSize: "medium",
      buttons: [
        "bold",
        "italic",
        "underline",
        "strikethrough",
        "|",
        "ul",
        "ol",
        "|",
        "font",
        "fontsize",
        "brush",
        "paragraph",
        "|",
        "align",
        "outdent",
        "indent",
        "|",
        "table",
        "link",
        "image",
        "|",
        "undo",
        "redo",
        "|",
        "hr",
        "eraser",
        "fullsize",
      ],
    }),
    [disabled]
  );

  // Handle editor content change
  const handleBlur = (newContent) => {
    setDescription(newContent);
  };

  return (
    <div className="main-container">
      <div className="editor-container">
        <JoditEditor
          ref={editor}
          value={description}
          config={config}
          tabIndex={1}
          onBlur={handleBlur}
          onChange={() => {}}
        />
      </div>
    </div>
  );
}
