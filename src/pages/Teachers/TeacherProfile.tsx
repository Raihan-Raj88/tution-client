import { useParams } from "react-router-dom";
import { useGetOneTeacherBYIdQuery } from "../../redux/features/teacher/teacherApi";
import { watchLoader } from "../../utils/loader";
import { Link } from "react-router-dom";

const TeacherProfile = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetOneTeacherBYIdQuery(id as string);

  if (isLoading) return (
    <div className="flex items-center justify-center py-20">{watchLoader}</div>
  );

  const { name, university, whatsApp, classRange, description, studentIDPhoto, subjects, district, photo } = data?.data;

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">My Profile</h1>
        <p className="text-slate-400 text-sm mt-1">Your public profile information</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Left card */}
        <div className="secondary-bg rounded-xl p-6 border border-white/5 flex flex-col items-center text-center">
          <img src={photo || "https://i.ibb.co/6b4nDXS/default-avatar.png"}
            className="size-24 rounded-full object-cover border-2 border-[#00ccb1]" />
          <h2 className="font-bold text-lg mt-3 capitalize">{name}</h2>
          <p className="text-[#00ccb1] text-sm">{university}</p>
          <p className="text-slate-400 text-xs mt-1 capitalize">📍 {district}</p>
          <div className="flex flex-wrap justify-center gap-1 mt-3">
            {subjects?.map((s: string) => (
              <span key={s} className="text-xs bg-[#00ccb1]/20 text-[#00ccb1] px-2 py-0.5 rounded-full">{s}</span>
            ))}
          </div>
          <a href={`https://wa.me/88${whatsApp?.replace(/\D/g, "")}`} target="_blank"
            className="mt-4 w-full py-2 bg-green-600 hover:bg-green-500 rounded-lg text-sm font-medium transition-all">
            📱 WhatsApp: {whatsApp}
          </a>
        </div>

        {/* Right card */}
        <div className="md:col-span-2 space-y-4">
          <div className="secondary-bg rounded-xl p-6 border border-white/5">
            <h3 className="text-sm text-slate-400 mb-3 font-medium uppercase tracking-wider">Details</h3>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Class Range", value: classRange },
                { label: "District", value: district },
                { label: "Subjects", value: subjects?.join(", ") },
                { label: "WhatsApp", value: whatsApp },
              ].map((item) => (
                <div key={item.label} className="bg-white/5 rounded-lg p-3">
                  <p className="text-xs text-slate-400">{item.label}</p>
                  <p className="text-sm font-medium mt-1 capitalize">{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="secondary-bg rounded-xl p-6 border border-white/5">
            <h3 className="text-sm text-slate-400 mb-3 font-medium uppercase tracking-wider">About</h3>
            <p className="text-slate-300 text-sm leading-relaxed" style={{ whiteSpace: "pre-wrap" }}>{description}</p>
          </div>

          {studentIDPhoto && (
            <div className="secondary-bg rounded-xl p-6 border border-white/5">
              <h3 className="text-sm text-slate-400 mb-3 font-medium uppercase tracking-wider">Student ID</h3>
              <img src={studentIDPhoto} className="w-full max-w-sm rounded-lg" alt="Student ID" />
            </div>
          )}

          <div className="flex gap-3">
            <Link to={`/teacher-profile/my-blogs/${id}`}
              className="flex-1 py-2.5 bg-[#00ccb1] hover:bg-[#00b8a0] rounded-lg text-sm font-medium text-center transition-all">
              📝 My Blogs
            </Link>
            <Link to={`/teacher-profile/write-blog/${id}`}
              className="flex-1 py-2.5 border border-[#00ccb1] text-[#00ccb1] hover:bg-[#00ccb1] hover:text-white rounded-lg text-sm font-medium text-center transition-all">
              ✏️ Write Blog
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherProfile;
