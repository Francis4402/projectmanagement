import { baseApi } from "@/redux/api/baseApi";
import { SearchResults } from "@/types";



const searchApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        search: builder.query<SearchResults[], string>({
            query: (query) => `search?query=${query}`,
        }),
    })
});

export const { useSearchQuery } = searchApi;