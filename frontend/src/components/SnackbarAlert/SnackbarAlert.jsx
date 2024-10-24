import React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

//import action
import { resetAlertInfo } from "../../redux/slices/alertSlice";
import { IconButton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";

const Alert = (props, ref) => {
  return <MuiAlert elevation={6} {...props} ref={ref} />;
};

export default function SnackbarAlert() {
  const dispatch = useDispatch();
  const alertInfo = useSelector((state) => state.alert);

  const handleClose = () => {
    dispatch(resetAlertInfo());
  };
  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );
  return (
    <Snackbar
      message={alertInfo.message}
      action={action}
      open={alertInfo.open}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      autoHideDuration={alertInfo.autoHide}
      onClose={handleClose}
      style={{ maxWidth: "600px", minWidth: "400px", fontWeight: "bolder" }}
    />
  );
}
