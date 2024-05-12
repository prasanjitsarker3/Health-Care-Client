import { IMetaData } from "@/Axios/Types/common";
import { baseApi } from "../Api/baseApi";

const schedule = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createSchedule: builder.mutation({
      query: (data) => ({
        url: "/schedule/create",
        method: "POST",
        data,
      }),
      invalidatesTags: ["schedule"],
    }),

    getAllSchedule: builder.query({
      query: (args: Record<string, any>) => ({
        url: "/schedule",
        method: "GET",
        params: args,
      }),
      providesTags: ["schedule"],
    }),
    deleteSchedule: builder.mutation({
      query: (id: string) => ({
        url: `/schedule/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["schedule"],
    }),
  }),
});

export const {
  useCreateScheduleMutation,
  useGetAllScheduleQuery,
  useDeleteScheduleMutation,
} = schedule;
