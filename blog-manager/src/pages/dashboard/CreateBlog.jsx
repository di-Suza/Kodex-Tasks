import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { ArrowLeft, Save, Send, X } from "lucide-react";
import { useNavigate } from "react-router";
import { useBlogs } from "../../hooks/useBlog";

const CreateBlog = () => {
  const navigate = useNavigate();
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");

  const { addBlog } = useBlogs();

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm();

  const handleTagKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const val = tagInput.trim();
      if (val && tags.length < 5 && !tags.includes(val)) {
        setTags([...tags, val]);
        setTagInput("");
        clearErrors("tags");
      } else if (tags.length >= 5) {
        setError("tags", {
          type: "manual",
          message: "Max 5 tags hi allowed hain",
        });
      }
    }
  };

  const removeTag = (indexToRemove) => {
    setTags(tags.filter((_, index) => index !== indexToRemove));
  };

  const onPublish = (data) => {
    if (tags.length === 0) {
      setError("tags", {
        type: "manual",
        message: "Minimum 1 tag required!",
      });
      return;
    }
    const finalData = {
      ...data,
      tags,
    };
    addBlog(finalData, "publish");
    navigate("/dashboard");
  };

  const onSaveDraft = (data) => {
    if (tags.length === 0) {
      setError("tags", {
        type: "manual",
        message: "Minimum 1 tag required!",
      });
      return;
    }
    const finalData = {
      ...data,
      tags,
    };
    addBlog(finalData, "draft");
    navigate("/dashboard");
  };

  return (
    <div className="max-w-4xl mx-auto  px-4">
      <button
        onClick={() => navigate("/dashboard")}
        ds
        className="flex items-center cursor-pointer gap-2 text-gray-400 hover:text-(--text1) mb-6 transition-colors text- font-medium"
      >
        <ArrowLeft size={16} />
        Back to Dashboard
      </button>

      <div className="bg-(--secondary) border border-(--border) rounded-2xl p-8 shadow-xl">
        <h2 className="text-md font-bold text-(--text1) mb-8">
          Create New Article
        </h2>

        <form className="space-y-6">
          {/* Title */}
          <div>
            <label className="block font-bold text-(--text1) mb-2 tracking-wide text-sm">
              Title
            </label>
            <input
              {...register("title", { required: "Title is mandatory!" })}
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
            <p className="text-gray-500 text-[10px] mt-1">
              A short description that appears on the blog listing
            </p>
          </div>

          <div>
            <label className="block font-bold text-(--text1) mb-2 tracking-wide text-sm">
              Content
            </label>
            <textarea
              {...register("content", { required: "Content is required" })}
              rows="10"
              placeholder="Write your article content here ... (Markdown supported)"
              className={`w-full px-4 py-3 bg-(--input) border ${errors.content ? "border-red-500" : "border-(--border)"} rounded-lg text-(--text1) font-mono text-sm focus:outline-none focus:border-(--accent)`}
            />
            {errors.content && (
              <p className="text-red-500 text-[10px] mt-1 italic">
                {errors.content.message}
              </p>
            )}
            <p className="text-gray-500 text-[10px] mt-1 italic">
              Supports Markdown: ## for headers, **bold**, *italic*, `code`,
              etc.
            </p>
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
                placeholder={
                  tags.length < 5 ? "Add tags (press Enter to add)" : ""
                }
                disabled={tags.length >= 5}
                className="flex-1 bg-transparent border-none focus:outline-none text-(--text1) text-sm ml-2 min-w-30"
              />
            </div>
            {errors.tags && (
              <p className="text-red-500 text-[10px] mt-1 italic">
                {errors.tags.message}
              </p>
            )}
            <p className="text-gray-500 text-[10px] mt-1 italic font-medium">
              Add up to 5 tags to help readers find your article
            </p>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={handleSubmit(onSaveDraft)}
              className="flex cursor-pointer items-center gap-2 px-3 py-1.5 bg-(--input) text-(--text1) rounded-lg font-semibold text-sm hover:text-(--text2) hover:bg-(--accent) transition-all border border-(--border)"
            >
              <Save size={16} />
              Save as Draft
            </button>
            <button
              type="button"
              onClick={handleSubmit(onPublish)}
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

export default CreateBlog;
