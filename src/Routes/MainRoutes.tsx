import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import TeacherAbout from "../pages/About/Teacher/TeacherAbout";
import AuthLayout from "../layouts/AuthLayout";
import TeacherRegister from "../pages/Register/TeacherRegister";
import StudentRegister from "../pages/Register/StudentRegister";
import Login from "../pages/Login/Login";
import PrivateRoute from "../layouts/PrivateRoute";
import Teachers from "../pages/Teachers/Teachers";
import TeacherProfile from "../pages/Teachers/TeacherProfile";
import Tuitions from "../pages/Tuitions/Tuitions";
import EmailVerification from "../pages/Verification/EmailVerification";
import StudentProfileLayout from "../layouts/StudentProfileLayout";
import StudentTuitions from "../pages/Student/StudentTuitions";
import TuitionPostForm from "../pages/Student/TuitionPostForm";
import AllBlogs from "../pages/Blog/AllBlogs";
import Blog from "../pages/Blog/Blog";
import TeacherProfileLayout from "../layouts/TeacherProfileLayout";
import MyBlogs from "../pages/Teachers/MyBlogs";
import BlogPostForm from "../pages/Teachers/BlogPostForm";
import AdminLayout from "../layouts/AdminLayout";
import AdminDashboard from "../pages/Admin/AdminDashboard";
import AdminTeachers from "../pages/Admin/AdminTeachers";
import AdminStudents from "../pages/Admin/AdminStudents";
import AdminPosts from "../pages/Admin/AdminPosts";
import AdminBlogs from "../pages/Admin/AdminBlogs";
import AdminUsers from "../pages/Admin/AdminUsers";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/", element: <Home /> },
      {
        path: "/teachers",
        element: (
          <PrivateRoute allowedRoles={["teacher", "student", "admin"]}>
            <Teachers />
          </PrivateRoute>
        ),
      },
      {
        path: "about-teacher/:id",
        element: (
          <PrivateRoute allowedRoles={["teacher", "student", "admin"]}>
            <TeacherAbout />
          </PrivateRoute>
        ),
      },
      {
        path: "teacher/:id",
        element: (
          <PrivateRoute allowedRoles={["teacher", "student", "admin"]}>
            <TeacherProfile />
          </PrivateRoute>
        ),
      },
      {
        path: "/tuitions",
        element: (
          <PrivateRoute allowedRoles={["teacher", "student", "admin"]}>
            <Tuitions />
          </PrivateRoute>
        ),
      },
      { path: "/blogs", element: <AllBlogs /> },
      { path: "/blogs/blog/:id", element: <Blog /> },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      { path: "sign-up/teacher", element: <TeacherRegister /> },
      { path: "sign-up/student", element: <StudentRegister /> },
      { path: "login", element: <Login /> },
      { path: ":id/verify/:token", element: <EmailVerification /> },
    ],
  },
  {
    path: "/student-profile",
    element: (
      <PrivateRoute allowedRoles={["student"]}>
        <StudentProfileLayout />
      </PrivateRoute>
    ),
    children: [
      { path: ":id", element: <StudentTuitions /> },
      { path: "post/:id", element: <TuitionPostForm /> },
    ],
  },
  {
    path: "/teacher-profile",
    element: (
      <PrivateRoute allowedRoles={["teacher"]}>
        <TeacherProfileLayout />
      </PrivateRoute>
    ),
    children: [
      { path: ":id", element: <TeacherProfile /> },
      { path: "my-blogs/:id", element: <MyBlogs /> },
      { path: "write-blog/:id", element: <BlogPostForm /> },
    ],
  },
  {
    path: "/admin",
    element: (
      <PrivateRoute allowedRoles={["admin"]}>
        <AdminLayout />
      </PrivateRoute>
    ),
    children: [
      { path: "", element: <AdminDashboard /> },
      { path: "teachers", element: <AdminTeachers /> },
      { path: "students", element: <AdminStudents /> },
      { path: "posts", element: <AdminPosts /> },
      { path: "blogs", element: <AdminBlogs /> },
      { path: "users", element: <AdminUsers /> },
    ],
  },
]);
