import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { ArrowLeft, Save, Send, X } from "lucide-react";
import { useNavigate, useParams } from "react-router";
import { useBlogs } from "../../hooks/useblog";

const EditBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");

  const { getBlogById, updateBlog } = useBlogs();

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const existingBlog = getBlogById(id);
    if (existingBlog) {
      reset({
        title: existingBlog.title,
        excerpt: existingBlog.excerpt,
        content: existingBlog.content,
      });
      setTags(existingBlog.tags || []);
    } else {
      navigate("/dashboard");
    }
  }, [id, getBlogById, reset, navigate]);

  const handleTagKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const val = tagInput.trim();
      if (val && tags.length < 5 && !tags.includes(val)) {
        setTags([...tags, val]);
        setTagInput("");
        clearErrors("tags");
      }
    }
  };

  const removeTag = (indexToRemove) => {
    setTags(tags.filter((_, index) => index !== indexToRemove));
  };

  const handleUpdate = (data, status) => {
    if (tags.length === 0) {
      setError("tags", { type: "manual", message: "Minimum 1 tag required!" });
      return;
    }

    const updatedData = {
      ...data,
      tags,
      published: status === "publish",
      updatedAt: new Date().toISOString(),
    };

    updateBlog(id, updatedData);
    navigate("/dashboard");
  };

  return (
    <div className="max-w-4xl mx-auto px-4">
      <button
        onClick={() => navigate("/dashboard")}
        className="flex items-center cursor-pointer gap-2 text-gray-400 hover:text-(--text1) mb-6 transition-colors text- font-medium"
      >
        <ArrowLeft size={16} />
        Back to Dashboard
      </button>

      <div className="bg-(--secondary) border border-(--border) rounded-2xl p-8 shadow-xl">
        <h2 className="text-md font-bold text-(--text1) mb-8">Edit Article</h2>

        <form className="space-y-6">
          <div>
            <label className="block font-bold text-(--text1) mb-2 tracking-wide text-sm">
              Title
            </label>
            <input
              {...register("title", { required: "Title is required!" })}
              placeholder="Enter a compelling title..."
              className={`w-full px-4 py-1 bg-(--input) border ${errors.title ? "border-red-500" : "border-(--border)"} rounded-lg text-(--text1) focus:outline-none focus:border-(--accent) transition-all`}
            />
            {errors.title && (
              <p className="text-red-500 text-[10px] mt-1 italic">
                {errors.title.message}
              </p>
            )}
          </div>

          <div>
            <label className="block font-bold text-(--text1) mb-2 tracking-wide text-sm">
              Excerpt
            </label>
            <textarea
              {...register("excerpt", {
                required: "Short Description Required!",
              })}
              rows="3"
              placeholder="Write a brief summary of your article..."
              className={`w-full px-4 py-1 bg-(--input) border ${errors.excerpt ? "border-red-500" : "border-(--border)"} rounded-lg text-(--text1) focus:outline-none focus:border-(--accent) resize-none`}
            />
            {errors.excerpt && (
              <p className="text-red-500 text-[10px] mt-1 italic">
                {errors.excerpt.message}
              </p>
            )}
          </div>

          <div>
            <label className="block font-bold text-(--text1) mb-2 tracking-wide text-sm">
              Content
            </label>
            <textarea
              {...register("content", { required: "Content is Required!" })}
              rows="10"
              placeholder="Write your article content here..."
              className={`w-full px-4 py-3 bg-(--input) border ${errors.content ? "border-red-500" : "border-(--border)"} rounded-lg text-(--text1) font-mono text-sm focus:outline-none focus:border-(--accent)`}
            />
            {errors.content && (
              <p className="text-red-500 text-[10px] mt-1 italic">
                {errors.content.message}
              </p>
            )}
          </div>

          <div>
            <label className="block font-bold text-(--text1) mb-2 tracking-wide text-sm">
              Tags
            </label>
            <div
              className={`flex flex-wrap gap-2 p-2 bg-(--input) border ${errors.tags ? "border-red-500" : "border-(--border)"} rounded-lg min-h-12.5`}
            >
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="flex items-center gap-1 bg-(--accent) text-(--text2) px-3 py-1 rounded-full text-xs font-bold transition-all animate-in zoom-in duration-200"
                >
                  {tag}
                  <X
                    size={12}
                    className="cursor-pointer hover:scale-125"
                    onClick={() => removeTag(index)}
                  />
                </span>
              ))}
              <input
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleTagKeyDown}
                placeholder={tags.length < 5 ? "Add tags..." : ""}
                className="flex-1 bg-transparent border-none focus:outline-none text-(--text1) text-sm ml-2 min-w-30"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={handleSubmit((data) => handleUpdate(data, "draft"))}
              className="flex cursor-pointer items-center gap-2 px-3 py-1.5 bg-(--input) text-(--text1) rounded-lg font-semibold text-sm hover:text-(--text2) hover:bg-(--accent) transition-all border border-(--border)"
            >
              <Save size={16} />
              Save as Draft
            </button>
            <button
              type="button"
              onClick={handleSubmit((data) => handleUpdate(data, "publish"))}
              className="flex cursor-pointer items-center gap-2 px-3 py-1.5 bg-(--accent) text-(--text2) rounded-lg font-semibold text-sm hover:opacity-90 transition-all active:scale-95 shadow-lg shadow-(--accent)/20"
            >
              <Send size={16} />
              Publish
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBlog;
