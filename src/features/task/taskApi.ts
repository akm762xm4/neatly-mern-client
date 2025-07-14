import { api } from "../../app/server-api";

export interface Task {
  _id: string;
  title: string;
  description: string;
  isCompleted: boolean;
  dueDate?: string;
  priority?: "low" | "medium" | "high";
  createdAt: string;
  updatedAt: string;
}

export const tasksApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getTasks: builder.query<Task[], void>({
      query: () => ({
        url: "/api/tasks",
        method: "GET",
      }),
      providesTags: ["Task"],
    }),

    addTask: builder.mutation<Task, Partial<Task>>({
      query: (newTask) => ({
        url: "/api/tasks",
        method: "POST",
        body: newTask,
      }),
      invalidatesTags: ["Task", "Overview"],
    }),

    updateTask: builder.mutation<Task, { id: string; data: Partial<Task> }>({
      query: ({ id, data }) => ({
        url: `/api/tasks/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Task", "Overview"],
    }),

    deleteTask: builder.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `/api/tasks/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Task", "Overview"],
    }),

    toggleComplete: builder.mutation<Task, string>({
      query: (id) => ({
        url: `/api/tasks/${id}/toggle`,
        method: "PATCH",
      }),
      invalidatesTags: ["Task", "Overview"],
    }),
  }),
});

export const {
  useGetTasksQuery,
  useAddTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
  useToggleCompleteMutation,
} = tasksApi;
