import { useState, useRef, useEffect } from "react";
import { MoreHorizontal, Edit, Trash2, Eye, EyeOff } from "lucide-react";
import { useBlogs } from "../hooks/useblog";
import MenuButton from "./MenuButton";
import { useNavigate } from "react-router";
import DeleteModal from "./DeleteModal";

const DashboardBlogCard = ({ blog }) => {
  const navigate = useNavigate();

  const { deleteBlog, publishBlog, unpublishBlog } = useBlogs();
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);

  const handleDeleteClick = (blog) => {
    setSelectedBlog(blog);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    deleteBlog(selectedBlog.id);
    setIsDeleteModalOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleAction = (action) => {
    setShowMenu(false);
    switch (action) {
      case "view":
        navigate(`/blog/${blog.id}`);
        break;
      case "edit":
        navigate(`/edit/${blog.id}`);
        break;
      case "publish":
        publishBlog(blog.id);
        break;
      case "unpublish":
        unpublishBlog(blog.id);
        break;
      case "delete":
        handleDeleteClick(blog);
        break;
      default:
        break;
    }
  };

  return (
    <>
      <div className="bg-(--secondary) border border-(--border) rounded-2xl p-6 relative">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <h3 className="text-xl font-bold text-(--text1) leading-tight">
              {blog.title}
            </h3>
            {blog.published ? (
              <span className="px-3 py-1 bg-(--accent) text-(--text2) text-[10px] font-bold uppercase tracking-wide rounded-full shadow-inner">
                Published
              </span>
            ) : (
              <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-500 text-[10px] font-bold uppercase rounded-full">
                Draft
              </span>
            )}
          </div>

          <button
            onClick={() => setShowMenu(!showMenu)}
            className="p-1.5 text-gray-400 hover:text-(--text1) hover:bg-(--accent) cursor-pointer rounded-lg transition-colors"
          >
            <MoreHorizontal size={20} />
          </button>
        </div>

        <p className="text-gray-500 text-sm mb-6 leading-relaxed">
          {blog.excerpt}
        </p>

        <div className="text-sm text-gray-500">
          Last updated:{" "}
          {new Date(blog.updatedAt).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </div>

        {showMenu && (
          <div
            ref={menuRef}
            className="absolute right-6 top-14 w-32 bg-(--secondary) border border-(--border) rounded-xl shadow-xl z-10 overflow-hidden animate-in fade-in zoom-in duration-200"
          >
            <div className="p-1.5">
              {blog.published ? (
                <>
                  <MenuButton
                    icon={Eye}
                    label="View"
                    onClick={() => handleAction("view")}
                  />
                  <MenuButton
                    icon={Edit}
                    label="Edit"
                    onClick={() => handleAction("edit")}
                  />
                  <MenuButton
                    icon={EyeOff}
                    label="Unpublish"
                    onClick={() => handleAction("unpublish")}
                  />
                </>
              ) : (
                <>
                  <MenuButton
                    icon={Edit}
                    label="Edit"
                    onClick={() => handleAction("edit")}
                  />
                  <MenuButton
                    icon={Eye}
                    label="Publish"
                    onClick={() => handleAction("publish")}
                  />
                </>
              )}
              <MenuButton
                icon={Trash2}
                label="Delete"
                onClick={() => handleAction("delete")}
                isDelete
              />
            </div>
          </div>
        )}
      </div>

      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        articleTitle={selectedBlog?.title}
      />
    </>
  );
};

export default DashboardBlogCard;
