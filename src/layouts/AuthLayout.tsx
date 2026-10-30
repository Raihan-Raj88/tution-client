import { Toaster } from "react-hot-toast";
import "../App.css";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="main-font">
      <Outlet></Outlet>
      <Toaster></Toaster>
    </div>
  );
};

export default AuthLayout;
