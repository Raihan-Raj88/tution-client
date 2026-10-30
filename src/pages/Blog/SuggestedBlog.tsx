import moment from "moment";
import { useGetAllBlogsQuery } from "../../redux/features/blog/blogApi";
import { Link } from "react-router-dom";

const SuggestedBlog = ({
  searchTerm,
  blogId,
}: {
  searchTerm: string;
  blogId: string;
}) => {
  const { data: sameCategoryBlogs, isLoading: isLoadingSameBlogs } =
    useGetAllBlogsQuery([
      { name: "searchKey", value: searchTerm },
      { name: "blogId", value: blogId },
      { name: "limit", value: 3 },
    ]);

  if (isLoadingSameBlogs) return <div>Loading...</div>;
  if (!sameCategoryBlogs?.data?.blogs?.length) return null;
  return (
    <div>
      <h1 className="my-10 text-2xl font-semibold">Suggested Blogs</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {sameCategoryBlogs.data.blogs.map((blog: any) => (
          <div
            key={blog._id}
            className="flex flex-col h-full secondary-bg shadow-md"
          >
            <img src={blog.bannerPhoto} alt="" />
            <Link
            to={`/blogs/blog/${blog._id}`}
              className="px-2 py-3 flex-1 flex flex-col justify-between"
            >
              <h4>{blog.title}</h4>
              <div className="flex items-center gap-3 mt-3 text-sm text-slate-300 font-medium ">
                <p>By {blog.userName}</p>
                <span> {moment(blog.createdAt).toNow(true)} ago</span>
              </div>
            </Link>
            <div></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SuggestedBlog;
