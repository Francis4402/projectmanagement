import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const baseQuery = fetchBaseQuery({
    baseUrl: baseUrl,
})


export const baseApi = createApi({
    reducerPath: "baseApi",
    tagTypes: ["Projects", "Tasks", "Users", "Teams"],
    baseQuery: baseQuery,
    endpoints: () => ({}),
})