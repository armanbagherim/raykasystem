import { Button } from "@mui/material";
import React, { useState } from "react";
import PrintPage from "./PrintPage";
import PostageTag from "./PostageTag";

const FactorGenerator = ({ data }) => {
  const [showPrintPage, setShowPrintPage] = useState(false);

  const handlePrintClick = () => {
    setShowPrintPage(true);
  };

  return (
    <div style={{ width: "100%", margin: "0 auto" }} className="pdf print">
      <PrintPage data={data} />
    </div>
  );
};

export default FactorGenerator;
