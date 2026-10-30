import { NavLink } from "react-router-dom";

const GuestNavItems = () => {
  return (
    <div className="flex items-center gap-5">
      {/* Desktop View */}
      <div className="hidden lg:block">
        <NavLink
          to="/auth/login"
          className="px-8 py-3 bg-[#00ccb1] text-white font-semibold rounded-lg hover:bg-[#00b8a0] transition-all duration-300"
        >
          Login
        </NavLink>
      </div>

      {/* Desktop Dropdown */}
      <div className="hidden lg:block dropdown dropdown-hover dropdown-end">
        <div
          tabIndex={0}
          role="button"
          className="px-6 py-2 border-2 border-[#00ccb1] text-[#00ccb1] font-semibold rounded-lg hover:bg-[#00ccb1] hover:text-white transition-all duration-300"
        >
          Sign Up
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content z-[1] menu p-2 shadow bg-white rounded-lg w-52 mt-2"
        >
          <li className="hover:bg-gray-100 rounded-md transition-all duration-300">
            <NavLink
              to="/auth/sign-up/teacher"
              className="block px-4 py-2 text-gray-700 hover:text-[#00ccb1]"
            >
              Register As Teacher
            </NavLink>
          </li>
          <li className="hover:bg-gray-100 rounded-md transition-all duration-300">
            <NavLink
              to="/auth/sign-up/student"
              className="block px-4 py-2 text-gray-700 hover:text-[#00ccb1]"
            >
              Register As Student
            </NavLink>
          </li>
        </ul>
      </div>

      {/* Mobile View */}
      <div className="lg:hidden dropdown dropdown-end">
        <div
          tabIndex={0}
          role="button"
          className="p-2 rounded-lg hover:bg-gray-100 transition-all duration-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
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
          className="dropdown-content z-[1] menu p-2 shadow bg-white rounded-lg w-52 mt-6"
        >
          <li className="hover:bg-gray-100 rounded-md transition-all duration-300">
            <NavLink
              to="/auth/sign-up/teacher"
              className="block px-4 py-2 text-gray-700 hover:text-[#00ccb1]"
            >
              Register As Teacher
            </NavLink>
          </li>
          <li className="hover:bg-gray-100 rounded-md transition-all duration-300">
            <NavLink
              to="/auth/sign-up/student"
              className="block px-4 py-2 text-gray-700 hover:text-[#00ccb1]"
            >
              Register As Student
            </NavLink>
          </li>
          <li className="mt-2">
            <NavLink
              to="/auth/login"
              className="block px-4 py-2 bg-[#00ccb1] text-white font-semibold rounded-lg hover:bg-[#00b8a0] text-center transition-all duration-300"
            >
              Login
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default GuestNavItems;
