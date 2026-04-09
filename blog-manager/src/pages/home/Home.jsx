import BlogCard from "../../components/BlogCard";
import { useBlogs } from "../../hooks/useblog";

const Home = () => {
  const { publishedBlogs } = useBlogs();

  return (
    <div className="max-w-7xl mx-auto py-12 px-4">
      <header className="text-center mb-16 space-y-4">
        <h1 className="text-4xl md:text-6xl text-(--text1)">
          Welcome to <span className="text-(--accent)">Inkwell</span>
        </h1>
        <p className="max-w-2xl mx-auto text-gray-500 dark:text-gray-400 text-lg font-medium leading-relaxed">
          Discover thoughtful articles on technology, programming, and software
          engineering from passionate writers.
        </p>
      </header>

      <div className="flex justify-between items-center mb-8 border-b border-(--border) pb-4">
        <h2 className="text-2xl font-bold text-(--text1)">Latest Articles</h2>
        <span className="text-sm text-gray-400 font-medium">
          {publishedBlogs.length} articles
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {publishedBlogs.map((blog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </div>
    </div>
  );
};

export default Home;
