import { configureStore } from "@reduxjs/toolkit";

// root reducers
import rootReducer from "./reducers";
import { apiSlice } from "../services/apiSlice";

export const store = configureStore({
  reducer: rootReducer,

  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(apiSlice.middleware);
  },
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
