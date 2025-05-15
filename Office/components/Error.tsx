import React from "react";

interface ErrorProps {
  message: string;
}

export const Error: React.FC<ErrorProps> = ({ message }) => {
  return (
    <div className="alert">
      <div className="col-md-24 error ext-error">{message}</div>
    </div>
  );
};
