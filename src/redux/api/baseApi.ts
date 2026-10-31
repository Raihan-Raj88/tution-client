import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://tution-server-5vdd.onrender.com/api",
    credentials: "include",
  }),
  endpoints: () => ({}),
});
