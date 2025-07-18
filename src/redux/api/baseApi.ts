import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const baseQuery = fetchBaseQuery({
    baseUrl: baseUrl,
    credentials: "include",
    prepareHeaders: (headers, {}) => {
        const token = Cookies.get("token");

        if (token) {
            headers.set("Authorization", `Bearer ${token}`);
        }

        return headers;
    }
})


export const baseApi = createApi({
    reducerPath: "baseApi",
    tagTypes: ["Projects", "Tasks", "Users", "Teams"],
    baseQuery: baseQuery,
    endpoints: () => ({}),
})