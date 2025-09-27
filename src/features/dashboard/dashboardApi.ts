import { api } from "../../app/serverApi";
import { Note } from "../notes";
import { Task } from "../task/taskApi";
interface DashboardData {
  activity: Task | Note[];
  notes: {
    total: number;
    latest: Note;
  };
  tasks: {
    total: number;
    completed: number;
    pending: number;
    latest: Task;
    dueDates: string[];
  };
  user: {
    name: string;
    email: string;
    joined: string;
  };
  chart: { date: Date | string; completed: number }[];
  recentTimeline: { type: string; title: "XYZ"; date: Date | string }[];
}

export const dashboardApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getDashboard: builder.query<DashboardData, void>({
      query: () => "/api/dashboard",
      providesTags: ["Dashboard", "Note", "Task"],
    }),
    getQuote: builder.query<QuoteRes, void>({
      query: () => "/api/dashboard/quote",
    }),
  }),
});

export const { useGetDashboardQuery, useGetQuoteQuery } = dashboardApi;

interface QuoteRes {
  quote: { text: string; author: string };
}
