import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logout, getLocalStorageAccessToken } from "../redux/slices/authSlice";

export const baseURL = import.meta.env.VITE_REACT_APP_BACKEND || "/api/v1/";

const baseQuery = fetchBaseQuery({
  baseUrl: baseURL,
  // credentials: "include",
  prepareHeaders: (headers) => {
    const token = getLocalStorageAccessToken();
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReAuth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 401 || result?.error?.status === 403) {
    api.dispatch(logout());
  }

  if (result?.error?.originalStatus === 401) {
    console.log("sending refresh token");
    // send refresh token to get new access token

    const refreshResult = await baseQuery("/refresh", api, extraOptions);
    console.log(refreshResult);

    if (refreshResult?.data) {
      const user = api.getState().auth.user;

      // store the new token
      api.dispatch(setUserCredentials({ ...refreshResult.data, user }));

      // retry the origin query with new token
      result = await baseQuery(args, api, extraOptions);
    } else {
      // logout from application
      api.dispatch(logout());
    }
  }

  return result;
};

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReAuth,
  tagTypes: ["PRODUCT"],
  endpoints: () => ({}),
});
