import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { logOut } from "../redux/features/auth/authSlice";
import { useAppDispatch } from "../redux/hooks";
import { useState } from "react";
import logo from "../assets/logo2.png";

const AdminLayout = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const logoutHandler = () => { dispatch(logOut()); navigate("/"); };

  const navItems = [
    { to: "/admin", label: "Dashboard", icon: "📊" },
    { to: "/admin/teachers", label: "Teachers", icon: "👨‍🏫" },
    { to: "/admin/students", label: "Students", icon: "👨‍🎓" },
    { to: "/admin/posts", label: "Tuition Posts", icon: "📋" },
    { to: "/admin/blogs", label: "Blogs", icon: "📝" },
    { to: "/admin/users", label: "All Users", icon: "👥" },
    { to: "/", label: "Home", icon: "🏠" },
  ];

  return (
    <div className="min-h-screen main-bg text-white flex">
      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 h-full w-72 secondary-bg z-50 flex flex-col transition-transform duration-300
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}>

        <div className="flex items-center gap-3 px-6 py-5 border-b border-white/10">
          <img src={logo} className="size-9 rounded-full" />
          <div>
            <p className="font-black text-lg secondary-font">MentorNest</p>
            <p className="text-xs text-[#00ccb1]">Admin Panel</p>
          </div>
        </div>

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

        <button onClick={logoutHandler}
          className="mx-4 mb-6 py-2.5 bg-red-500/20 text-red-400 rounded-lg text-sm font-medium hover:bg-red-500/30 transition-all">
          🚪 Logout
        </button>
      </aside>

      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      <div className="flex-1 lg:ml-72 flex flex-col min-h-screen">
        <header className="sticky top-0 z-30 navbar-bg border-b border-white/10 px-4 py-3 flex items-center justify-between">
          <button className="lg:hidden" onClick={() => setSidebarOpen(true)}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
          <p className="text-sm text-slate-400">Admin Dashboard</p>
          <span className="text-xs bg-red-500/20 text-red-400 px-3 py-1 rounded-full">Admin</span>
        </header>

        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
