import { baseApi } from "../../api/baseApi";

const reviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createReview: builder.mutation({
      query: (data) => ({ url: "/review", method: "POST", body: data }),
    }),
    getTeacherReviews: builder.query({
      query: (teacherId: string) => `/review/teacher/${teacherId}`,
    }),
    deleteReview: builder.mutation({
      query: (id: string) => ({ url: `/review/${id}`, method: "DELETE" }),
    }),
  }),
});

export const {
  useCreateReviewMutation,
  useGetTeacherReviewsQuery,
  useDeleteReviewMutation,
} = reviewApi;
