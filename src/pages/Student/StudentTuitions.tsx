import { useDeleteSinglePostMutation, useGetSingleUserPostsQuery, useUpdatePostMutation } from "../../redux/features/post/postApi";
import { watchLoader } from "../../utils/loader";
import { TPost } from "../Home/types";
import Swal from "sweetalert2";
import { useParams, Link } from "react-router-dom";
import moment from "moment";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAuthCurrentUser } from "../../redux/features/auth/authSlice";
import { useAppSelector } from "../../redux/hooks";
import { TUser } from "../Home/types";
import { useForm } from "react-hook-form";

const BD_SUBJECTS = [
  "Bangla", "English", "Mathematics", "General Science", "Physics", "Chemistry",
  "Biology", "Higher Mathematics", "ICT", "Accounting", "Finance & Banking",
  "Business Studies", "Economics", "Geography", "History", "Civics",
  "Islam & Moral Education", "Social Science", "Agriculture Studies",
  "Home Science", "Arts & Crafts", "Physical Education", "All Subjects",
];

const SALARY_RANGES = [
  "1,000 - 2,000 BDT", "2,000 - 3,000 BDT", "3,000 - 5,000 BDT",
  "5,000 - 8,000 BDT", "8,000 - 12,000 BDT", "12,000 - 20,000 BDT", "Negotiable",
];
const DAYS_OPTIONS = ["1 day/week", "2 days/week", "3 days/week", "4 days/week", "5 days/week", "6 days/week", "Daily"];
const GENDER_OPTIONS = ["Male Tutor", "Female Tutor", "Any"];

