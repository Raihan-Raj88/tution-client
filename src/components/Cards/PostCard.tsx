import { TPost, TUser } from "../../pages/Home/types";
import { useAppSelector } from "../../redux/hooks";
import { useAuthCurrentUser } from "../../redux/features/auth/authSlice";
import toast from "react-hot-toast";
import AOS from "aos";
import "aos/dist/aos.css";
import moment from "moment";

const PostCard = ({ post }: { post: TPost }) => {
  AOS.init();
  const user: TUser | null = useAppSelector(useAuthCurrentUser);

  const handleWhatsApp = () => {
    if (!user) { toast.error("Please login first!"); return; }
    if (user.role === "teacher") {
      const phone = post.whatsApp?.replace(/\D/g, "");
      window.open(`https://wa.me/88${phone}`, "_blank");
    } else {
      toast.error("Only teachers can contact students.");
    }
  };

  return (
    <div data-aos="fade-up" data-aos-duration="600"
      className="secondary-bg rounded-xl p-5 border border-white/5 hover:border-[#00ccb1]/30 transition-all">

      <div className="flex items-start justify-between gap-3">
        <h2 className="text-lg font-semibold">{post.title}</h2>
        <span className="text-xs text-slate-400 shrink-0">{moment(post?.createdAt).fromNow()}</span>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mt-3">
        {post.class && (
          <span className="text-xs bg-[#00ccb1]/10 text-[#00ccb1] px-2.5 py-1 rounded-full">📚 {post.class}</span>
        )}
        {post.subject && Array.isArray(post.subject) && post.subject.map((s: string) => (
          <span key={s} className="text-xs bg-blue-500/10 text-blue-400 px-2.5 py-1 rounded-full">📖 {s}</span>
        ))}
        {post.medium && (
          <span className="text-xs bg-purple-500/10 text-purple-400 px-2.5 py-1 rounded-full">🏫 {post.medium}</span>
        )}
        {post.salary && (
          <span className="text-xs bg-yellow-500/10 text-yellow-400 px-2.5 py-1 rounded-full">💰 {post.salary}</span>
        )}
        {post.daysPerWeek && (
          <span className="text-xs bg-orange-500/10 text-orange-400 px-2.5 py-1 rounded-full">📅 {post.daysPerWeek}</span>
        )}
        {post.gender && (
          <span className="text-xs bg-pink-500/10 text-pink-400 px-2.5 py-1 rounded-full">👤 {post.gender}</span>
        )}
        {(post.district || post.division) && (
          <span className="text-xs bg-white/10 text-slate-300 px-2.5 py-1 rounded-full capitalize">
            📍 {post.district}{post.division ? `, ${post.division}` : ""}
          </span>
        )}
      </div>

      {/* Description */}
      <p className="text-slate-400 text-sm mt-3 line-clamp-3" style={{ whiteSpace: "pre-wrap" }}>
        {post.description}
      </p>

      {/* WhatsApp Button */}
      <div className="mt-4">
        <button onClick={handleWhatsApp}
          className="flex items-center gap-2 bg-green-600 hover:bg-green-500 transition-all px-4 py-2 rounded-lg text-sm font-semibold">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-4">
            <path fillRule="evenodd" d="M5.337 21.718a6.707 6.707 0 0 1-.533-.074.75.75 0 0 1-.44-1.223 3.73 3.73 0 0 0 .814-1.686c.023-.115-.022-.317-.254-.543C3.274 16.587 2.25 14.41 2.25 12c0-5.03 4.428-9 9.75-9s9.75 3.97 9.75 9c0 5.03-4.428 9-9.75 9-.833 0-1.643-.097-2.417-.279a6.721 6.721 0 0 1-4.246.997Z" clipRule="evenodd" />
          </svg>
          Contact on WhatsApp
        </button>
      </div>
    </div>
  );
};

export default PostCard;
