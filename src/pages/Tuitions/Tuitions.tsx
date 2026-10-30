import { useState } from "react";
import { useGetAllPostsQuery } from "../../redux/features/post/postApi";
import PostCard from "../../components/Cards/PostCard";
import { TParamsQuery, TPost } from "../Home/types";
import { watchLoader } from "../../utils/loader";
import useTitle from "../../utils/useTitle";
import { allDivisions, getDistrictsByDivision } from "../../assets/bdDivisionDistrict";

const BD_SUBJECTS = [
  "All", "Bangla", "English", "Mathematics", "Physics", "Chemistry",
  "Biology", "Higher Mathematics", "ICT", "Accounting", "Economics",
  "Business Studies", "General Science", "All Subjects",
];

const BD_CLASSES = [
  "All", "Class 1", "Class 2", "Class 3", "Class 4", "Class 5",
  "Class 6", "Class 7", "Class 8", "Class 9", "Class 10",
  "SSC", "HSC 1st Year", "HSC 2nd Year", "Honours 1st Year",
  "Honours 2nd Year", "Honours 3rd Year", "Honours 4th Year",
  "Masters", "O Level", "A Level",
];

const Tuitions = () => {
  const [selectedDivision, setSelectedDivision] = useState("");
  const [districts, setDistricts] = useState<string[]>([]);
  const [params, setParams] = useState<TParamsQuery[]>([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [filters, setFilters] = useState({ division: "", district: "", subject: "", class: "" });

  const { data: postData, isLoading } = useGetAllPostsQuery(params.length ? params : undefined);
  useTitle("Tuitions");

  const handleDivisionChange = (division: string) => {
    setSelectedDivision(division);
    setDistricts(getDistrictsByDivision(division));
    setFilters((f) => ({ ...f, division, district: "" }));
  };

  const buildParams = (overrides: Partial<typeof filters>, page = 1) => {
    const merged = { ...filters, ...overrides };
    const p: TParamsQuery[] = [];
    if (merged.division) p.push({ name: "division", value: merged.division });
    if (merged.district) p.push({ name: "district", value: merged.district });
    if (merged.subject && merged.subject !== "All") p.push({ name: "subject", value: merged.subject });
    if (merged.class && merged.class !== "All") p.push({ name: "class", value: merged.class });
    if (page > 1) p.push({ name: "page", value: page });
    return p;
  };

  const handleSearch = () => {
    setPageNumber(1);
    setParams(buildParams({}));
  };

  const handleReset = () => {
    setFilters({ division: "", district: "", subject: "", class: "" });
    setSelectedDivision("");
    setDistricts([]);
    setPageNumber(1);
    setParams([]);
  };

  const handleNext = () => {
    if (postData?.data?.length < 6) return;
    const page = pageNumber + 1;
    setPageNumber(page);
    setParams(buildParams({}, page));
  };

  const handlePrev = () => {
    if (pageNumber <= 1) return;
    const page = pageNumber - 1;
    setPageNumber(page);
    setParams(buildParams({}, page));
  };

  const sel = "w-full px-3 py-2.5 bg-slate-800/50 border border-slate-700 rounded-lg text-white text-sm focus:outline-none focus:border-[#00ccb1]";
  const opt = "bg-slate-800";

  if (isLoading) return (
    <div className="w-full bg-slate-950 h-screen flex items-center justify-center">{watchLoader}</div>
  );

  const posts: TPost[] = postData?.data || [];

  return (
    <div className="pt-20 pb-10">
      <div className="w-11/12 max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Tuition Posts</h1>
          <p className="text-slate-400 text-sm mt-1">Find the right student to teach</p>
        </div>

        {/* Filter Box */}
        <div className="secondary-bg rounded-xl p-5 border border-white/5 mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

            {/* Division */}
            <div>
              <label className="text-xs text-slate-400 block mb-1">Division</label>
              <select value={filters.division} className={sel}
                onChange={(e) => {
                  handleDivisionChange(e.target.value);
                  setFilters((f) => ({ ...f, division: e.target.value }));
                }}>
                <option value="" className={opt}>All Divisions</option>
                {allDivisions.map((d) => <option key={d} value={d} className={opt}>{d}</option>)}
              </select>
            </div>

            {/* District */}
            <div>
              <label className="text-xs text-slate-400 block mb-1">District</label>
              <select value={filters.district} className={`${sel} ${!selectedDivision ? "opacity-40" : ""}`}
                disabled={!selectedDivision}
                onChange={(e) => setFilters((f) => ({ ...f, district: e.target.value }))}>
                <option value="" className={opt}>{selectedDivision ? "All Districts" : "Select Division first"}</option>
                {districts.map((d) => <option key={d} value={d} className={opt}>{d}</option>)}
              </select>
            </div>

            {/* Subject */}
            <div>
              <label className="text-xs text-slate-400 block mb-1">Subject</label>
              <select value={filters.subject} className={sel}
                onChange={(e) => setFilters((f) => ({ ...f, subject: e.target.value }))}>
                <option value="" className={opt}>All Subjects</option>
                {BD_SUBJECTS.filter(s => s !== "All").map((s) => <option key={s} value={s} className={opt}>{s}</option>)}
              </select>
            </div>

            {/* Class */}
            <div>
              <label className="text-xs text-slate-400 block mb-1">Class</label>
              <select value={filters.class} className={sel}
                onChange={(e) => setFilters((f) => ({ ...f, class: e.target.value }))}>
                <option value="" className={opt}>All Classes</option>
                {BD_CLASSES.filter(c => c !== "All").map((c) => <option key={c} value={c} className={opt}>{c}</option>)}
              </select>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 mt-4">
            <button onClick={handleSearch}
              className="px-6 py-2.5 bg-[#00ccb1] hover:bg-[#00b8a0] rounded-lg text-sm font-semibold transition-all">
              🔍 Search
            </button>
            <button onClick={handleReset}
              className="px-6 py-2.5 border border-white/10 hover:bg-white/5 rounded-lg text-sm transition-all">
              Reset
            </button>
          </div>
        </div>

        {/* Results count */}
        <p className="text-slate-400 text-sm mb-4">
          {posts.length > 0 ? `Showing ${posts.length} post${posts.length > 1 ? "s" : ""}` : ""}
        </p>

        {/* Posts */}
        {posts.length === 0 ? (
          <div className="text-center py-20 secondary-bg rounded-xl">
            <p className="text-4xl mb-3">📋</p>
            <p className="text-slate-400">No tuition posts found.</p>
            <button onClick={handleReset} className="mt-4 text-[#00ccb1] text-sm hover:underline">
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {posts.map((post: TPost) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>
        )}

        {/* Pagination */}
        {posts.length > 0 && (
          <div className="flex justify-center gap-3 mt-8">
            <button onClick={handlePrev} disabled={pageNumber <= 1}
              className="px-5 py-2 border border-white/10 rounded-lg text-sm hover:bg-white/5 disabled:opacity-30 transition-all">
              ← Previous
            </button>
            <span className="px-4 py-2 secondary-bg rounded-lg text-sm">Page {pageNumber}</span>
            <button onClick={handleNext} disabled={posts.length < 6}
              className="px-5 py-2 border border-white/10 rounded-lg text-sm hover:bg-white/5 disabled:opacity-30 transition-all">
              Next →
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Tuitions;
