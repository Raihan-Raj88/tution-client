import toast from "react-hot-toast";

const IMGBB_API_KEY = "9306685454736a79d3f26489f400da4b";

export const imageHosting = async (file: File) => {
  const formData = new FormData();
  formData.append("image", file);

  try {
    const res = await fetch(
      `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`,
      {
        method: "POST",
        body: formData,
      }
    );
    const data = await res.json();
    if (data.success) {
      return data;
    } else {
      toast.error("Image upload failed: " + data.error?.message);
      return null;
    }
  } catch (err: any) {
    toast.error("Image upload failed: " + err.message);
    return null;
  }
};
