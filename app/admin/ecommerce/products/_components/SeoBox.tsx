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
      readonly: disabled, // Disable the editor if the `disabled` prop is true
      placeholder: "Type or paste your content here!",
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
    [disabled] // Rebuild config when `disabled` changes
  );

  // Handle editor content change
  const handleBlur = (newContent) => {
    setDescription(newContent); // Pass content to the parent component
  };

  return (
    <div className="main-container">
      <div className="editor-container">
        <JoditEditor
          ref={editor}
          value={description}
          config={config}
          tabIndex={1} // tabIndex of textarea
          onBlur={handleBlur} // Update content on blur
          onChange={() => {}} // Optional: Use if you need real-time updates
        />
      </div>
    </div>
  );
}
