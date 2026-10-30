import { baseApi } from "../../api/baseApi";

const teacherApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createStudent: builder.mutation({
      query: (data) => ({
        url: "student",
        method: "POST",
        body: data,
      }),
    }),
    getOneStudentById: builder.query({
      query: (email) => ({
        url: `/student/email/${email}`,
        method: "GET",
      }),
    }),
    updateStudentProfile: builder.mutation({
      query: (data) => ({
        url: `student/${data.id}`,
        method: "PUT",
        body: data,
      }),
    }),
  }),
});

export const {
  useCreateStudentMutation,
  useGetOneStudentByIdQuery,
  useUpdateStudentProfileMutation,
} = teacherApi;
