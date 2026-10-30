import { NavLink, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../redux/hooks";
import { logOut } from "../../redux/features/auth/authSlice";

const AdminNavItems = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const items = [
    { link: "/admin", name: "Dashboard" },
    { link: "/admin/teachers", name: "Teachers" },
    { link: "/admin/students", name: "Students" },
    { link: "/admin/posts", name: "Posts" },
    { link: "/admin/blogs", name: "Blogs" },
  ];

  const logoutHandler = () => { dispatch(logOut()); navigate("/"); };

  return (
    <div className="flex items-center">
      <div className="hidden lg:flex items-center gap-6">
        {items.map((item) => (
          <NavLink key={item.link} to={item.link} end
            className={({ isActive }) =>
              `text-sm font-medium transition-all duration-300 ${isActive ? "text-[#00ccb1]" : "text-white hover:text-[#00ccb1]"}`
            }>
            {item.name}
          </NavLink>
        ))}
        <span className="text-xs bg-red-500/20 text-red-400 px-2 py-1 rounded-full">Admin</span>
        <button onClick={logoutHandler}
          className="px-4 py-2 bg-red-500/20 text-red-400 font-semibold rounded-lg hover:bg-red-500/30 transition-all text-sm">
          Logout
        </button>
      </div>
      <div className="lg:hidden dropdown dropdown-end">
        <div tabIndex={0} role="button" className="p-2">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </div>
        <ul tabIndex={0} className="dropdown-content z-50 mt-2 p-4 shadow-lg bg-slate-900 rounded-lg w-48 space-y-2">
          {items.map((item) => (
            <li key={item.link}>
              <NavLink to={item.link} end
                className={({ isActive }) =>
                  `block text-sm font-medium py-1 ${isActive ? "text-[#00ccb1]" : "text-white hover:text-[#00ccb1]"}`
                }>
                {item.name}
              </NavLink>
            </li>
          ))}
          <li>
            <button onClick={logoutHandler} className="w-full py-2 bg-red-500/20 text-red-400 rounded-lg text-sm">Logout</button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AdminNavItems;
