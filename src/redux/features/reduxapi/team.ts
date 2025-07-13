import { baseApi } from "@/redux/api/baseApi";
import { Team } from "@/types";



const teamApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getTeams: builder.query<Team[], void>({
            query: () => ({
                url: "/teams",
                providesTags: ["Teams"],
                method: "GET",
            })
        }),
    })
});


export const { useGetTeamsQuery } = teamApi;