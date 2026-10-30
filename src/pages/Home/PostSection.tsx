import { useGetAllPostsQuery } from "../../redux/features/post/postApi";
import { watchLoader } from "../../utils/loader";
import PostCard from "../../components/Cards/PostCard";
import { TPost } from "./types";
import Header from "../../components/ui/Header";

const PostSection = () => {
  const { data: tuitions, isLoading } = useGetAllPostsQuery(undefined);
  if (isLoading) {
    return <div>{watchLoader}</div>;
  }

  return (
    <div className="py-20">
      <Header heading="Recent Posted Tuitions" subheading=""></Header>
      <div className="w-4/5 mx-auto grid gap-4">
        {tuitions.data.map((tui: TPost) => (
          <PostCard key={tui._id} post={tui} />
        ))}
      </div>
    </div>
  );
};

export default PostSection;