const StudentTuitions = () => {
  const { id } = useParams();
  const user: TUser | null = useAppSelector(useAuthCurrentUser);
  const { isLoading, data, refetch } = useGetSingleUserPostsQuery(id);
  const [deletePost] = useDeleteSinglePostMutation();
  const [updatePost, { isLoading: updating }] = useUpdatePostMutation();
  const [editPost, setEditPost] = useState<TPost | null>(null);
  const [editSubjects, setEditSubjects] = useState<string[]>([]);
  const { register, handleSubmit, reset } = useForm<Partial<TPost>>();

  useEffect(() => { refetch(); }, [id, refetch]);

  const openEdit = (post: TPost) => {
    setEditPost(post);
    setEditSubjects(Array.isArray(post.subject) ? post.subject : [post.subject]);
    reset({
      title: post.title,
      class: post.class,
      medium: post.medium,
      salary: post.salary,
      daysPerWeek: post.daysPerWeek,
      gender: post.gender,
      description: post.description,
    });
  };

  const addSubject = (s: string) => {
    if (!s || editSubjects.includes(s)) return;
    setEditSubjects([...editSubjects, s]);
  };

  const removeSubject = (s: string) => setEditSubjects(editSubjects.filter((x) => x !== s));

  const onEditSubmit = async (data: Partial<TPost>) => {
    if (editSubjects.length === 0) { toast.error("Select at least one subject."); return; }
    try {
      await updatePost({ id: editPost?._id, ...data, subject: editSubjects }).unwrap();
      refetch();
      toast.success("Post updated!");
      setEditPost(null);
    } catch (err: any) {
      toast.error(err?.data?.errorMessage || "Failed to update.");
    }
  };

  const handleDelete = (postId: string) => {
    Swal.fire({
      title: "Delete this post?", icon: "warning",
      showCancelButton: true, confirmButtonColor: "#d33", cancelButtonColor: "#00ccb1",
      confirmButtonText: "Yes, delete!", background: "#0f1f3d", color: "#fff",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try { await deletePost(postId).unwrap(); refetch(); toast.success("Post deleted!"); }
        catch (err: any) { toast.error(err?.data?.errorMessage || "Failed to delete."); }
      }
    });
  };

  if (isLoading) return <div className="flex items-center justify-center py-20">{watchLoader}</div>;

  const posts: TPost[] = data?.data || [];
  const sel = "w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#00ccb1] text-white text-sm";
  const opt = "bg-slate-800";

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">My Tuition Posts</h1>
          <p className="text-slate-400 text-sm mt-1">{posts.length} post{posts.length !== 1 ? "s" : ""} found</p>
        </div>
        <Link to={`/student-profile/post/${user?._id}`}
          className="flex items-center gap-2 bg-[#00ccb1] hover:bg-[#00b8a0] transition-all px-4 py-2 rounded-lg text-sm font-medium">
          + New Post
        </Link>
      </div>

      {posts.length === 0 && (
        <div className="text-center py-20 secondary-bg rounded-xl">
          <p className="text-4xl mb-3">📋</p>
          <p className="text-slate-400">No posts yet.</p>
          <Link to={`/student-profile/post/${user?._id}`}
            className="mt-4 inline-block bg-[#00ccb1] px-6 py-2 rounded-lg text-sm font-medium hover:bg-[#00b8a0]">
            Create your first post
          </Link>
        </div>
      )}

      <div className="grid gap-4">
        {posts.map((post: TPost) => (
          <div key={post._id} className="secondary-bg rounded-xl p-5 border border-white/5 hover:border-[#00ccb1]/30 transition-all">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <h2 className="text-lg font-semibold">{post.title}</h2>
                <div className="flex flex-wrap gap-2 mt-2">
                  <span className="text-xs bg-white/10 px-2.5 py-1 rounded-full">📚 {post.class}</span>
                  {Array.isArray(post.subject) && post.subject.map((s: string) => (
                    <span key={s} className="text-xs bg-blue-500/10 text-blue-400 px-2.5 py-1 rounded-full">📖 {s}</span>
                  ))}
                  {post.medium && <span className="text-xs bg-white/10 px-2.5 py-1 rounded-full">🏫 {post.medium}</span>}
                  {post.salary && <span className="text-xs bg-yellow-500/10 text-yellow-400 px-2.5 py-1 rounded-full">💰 {post.salary}</span>}
                  {post.daysPerWeek && <span className="text-xs bg-orange-500/10 text-orange-400 px-2.5 py-1 rounded-full">📅 {post.daysPerWeek}</span>}
                  <span className="text-xs text-slate-400">🕐 {moment(post?.createdAt).fromNow()}</span>
                </div>
                <p className="text-slate-400 text-sm mt-3 line-clamp-2">{post.description}</p>
              </div>
              <div className="flex gap-2 shrink-0">
                <button onClick={() => openEdit(post)}
                  className="p-2 bg-[#00ccb1]/10 text-[#00ccb1] hover:bg-[#00ccb1]/20 rounded-lg transition-all">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Z" />
                  </svg>
                </button>
                <button onClick={() => handleDelete(post._id)}
                  className="p-2 bg-red-500/10 text-red-400 hover:bg-red-500/20 rounded-lg transition-all">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {editPost && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-[#0f1f3d] rounded-xl p-6 w-full max-w-lg border border-white/10 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-lg font-semibold">Edit Post</h2>
              <button onClick={() => setEditPost(null)} className="text-slate-400 hover:text-white">✕</button>
            </div>
            <form onSubmit={handleSubmit(onEditSubmit)} className="space-y-4">
              <div>
                <label className="text-xs text-slate-400 block mb-1">Title</label>
                <input {...register("title")} className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-[#00ccb1]" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-slate-400 block mb-1">Class</label>
                  <input {...register("class")} className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-[#00ccb1]" />
                </div>
                <div>
                  <label className="text-xs text-slate-400 block mb-1">Medium</label>
                  <select {...register("medium")} className={sel}>
                    {["Bangla Medium", "English Medium", "English Version", "Madrasa"].map(m => <option key={m} value={m} className={opt}>{m}</option>)}
                  </select>
                </div>
              </div>

              {/* Subjects */}
              <div>
                <label className="text-xs text-slate-400 block mb-1">Subjects</label>
                <select className={sel} value="" onChange={(e) => addSubject(e.target.value)}>
                  <option value="" className={opt}>Add Subject</option>
                  {BD_SUBJECTS.filter(s => !editSubjects.includes(s)).map(s => <option key={s} value={s} className={opt}>{s}</option>)}
                </select>
                <div className="flex flex-wrap gap-2 mt-2">
                  {editSubjects.map(s => (
                    <span key={s} className="flex items-center gap-1 bg-[#00ccb1]/20 text-[#00ccb1] px-2.5 py-1 rounded-full text-xs">
                      {s} <button type="button" onClick={() => removeSubject(s)} className="hover:text-red-400">×</button>
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-slate-400 block mb-1">Salary</label>
                  <select {...register("salary")} className={sel}>
                    {SALARY_RANGES.map(s => <option key={s} value={s} className={opt}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs text-slate-400 block mb-1">Days/Week</label>
                  <select {...register("daysPerWeek")} className={sel}>
                    {DAYS_OPTIONS.map(d => <option key={d} value={d} className={opt}>{d}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs text-slate-400 block mb-1">Tutor Gender</label>
                <select {...register("gender")} className={sel}>
                  {GENDER_OPTIONS.map(g => <option key={g} value={g} className={opt}>{g}</option>)}
                </select>
              </div>

              <div>
                <label className="text-xs text-slate-400 block mb-1">Description</label>
                <textarea {...register("description")} rows={3}
                  className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-[#00ccb1] resize-none" />
              </div>

              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setEditPost(null)}
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

export default StudentTuitions;
