import { useForm, SubmitHandler } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { removeSubject, setSubjects } from "../../redux/features/register/subjectsSlice";
import { RootState } from "../../redux/store";
import { useState } from "react";
import { imageHosting } from "../../utils/imageHosting";
import { useCreateTeacherMutation } from "../../redux/features/teacher/teacherApi";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import useTitle from "../../utils/useTitle";
import { allDivisions, getDistrictsByDivision } from "../../assets/bdDivisionDistrict";

const BD_SUBJECTS = [
  "Bangla", "English", "Mathematics", "General Science",
  "Physics", "Chemistry", "Biology", "Higher Mathematics",
  "ICT", "Accounting", "Finance & Banking", "Business Studies",
  "Economics", "Geography", "History", "Civics",
  "Islam & Moral Education", "Social Science", "Agriculture Studies",
  "Home Science", "Arts & Crafts", "Physical Education",
];

const CLASS_RANGES = [
  "Class 1-5 (Primary)", "Class 1-8", "Class 1-10", "Class 1-12",
  "Class 6-10", "Class 9-12", "SSC", "HSC",
  "O Level", "A Level", "University Level", "All Classes",
];

const MEDIUMS = ["Bangla Medium", "English Medium", "English Version", "Madrasa", "All Medium"];
const EXPERIENCE_OPTIONS = ["Fresher", "1 year", "2 years", "3 years", "4 years", "5+ years", "10+ years"];
const GENDER_OPTIONS = ["Male", "Female"];
const SALARY_RANGES = [
  "1,000 - 2,000 BDT", "2,000 - 3,000 BDT", "3,000 - 5,000 BDT",
  "5,000 - 8,000 BDT", "8,000 - 12,000 BDT", "12,000 - 20,000 BDT", "Negotiable",
];

interface IFormInput {
  name: string;
  university: string;
  email: string;
  whatsApp: string;
  photo: FileList;
  studentID: FileList;
  division: string;
  district: string;
  classRange: string;
  medium: string;
  experience: string;
  gender: string;
  salary: string;
  description: string;
  password: string;
  conPass: string;
}

