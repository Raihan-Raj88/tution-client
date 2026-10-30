import { SubmitHandler, useForm } from "react-hook-form";
import { TPost, TUser } from "../Home/types";
import toast from "react-hot-toast";
import { useState } from "react";
import { useCreatePostMutation } from "../../redux/features/post/postApi";
import { useGetOneStudentByIdQuery } from "../../redux/features/student/studentApi";
import { useAppSelector } from "../../redux/hooks";
import { useAuthCurrentUser } from "../../redux/features/auth/authSlice";
import { watchLoader } from "../../utils/loader";
import { useNavigate } from "react-router-dom";
import { allDivisions, getDistrictsByDivision } from "../../assets/bdDivisionDistrict";

const BD_CLASSES = [
  "Class 1", "Class 2", "Class 3", "Class 4", "Class 5",
  "Class 6", "Class 7", "Class 8", "Class 9", "Class 10",
  "SSC", "HSC 1st Year", "HSC 2nd Year",
  "Degree 1st Year", "Degree 2nd Year", "Degree 3rd Year",
  "Honours 1st Year", "Honours 2nd Year", "Honours 3rd Year", "Honours 4th Year",
  "Masters", "O Level", "A Level",
];

const BD_SUBJECTS = [
  "Bangla", "English", "Mathematics", "General Science",
  "Physics", "Chemistry", "Biology", "Higher Mathematics",
  "ICT", "Accounting", "Finance & Banking", "Business Studies",
  "Economics", "Geography", "History", "Civics",
  "Islam & Moral Education", "Hindu Religion", "Social Science",
  "Agriculture Studies", "Home Science", "Arts & Crafts",
  "Physical Education", "All Subjects",
];

const BD_MEDIUMS = ["Bangla Medium", "English Medium", "English Version", "Madrasa"];
const SALARY_RANGES = [
  "1,000 - 2,000 BDT", "2,000 - 3,000 BDT", "3,000 - 5,000 BDT",
  "5,000 - 8,000 BDT", "8,000 - 12,000 BDT", "12,000 - 20,000 BDT", "Negotiable",
];
const DAYS_OPTIONS = ["1 day/week", "2 days/week", "3 days/week", "4 days/week", "5 days/week", "6 days/week", "Daily"];
const GENDER_OPTIONS = ["Male Tutor", "Female Tutor", "Any"];

