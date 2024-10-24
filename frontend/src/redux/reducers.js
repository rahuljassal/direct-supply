import { combineReducers } from "@reduxjs/toolkit";
import { apiSlice } from "../services/apiSlice";
import authReducer from "./slices/authSlice";
import selectionsSlice from "./slices/selectionsSlice";
import alertSlice from "./slices/alertSlice";

export default combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
  auth: authReducer,
  selections: selectionsSlice,
  alert: alertSlice,
});
