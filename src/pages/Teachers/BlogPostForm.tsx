import { useParams, useNavigate } from "react-router-dom";
import { useGetOneTeacherBYIdQuery } from "../../redux/features/teacher/teacherApi";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { imageHosting } from "../../utils/imageHosting";
import { useCreateBlogMutation } from "../../redux/features/blog/blogApi";
import toast from "react-hot-toast";
import { watchLoader } from "../../utils/loader";

const schema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  blog: z.string().min(20, "Blog content must be at least 20 characters"),
  keyWords: z.array(z.string()).min(1, "At least one keyword is required"),
  bannerPhoto: z.string().optional(),
});

type BlogFormData = z.infer<typeof schema>;

const BlogPostForm = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [keywords, setKeywords] = useState<string[]>([]);
  const [bannerPreview, setBannerPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const { register, handleSubmit, setValue, reset, formState: { errors, isSubmitting } } = useForm<BlogFormData>({
    resolver: zodResolver(schema),
  });

  const [createBlog] = useCreateBlogMutation();
  const { data: teacherInfo, isLoading } = useGetOneTeacherBYIdQuery(id as string);

  const addKeyword = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && e.currentTarget.value.trim()) {
      e.preventDefault();
      const newKws = [...keywords, e.currentTarget.value.trim()];
      setKeywords(newKws);
      setValue("keyWords", newKws);
      e.currentTarget.value = "";
    }
  };

  const removeKeyword = (kw: string) => {
    const updated = keywords.filter((k) => k !== kw);
    setKeywords(updated);
    setValue("keyWords", updated);
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const imgInfo: any = await imageHosting(file);
    if (imgInfo?.data?.display_url) {
      setBannerPreview(URL.createObjectURL(file));
      setValue("bannerPhoto", imgInfo.data.display_url);
      toast.success("Banner uploaded!");
    } else {
      toast.error("Image upload failed.");
    }
    setUploading(false);
  };

  const onSubmit = async (data: BlogFormData) => {
    try {
      const blogData = {
        ...data,
        userId: teacherInfo.data._id,
        userName: teacherInfo.data.name,
        photo: teacherInfo.data.photo,
      };
      await createBlog(blogData).unwrap();
      toast.success("Blog published!");
      reset();
      setKeywords([]);
      setBannerPreview(null);
      navigate(`/teacher-profile/my-blogs/${id}`);
    } catch (err: any) {
      toast.error(err?.data?.errorMessage || "Failed to publish.");
    }
  };

  if (isLoading) return (
    <div className="flex items-center justify-center py-20">{watchLoader}</div>
  );

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Write a Blog</h1>
        <p className="text-slate-400 text-sm mt-1">Share your knowledge with students</p>
      </div>
      <div className="max-w-2xl secondary-bg rounded-xl p-6 border border-white/5">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="text-sm text-slate-400 block mb-1">Title</label>
            <input {...register("title")} placeholder="Enter blog title..."
              className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#00ccb1] text-white placeholder:text-slate-500" />
            {errors.title && <p className="text-red-400 text-xs mt-1">{errors.title.message}</p>}
          </div>
          <div>
            <label className="text-sm text-slate-400 block mb-1">Content</label>
            <textarea {...register("blog")} rows={6} placeholder="Write your blog content..."
              className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#00ccb1] text-white placeholder:text-slate-500 resize-none" />
            {errors.blog && <p className="text-red-400 text-xs mt-1">{errors.blog.message}</p>}
          </div>
          <div>
            <label className="text-sm text-slate-400 block mb-1">Keywords <span className="text-xs">(Press Enter to add)</span></label>
            <input type="text" onKeyDown={addKeyword} placeholder="e.g. math, physics..."
              className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#00ccb1] text-white placeholder:text-slate-500" />
            {errors.keyWords && <p className="text-red-400 text-xs mt-1">{errors.keyWords.message}</p>}
            <div className="flex flex-wrap gap-2 mt-2">
              {keywords.map((kw, i) => (
                <span key={i} className="flex items-center gap-1 bg-[#00ccb1]/20 text-[#00ccb1] px-3 py-1 rounded-full text-sm">
                  #{kw}
                  <button type="button" onClick={() => removeKeyword(kw)} className="hover:text-white ml-1">×</button>
                </span>
              ))}
            </div>
          </div>
          <div>
            <label className="text-sm text-slate-400 block mb-1">Banner Photo</label>
            <label className="flex items-center justify-center gap-2 w-full py-3 border border-dashed border-white/20 rounded-lg cursor-pointer hover:border-[#00ccb1] transition-all text-slate-400 text-sm">
              {uploading ? "Uploading..." : "📷 Click to upload banner"}
              <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
            </label>
            {bannerPreview && (
              <img src={bannerPreview} className="mt-3 w-full h-40 object-cover rounded-lg" alt="preview" />
            )}
          </div>
          <button type="submit" disabled={isSubmitting || uploading}
            className="w-full py-3 bg-[#00ccb1] hover:bg-[#00b8a0] disabled:opacity-50 transition-all rounded-lg font-semibold">
            {isSubmitting ? "Publishing..." : "Publish Blog"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default BlogPostForm;