const TuitionPostForm = () => {
  const user: TUser | null = useAppSelector(useAuthCurrentUser);
  const navigate = useNavigate();
  const { isLoading, data: student } = useGetOneStudentByIdQuery(user?.email);
  const [selectedDivision, setSelectedDivision] = useState("");
  const [districts, setDistricts] = useState<string[]>([]);
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [createPost, { isLoading: isPosting }] = useCreatePostMutation();
  const { register, handleSubmit, reset, setValue } = useForm<TPost>();

  const handleDivisionChange = (division: string) => {
    setSelectedDivision(division);
    setDistricts(getDistrictsByDivision(division));
    setValue("district", "");
  };

  const addSubject = (sub: string) => {
    if (!sub || selectedSubjects.includes(sub)) return;
    const updated = [...selectedSubjects, sub];
    setSelectedSubjects(updated);
    setValue("subject", updated);
  };

  const removeSubject = (sub: string) => {
    const updated = selectedSubjects.filter((s) => s !== sub);
    setSelectedSubjects(updated);
    setValue("subject", updated);
  };

  const onSubmit: SubmitHandler<TPost> = async (data) => {
    if (selectedSubjects.length === 0) {
      toast.error("Please select at least one subject.");
      return;
    }
    try {
      await createPost({
        ...data,
        subject: selectedSubjects,
        userId: student.data.userId,
        whatsApp: student.data.whatsApp,
      }).unwrap();
      toast.success("Tuition post created!");
      reset();
      setSelectedSubjects([]);
      setSelectedDivision("");
      setDistricts([]);
      navigate(`/student-profile/${user?._id}`);
    } catch (err: any) {
      toast.error(err?.data?.errorMessage || "Failed to create post.");
    }
  };

  if (isLoading) return (
    <div className="flex items-center justify-center py-20">{watchLoader}</div>
  );

  const sel = "w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#00ccb1] text-white";
  const opt = "bg-slate-800";

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Post a Tuition</h1>
        <p className="text-slate-400 text-sm mt-1">Fill in the details to find the right tutor</p>
      </div>

      <div className="max-w-2xl secondary-bg rounded-xl p-6 border border-white/5">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

          {/* Title */}
          <div>
            <label className="text-sm text-slate-400 block mb-1">Post Title</label>
            <input type="text" placeholder="Ex: Need a Math Teacher for Class 10"
              {...register("title", { required: true })}
              className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#00ccb1] text-white placeholder:text-slate-500" />
          </div>

          {/* Class */}
          <div>
            <label className="text-sm text-slate-400 block mb-1">Class / Level</label>
            <select {...register("class", { required: true })} className={sel}>
              <option value="" className={opt}>Select Class</option>
              {BD_CLASSES.map((c) => <option key={c} value={c} className={opt}>{c}</option>)}
            </select>
          </div>

          {/* Subjects — multi select */}
          <div>
            <label className="text-sm text-slate-400 block mb-1">
              Subjects <span className="text-xs text-slate-500">(select multiple)</span>
            </label>
            <select className={sel} value=""
              onChange={(e) => addSubject(e.target.value)}>
              <option value="" className={opt}>Add a Subject</option>
              {BD_SUBJECTS.filter((s) => !selectedSubjects.includes(s)).map((s) => (
                <option key={s} value={s} className={opt}>{s}</option>
              ))}
            </select>
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-2">
              {selectedSubjects.map((s) => (
                <span key={s}
                  className="flex items-center gap-1 bg-[#00ccb1]/20 text-[#00ccb1] px-3 py-1 rounded-full text-sm border border-[#00ccb1]/30">
                  {s}
                  <button type="button" onClick={() => removeSubject(s)}
                    className="hover:text-red-400 ml-1 font-bold">×</button>
                </span>
              ))}
            </div>
            {selectedSubjects.length === 0 && (
              <p className="text-red-400 text-xs mt-1">Select at least one subject</p>
            )}
          </div>

          {/* Medium & Gender */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-slate-400 block mb-1">Medium</label>
              <select {...register("medium", { required: true })} className={sel}>
                <option value="" className={opt}>Select Medium</option>
                {BD_MEDIUMS.map((m) => <option key={m} value={m} className={opt}>{m}</option>)}
              </select>
            </div>
            <div>
              <label className="text-sm text-slate-400 block mb-1">Preferred Tutor Gender</label>
              <select {...register("gender", { required: true })} className={sel}>
                <option value="" className={opt}>Select Preference</option>
                {GENDER_OPTIONS.map((g) => <option key={g} value={g} className={opt}>{g}</option>)}
              </select>
            </div>
          </div>

          {/* Division → District */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-slate-400 block mb-1">Division</label>
              <select {...register("division", { required: true })}
                onChange={(e) => handleDivisionChange(e.target.value)} className={sel}>
                <option value="" className={opt}>Select Division</option>
                {allDivisions.map((d) => <option key={d} value={d} className={opt}>{d}</option>)}
              </select>
            </div>
            <div>
              <label className="text-sm text-slate-400 block mb-1">District</label>
              <select {...register("district", { required: true })}
                disabled={!selectedDivision}
                className={`${sel} ${!selectedDivision ? "opacity-40" : ""}`}>
                <option value="" className={opt}>{selectedDivision ? "Select District" : "Select Division first"}</option>
                {districts.map((d) => <option key={d} value={d} className={opt}>{d}</option>)}
              </select>
            </div>
          </div>

          {/* Salary & Days */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-slate-400 block mb-1">Monthly Salary</label>
              <select {...register("salary", { required: true })} className={sel}>
                <option value="" className={opt}>Select Salary Range</option>
                {SALARY_RANGES.map((s) => <option key={s} value={s} className={opt}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="text-sm text-slate-400 block mb-1">Days Per Week</label>
              <select {...register("daysPerWeek", { required: true })} className={sel}>
                <option value="" className={opt}>Select Days</option>
                {DAYS_OPTIONS.map((d) => <option key={d} value={d} className={opt}>{d}</option>)}
              </select>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="text-sm text-slate-400 block mb-1">Additional Details</label>
            <textarea placeholder="Preferred time, special requirements, student background..."
              {...register("description", { required: true })} rows={4}
              className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#00ccb1] text-white placeholder:text-slate-500 resize-none" />
          </div>

          <button type="submit" disabled={isPosting}
            className="w-full py-3 bg-[#00ccb1] hover:bg-[#00b8a0] disabled:opacity-50 transition-all rounded-lg font-semibold">
            {isPosting ? "Posting..." : "Post Tuition"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default TuitionPostForm;
