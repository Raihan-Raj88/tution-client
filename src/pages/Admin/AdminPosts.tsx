import { useGetAllAdminPostsQuery, useDeleteAdminPostMutation } from "../../redux/features/admin/adminApi";
import { watchLoader } from "../../utils/loader";
import toast from "react-hot-toast";
import moment from "moment";
import Swal from "sweetalert2";

const AdminPosts = () => {
  const { data, isLoading, refetch } = useGetAllAdminPostsQuery({});
  const [deletePost] = useDeleteAdminPostMutation();

  const handleDelete = (id: string) => {
    Swal.fire({
      title: "Delete this post?", icon: "warning",
      showCancelButton: true, confirmButtonColor: "#d33", cancelButtonColor: "#00ccb1",
      confirmButtonText: "Yes, delete!", background: "#0f1f3d", color: "#fff",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try { await deletePost(id).unwrap(); refetch(); toast.success("Post deleted!"); }
        catch { toast.error("Failed to delete."); }
      }
    });
  };

  if (isLoading) return <div className="flex justify-center py-20">{watchLoader}</div>;
  const posts = data?.data || [];

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Tuition Posts</h1>
        <p className="text-slate-400 text-sm mt-1">{posts.length} posts</p>
      </div>
      <div className="secondary-bg rounded-xl border border-white/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10 text-slate-400">
                <th className="text-left px-4 py-3">Title</th>
                <th className="text-left px-4 py-3 hidden md:table-cell">Class</th>
                <th className="text-left px-4 py-3 hidden md:table-cell">Location</th>
                <th className="text-left px-4 py-3 hidden lg:table-cell">Posted</th>
                <th className="text-right px-4 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((p: any) => (
                <tr key={p._id} className="border-b border-white/5 hover:bg-white/5 transition-all">
                  <td className="px-4 py-3 font-medium">{p.title}</td>
                  <td className="px-4 py-3 text-slate-300 hidden md:table-cell">{p.class}</td>
                  <td className="px-4 py-3 text-slate-300 hidden md:table-cell capitalize">{p.district}</td>
                  <td className="px-4 py-3 text-slate-400 hidden lg:table-cell">{moment(p.createdAt).fromNow()}</td>
                  <td className="px-4 py-3 text-right">
                    <button onClick={() => handleDelete(p._id)}
                      className="px-3 py-1.5 bg-red-500/10 text-red-400 hover:bg-red-500/20 rounded-lg text-xs transition-all">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {posts.length === 0 && <p className="text-center text-slate-400 py-10">No posts found.</p>}
        </div>
      </div>
    </div>
  );
};

export default AdminPosts;
