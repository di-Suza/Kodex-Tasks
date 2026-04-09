import { Plus, FileText } from "lucide-react";
import { useNavigate } from "react-router";
import { useAuth } from "../../hooks/useAuth";
import { useBlogs } from "../../hooks/useBlog";
import DashboardBlogCard from "../../components/DashboardBlogCard";

const Dashboard = () => {
  const { user } = useAuth();
  const { userBlogs, stats } = useBlogs();
  const navigate = useNavigate();

  const allStats = [
    {
      label: "Total Articles",
      value: stats.total,
      color: "text-[var(--text1)]",
    },
    {
      label: "Published",
      value: stats.published,
      color: "text-[var(--accent)]",
    },
    { label: "Drafts", value: stats.drafts, color: "text-[var(--text1)]" },
  ];

  

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-(--text1)">Dashboard</h1>
          <p className="text-gray-500 text-sm mt-1">
            Manage your articles, {user?.name}
          </p>
        </div>

        <button
          onClick={() => navigate("/create")}
          className="flex cursor-pointer items-center justify-center gap-2 bg-(--accent) text-(--text2) px-5 py-2.5 rounded-lg font-bold text-sm hover:opacity-90 transition-all active:scale-95"
        >
          <Plus size={18} />
          New Article
        </button>
      </div>

      <div className="mb-8 grid gap-4 sm:grid-cols-3">
        {allStats.map((stat, index) => (
          <div
            key={index}
            className="bg-(--secondary) border border-(--border) p-6 rounded-2xl shadow-sm"
          >
            <p className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-2">
              {stat.label}
            </p>
            <h3 className={`text-4xl font-bold ${stat.color}`}>{stat.value}</h3>
          </div>
        ))}
      </div>

      <div className="space-y-6">
        <h2 className="text-xl font-bold text-(--text1)">Your Articles</h2>

        {userBlogs && userBlogs.length > 0 ? (
          userBlogs.map((item) => (
            <DashboardBlogCard key={item.id} blog={item} />
          ))
        ) : (
          <div className="bg-(--secondary) border border-(--border) rounded-2xl py-20 flex flex-col items-center justify-center text-center px-6">
            <div className=" rounded-2xl mb-4">
              <FileText size={48} className="text-gray-500" />
            </div>

            <h3 className="text-lg font-bold text-(--text1) mb-1">
              No articles yet
            </h3>
            <p className="text-gray-500 text-sm mb-4">
              Start writing your first article
            </p>

            <button
              onClick={() => navigate("/create")}
              className="flex cursor-pointer  items-center gap-2 bg-(--accent) text-(--text2) px-6 py-2.5 rounded-lg font-bold text-sm hover:opacity-90 transition-all active:scale-95"
            >
              <Plus size={18} />
              Create Article
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
