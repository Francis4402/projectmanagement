import { baseApi } from "@/redux/api/baseApi";
import { Task } from "@/types";



const taskApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getTasks: builder.query<Task[], { projectId: number }>({
            query: ({ projectId }) => ({
                url: `/tasks?projectId=${projectId}`,
                providesTags: ["Tasks"],
                method: "GET",
            })
        }),

        getTaskByUser: builder.query<Task[], number>({
            query: (userId) => `tasks/user/${userId}`,
            providesTags: (result, error, userId) => 
                result ? result.map(({id}) => ({type: "Tasks", id})) : [{type: "Tasks", id: userId}]
        }),

        createTask: builder.mutation<Task, Partial<Task>>({
            query: (task) => ({
                url: "/tasks",
                method: "POST",
                body: task,
            }),
            invalidatesTags: ["Tasks"],
        }),

        updateTaskStatus: builder.mutation<Task, {taskId: number, status: string}>({
            query: ({taskId, status}) => ({
                url: `/tasks/${taskId}/status`,
                method: "PATCH",
                body: {status}
            }),
            invalidatesTags: (result, error, { taskId }) => [
                { type: "Tasks", id: taskId },
            ],
        })
    })
})

export const { useGetTasksQuery, useGetTaskByUserQuery, useCreateTaskMutation, useUpdateTaskStatusMutation } = taskApi;