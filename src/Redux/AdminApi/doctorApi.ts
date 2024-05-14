import { DoctorResponse, IDoctorData } from "@/components/Types/DoctorType";
import { baseApi } from "../Api/baseApi";
import { IMetaData } from "@/Axios/Types/common";
import { AnyAaaaRecord } from "dns";

const doctors = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createDoctors: builder.mutation({
      query: (data) => ({
        url: "/users/create-doctor",
        method: "POST",
        contentType: "multipart/form-data",
        data,
      }),
      invalidatesTags: ["doctors"],
    }),

    getDoctors: builder.query({
      query: (args: Record<string, any>) => ({
        url: "/doctor",
        method: "GET",
        params: args,
      }),
      transformResponse: (response: IDoctorData[], meta: IMetaData) => {
        return {
          doctor: response,
          meta,
        };
      },
      providesTags: ["doctors"],
    }),
    deleteDoctor: builder.mutation({
      query: (id: string) => ({
        url: `/doctor/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["doctors"],
    }),
    getSingleDoctor: builder.query({
      query: (id: string | string[] | undefined) => ({
        url: `/doctor/${id}`,
        method: "GET",
      }),
      providesTags: ["doctors"],
    }),
    updateDoctor: builder.mutation({
      query: (data) => ({
        url: `/doctor/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: ["doctors"],
    }),
  }),
});

export const {
  useCreateDoctorsMutation,
  useGetDoctorsQuery,
  useDeleteDoctorMutation,
  useGetSingleDoctorQuery,
  useUpdateDoctorMutation,
} = doctors;
