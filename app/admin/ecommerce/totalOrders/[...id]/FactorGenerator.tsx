import { Button } from "@mui/material";
import React, { useState } from "react";
import PrintPage from "./PrintPage";
import PostageTag from "./PostageTag";

const FactorGenerator = ({ data }) => {
  const [showPrintPage, setShowPrintPage] = useState(false);

  const handlePrintClick = () => {
    setShowPrintPage(true);
  };

  return <PrintPage data={data} />;
};

export default FactorGenerator;
