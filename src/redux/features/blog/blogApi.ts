import { baseApi } from "../../api/baseApi";

type TId = { id: string };

const blogApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllBlogs: builder.query({
      query: (queryParams) => {
        const params = new URLSearchParams();
        if (queryParams) {
          queryParams.forEach((item: { name: string; value: string }) => {
            params.append(item.name, item.value);
          });
        }
        return {
          url: "blog",
          method: "GET",
          params,
        };
      },
    }),
    getBlog: builder.query({
      query: (id: string) => {
        return {
          url: `blog/${id}`,
          method: "GET",
        };
      },
    }),
    getUserBlogs: builder.query({
      query: (id: string) => {
        return {
          url: `blog/user/${id}`,
          method: "GET",
        };
      },
    }),
    createBlog: builder.mutation({
      query: (data) => {
        return {
          url: "blog",
          method: "POST",
          body: data,
        };
      },
    }),
    updateBlog: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `blog/${id}`,
        method: "PUT",
        body: data,
      }),
    }),
    deleteBlog: builder.mutation({
      query: ({ id }: TId) => {
        return {
          url: `blog/${id}`,
          method: "DELETE",
        };
      },
    }),
  }),
});

export const {
  useGetAllBlogsQuery,
  useGetBlogQuery,
  useGetUserBlogsQuery,
  useCreateBlogMutation,
  useUpdateBlogMutation,
  useDeleteBlogMutation,
} = blogApi;
