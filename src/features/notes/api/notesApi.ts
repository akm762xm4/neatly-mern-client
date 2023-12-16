import { api } from "../../../app/server-api"
import { AddNote, Note, UpdateNoteQueryProps } from "../types"

const token = localStorage.getItem("token")

const notesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getNotes: builder.query<Note[], void>({
      query: () => ({
        url: "/api/notes",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ["note"],
    }),
    getNote: builder.query<Note, string>({
      query: (noteId) => ({
        url: `api/notes/${noteId}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ["note"],
    }),
    addNote: builder.mutation<void, AddNote>({
      query: (note) => ({
        url: "/api/notes/",
        method: "POST",
        body: note,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["note"],
    }),
    updateNote: builder.mutation<void, UpdateNoteQueryProps>({
      query: ({ _id, patch }) => ({
        url: `/api/notes/${_id}`,
        method: "PATCH",
        body: patch,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["note"],
    }),
    deleteNote: builder.mutation<void, string>({
      query: (_id) => ({
        url: `/api/notes/${_id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["note"],
    }),
  }),
})

export const {
  useGetNotesQuery,
  useGetNoteQuery,
  useAddNoteMutation,
  useUpdateNoteMutation,
  useDeleteNoteMutation,
} = notesApi
