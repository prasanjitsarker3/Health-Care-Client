import { baseApi } from "../Api/baseApi";

const doctorSchedule = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createDoctorSchedule: builder.mutation({
      query: (data) => ({
        url: "/doctor_schedule/create",
        method: "POST",
        data,
      }),
      invalidatesTags: ["doctorSchedule"],
    }),
    getDoctorSchedule: builder.query({
      query: () => ({
        url: "/doctor_schedule/mySchedule",
        method: "GET",
      }),
      providesTags: ["doctorSchedule"],
    }),
    deleteDoctorSchedule: builder.mutation({
      query: (id: string) => ({
        url: `/doctor_schedule/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["doctorSchedule"],
    }),
  }),
});

export const {
  useCreateDoctorScheduleMutation,
  useGetDoctorScheduleQuery,
  useDeleteDoctorScheduleMutation,
} = doctorSchedule;
