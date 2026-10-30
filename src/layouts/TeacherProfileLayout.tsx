import { NavLink, Outlet, useNavigate, useParams } from "react-router-dom";
import { useGetOneTeacherBYIdQuery, useUpdateTeacherMutation } from "../redux/features/teacher/teacherApi";
import { useAppDispatch } from "../redux/hooks";
import { watchLoader } from "../utils/loader";
import { logOut } from "../redux/features/auth/authSlice";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import logo from "../assets/logo2.png";
import useTitle from "../utils/useTitle";
import { imageHosting } from "../utils/imageHosting";
import { allDistrictsArray } from "../assets/district";

type EditInputs = {
  university: string;
  whatsApp: string;
  district: string;
  classRange: string;
  description: string;
};

const TeacherProfileLayout = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [editOpen, setEditOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [uploading, setUploading] = useState(false);

  const { data: teacher, isLoading, refetch } = useGetOneTeacherBYIdQuery(id as string);
  const [updateTeacher] = useUpdateTeacherMutation();
  const { register, handleSubmit, reset } = useForm<EditInputs>();

  useTitle(teacher?.data?.name || "Dashboard");

  const onSubmit: SubmitHandler<EditInputs> = async (data) => {
    try {
      const validData: Record<string, string> = { id: teacher.data._id };
      for (const [key, value] of Object.entries(data)) {
        if (value) validData[key] = value;
      }
      await updateTeacher(validData).unwrap();
      await refetch();
      toast.success("Profile updated!");
      setEditOpen(false);
      reset();
    } catch {
      toast.error("Failed to update profile.");
    }
  };

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const imgInfo: any = await imageHosting(file);
      if (imgInfo?.data?.display_url) {
        await updateTeacher({ id: teacher.data._id, photo: imgInfo.data.display_url }).unwrap();
        await refetch();
        toast.success("Photo updated!");
      }
    } catch {
      toast.error("Photo upload failed.");
    }
    setUploading(false);
  };

  const logoutHandler = () => { dispatch(logOut()); navigate("/"); };

  if (isLoading) return (
    <div className="w-full bg-slate-950 h-screen flex items-center justify-center">{watchLoader}</div>
  );

  const navItems = [
    { to: `/teacher-profile/${id}`, label: "My Profile", icon: "👤" },
    { to: `/teacher-profile/my-blogs/${id}`, label: "My Blogs", icon: "📝" },
    { to: `/teacher-profile/write-blog/${id}`, label: "Write Blog", icon: "✏️" },
    { to: "/tuitions", label: "Tuition Posts", icon: "📋" },
    { to: "/teachers", label: "All Tutors", icon: "👨‍🏫" },
    { to: "/", label: "Home", icon: "🏠" },
  ];

  return (
    <div className="min-h-screen main-bg text-white flex">
      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 h-full w-72 secondary-bg z-50 flex flex-col transition-transform duration-300
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}>

        {/* Logo */}
        <div className="flex items-center gap-3 px-6 py-5 border-b border-white/10">
          <img src={logo} className="size-9 rounded-full" />
          <span className="font-black text-lg secondary-font">MentorNest</span>
        </div>

        {/* Profile */}
        <div className="flex flex-col items-center py-6 border-b border-white/10 px-4">
          <div className="relative">
            <img src={teacher?.data?.photo || "https://i.ibb.co/6b4nDXS/default-avatar.png"}
              className="size-20 rounded-full object-cover border-2 border-[#00ccb1]" />
            <label className="absolute bottom-0 right-0 bg-[#00ccb1] rounded-full p-1 cursor-pointer hover:bg-[#00b8a0]">
              {uploading ? "..." : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-3">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Z" />
                </svg>
              )}
              <input type="file" accept="image/*" className="hidden" onChange={handlePhotoUpload} />
            </label>
          </div>
          <p className="font-semibold mt-3 text-base">{teacher?.data?.name}</p>
          <p className="text-[#00ccb1] text-sm">{teacher?.data?.university}</p>
          <p className="text-slate-400 text-xs mt-1">{teacher?.data?.email}</p>
          <div className="flex flex-wrap justify-center gap-1 mt-2">
            {teacher?.data?.subjects?.map((s: string) => (
              <span key={s} className="text-xs bg-[#00ccb1]/20 text-[#00ccb1] px-2 py-0.5 rounded-full">{s}</span>
            ))}
          </div>
          <button onClick={() => setEditOpen(true)}
            className="mt-3 text-xs px-4 py-1.5 border border-[#00ccb1] text-[#00ccb1] rounded-full hover:bg-[#00ccb1] hover:text-white transition-all">
            Edit Profile
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} end
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all
                ${isActive ? "bg-[#00ccb1] text-white" : "text-slate-300 hover:bg-white/10"}`
              }>
              <span>{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Logout */}
        <button onClick={logoutHandler}
          className="mx-4 mb-6 py-2.5 bg-red-500/20 text-red-400 rounded-lg text-sm font-medium hover:bg-red-500/30 transition-all">
          🚪 Logout
        </button>
      </aside>

      {/* Overlay mobile */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main Content */}
      <div className="flex-1 lg:ml-72 flex flex-col min-h-screen">
        {/* Top bar */}
        <header className="sticky top-0 z-30 navbar-bg border-b border-white/10 px-4 py-3 flex items-center justify-between">
          <button className="lg:hidden" onClick={() => setSidebarOpen(true)}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
          <p className="text-sm text-slate-400">Welcome back, <span className="text-white font-medium">{teacher?.data?.name}</span></p>
          <span className="text-xs bg-[#00ccb1]/20 text-[#00ccb1] px-3 py-1 rounded-full">Teacher</span>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>

      {/* Edit Profile Modal */}
      {editOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-[#0f1f3d] rounded-xl p-6 w-full max-w-lg border border-white/10 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-lg font-semibold">Edit Profile</h2>
              <button onClick={() => setEditOpen(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="text-sm text-slate-400">University</label>
                <input {...register("university")} placeholder={teacher?.data?.university}
                  className="w-full mt-1 px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#00ccb1] text-white" />
              </div>
              <div>
                <label className="text-sm text-slate-400">WhatsApp</label>
                <input {...register("whatsApp")} placeholder={teacher?.data?.whatsApp}
                  className="w-full mt-1 px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#00ccb1] text-white" />
              </div>
              <div>
                <label className="text-sm text-slate-400">District</label>
                <select {...register("district")}
                  className="w-full mt-1 px-4 py-2 bg-[#0f1f3d] border border-white/10 rounded-lg focus:outline-none focus:border-[#00ccb1] text-white">
                  <option value="">Keep current ({teacher?.data?.district})</option>
                  {allDistrictsArray.sort().map((d) => (
                    <option key={d} value={d.toLowerCase()} className="bg-slate-800">{d}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-sm text-slate-400">Class Range</label>
                <select {...register("classRange")}
                  className="w-full mt-1 px-4 py-2 bg-[#0f1f3d] border border-white/10 rounded-lg focus:outline-none focus:border-[#00ccb1] text-white">
                  <option value="">Keep current ({teacher?.data?.classRange})</option>
                  <option value="1-12" className="bg-slate-800">Class 1 to 12</option>
                  <option value="1-10" className="bg-slate-800">Class 1 to 10</option>
                  <option value="1-8" className="bg-slate-800">Class 1 to 8</option>
                  <option value="1-6" className="bg-slate-800">Class 1 to 6</option>
                </select>
              </div>
              <div>
                <label className="text-sm text-slate-400">About</label>
                <textarea {...register("description")} rows={3} placeholder={teacher?.data?.description}
                  className="w-full mt-1 px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#00ccb1] text-white resize-none" />
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setEditOpen(false)}
                  className="flex-1 py-2 border border-white/10 rounded-lg text-sm hover:bg-white/5">Cancel</button>
                <button type="submit"
                  className="flex-1 py-2 bg-[#00ccb1] rounded-lg text-sm font-medium hover:bg-[#00b8a0]">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherProfileLayout;
