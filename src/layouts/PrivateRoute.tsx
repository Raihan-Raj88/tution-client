import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";
import { useAuthCurrentUser } from "../redux/features/auth/authSlice";
import { TUser } from "../pages/Home/types";

const PrivateRoute = ({
  children,
  allowedRoles,
}: {
  children: ReactNode;
  allowedRoles?: string[];
}) => {
  const user: TUser | null = useAppSelector(useAuthCurrentUser);

  if (!user) return <Navigate to="/auth/login" replace />;

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    if (user.role === "admin") return <Navigate to="/admin" replace />;
    if (user.role === "teacher") return <Navigate to={`/teacher-profile/${user._id}`} replace />;
    if (user.role === "student") return <Navigate to={`/student-profile/${user._id}`} replace />;
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PrivateRoute;
