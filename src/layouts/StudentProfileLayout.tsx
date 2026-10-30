import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { TUser } from "../pages/Home/types";
import { logOut, useAuthCurrentUser } from "../redux/features/auth/authSlice";
import { useGetOneStudentByIdQuery, useUpdateStudentProfileMutation } from "../redux/features/student/studentApi";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { watchLoader } from "../utils/loader";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import logo from "../assets/logo2.png";
import useTitle from "../utils/useTitle";
import { imageHosting } from "../utils/imageHosting";

type Inputs = { name: string; schoolOrCollage: string; whatsApp: string; };

const StudentProfileLayout = () => {
  const [editOpen, setEditOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user: TUser | null = useAppSelector(useAuthCurrentUser);
  const [updateStudent] = useUpdateStudentProfileMutation();
  const { register, handleSubmit, reset } = useForm<Inputs>();

  const { isLoading, data: student, refetch } = useGetOneStudentByIdQuery(user?.email);
  useTitle(student?.data?.name || "Dashboard");

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const validData: Record<string, string> = { id: student.data._id };
      for (const [key, value] of Object.entries(data)) {
        if (value) validData[key] = value;
      }
      await updateStudent(validData).unwrap();
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
      if (imgInfo?.data?.url) {
        await updateStudent({ id: student.data._id, photo: imgInfo.data.url }).unwrap();
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
    { to: `/student-profile/${user?._id}`, label: "My Posts", icon: "📋" },
    { to: `/student-profile/post/${user?._id}`, label: "Post Tuition", icon: "✏️" },
    { to: "/teachers", label: "Find Tutors", icon: "🔍" },
    { to: "/tuitions", label: "All Tuitions", icon: "📚" },
    { to: "/blogs", label: "Blogs", icon: "📝" },
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
            <img src={student?.data?.photo || "https://i.ibb.co/6b4nDXS/default-avatar.png"}
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
          <p className="font-semibold mt-3 text-base">{student?.data?.name}</p>
          <p className="text-[#00ccb1] text-sm">{student?.data?.schoolOrCollage}</p>
          <p className="text-slate-400 text-xs mt-1">{student?.data?.email}</p>
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
          <p className="text-sm text-slate-400">Welcome back, <span className="text-white font-medium">{student?.data?.name}</span></p>
          <span className="text-xs bg-[#00ccb1]/20 text-[#00ccb1] px-3 py-1 rounded-full">Student</span>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>

      {/* Edit Profile Modal */}
      {editOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-[#0f1f3d] rounded-xl p-6 w-full max-w-md border border-white/10">
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-lg font-semibold">Edit Profile</h2>
              <button onClick={() => setEditOpen(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="text-sm text-slate-400">Name</label>
                <input {...register("name")} placeholder={student?.data?.name}
                  className="w-full mt-1 px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#00ccb1] text-white" />
              </div>
              <div>
                <label className="text-sm text-slate-400">School / College</label>
                <input {...register("schoolOrCollage")} placeholder={student?.data?.schoolOrCollage}
                  className="w-full mt-1 px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#00ccb1] text-white" />
              </div>
              <div>
                <label className="text-sm text-slate-400">WhatsApp</label>
                <input {...register("whatsApp")} placeholder={student?.data?.whatsApp}
                  className="w-full mt-1 px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#00ccb1] text-white" />
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

export default StudentProfileLayout;
