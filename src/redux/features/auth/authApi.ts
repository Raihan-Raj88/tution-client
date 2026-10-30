import { baseApi } from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/login",
        method: "POST",
        body: userInfo,
      }),
    }),
    confirmEmail: builder.query({
      query: (data) => ({
        url: `/auth/${data.id}/verify/${data.token}`,
        method: "GET",
      }),
    }),
    resendVerificationEmail: builder.mutation({
      query: (data) => ({
        url: `/auth/verify/email`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useConfirmEmailQuery,
  useResendVerificationEmailMutation,
} = authApi;