const TeacherRegister = () => {
  const [createTeacher] = useCreateTeacherMutation();
  const [selectedSubject, setSelectedSubject] = useState("");
  const [pass, setPass] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(false);
  const [selectedDivision, setSelectedDivision] = useState("");
  const [districts, setDistricts] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const dispatch = useAppDispatch();
  const subjects = useAppSelector((state: RootState) => state.subjectsSlice.subjects);
  const navigate = useNavigate();
  useTitle("Teacher Register");

  const { register, handleSubmit, setValue, formState: { errors } } = useForm<IFormInput>();

  const handleDivisionChange = (division: string) => {
    setSelectedDivision(division);
    setDistricts(getDistrictsByDivision(division));
    setValue("district", "");
  };

  const handleCheckPass = (value: string) => {
    setConfirmPassword(value === pass);
  };

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    if (subjects.length === 0) { toast.error("Please select at least one subject."); return; }
    setIsSubmitting(true);

    let photoUrl = "https://i.ibb.co/6b4nDXS/default-avatar.png";
    let idCardUrl = "";

    if (data.photo?.[0]) {
      const imgInfo = await imageHosting(data.photo[0]);
      if (imgInfo?.data?.display_url) photoUrl = imgInfo.data.display_url;
    }
    if (data.studentID?.[0]) {
      const idInfo = await imageHosting(data.studentID[0]);
      if (idInfo?.data?.display_url) idCardUrl = idInfo.data.display_url;
    }

    try {
      await createTeacher({
        name: data.name,
        university: data.university,
        whatsApp: data.whatsApp,
        email: data.email,
        classRange: data.classRange,
        medium: data.medium,
        experience: data.experience,
        gender: data.gender,
        salary: data.salary,
        division: data.division,
        district: data.district,
        description: data.description,
        password: data.password,
        photo: photoUrl,
        studentIDPhoto: idCardUrl,
        subjects,
      }).unwrap();
      toast.success("Registration successful! Please login.");
      navigate("/auth/login");
    } catch (err: any) {
      toast.error(err?.data?.errorMessage || "Registration failed.");
    }
    setIsSubmitting(false);
  };

  const inp = "w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00ccb1] focus:border-transparent text-gray-800";
  const sel = "w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00ccb1] text-gray-800";
  const lbl = "block text-sm font-medium text-gray-700 mb-1";

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f0f9f7] to-[#e0f4f0] py-10 px-4">
      <div className="w-full max-w-3xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">

        {/* Header */}
        <div className="bg-[#00ccb1] px-8 py-6">
          <h1 className="text-2xl font-bold text-white">Register as Teacher</h1>
          <p className="text-white/80 text-sm mt-1">Join MentorNest and start teaching today</p>
        </div>

        <div className="p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

            {/* Personal Info */}
            <div>
              <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Personal Information</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className={lbl}>Full Name *</label>
                  <input {...register("name", { required: true })} placeholder="Ex. Mehadi Hasan" className={inp} />
                  {errors.name && <p className="text-red-500 text-xs mt-1">Required</p>}
                </div>
                <div>
                  <label className={lbl}>Gender *</label>
                  <select {...register("gender", { required: true })} className={sel}>
                    <option value="">Select Gender</option>
                    {GENDER_OPTIONS.map(g => <option key={g} value={g}>{g}</option>)}
                  </select>
                  {errors.gender && <p className="text-red-500 text-xs mt-1">Required</p>}
                </div>
                <div>
                  <label className={lbl}>Email *</label>
                  <input {...register("email", { required: true })} type="email" placeholder="example@gmail.com" className={inp} />
                  {errors.email && <p className="text-red-500 text-xs mt-1">Required</p>}
                </div>
                <div>
                  <label className={lbl}>WhatsApp Number *</label>
                  <input {...register("whatsApp", { required: true })} placeholder="01XXXXXXXXX" className={inp} />
                  {errors.whatsApp && <p className="text-red-500 text-xs mt-1">Required</p>}
                </div>
              </div>
            </div>

            {/* Academic Info */}
            <div>
              <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Academic Information</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className={lbl}>University / Institution *</label>
                  <input {...register("university", { required: true })} placeholder="Ex. Dhaka University" className={inp} />
                  {errors.university && <p className="text-red-500 text-xs mt-1">Required</p>}
                </div>
                <div>
                  <label className={lbl}>Teaching Experience *</label>
                  <select {...register("experience", { required: true })} className={sel}>
                    <option value="">Select Experience</option>
                    {EXPERIENCE_OPTIONS.map(e => <option key={e} value={e}>{e}</option>)}
                  </select>
                  {errors.experience && <p className="text-red-500 text-xs mt-1">Required</p>}
                </div>
                <div>
                  <label className={lbl}>Class Range *</label>
                  <select {...register("classRange", { required: true })} className={sel}>
                    <option value="">Select Class Range</option>
                    {CLASS_RANGES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                  {errors.classRange && <p className="text-red-500 text-xs mt-1">Required</p>}
                </div>
                <div>
                  <label className={lbl}>Medium *</label>
                  <select {...register("medium", { required: true })} className={sel}>
                    <option value="">Select Medium</option>
                    {MEDIUMS.map(m => <option key={m} value={m}>{m}</option>)}
                  </select>
                  {errors.medium && <p className="text-red-500 text-xs mt-1">Required</p>}
                </div>
              </div>

              {/* Subjects */}
              <div className="mt-4">
                <label className={lbl}>Subjects * (select multiple)</label>
                <select value={selectedSubject}
                  onChange={(e) => { dispatch(setSubjects(e.target.value)); setSelectedSubject(""); }}
                  className={sel}>
                  <option value="">Add a Subject</option>
                  {BD_SUBJECTS.filter(s => !subjects.includes(s)).map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
                <div className="flex flex-wrap gap-2 mt-2">
                  {subjects.map((s) => (
                    <span key={s} className="flex items-center gap-1 bg-[#00ccb1]/10 text-[#00ccb1] px-3 py-1 rounded-full text-sm border border-[#00ccb1]/30">
                      {s}
                      <button type="button" onClick={() => dispatch(removeSubject(s))} className="hover:text-red-500 ml-1">×</button>
                    </span>
                  ))}
                </div>
                {subjects.length === 0 && <p className="text-red-500 text-xs mt-1">Select at least one subject</p>}
              </div>
            </div>

            {/* Location & Salary */}
            <div>
              <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Location & Salary</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className={lbl}>Division *</label>
                  <select {...register("division", { required: true })}
                    onChange={(e) => handleDivisionChange(e.target.value)}
                    className={sel}>
                    <option value="">Select Division</option>
                    {allDivisions.map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                  {errors.division && <p className="text-red-500 text-xs mt-1">Required</p>}
                </div>
                <div>
                  <label className={lbl}>District *</label>
                  <select {...register("district", { required: true })}
                    disabled={!selectedDivision}
                    className={`${sel} ${!selectedDivision ? "opacity-50" : ""}`}>
                    <option value="">{selectedDivision ? "Select District" : "Select Division first"}</option>
                    {districts.map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                  {errors.district && <p className="text-red-500 text-xs mt-1">Required</p>}
                </div>
                <div className="md:col-span-2">
                  <label className={lbl}>Expected Monthly Salary *</label>
                  <select {...register("salary", { required: true })} className={sel}>
                    <option value="">Select Salary Range</option>
                    {SALARY_RANGES.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                  {errors.salary && <p className="text-red-500 text-xs mt-1">Required</p>}
                </div>
              </div>
            </div>

            {/* Photos */}
            <div>
              <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Photos</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className={lbl}>Profile Photo</label>
                  <input {...register("photo")} type="file" accept="image/*"
                    className="w-full text-sm text-gray-500 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-[#00ccb1]/10 file:text-[#00ccb1] hover:file:bg-[#00ccb1]/20" />
                </div>
                <div>
                  <label className={lbl}>Student ID / Certificate</label>
                  <input {...register("studentID")} type="file" accept="image/*"
                    className="w-full text-sm text-gray-500 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-[#00ccb1]/10 file:text-[#00ccb1] hover:file:bg-[#00ccb1]/20" />
                </div>
              </div>
            </div>

            {/* About */}
            <div>
              <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">About Yourself</h2>
              <textarea {...register("description", { required: true })} rows={4}
                placeholder="Describe your teaching style, achievements, availability..."
                className={inp} />
              {errors.description && <p className="text-red-500 text-xs mt-1">Required</p>}
            </div>

            {/* Password */}
            <div>
              <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Account Security</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className={lbl}>Password *</label>
                  <input {...register("password", { required: true, minLength: 6 })}
                    onBlur={(e) => setPass(e.target.value)}
                    type="password" placeholder="Min. 6 characters" className={inp} />
                  {errors.password && <p className="text-red-500 text-xs mt-1">Min 6 characters required</p>}
                </div>
                <div>
                  <label className={lbl}>Confirm Password *</label>
                  <input {...register("conPass", { required: true })}
                    onChange={(e) => handleCheckPass(e.target.value)}
                    type="password" placeholder="Re-enter password" className={inp} />
                  {confirmPassword
                    ? <p className="text-green-500 text-xs mt-1">✓ Password matched</p>
                    : <p className="text-gray-400 text-xs mt-1">Re-enter your password</p>}
                </div>
              </div>
            </div>

            <button type="submit" disabled={!confirmPassword || isSubmitting}
              className="w-full py-3 bg-[#00ccb1] text-white font-semibold rounded-lg hover:bg-[#00b8a0] disabled:opacity-50 transition-all">
              {isSubmitting ? "Registering..." : "Register as Teacher"}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            Already have an account?{" "}
            <Link to="/auth/login" className="text-[#00ccb1] hover:underline font-medium">Login here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default TeacherRegister;
