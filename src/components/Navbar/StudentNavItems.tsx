import { NavLink, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../redux/hooks";
import { logOut } from "../../redux/features/auth/authSlice";

const StudentNavItems = ({ id }: { id: string }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const items = [
    { link: "/", name: "Home" },
    { link: "/teachers", name: "Tutors" },
    { link: "/tuitions", name: "Tuitions" },
    { link: "/blogs", name: "Blogs" },
    { link: `/student-profile/${id}`, name: "Profile" },
  ];

  const logoutHandler = () => {
    dispatch(logOut());
    navigate("/");
  };

  return (
    <div className="flex items-center">
      {/* Navbar for Large Devices */}
      <div className="hidden lg:flex items-center gap-8">
        {items.map((item) => (
          <NavLink
            key={item.link}
            to={item.link}
            className={({ isActive }) =>
              `text-lg font-medium transition-all duration-300 ${
                isActive
                  ? "text-[#00ccb1]"
                  : "text-white hover:text-[#00ccb1]"
              }`
            }
          >
            {item.name}
          </NavLink>
        ))}
        <button
          onClick={logoutHandler}
          className="ml-8 px-6 py-2 bg-[#00ccb1] text-white font-semibold rounded-lg hover:bg-[#00b8a0] transition-all duration-300"
        >
          Logout
        </button>
      </div>

      {/* Navbar for Small and Medium Devices */}
      <div className="lg:hidden">
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="p-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-12"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content z-50 mt-2 p-4 shadow-lg bg-white rounded-lg w-48 space-y-3"
          >
            {items.map((item) => (
              <li key={item.link}>
                <NavLink
                  to={item.link}
                  className={({ isActive }) =>
                    `block text-lg font-medium transition-all duration-300 ${
                      isActive
                        ? "text-[#00ccb1]"
                        : "text-gray-700 hover:text-[#00ccb1]"
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              </li>
            ))}
            <li>
              <button
                onClick={logoutHandler}
                className="w-full px-4 py-2 bg-[#00ccb1] text-white font-semibold rounded-lg hover:bg-[#00b8a0] transition-all duration-300"
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default StudentNavItems;
