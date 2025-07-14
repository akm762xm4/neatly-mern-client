// features/overview/overviewApi.ts

import { api } from "../../app/server-api";
import { Note } from "../notes";
import { Task } from "../task/taskApi";
interface OverviewData {
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
    username: string;
    email: string;
    joined: string;
  };
  chart: { date: Date | string; completed: number }[];
  recentTimeline: { type: string; title: "XYZ"; date: Date | string }[];
}

export const overviewApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getOverview: builder.query<OverviewData, void>({
      query: () => "/api/overview",
      providesTags: ["Overview", "Note", "Task"],
    }),
  }),
});

export const { useGetOverviewQuery } = overviewApi;
