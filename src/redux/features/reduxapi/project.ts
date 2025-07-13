import { baseApi } from "@/redux/api/baseApi";
import { Project } from "@/types";


const projectApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getProjects: builder.query<Project[], void>({
            query: () => ({
                url: "/projects",
                providesTags: ["Projects"],
                method: "GET",
            })
        }),

        createProject: builder.mutation<Project, Partial<Project>>({
            query: (project) => ({
                url: "/projects",
                method: "POST",
                body: project,
            }),
            invalidatesTags: ["Projects"],
        }),

    })
})


export const { useGetProjectsQuery, useCreateProjectMutation } = projectApi;