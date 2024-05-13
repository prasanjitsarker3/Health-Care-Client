import { baseApi } from "./Api/baseApi";

const getUser = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    userInfo: builder.query({
      query: () => ({
        url: "/users/me",
        method: "GET",
      }),
    }),
  }),
});

export const { useUserInfoQuery } = getUser;
