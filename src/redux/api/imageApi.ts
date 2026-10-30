import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const imageApi = createApi({
  reducerPath: "imageApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.imgbb.com/1/",
    // credentials: "include",
  }),
  endpoints: (builder) => ({
    postImage: builder.mutation({
      query: (imageFile) => {
        // Prepare form data
        const formData = new FormData();
        formData.append("image", imageFile);

        return {
          url: "upload?key=9306685454736a79d3f26489f400da4b",
          method: "POST",
          body: formData,
        };
      },
    }),
  }),
});

export const { usePostImageMutation } = imageApi;
