import QNAAccordion from "../../components/Accordion/QNAAccordion";
import { PrimaryCard } from "../../components/Cards/PrimaryCard";
import "../../App.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { useGetAllTeachersQuery } from "../../redux/features/teacher/teacherApi";
import { TTeacher } from "./types";
import PostSection from "./PostSection";
import { watchLoader } from "../../utils/loader";
import bannerImg from "../../assets/images/tuition-point-banner.png";
import useTitle from "../../utils/useTitle";
import { Link } from "react-router-dom";

AOS.init();

const STEPS = [
  { icon: "📝", title: "Register", desc: "Sign up as a student or teacher in minutes." },
  { icon: "🔍", title: "Find / Post", desc: "Students post tuition needs. Teachers browse and connect." },
  { icon: "✅", title: "Get Approved", desc: "Admin verifies profiles to ensure quality." },
  { icon: "🎓", title: "Start Learning", desc: "Connect via WhatsApp and begin your journey." },
];

const FEATURES = [
  { icon: "🏫", title: "64 Districts", desc: "Find tutors across all districts of Bangladesh." },
  { icon: "📚", title: "20+ Subjects", desc: "From primary to university level, all subjects covered." },
  { icon: "⭐", title: "Verified Tutors", desc: "Admin approved profiles with student reviews." },
  { icon: "💬", title: "Direct Contact", desc: "Connect instantly via WhatsApp." },
  { icon: "📝", title: "Tuition Posts", desc: "Students post requirements, teachers apply." },
  { icon: "📖", title: "Knowledge Blogs", desc: "Teachers share tips and study guides." },
];

const TESTIMONIALS = [
  { name: "Rahim Uddin", role: "Student, Dhaka", text: "Found an amazing Math teacher within 2 days. The platform is so easy to use!", avatar: "👨‍🎓" },
  { name: "Fatema Khatun", role: "Teacher, Chittagong", text: "I got 5 new students in my first week. MentorNest is a game changer!", avatar: "👩‍🏫" },
  { name: "Karim Hossain", role: "Parent, Rajshahi", text: "My son's grades improved significantly after finding the right tutor here.", avatar: "👨" },
];

