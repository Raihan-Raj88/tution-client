import "../../App.css";
import { useAppSelector } from "../../redux/hooks";
import { useAuthCurrentUser } from "../../redux/features/auth/authSlice";
import GuestNavItems from "./GuestNavItems";
import StudentNavItems from "./StudentNavItems";
import TeacherNavItems from "./TeacherNavItems";
import AdminNavItems from "./AdminNavItems";
import { TUser } from "../../pages/Home/types";
import { Link } from "react-router-dom";
import logo from "../../assets/logo2.png";

const Navbar = () => {
  const user: TUser | null = useAppSelector(useAuthCurrentUser);
  let navItems;
  if (!user) {
    navItems = <GuestNavItems />;
  } else {
    if (user?.role === "admin") {
      navItems = <AdminNavItems />;
    } else if (user?.role === "student") {
      navItems = <StudentNavItems id={user._id} />;
    } else {
      navItems = <TeacherNavItems id={user._id} />;
    }
  }

  return (
    <div className="navbar flex justify-center items-center shadow-white-xl navbar-bg fixed z-50">
      <div className=" flex items-center justify-between w-11/12">
        <div className="">
          <Link
            to={"/"}
            className="uppercase flex justify-between items-center flex-col text-base"
          >
            <img className="size-10 rounded-full" src={logo} />

            <p className="secondary-font font-black">MentorNest</p>
          </Link>
        </div>
        {navItems}
      </div>
    </div>
  );
};

export default Navbar;
