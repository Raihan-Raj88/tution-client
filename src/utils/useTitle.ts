import { useEffect } from "react";

const useTitle = (title: string) => {
  useEffect(() => {
    document.title = title ? `${title} | MentorNest` : "MentorNest - Bangladesh's Tuition Platform";
  }, [title]);
};

export default useTitle;
