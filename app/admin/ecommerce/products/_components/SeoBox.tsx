import { TextField } from "@mui/material";
import { Editor } from "@tinymce/tinymce-react";
import React, { useRef } from "react";

export default function SeoBox() {
  const editorRef = useRef(null);

  const handleEditorChange = (content) => {
    const analysis = analyzeSEO(content, "yourKeyword"); // Replace "yourKeyword" with the keyword you want to analyze
    setSeoAnalysis(analysis);
  };
  return (
    <div>
      <TextField
        onChange={(e) => setName(e.target.value)}
        required
        fullWidth
        id="outlined-basic"
        label="کلمه کلیدی"
        variant="outlined"
        className="mb-4"
      />
      <Editor
        onInit={(evt, editor) => (editorRef.current = editor)}
        apiKey="xd8f03g5flw9hewuembu8yofhsaq5ca5hkggdlg9qvmkmq64"
        onEditorChange={handleEditorChange}
        init={{
          height: 500,
          menubar: false,
          plugins: [
            "advlist autolink lists link image charmap print preview anchor",
            "searchreplace visualblocks code fullscreen",
            "insertdatetime media table paste code help wordcount",
          ],
          toolbar:
            "undo redo | formatselect | " +
            "bold italic backcolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "removeformat | help",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
        }}
      />
    </div>
  );
}
