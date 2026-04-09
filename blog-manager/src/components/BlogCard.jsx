import { User, Calendar } from "lucide-react";
import { useNavigate } from "react-router";

const BlogCard = ({ blog }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/blog/${blog.id}`)}
      className="bg-(--secondary) border border-(--border) rounded-2xl p-6 flex flex-col h-full hover:border-(--accent) transition-all cursor-pointer group shadow-sm"
    >
      <div className="flex flex-wrap gap-2 mb-4">
        {blog.tags.map((tag, index) => (
          <span
            key={index}
            className="px-3 py-1 bg-(--input) text-[10px] font-bold uppercase tracking-tight rounded-full text-(--text1)"
          >
            {tag}
          </span>
        ))}
      </div>

      <h3 className="text-xl font-bold text-(--text1) mb-3 group-hover:text-(--accent) transition-colors leading-tight">
        {blog.title}
      </h3>

      <p className="text-gray-500 dark:text-gray-400 text-sm mb-6 grow leading-relaxed">
        {blog.excerpt}
      </p>

      <div className="flex items-center justify-between pt-4 border-t border-(--border) mt-auto text-[11px] text-gray-500 dark:text-gray-400 font-medium">
        <div className="flex items-center gap-1.5">
          <User size={14} className="text-(--accent)" />
          <span>{blog.authorName}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Calendar size={14} className="text-(--accent)" />
          <span>
            {" "}
            {new Date(blog.createdAt).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </span>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
