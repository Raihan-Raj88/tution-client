import { BackgroundBeamsDemo } from "../../../components/BackgroundBeams/BackgroundBeamsDemo";
import { BackgroundGradientRound } from "../../../components/ui/round-gradient";
import "../../../App.css";
import PhoneButton from "../../../components/Buttonts/PhoneButton";
import ContactButton from "../../../components/Buttonts/ContactButton";
import { useParams } from "react-router-dom";
import { useGetOneTeacherQuery } from "../../../redux/features/teacher/teacherApi";
import { watchLoader } from "../../../utils/loader";
import useTitle from "../../../utils/useTitle";
import { useGetTeacherReviewsQuery, useCreateReviewMutation, useDeleteReviewMutation } from "../../../redux/features/review/reviewApi";
import { useAppSelector } from "../../../redux/hooks";
import { useAuthCurrentUser } from "../../../redux/features/auth/authSlice";
import { useGetOneStudentByIdQuery } from "../../../redux/features/student/studentApi";
import { useState } from "react";
import toast from "react-hot-toast";
import moment from "moment";
import { TUser } from "../../Home/types";

const StarRating = ({ value, onChange }: { value: number; onChange?: (v: number) => void }) => (
  <div className="flex gap-1">
    {[1, 2, 3, 4, 5].map((star) => (
      <button key={star} type="button"
        onClick={() => onChange?.(star)}
        className={`text-2xl transition-all ${star <= value ? "text-yellow-400" : "text-slate-600"} ${onChange ? "hover:text-yellow-300 cursor-pointer" : "cursor-default"}`}>
        ★
      </button>
    ))}
  </div>
);

