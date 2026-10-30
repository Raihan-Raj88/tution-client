import { useGetAllAdminBlogsQuery, useDeleteAdminBlogMutation } from "../../redux/features/admin/adminApi";
import { watchLoader } from "../../utils/loader";
import toast from "react-hot-toast";
import moment from "moment";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const AdminBlogs = () => {
  const { data, isLoading, refetch } = useGetAllAdminBlogsQuery({});
  const [deleteBlog] = useDeleteAdminBlogMutation();

  const handleDelete = (id: string, title: string) => {
    Swal.fire({
      title: `Delete "${title}"?`, icon: "warning",
      showCancelButton: true, confirmButtonColor: "#d33", cancelButtonColor: "#00ccb1",
      confirmButtonText: "Yes, delete!", background: "#0f1f3d", color: "#fff",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try { await deleteBlog(id).unwrap(); refetch(); toast.success("Blog deleted!"); }
        catch { toast.error("Failed to delete."); }
      }
    });
  };

  if (isLoading) return <div className="flex justify-center py-20">{watchLoader}</div>;
  const blogs = data?.data || [];

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Blogs</h1>
        <p className="text-slate-400 text-sm mt-1">{blogs.length} blogs published</p>
      </div>
      <div className="secondary-bg rounded-xl border border-white/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10 text-slate-400">
                <th className="text-left px-4 py-3">Blog</th>
                <th className="text-left px-4 py-3 hidden md:table-cell">Author</th>
                <th className="text-left px-4 py-3 hidden md:table-cell">Views</th>
                <th className="text-left px-4 py-3 hidden lg:table-cell">Published</th>
                <th className="text-right px-4 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {blogs.map((b: any) => (
                <tr key={b._id} className="border-b border-white/5 hover:bg-white/5 transition-all">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      {b.bannerPhoto && <img src={b.bannerPhoto} className="size-10 rounded object-cover hidden sm:block" />}
                      <p className="font-medium line-clamp-1">{b.title}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-slate-300 hidden md:table-cell capitalize">{b.userName}</td>
                  <td className="px-4 py-3 text-slate-300 hidden md:table-cell">👁 {b.views}</td>
                  <td className="px-4 py-3 text-slate-400 hidden lg:table-cell">{moment(b.createdAt).fromNow()}</td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link to={`/blogs/blog/${b._id}`}
                        className="px-3 py-1.5 bg-white/5 hover:bg-white/10 rounded-lg text-xs transition-all">
                        View
                      </Link>
                      <button onClick={() => handleDelete(b._id, b.title)}
                        className="px-3 py-1.5 bg-red-500/10 text-red-400 hover:bg-red-500/20 rounded-lg text-xs transition-all">
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {blogs.length === 0 && <p className="text-center text-slate-400 py-10">No blogs found.</p>}
        </div>
      </div>
    </div>
  );
};

export default AdminBlogs;
