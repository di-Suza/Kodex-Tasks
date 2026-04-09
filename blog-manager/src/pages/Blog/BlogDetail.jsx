import { useParams, useNavigate } from "react-router";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { ArrowLeft, Calendar, User } from "lucide-react";
import { useBlogs } from "../../hooks/useblog";

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getBlogById } = useBlogs();
  const blog = getBlogById(id);

  if (!blog) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[20vh] px-4 text-center">
        <h1 className="text-xl md:text-2xl font-bold text-(--text1) mb-4">
          Article Not Found
        </h1>

        <p className="text-gray-500 dark:text-gray-400 text-sm mb-4 max-w-md">
          The article you're looking for doesn't exist or has been removed.
        </p>

        <button
          onClick={() => navigate("/")}
          className="flex items-center cursor-pointer gap-2 bg-(--accent) text-(--text2) px-4 py-1.5 rounded-lg font-semibold transition-all hover:opacity-90 active:scale-95 shadow-lg shadow-(--accent)/20"
        >
          <ArrowLeft size={18} />
          Back to Home
        </button>
      </div>
    );
  }
  return (
    <div className="max-w-4xl mx-auto py-10 px-6 bg-(--primary) min-h-screen text-(--text1)">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center cursor-pointer gap-2 text-gray-500 hover:text-white mb-8 transition-colors text-sm font-medium"
      >
        <ArrowLeft size={16} /> Back to Articles
      </button>

      <div className="flex gap-2 mb-6">
        {blog.tags.map((tag, i) => (
          <span
            key={i}
            className="px-3 py-1 bg-gray-900 border border-gray-800 text-gray-400 text-xs font-bold rounded-md"
          >
            {tag}
          </span>
        ))}
      </div>

      <h1 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
        {blog.title}
      </h1>

      <div className="flex items-center gap-6 text-sm text-gray-500 mb-12">
        <div className="flex items-center gap-2">
          <User size={16} />
          <span>{blog.authorName}</span>
        </div>
        <div className="flex items-center gap-2">
          <Calendar size={16} />
          <span>
            {new Date(blog.createdAt).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </span>
        </div>
      </div>

      <article className="prose prose-invert prose-emerald max-w-none">
        <ReactMarkdown
          components={{
            code({ node, inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || "");
              return !inline && match ? (
                <SyntaxHighlighter
                  style={atomDark}
                  language={match[1]}
                  PreTag="div"
                  className="rounded-lg border border-gray-800 my-6"
                  {...props}
                >
                  {String(children).replace(/\n$/, "")}
                </SyntaxHighlighter>
              ) : (
                <code
                  className="bg-gray-800 px-1.5 py-0.5 rounded text-(--accent)"
                  {...props}
                >
                  {children}
                </code>
              );
            },
            h2: ({ node, ...props }) => (
              <h2 className="text-2xl font-bold mt-10 mb-4" {...props} />
            ),
            p: ({ node, ...props }) => (
              <p
                className="text-(--text1) leading-relaxed mb-6 text-lg"
                {...props}
              />
            ),
          }}
        >
          {blog.content}
        </ReactMarkdown>
      </article>
    </div>
  );
};

export default BlogDetail;
