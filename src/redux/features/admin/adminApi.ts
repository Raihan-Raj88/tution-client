import { baseApi } from "../../api/baseApi";

const adminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAdminStats: builder.query({ query: () => "/admin/stats" }),
    getPendingUsers: builder.query({ query: () => "/admin/pending" }),
    approveUser: builder.mutation({ query: (id) => ({ url: `/admin/approve/${id}`, method: "PATCH" }) }),
    rejectUser: builder.mutation({ query: (id) => ({ url: `/admin/reject/${id}`, method: "PATCH" }) }),
    getAllUsers: builder.query({ query: () => "/admin/users" }),
    getAllAdminTeachers: builder.query({ query: () => "/admin/teachers" }),
    getAllAdminStudents: builder.query({ query: () => "/admin/students" }),
    getAllAdminPosts: builder.query({ query: () => "/admin/posts" }),
    getAllAdminBlogs: builder.query({ query: () => "/admin/blogs" }),
    deleteUser: builder.mutation({ query: (id) => ({ url: `/admin/user/${id}`, method: "DELETE" }) }),
    deleteAdminTeacher: builder.mutation({ query: (id) => ({ url: `/admin/teacher/${id}`, method: "DELETE" }) }),
    deleteAdminStudent: builder.mutation({ query: (id) => ({ url: `/admin/student/${id}`, method: "DELETE" }) }),
    deleteAdminPost: builder.mutation({ query: (id) => ({ url: `/admin/post/${id}`, method: "DELETE" }) }),
    deleteAdminBlog: builder.mutation({ query: (id) => ({ url: `/admin/blog/${id}`, method: "DELETE" }) }),
  }),
});

export const {
  useGetAdminStatsQuery,
  useGetPendingUsersQuery,
  useApproveUserMutation,
  useRejectUserMutation,
  useGetAllUsersQuery,
  useGetAllAdminTeachersQuery,
  useGetAllAdminStudentsQuery,
  useGetAllAdminPostsQuery,
  useGetAllAdminBlogsQuery,
  useDeleteUserMutation,
  useDeleteAdminTeacherMutation,
  useDeleteAdminStudentMutation,
  useDeleteAdminPostMutation,
  useDeleteAdminBlogMutation,
} = adminApi;
