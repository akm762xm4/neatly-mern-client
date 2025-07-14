import { api } from "../../app/server-api";
import { AddNote, Note, UpdateNoteQueryProps } from ".";

const notesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getNotes: builder.query<Note[], void>({
      query: () => ({
        url: "/api/notes",
      }),
      providesTags: ["Note"],
    }),
    getNote: builder.query<Note, string>({
      query: (noteId) => ({
        url: `api/notes/${noteId}`,
      }),
      providesTags: ["Note"],
    }),
    addNote: builder.mutation<void, AddNote>({
      query: (note) => ({
        url: "/api/notes/",
        method: "POST",
        body: note,
      }),
      invalidatesTags: ["Note", "Overview"],
    }),
    updateNote: builder.mutation<void, UpdateNoteQueryProps>({
      query: ({ _id, ...patch }) => ({
        url: `/api/notes/${_id}`,
        method: "PATCH",
        body: patch,
      }),
      invalidatesTags: ["Note", "Overview"],
    }),
    togglePin: builder.mutation<Note, string>({
      query: (noteId) => ({
        url: `/api/notes/${noteId}/pin`,
        method: "PATCH",
      }),
      invalidatesTags: ["Note"],
    }),
    deleteNote: builder.mutation<void, string>({
      query: (_id) => ({
        url: `/api/notes/${_id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Note", "Overview"],
    }),
  }),
});

export const {
  useGetNotesQuery,
  useGetNoteQuery,
  useAddNoteMutation,
  useUpdateNoteMutation,
  useDeleteNoteMutation,
  useTogglePinMutation,
} = notesApi;
