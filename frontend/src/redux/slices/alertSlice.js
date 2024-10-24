import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  message: "",
  open: false,
  severity: "", //* error/success/warning
  autoHide: 4000,
};

export const alertSlice = createSlice({
  name: "alertInfo",
  initialState,
  reducers: {
    updateAlertInfo: (state, action) => {
      const data = action.payload;
      return {
        ...state,
        ...data,
      };
    },
    resetAlertInfo: () => {
      return {
        ...initialState,
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateAlertInfo, resetAlertInfo } = alertSlice.actions;

export default alertSlice.reducer;
