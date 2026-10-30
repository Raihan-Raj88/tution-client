import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { imageHosting } from "../../utils/imageHosting";
import { useCreateStudentMutation } from "../../redux/features/student/studentApi";
import toast from "react-hot-toast";
import { useState } from "react";
import useTitle from "../../utils/useTitle";

interface IFormInput {
  name: string;
  email: string;
  whatsApp: string;
  schoolOrCollage: string;
  photo: FileList;
  password: string;
  conPass: string;
}

const StudentRegister = () => {
  const [createStudent] = useCreateStudentMutation();
  const [pass, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(false);
  const navigate = useNavigate();

  useTitle("Student Register");

  const checkConfirmPassword = (value: string) => {
    if (pass === value) {
      setConfirmPassword(true);
    }
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    let photoUrl = 'https://i.ibb.co/6b4nDXS/default-avatar.png';

    if (data.photo?.[0]) {
      const imgInfo = await imageHosting(data.photo[0]);
      if (imgInfo?.data?.url) photoUrl = imgInfo.data.url;
    }

    const studentInfo = {
      name: data.name,
      schoolOrCollage: data.schoolOrCollage,
      email: data.email,
      whatsApp: data.whatsApp,
      photo: photoUrl,
      password: data.password,
    };

    try {
      await createStudent(studentInfo).unwrap();
      reset();
      navigate("/auth/login");
      toast.success("Registration successful! Please login.");
    } catch (err: any) {
      const msg = err?.data?.errorMessage || "Registration failed. Please try again.";
      toast.error(msg);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#f0f4f9] to-[#e0e9f4] p-4">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-2xl overflow-hidden transform transition-all hover:scale-105">
        {/* Header Section */}
        <div className="bg-[#00ccb1] p-6 text-center">
          <h1 className="text-3xl font-bold text-white">Register as Student</h1>
          <p className="text-sm text-white mt-2">
            Join us to start your learning journey
          </p>
        </div>

        {/* Form Section */}
        <div className="p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Name and School/College Row */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <input
                  {...register("name", { required: true })}
                  type="text"
                  placeholder="Ex. Mehadi Hasan"
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#00ccb1] focus:border-transparent"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">Name is required</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="schoolOrCollage"
                  className="block text-sm font-medium text-gray-700"
                >
                  School/College
                </label>
                <input
                  {...register("schoolOrCollage", { required: true })}
                  type="text"
                  placeholder="Ex. Dhaka College"
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#00ccb1] focus:border-transparent"
                />
                {errors.schoolOrCollage && (
                  <p className="text-red-500 text-sm mt-1">
                    School/College name is required
                  </p>
                )}
              </div>
            </div>

            {/* WhatsApp and Email Row */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="whatsApp"
                  className="block text-sm font-medium text-gray-700"
                >
                  WhatsApp
                </label>
                <input
                  {...register("whatsApp", { required: true })}
                  type="text"
                  placeholder="Ex. 017340000000"
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#00ccb1] focus:border-transparent"
                />
                {errors.whatsApp && (
                  <p className="text-red-500 text-sm mt-1">
                    WhatsApp number is required
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  {...register("email", { required: true })}
                  type="email"
                  placeholder="Ex. example@gmail.com"
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#00ccb1] focus:border-transparent"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">Email is required</p>
                )}
              </div>
            </div>

            {/* Photo Upload */}
            <div>
              <label
                htmlFor="photo"
                className="block text-sm font-medium text-gray-700"
              >
                Photo
              </label>
              <input
                {...register("photo")}
                type="file"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#00ccb1] focus:border-transparent"
              />
              {errors.photo && (
                <p className="text-red-500 text-sm mt-1">Photo is required</p>
              )}
            </div>

            {/* Password and Confirm Password Row */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <input
                  {...register("password", { required: true })}
                  onBlur={(e) => setPassword(e.target.value)}
                  type="password"
                  placeholder="Enter a strong password"
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#00ccb1] focus:border-transparent"
                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    Password is required
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="conPass"
                  className="block text-sm font-medium text-gray-700"
                >
                  Confirm Password
                </label>
                <input
                  {...register("conPass", { required: true })}
                  onChange={(e) => checkConfirmPassword(e.target.value)}
                  type="password"
                  placeholder="Confirm your password"
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#00ccb1] focus:border-transparent"
                />
                {confirmPassword ? (
                  <p className="text-green-500 text-sm mt-1">
                    Password matched
                  </p>
                ) : (
                  <p className="text-gray-500 text-sm mt-1">
                    Re-enter your password
                  </p>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center">
              <button
                disabled={!confirmPassword}
                type="submit"
                className="w-full bg-[#00ccb1] text-white py-2 px-4 rounded-lg font-semibold hover:bg-[#00b8a0] transition-all duration-300 disabled:bg-gray-400"
              >
                Sign Up
              </button>
            </div>
          </form>

          {/* Login Link */}
          <div className="mt-6 text-center text-sm text-gray-600">
            <p>
              Already have an account?{" "}
              <a href="/auth/login" className="text-[#00ccb1] hover:underline">
                Login here
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentRegister;
