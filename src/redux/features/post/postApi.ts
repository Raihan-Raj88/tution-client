import { baseApi } from "../../api/baseApi";

const postApi = baseApi.injectEndpoints({
  endpoints: (builders) => ({
    createPost: builders.mutation({
      query: (post) => ({
        url: "/post",
        method: "POST",
        body: post,
      }),
    }),
    getAllPosts: builders.query({
      query: (data) => {
        const params = new URLSearchParams();
        if (data) {
          data.forEach((item: { name: string; value: string }) => {
            params.append(item.name, item.value);
          });
        }
        return {
          url: "/post",
          method: "GET",
          params: params,
        };
      },
    }),
    getSingleUserPosts: builders.query({
      query: (id) => ({
        url: `/post/user/${id}`,
        method: "GET",
      }),
    }),
    updatePost: builders.mutation({
      query: ({ id, ...data }) => ({
        url: `/post/${id}`,
        method: "PUT",
        body: data,
      }),
    }),
    deleteSinglePost: builders.mutation({
      query: (id) => ({
        url: `/post/delete/${id}`,
        method: "DELETE",
      }),
    }),
    getThanas: builders.query({
      query: (data) => {
        const params = new URLSearchParams();
        if (data) {
          data.forEach((item: { name: string; value: string }) => {
            params.append(item.name, item.value);
          });
        }
        return { url: "/district", method: "GET", params: params };
      },
    }),
  }),
});

export const {
  useCreatePostMutation,
  useGetAllPostsQuery,
  useGetSingleUserPostsQuery,
  useUpdatePostMutation,
  useDeleteSinglePostMutation,
  useGetThanasQuery,
} = postApi;