const TeacherAbout = () => {
  const params = useParams();
  const user: TUser | null = useAppSelector(useAuthCurrentUser);
  const { data, isLoading } = useGetOneTeacherQuery(params.id as string);
  const { data: studentData } = useGetOneStudentByIdQuery(user?.email, { skip: user?.role !== "student" });
  const { data: reviewData, refetch: refetchReviews } = useGetTeacherReviewsQuery(params.id as string);
  const [createReview, { isLoading: submitting }] = useCreateReviewMutation();
  const [deleteReview] = useDeleteReviewMutation();

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [showForm, setShowForm] = useState(false);

  useTitle(data?.data.name || "About");

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) { toast.error("Please write a comment."); return; }
    try {
      await createReview({
        teacherId: params.id,
        studentId: studentData?.data?._id,
        studentName: studentData?.data?.name,
        studentPhoto: studentData?.data?.photo || "",
        rating,
        comment,
      }).unwrap();
      toast.success("Review submitted!");
      setComment("");
      setRating(5);
      setShowForm(false);
      refetchReviews();
    } catch (err: any) {
      toast.error(err?.data?.errorMessage || "Failed to submit review.");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteReview(id).unwrap();
      refetchReviews();
      toast.success("Review deleted.");
    } catch {
      toast.error("Failed to delete.");
    }
  };

  if (isLoading) return (
    <div className="w-full bg-slate-950 h-screen flex items-center justify-center">{watchLoader}</div>
  );

  const { name, university, whatsApp, classRange, description, photo, studentIDPhoto, subjects } = data?.data;
  const reviews = reviewData?.data?.reviews || [];
  const avgRating = reviewData?.data?.avgRating || 0;
  const totalReviews = reviewData?.data?.total || 0;

  return (
    <div className="min-h-screen text-white">
      <BackgroundBeamsDemo />
      <div className="container mx-auto px-4 pb-12 relative z-10">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* Left — Profile */}
          <div className="w-full lg:w-1/3 bg-slate-900 rounded-xl p-6 shadow-lg">
            <div className="flex flex-col items-center text-center">
              <BackgroundGradientRound>
                <img className="size-48 rounded-full object-cover" src={photo} alt={name} />
              </BackgroundGradientRound>
              <h1 className="text-3xl font-bold mt-6 capitalize">{name}</h1>
              <h2 className="text-xl font-medium brand-text-color mt-2 capitalize">{university}</h2>
              <h3 className="text-lg mt-2">Class {classRange}</h3>
              <p className="text-slate-400 mt-1 text-sm">{subjects?.join(" | ")}</p>

              {/* Rating summary */}
              {totalReviews > 0 && (
                <div className="mt-3 flex items-center gap-2">
                  <span className="text-yellow-400 text-xl">★</span>
                  <span className="font-bold text-lg">{avgRating}</span>
                  <span className="text-slate-400 text-sm">({totalReviews} reviews)</span>
                </div>
              )}
            </div>

            <div className="flex justify-center gap-4 mt-6">
              <PhoneButton phone={whatsApp} />
              <ContactButton phone={whatsApp} />
            </div>

            {studentIDPhoto && (
              <div className="mt-8 flex justify-center">
                <img className="w-full max-w-[300px] rounded-lg" src={studentIDPhoto} alt="Student ID" />
              </div>
            )}
          </div>

          {/* Right — Details + Reviews */}
          <div className="w-full lg:w-2/3 space-y-6">

            {/* About */}
            <div className="bg-slate-900 rounded-xl p-6 shadow-lg">
              <h2 className="text-2xl font-bold mb-4">About Me</h2>
              <p className="text-slate-400 text-base" style={{ whiteSpace: "pre-wrap" }}>{description}</p>
            </div>

            {/* Reviews Section */}
            <div className="bg-slate-900 rounded-xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h2 className="text-xl font-bold">Reviews</h2>
                  {totalReviews > 0 && (
                    <div className="flex items-center gap-2 mt-1">
                      <StarRating value={Math.round(avgRating)} />
                      <span className="text-slate-400 text-sm">{avgRating} / 5 ({totalReviews})</span>
                    </div>
                  )}
                </div>
                {user?.role === "student" && !showForm && (
                  <button onClick={() => setShowForm(true)}
                    className="px-4 py-2 bg-[#00ccb1] hover:bg-[#00b8a0] rounded-lg text-sm font-medium transition-all">
                    + Write Review
                  </button>
                )}
              </div>

              {/* Review Form */}
              {showForm && user?.role === "student" && (
                <form onSubmit={handleSubmitReview} className="bg-slate-800 rounded-xl p-5 mb-6 border border-white/10">
                  <h3 className="font-semibold mb-3">Your Review</h3>
                  <div className="mb-3">
                    <label className="text-sm text-slate-400 block mb-1">Rating</label>
                    <StarRating value={rating} onChange={setRating} />
                  </div>
                  <div className="mb-4">
                    <label className="text-sm text-slate-400 block mb-1">Comment</label>
                    <textarea value={comment} onChange={(e) => setComment(e.target.value)}
                      rows={3} placeholder="Share your experience with this teacher..."
                      className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#00ccb1] text-white placeholder:text-slate-500 resize-none" />
                  </div>
                  <div className="flex gap-3">
                    <button type="submit" disabled={submitting}
                      className="px-5 py-2 bg-[#00ccb1] hover:bg-[#00b8a0] rounded-lg text-sm font-medium disabled:opacity-50 transition-all">
                      {submitting ? "Submitting..." : "Submit Review"}
                    </button>
                    <button type="button" onClick={() => setShowForm(false)}
                      className="px-5 py-2 border border-white/10 hover:bg-white/5 rounded-lg text-sm transition-all">
                      Cancel
                    </button>
                  </div>
                </form>
              )}

              {/* Reviews List */}
              {reviews.length === 0 ? (
                <div className="text-center py-10">
                  <p className="text-4xl mb-2">⭐</p>
                  <p className="text-slate-400 text-sm">No reviews yet. Be the first to review!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {reviews.map((review: any) => (
                    <div key={review._id} className="bg-slate-800 rounded-xl p-4 border border-white/5">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <img src={review.studentPhoto || "https://i.ibb.co/6b4nDXS/default-avatar.png"}
                            className="size-10 rounded-full object-cover" />
                          <div>
                            <p className="font-medium text-sm capitalize">{review.studentName}</p>
                            <div className="flex items-center gap-2 mt-0.5">
                              <StarRating value={review.rating} />
                              <span className="text-slate-400 text-xs">{moment(review.createdAt).fromNow()}</span>
                            </div>
                          </div>
                        </div>
                        {(user?.role === "admin" || (user?.role === "student" && studentData?.data?._id === review.studentId)) && (
                          <button onClick={() => handleDelete(review._id)}
                            className="text-red-400 hover:text-red-300 text-xs transition-all shrink-0">
                            Delete
                          </button>
                        )}
                      </div>
                      <p className="text-slate-300 text-sm mt-3 leading-relaxed">{review.comment}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherAbout;
