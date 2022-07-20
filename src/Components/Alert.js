import React from "react";
import Snackbar from "@mui/material/Snackbar";
import { CryptoState } from "../CryptoContext";

import MuiAlert from "@mui/material/Alert";

const Alert = () => {
  const { alert, setAlert } = CryptoState();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setAlert({ open: false });
  };

  return (
    <Snackbar open={alert.open} autoHideDuration={5000} onClose={handleClose}>
      <MuiAlert
        onClose={handleClose}
        severity={alert.type}
        elevation={6}
        variant="filled"
      >
        {alert.message}
      </MuiAlert>
    </Snackbar>
  );
};

export default Alert;
