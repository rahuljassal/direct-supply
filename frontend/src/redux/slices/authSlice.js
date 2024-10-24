import { createSlice } from "@reduxjs/toolkit";
// import { ACCESS_TOKEN_KEY } from "../../constants/index.ts";

export const getLocalStorageAccessToken = () => {
  return localStorage.getItem("ACCESS_TOKEN_KEY");
};
const getLocalStorageIsLoggingOut = () => {
  return localStorage.getItem("isLoggingOut");
};

const initialState = {
  isAuthenticated: !!getLocalStorageAccessToken(),
  user: null,
  isLoggingOut: !!getLocalStorageIsLoggingOut() || false,
};
const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setAccessTokenCredentials: (state, action) => {
      const { access_token } = action.payload;
      state.isAuthenticated = true;
      localStorage.setItem("ACCESS_TOKEN_KEY", access_token);
    },
    setUserCredentials: (state, action) => {
      state.user = action.payload;
    },
    setLoggingOut: (state, action) => {
      state.isLoggingOut = action.payload;
      localStorage.setItem("isLoggingOut", action.payload.toString());
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.isLoggingOut = false;
      localStorage.removeItem("ACCESS_TOKEN_KEY");
      localStorage.removeItem("isLoggingOut");
    },
  },
});

// Actions
export const {
  logout,
  setUserCredentials,
  setAccessTokenCredentials,
  setLoggingOut,
} = authSlice.actions;

// Reducer
export default authSlice.reducer;

// Selectors
export const getCurrentUser = (state) => state.auth.user;
export const getAuthentication = (state) => state.auth.isAuthenticated;
export const getIsLoggingOut = (state) => state.auth.isLoggingOut;