const Home = () => {
  const { data, isLoading, isError } = useGetAllTeachersQuery([]);
  useTitle("Home");

  if (isLoading) return (
    <div className="w-full bg-slate-950 h-screen flex items-center justify-center">{watchLoader}</div>
  );

  return (
    <div>
      {/* ===== HERO ===== */}
      <section className="min-h-screen flex items-center py-20">
        <div className="w-11/12 max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div data-aos="fade-right" data-aos-duration="800">
            <span className="text-xs bg-[#00ccb1]/20 text-[#00ccb1] px-3 py-1 rounded-full font-medium">
              🇧🇩 Bangladesh's Tuition Platform
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold mt-4 leading-tight secondary-font">
              Your Bridge to <span className="text-[#00ccb1]">Brighter</span> Futures!
            </h1>
            <p className="mt-5 text-slate-400 text-base leading-relaxed">
              MentorNest connects students with top private tutors across Bangladesh.
              Post tuition needs, find expert tutors, and learn smarter — all in one place.
            </p>
            <div className="flex flex-wrap gap-4 mt-8">
              <Link to="/teachers"
                className="bg-[#00ccb1] hover:bg-[#00b8a0] text-white font-semibold py-3 px-8 rounded-xl transition-all">
                Find Tutors →
              </Link>
              <Link to="/auth/sign-up/student"
                className="border border-[#00ccb1] text-[#00ccb1] hover:bg-[#00ccb1] hover:text-white font-semibold py-3 px-8 rounded-xl transition-all">
                Post Tuition
              </Link>
            </div>
          </div>
          <div data-aos="fade-left" data-aos-duration="800" className="flex justify-center">
            <img src={bannerImg} alt="tuition banner" className="max-w-md w-full" />
          </div>
        </div>
      </section>

      {/* ===== STATS ===== */}
      <section className="py-12 w-11/12 max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4" data-aos="fade-up">
          {[
            { label: "Active Tutors", value: "500+", icon: "👨‍🏫" },
            { label: "Happy Students", value: "2000+", icon: "👨‍🎓" },
            { label: "Districts", value: "64", icon: "🗺️" },
            { label: "Subjects", value: "20+", icon: "📚" },
          ].map((s) => (
            <div key={s.label} className="secondary-bg rounded-2xl p-6 text-center border border-white/5 hover:border-[#00ccb1]/30 transition-all">
              <p className="text-3xl mb-2">{s.icon}</p>
              <p className="text-3xl font-bold text-[#00ccb1]">{s.value}</p>
              <p className="text-slate-400 text-sm mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section className="py-16 w-11/12 max-w-6xl mx-auto">
        <div className="text-center mb-12" data-aos="fade-up">
          <span className="text-xs bg-[#00ccb1]/20 text-[#00ccb1] px-3 py-1 rounded-full">How It Works</span>
          <h2 className="text-3xl font-bold mt-3">Simple 4-Step Process</h2>
          <p className="text-slate-400 mt-2">Get started in minutes</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {STEPS.map((step, i) => (
            <div key={i} data-aos="fade-up" data-aos-delay={i * 100}
              className="secondary-bg rounded-2xl p-6 border border-white/5 hover:border-[#00ccb1]/30 transition-all text-center">
              <div className="text-4xl mb-3">{step.icon}</div>
              <div className="size-7 bg-[#00ccb1] rounded-full flex items-center justify-center text-sm font-bold mx-auto mb-3">
                {i + 1}
              </div>
              <h3 className="font-semibold text-lg">{step.title}</h3>
              <p className="text-slate-400 text-sm mt-2">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== FEATURES ===== */}
      <section className="py-16 w-11/12 max-w-6xl mx-auto">
        <div className="text-center mb-12" data-aos="fade-up">
          <span className="text-xs bg-[#00ccb1]/20 text-[#00ccb1] px-3 py-1 rounded-full">Why MentorNest</span>
          <h2 className="text-3xl font-bold mt-3">Everything You Need</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map((f, i) => (
            <div key={i} data-aos="zoom-in" data-aos-delay={i * 80}
              className="secondary-bg rounded-2xl p-6 border border-white/5 hover:border-[#00ccb1]/40 transition-all flex gap-4">
              <span className="text-3xl shrink-0">{f.icon}</span>
              <div>
                <h3 className="font-semibold">{f.title}</h3>
                <p className="text-slate-400 text-sm mt-1">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== TUTORS ===== */}
      <section className="py-16 w-11/12 max-w-6xl mx-auto">
        <div className="text-center mb-12" data-aos="fade-up">
          <span className="text-xs bg-[#00ccb1]/20 text-[#00ccb1] px-3 py-1 rounded-full">Our Tutors</span>
          <h2 className="text-3xl font-bold mt-3">Meet Our Educators</h2>
          <p className="text-slate-400 mt-2">Verified and experienced tutors ready to help</p>
        </div>
        {isError ? (
          <p className="text-center text-red-400">Failed to load tutors.</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {data?.data?.slice(0, 6).map((teacher: TTeacher) => (
              <PrimaryCard key={teacher._id} id={teacher._id} image={teacher.photo}
                description={teacher.description} name={teacher.name} subjects={teacher.subjects} />
            ))}
          </div>
        )}
        <div className="text-center mt-10">
          <Link to="/teachers"
            className="bg-[#00ccb1] hover:bg-[#00b8a0] text-white font-semibold py-3 px-8 rounded-xl transition-all">
            View All Tutors →
          </Link>
        </div>
      </section>

      {/* ===== TUITION POSTS ===== */}
      <PostSection />

      {/* ===== TESTIMONIALS ===== */}
      <section className="py-16 w-11/12 max-w-6xl mx-auto">
        <div className="text-center mb-12" data-aos="fade-up">
          <span className="text-xs bg-[#00ccb1]/20 text-[#00ccb1] px-3 py-1 rounded-full">Testimonials</span>
          <h2 className="text-3xl font-bold mt-3">What People Say</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {TESTIMONIALS.map((t, i) => (
            <div key={i} data-aos="fade-up" data-aos-delay={i * 100}
              className="secondary-bg rounded-2xl p-6 border border-white/5 hover:border-[#00ccb1]/30 transition-all">
              <p className="text-slate-300 text-sm leading-relaxed">"{t.text}"</p>
              <div className="flex items-center gap-3 mt-5">
                <span className="text-3xl">{t.avatar}</span>
                <div>
                  <p className="font-semibold text-sm">{t.name}</p>
                  <p className="text-slate-400 text-xs">{t.role}</p>
                </div>
              </div>
              <div className="flex gap-1 mt-3">
                {[1,2,3,4,5].map(s => <span key={s} className="text-yellow-400 text-sm">★</span>)}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="py-16 w-11/12 max-w-6xl mx-auto">
        <div data-aos="zoom-in"
          className="bg-gradient-to-r from-[#00ccb1] to-[#0099a8] rounded-3xl p-10 text-center">
          <h2 className="text-3xl font-bold text-white">Ready to Get Started?</h2>
          <p className="text-white/80 mt-3 text-base">Join thousands of students and teachers on MentorNest today.</p>
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <Link to="/auth/sign-up/student"
              className="bg-white text-[#00ccb1] font-bold py-3 px-8 rounded-xl hover:bg-white/90 transition-all">
              I'm a Student
            </Link>
            <Link to="/auth/sign-up/teacher"
              className="border-2 border-white text-white font-bold py-3 px-8 rounded-xl hover:bg-white hover:text-[#00ccb1] transition-all">
              I'm a Teacher
            </Link>
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section id="FAQ" className="py-16 w-11/12 max-w-6xl mx-auto">
        <div className="text-center mb-12" data-aos="fade-up">
          <span className="text-xs bg-[#00ccb1]/20 text-[#00ccb1] px-3 py-1 rounded-full">FAQ</span>
          <h2 className="text-3xl font-bold mt-3">Frequently Asked Questions</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-8 items-start">
          <div className="flex justify-center items-center secondary-bg rounded-2xl py-16">
            <h1 className="bg-clip-text text-transparent bg-gradient-to-r from-[#00ccb1] to-violet-500 text-8xl font-extrabold secondary-font">
              FAQ
            </h1>
          </div>
          <QNAAccordion />
        </div>
      </section>
    </div>
  );
};

export default Home;
