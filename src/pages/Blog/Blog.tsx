import { useParams } from "react-router-dom";
import { useGetBlogQuery } from "../../redux/features/blog/blogApi";
import moment from "moment";
import SuggestedBlog from "./SuggestedBlog";
import { watchLoader } from "../../utils/loader";
import useTitle from "../../utils/useTitle";

const Blog = () => {
  const params = useParams();
  const { data, isLoading: isLoadingBlog } = useGetBlogQuery(
    params.id as string
  );
  useTitle(data?.data.title || "Blog");
  if (isLoadingBlog) {
    return (
      <div className="w-full bg-slate-950 h-screen flex items-center justify-center">
        {watchLoader}
      </div>
    );
  }

  return (
    <div className="pt-16 w-4/5 mx-auto">
      <h4 className="text-3xl font-medium mt-10">{data.data.title}</h4>
      <div className="flex items-center gap-3 mt-3 text-sm text-slate-300 font-medium">
        <img className="w-8 h-8 rounded-full" src={data.data.photo} alt="" />
        <p>By {data.data.userName}</p>
        <span> {moment(data.data.createdAt).toNow(true)} ago</span>
        <span className="pl-3 normal-case flex items-center gap-1">
          <span className="block">{data.data.views}</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-4 mb-[2px]"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
          </svg>
        </span>
      </div>
      <img
        src={data.data.bannerPhoto}
        className="w-full h-[400px] mt-5"
        alt="blog-image"
      />
      <p
        style={{ whiteSpace: "pre-wrap" }}
        className="mt-5 text-base font-light tracking-wide"
      >
        {data.data.blog}
      </p>
      <div className="mt-5">
        {data.data.keyWords.map((item: string) => (
          <span
            key={item}
            className="secondary-bg px-2 py-1 text-sm font-light mr-2 rounded-sm"
          >
            #{item}
          </span>
        ))}
      </div>

      <div>
        <SuggestedBlog
          searchTerm={`${data.data.keyWords[0]}`}
          blogId={data.data._id}
        ></SuggestedBlog>
      </div>
    </div>
  );
};

export default Blog;
