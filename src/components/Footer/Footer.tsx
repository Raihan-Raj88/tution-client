import { Link } from "react-router-dom";
import logo from "../../assets/logo2.png";

const Footer = () => {
  return (
    <footer className="bg-[#0a1628] border-t border-white/10 text-white">
      <div className="w-11/12 max-w-6xl mx-auto py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* Brand */}
        <div>
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} className="size-10 rounded-full" alt="logo" />
            <span className="font-black text-xl secondary-font">MentorNest</span>
          </Link>
          <p className="text-slate-400 text-sm mt-4 leading-relaxed">
            Bangladesh's trusted platform connecting students with verified private tutors.
          </p>
          <div className="flex gap-3 mt-5">
            {["Facebook", "Twitter", "Instagram"].map((s) => (
              <span key={s} className="size-9 bg-white/5 hover:bg-[#00ccb1] rounded-full flex items-center justify-center text-xs cursor-pointer transition-all border border-white/10">
                {s[0]}
              </span>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold text-base mb-4">Quick Links</h3>
          <ul className="space-y-2">
            {[
              { to: "/", label: "Home" },
              { to: "/teachers", label: "Find Tutors" },
              { to: "/tuitions", label: "Tuition Posts" },
              { to: "/blogs", label: "Blogs" },
            ].map((item) => (
              <li key={item.to}>
                <Link to={item.to} className="text-slate-400 hover:text-[#00ccb1] text-sm transition-all">
                  → {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Register */}
        <div>
          <h3 className="font-semibold text-base mb-4">Join Us</h3>
          <ul className="space-y-2">
            {[
              { to: "/auth/sign-up/teacher", label: "Register as Teacher" },
              { to: "/auth/sign-up/student", label: "Register as Student" },
              { to: "/auth/login", label: "Login" },
            ].map((item) => (
              <li key={item.to}>
                <Link to={item.to} className="text-slate-400 hover:text-[#00ccb1] text-sm transition-all">
                  → {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-semibold text-base mb-4">Contact</h3>
          <ul className="space-y-3 text-sm text-slate-400">
            <li className="flex items-start gap-2">
              <span>📍</span> Dhaka, Bangladesh
            </li>
            <li className="flex items-start gap-2">
              <span>📧</span> support@mentornest.com
            </li>
            <li className="flex items-start gap-2">
              <span>📞</span> +880 1700-000000
            </li>
          </ul>
          <div className="mt-5 p-4 bg-[#00ccb1]/10 rounded-xl border border-[#00ccb1]/20">
            <p className="text-xs text-[#00ccb1] font-medium">🎓 Admin Approved Tutors Only</p>
            <p className="text-xs text-slate-400 mt-1">All tutors are verified before listing.</p>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-white/10 py-5">
        <div className="w-11/12 max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-slate-400 text-sm">
            © {new Date().getFullYear()} MentorNest. All rights reserved.
          </p>
          <div className="flex gap-5 text-sm text-slate-400">
            <span className="hover:text-[#00ccb1] cursor-pointer transition-all">Privacy Policy</span>
            <span className="hover:text-[#00ccb1] cursor-pointer transition-all">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
