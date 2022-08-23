import React, { useEffect } from "react";

const Alert = ({ groceryItems, msg, type, removeAlert }) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      removeAlert();
    }, 3000);
    return () => clearTimeout(timeout);
  }, [groceryItems]);

  return <p className={`alert alert-${type}`}>{msg}</p>;
};

export default Alert;
