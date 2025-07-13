import { baseApi } from "@/redux/api/baseApi";
import { User } from "@/types";



const userApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getUsers: builder.query<User[], void>({
            query: () => ({
                url: "/users",
                providesTags: ["Users"],
                method: "GET",
            })
        }),
    })
})

export const { useGetUsersQuery } = userApi;