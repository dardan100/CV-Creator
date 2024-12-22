import React from "react";
import { useReactToPrint } from "react-to-print";

const PrintButton = ({ contentRef }) => {
  const handlePrint = useReactToPrint({
    content: () => contentRef.current, // Use the contentRef passed from Main
  });

  return <button onClick={handlePrint}>Print CV</button>;
};

export default PrintButton;