import React from "react";
import { FiAlertCircle } from "react-icons/fi";

const FieldError = ({ error }) => {
  if (!error) return null;

  return (
    <div className="flex items-center mt-1 text-red-600 text-sm">
      <FiAlertCircle className="h-4 w-4 mr-1 flex-shrink-0" />
      <span>{error}</span>
    </div>
  );
};

export default FieldError;