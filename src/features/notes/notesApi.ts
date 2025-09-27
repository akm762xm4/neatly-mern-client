import { api } from "../../app/serverApi";
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
      invalidatesTags: ["Note", "Dashboard"],
    }),
    updateNote: builder.mutation<void, UpdateNoteQueryProps>({
      query: ({ _id, ...patch }) => ({
        url: `/api/notes/${_id}`,
        method: "PATCH",
        body: patch,
      }),
      invalidatesTags: ["Note", "Dashboard"],
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
      invalidatesTags: ["Note", "Dashboard"],
    }),
    summarizeNote: builder.mutation({
      query: (noteId) => ({
        url: `/api/notes/summarize`,
        method: "POST",
        body: { noteId },
      }),
    }),
    suggestTasks: builder.mutation({
      query: (noteId) => ({
        url: `/api/notes/suggest-tasks`,
        method: "POST",
        body: { noteId },
      }),
    }),
    rewriteNote: builder.mutation({
      query: (body) => ({
        url: `/api/notes/rewrite`,
        method: "POST",
        body,
      }),
    }),
    qaNote: builder.mutation({
      query: (body) => ({
        url: `/api/notes/qa`,
        method: "POST",
        body,
      }),
    }),
    qgNote: builder.mutation({
      query: (noteId) => ({
        url: `/api/notes/qg`,
        method: "POST",
        body: { noteId },
      }),
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
  useSummarizeNoteMutation,
  useSuggestTasksMutation,
  useRewriteNoteMutation,
  useQaNoteMutation,
  useQgNoteMutation,
} = notesApi;

export default notesApi;
