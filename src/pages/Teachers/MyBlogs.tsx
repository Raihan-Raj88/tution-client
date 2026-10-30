import { useParams, Link } from "react-router-dom";
import { useDeleteBlogMutation, useGetUserBlogsQuery, useUpdateBlogMutation } from "../../redux/features/blog/blogApi";
import moment from "moment";
import { useGetOneTeacherBYIdQuery } from "../../redux/features/teacher/teacherApi";
import toast from "react-hot-toast";
import { watchLoader } from "../../utils/loader";
import Swal from "sweetalert2";
import { useState } from "react";
import { useForm } from "react-hook-form";

const MyBlogs = () => {
  const { id } = useParams();
  const { data: teacherInfo } = useGetOneTeacherBYIdQuery(id as string);
  const [deleteBlog] = useDeleteBlogMutation();
  const [updateBlog, { isLoading: updating }] = useUpdateBlogMutation();
  const { data, isLoading, refetch } = useGetUserBlogsQuery(teacherInfo?.data?._id as string);
  const [editBlog, setEditBlog] = useState<any>(null);
  const [editKeywords, setEditKeywords] = useState<string[]>([]);
  const { register, handleSubmit, reset } = useForm<any>();

  const openEdit = (blog: any) => {
    setEditBlog(blog);
    setEditKeywords(blog.keyWords || []);
    reset({ title: blog.title, blog: blog.blog });
  };

  const addKeyword = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && e.currentTarget.value.trim()) {
      e.preventDefault();
      const kw = e.currentTarget.value.trim();
      if (!editKeywords.includes(kw)) setEditKeywords([...editKeywords, kw]);
      e.currentTarget.value = "";
    }
  };

  const removeKeyword = (kw: string) => setEditKeywords(editKeywords.filter((k) => k !== kw));

  const onEditSubmit = async (data: any) => {
    try {
      await updateBlog({ id: editBlog._id, ...data, keyWords: editKeywords }).unwrap();
      refetch();
      toast.success("Blog updated!");
      setEditBlog(null);
    } catch (err: any) {
      toast.error(err?.data?.errorMessage || "Failed to update.");
    }
  };

  const handleDelete = (blogId: string) => {
    Swal.fire({
      title: "Delete this blog?", icon: "warning",
      showCancelButton: true, confirmButtonColor: "#d33", cancelButtonColor: "#00ccb1",
      confirmButtonText: "Yes, delete!", background: "#0f1f3d", color: "#fff",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try { await deleteBlog({ id: blogId }).unwrap(); refetch(); toast.success("Blog deleted!"); }
        catch (err: any) { toast.error(err?.data?.errorMessage || "Failed to delete."); }
      }
    });
  };

  if (isLoading) return <div className="flex justify-center py-20">{watchLoader}</div>;
  const blogs = data?.data || [];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">My Blogs</h1>
          <p className="text-slate-400 text-sm mt-1">{blogs.length} blog{blogs.length !== 1 ? "s" : ""} published</p>
        </div>
        <Link to={`/teacher-profile/write-blog/${id}`}
          className="flex items-center gap-2 bg-[#00ccb1] hover:bg-[#00b8a0] transition-all px-4 py-2 rounded-lg text-sm font-medium">
          + Write Blog
        </Link>
      </div>

      {blogs.length === 0 && (
        <div className="text-center py-20 secondary-bg rounded-xl">
          <p className="text-4xl mb-3">📝</p>
          <p className="text-slate-400">No blogs yet.</p>
          <Link to={`/teacher-profile/write-blog/${id}`}
            className="mt-4 inline-block bg-[#00ccb1] px-6 py-2 rounded-lg text-sm font-medium hover:bg-[#00b8a0]">
            Write your first blog
          </Link>
        </div>
      )}

      <div className="grid gap-4">
        {blogs.map((blog: any) => (
          <div key={blog._id} className="secondary-bg rounded-xl border border-white/5 hover:border-[#00ccb1]/30 transition-all overflow-hidden">
            <div className="flex gap-4 p-5">
              {blog.bannerPhoto && (
                <img src={blog.bannerPhoto} className="w-24 h-20 object-cover rounded-lg shrink-0" alt="" />
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h2 className="font-semibold text-base line-clamp-1">{blog.title}</h2>
                    <div className="flex flex-wrap gap-3 mt-1.5">
                      <span className="text-xs text-slate-400">🕐 {moment(blog.createdAt).fromNow()}</span>
                      <span className="text-xs text-slate-400">👁 {blog.views} views</span>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {blog.keyWords?.slice(0, 3).map((kw: string) => (
                        <span key={kw} className="text-xs bg-white/10 px-2 py-0.5 rounded-full">#{kw}</span>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <button onClick={() => openEdit(blog)}
                      className="p-2 bg-[#00ccb1]/10 text-[#00ccb1] hover:bg-[#00ccb1]/20 rounded-lg transition-all">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Z" />
                      </svg>
                    </button>
                    <Link to={`/blogs/blog/${blog._id}`}
                      className="p-2 bg-white/5 hover:bg-white/10 rounded-lg transition-all text-slate-400 hover:text-white">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                      </svg>
                    </Link>
                    <button onClick={() => handleDelete(blog._id)}
                      className="p-2 bg-red-500/10 text-red-400 hover:bg-red-500/20 rounded-lg transition-all">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Blog Modal */}
      {editBlog && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-[#0f1f3d] rounded-xl p-6 w-full max-w-lg border border-white/10 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-lg font-semibold">Edit Blog</h2>
              <button onClick={() => setEditBlog(null)} className="text-slate-400 hover:text-white">✕</button>
            </div>
            <form onSubmit={handleSubmit(onEditSubmit)} className="space-y-4">
              <div>
                <label className="text-xs text-slate-400 block mb-1">Title</label>
                <input {...register("title")}
                  className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-[#00ccb1]" />
              </div>
              <div>
                <label className="text-xs text-slate-400 block mb-1">Content</label>
                <textarea {...register("blog")} rows={5}
                  className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-[#00ccb1] resize-none" />
              </div>
              <div>
                <label className="text-xs text-slate-400 block mb-1">Keywords <span className="text-slate-500">(Press Enter)</span></label>
                <input type="text" onKeyDown={addKeyword} placeholder="Add keyword..."
                  className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-[#00ccb1]" />
                <div className="flex flex-wrap gap-2 mt-2">
                  {editKeywords.map((kw) => (
                    <span key={kw} className="flex items-center gap-1 bg-[#00ccb1]/20 text-[#00ccb1] px-2.5 py-1 rounded-full text-xs">
                      #{kw} <button type="button" onClick={() => removeKeyword(kw)} className="hover:text-red-400">×</button>
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setEditBlog(null)}
                  className="flex-1 py-2 border border-white/10 rounded-lg text-sm hover:bg-white/5">Cancel</button>
                <button type="submit" disabled={updating}
                  className="flex-1 py-2 bg-[#00ccb1] rounded-lg text-sm font-medium hover:bg-[#00b8a0] disabled:opacity-50">
                  {updating ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyBlogs;
