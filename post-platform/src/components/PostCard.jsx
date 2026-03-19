import { timeAgo } from "../utils/timeAgo";

export default function PostCard({ post, onEdit, onDelete }) {
  const initials = post.title
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join("");

  return (
    <article className="post-card">
      {post.image && (
        <div className="post-img-wrap">
          <img src={post.image} alt={post.title} className="post-img" />
        </div>
      )}
      <div className="post-body">
        <div className="post-meta">
          <div className="avatar">{initials}</div>
          <span className="post-time">{timeAgo(post.createdAt)}</span>
        </div>
        <h3 className="post-title">{post.title}</h3>
        <p className="post-content">{post.content}</p>
        <div className="post-actions">
          <button className="btn-edit" onClick={() => onEdit(post)}>
            Edit
          </button>
          <button className="btn-delete" onClick={() => onDelete(post.id)}>
            Delete
          </button>
        </div>
      </div>
    </article>
  );
}
