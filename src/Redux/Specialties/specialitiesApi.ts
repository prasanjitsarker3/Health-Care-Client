import { baseApi } from "../Api/baseApi";

const doctorSpecialties = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createSpecialties: builder.mutation({
      query: (data) => ({
        url: "/specialties/create",
        method: "POST",
        contentType: "multipart/form-data",
        data,
      }),
      invalidatesTags: ["specialties"],
    }),
    getAllSpecialties: builder.query({
      query: () => ({
        url: "/specialties",
        method: "GET",
      }),
      providesTags: ["specialties"],
    }),
    deleteSpecialties: builder.mutation({
      query: (id) => ({
        url: `/specialties/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["specialties"],
    }),
  }),
});

export const {
  useCreateSpecialtiesMutation,
  useGetAllSpecialtiesQuery,
  useDeleteSpecialtiesMutation,
} = doctorSpecialties;
