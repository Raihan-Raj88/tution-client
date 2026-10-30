import { baseApi } from "../../api/baseApi";

const teacherApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllTeachers: builder.query({
      query: (data) => {
        const params = new URLSearchParams();
        if (data) {
          data.forEach((item: { name: string; value: string }) => {
            params.append(item.name, item.value);
          });
        }

        return {
          url: "/teacher",
          method: "GET",
          params: params,
        };
      },
    }),
    getOneTeacherBYId: builder.query({
      query: (id: string) => `/teacher/profile/${id}`,
    }),
    getOneTeacher: builder.query({
      query: (id: string) => `/teacher/${id}`,
    }),
    createTeacher: builder.mutation({
      query: (teacherData) => ({
        url: "/teacher",
        method: "POST",
        body: teacherData,
      }),
    }),
    updateTeacher: builder.mutation({
      query: (data) => ({
        url: `/teacher/${data.id}`,
        method: "PUT",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetAllTeachersQuery,
  useGetOneTeacherBYIdQuery,
  useCreateTeacherMutation,
  useGetOneTeacherQuery,
  useUpdateTeacherMutation,
} = teacherApi;
